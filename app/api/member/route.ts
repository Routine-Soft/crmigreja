import { NextRequest, NextResponse } from 'next/server';
import db from '@/database/db';
import memberModel from '@/models/member';
import { CreateMemberDTO, MemberResponseDTO } from '@/dto/member/MemberDTO';

export async function POST(request: NextRequest) {
    try {
        await db();

        const data: CreateMemberDTO = await request.json();

        if (!data.name) {
            return NextResponse.json(
                { error: 'Nome é obrigatório' },
                { status: 400 }
            );
        }

        if (!data.owner) {
            return NextResponse.json(
                { error: 'Owner é obrigatório' },
                { status: 400 }
            );
        }

        const member = await memberModel.create(data);

        const response: MemberResponseDTO = {
            _id: member._id.toString(),
            name: member.name,
            phone: member.phone,
            email: member.email,
            birthdate: member.birthdate,
            gender: member.gender,
            church: member.church,
            cep: member.cep,
            address: member.address,
            neighborhood: member.neighborhood,
            city: member.city,
            state: member.state,
            invitationofgrace: member.invitationofgrace,
            baptized: member.baptized,
            status: member.status,
            owner: member.owner.toString(),
            createdAt: member.createdAt,
            updatedAt: member.updatedAt,
        }

        return NextResponse.json(
            {
                message: 'Membro criado com sucesso',
                member: response
            },
            { status: 201 }
        );

    } catch (error) {
        console.error('Erro ao criar membro:', error);

        return NextResponse.json(
            { error: 'Erro interno do servidor' },
            { status: 500 }
        );
    }
}

export async function GET(request: NextRequest) {
    try {
        await db();

        const { searchParams } = new URL(request.url);
        const owner = searchParams.get('owner');

        if (!owner) {
            return NextResponse.json(
                { error: 'Owner é obrigatório' },
                { status: 400 }
            );
        }

        const members = await memberModel
            .find({ owner })
            .sort({ createdAt: -1 });

        if (!members || members.length === 0) {
            return NextResponse.json(
                { error: 'Não há membros cadastrados' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            {
                message: 'Membros listados com sucesso',
                members
            },
            { status: 200 }
        );

    } catch (error) {
        console.error('Erro ao listar membros:', error);

        return NextResponse.json(
            {
                error: 'Erro interno do servidor'
            },
            { status: 500 }
        );
    }
}
