import { NextRequest, NextResponse } from 'next/server';
import db from '@/database/db';
import userModel from '@/models/users';
import { CreateUserDTO, UserResponseDTO } from '@/dto/user/UserDTO';

export async function POST(request: NextRequest) {
    try {
        await db();

        const data: CreateUserDTO = await request.json();

        if (!data.password) {
            return NextResponse.json(
                { error: 'Senha é obrigatória' },
                { status: 400 }
            );
        }

        // Verificar duplicidades globais (single tenant)
        const existingEmail = await userModel.findOne({ email: data.email });
        if (existingEmail) {
            return NextResponse.json(
                { error: 'Email já cadastrado' },
                { status: 409 }
            );
        }

        const totalUsers = await userModel.countDocuments();

        const user = await userModel.create({
            ...data,

            // se for o PRIMEIRO usuário
            owner: totalUsers === 0 ? undefined : data.owner,
            canLogin: totalUsers === 0, // SÓ O PRIMEIRO LOGA
        });

        // se for o primeiro, ele é dono de si mesmo
        if (totalUsers === 0) {
            user.owner = user._id;
            await user.save();
        }

        const response: UserResponseDTO = {
            _id: user._id.toString(),
            name: user.name,
            phone: user.phone,
            email: user.email,
            birthdate: user.birthdate,
            gender: user.gender,
            church: user.church,
            cep: user.cep,
            address: user.address,
            neighborhood: user.neighborhood,
            city: user.city,
            state: user.state,
            invitationofgrace: user.invitationofgrace,
            baptized: user.baptized,
            permissions: user.permissions,
            status: user.status,
            owner: user._id.toString(),
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        }

        return NextResponse.json(
            {
                message: 'Usuário criado com sucesso',
                user: response
            },
            { status: 201 }
        );

    } catch (error) {
        console.error('Erro no registro:', error);

        return NextResponse.json(
            { error: 'Erro interno do servidor' },
            { status: 500 }
        );
    }
}
