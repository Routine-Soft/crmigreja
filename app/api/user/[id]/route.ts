import { NextRequest, NextResponse } from 'next/server';
import db from '@/database/db';
import userModel from '@/models/users';
import argon2 from 'argon2';

// -----------------------------------
// GET — Buscar usuário por ID
// -----------------------------------
export async function GET(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        await db();

        const { id } = await context.params;

        const user = await userModel.findById(id);

        if (!user) {
            return NextResponse.json(
                { error: 'Usuário não encontrado' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: 'Usuário encontrado', user },
            { status: 200 }
        );

    } catch (error) {
        console.error('Erro ao buscar usuário:', error);
        return NextResponse.json(
            { error: 'Erro interno do servidor' },
            { status: 500 }
        );
    }
}

// -----------------------------------
// PATCH — Atualizar usuário
// -----------------------------------
export async function PATCH(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        await db();

        const { id } = await context.params; // <--- CORREÇÃO

        const data = await request.json();

        const user = await userModel.findById(id);

        if (!user) {
            return NextResponse.json(
                { error: 'Usuário não encontrado' },
                { status: 404 }
            );
        }

        // Validar senha atual se está tentando trocar senha
        if (data.password !== undefined) {
            if (!data.currentPassword) {
                return NextResponse.json(
                    { error: 'Senha atual é obrigatória para alterar a senha' },
                    { status: 400 }
                );
            }

            try {
                const isPasswordValid = await argon2.verify(user.password, data.currentPassword);
                if (!isPasswordValid) {
                    return NextResponse.json(
                        { error: 'Senha atual incorreta' },
                        { status: 401 }
                    );
                }
            } catch (error) {
                console.error('Erro ao verificar senha:', error);
                return NextResponse.json(
                    { error: 'Erro ao validar senha' },
                    { status: 500 }
                );
            }
        }

        if (data.name !== undefined) user.name = data.name;
        if (data.email !== undefined) user.email = data.email;
        if (data.phone !== undefined) user.phone = data.phone;
        if (data.birthdate !== undefined) {
            user.birthdate = new Date(data.birthdate);
        }
        if (data.gender !== undefined) user.gender = data.gender;
        if (data.church !== undefined) user.church = data.church;
        if (data.cep !== undefined) user.cep = data.cep;
        if (data.address !== undefined) user.address = data.address;
        if (data.neighborhood !== undefined) user.neighborhood = data.neighborhood;
        if (data.city !== undefined) user.city = data.city;
        if (data.state !== undefined) user.state = data.state;
        if (data.invitationofgrace !== undefined) user.invitationofgrace = data.invitationofgrace;
        if (data.baptized !== undefined) user.baptized = data.baptized;
        if (data.permissions !== undefined) {
            user.permissions = data.permissions;
        }
        if (data.status !== undefined) {
            user.status = data.status;
        }
        // Atualizar senha (já validada acima)
        if (data.password !== undefined) {
            user.password = data.password;
        }

        // Adicione mais campos conforme necessário

        await user.save();

        return NextResponse.json(
            { message: 'Usuário atualizado com sucesso', user },
            { status: 200 }
        );

    } catch (error) {
        return NextResponse.json(
            { error: 'Erro interno do servidor' },
            { status: 500 }
        );
    }
}


// -----------------------------------
// DELETE — Remover usuário
// -----------------------------------
export async function DELETE(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        await db();

        const { id } = await context.params; // <--- CORREÇÃO

        const deleted = await userModel.findByIdAndDelete(id);

        if (!deleted) {
            return NextResponse.json(
                { error: 'Usuário não encontrado' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: 'Usuário deletado com sucesso' },
            { status: 200 }
        );

    } catch (error) {
        console.error('Erro ao deletar usuário:', error);
        return NextResponse.json(
            { error: 'Erro interno do servidor' },
            { status: 500 }
        );
    }
}

