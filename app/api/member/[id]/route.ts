import { NextRequest, NextResponse } from 'next/server';
import db from '@/database/db';
import memberModel from '@/models/member';

// -----------------------------------
// GET — Buscar membro por ID
// -----------------------------------
export async function GET(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        await db();

        const { id } = await context.params;

        const member = await memberModel.findById(id);

        if (!member) {
            return NextResponse.json(
                { error: 'Membro não encontrado' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: 'Membro encontrado', member },
            { status: 200 }
        );

    } catch (error) {
        console.error('Erro ao buscar membro:', error);
        return NextResponse.json(
            { error: 'Erro interno do servidor' },
            { status: 500 }
        );
    }
}

// -----------------------------------
// PATCH — Atualizar membro
// -----------------------------------
export async function PATCH(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        await db();

        const { id } = await context.params;

        const data = await request.json();

        const member = await memberModel.findById(id);

        if (!member) {
            return NextResponse.json(
                { error: 'Membro não encontrado' },
                { status: 404 }
            );
        }

        if (data.name !== undefined) member.name = data.name;
        if (data.email !== undefined) member.email = data.email;
        if (data.phone !== undefined) member.phone = data.phone;
        if (data.birthdate !== undefined) {
            member.birthdate = new Date(data.birthdate);
        }
        if (data.gender !== undefined) member.gender = data.gender;
        if (data.church !== undefined) member.church = data.church;
        if (data.cep !== undefined) member.cep = data.cep;
        if (data.address !== undefined) member.address = data.address;
        if (data.neighborhood !== undefined) member.neighborhood = data.neighborhood;
        if (data.city !== undefined) member.city = data.city;
        if (data.state !== undefined) member.state = data.state;
        if (data.invitationofgrace !== undefined) member.invitationofgrace = data.invitationofgrace;
        if (data.baptized !== undefined) member.baptized = data.baptized;
        if (data.status !== undefined) {
            member.status = data.status;
        }

        await member.save();

        return NextResponse.json(
            { message: 'Membro atualizado com sucesso', member },
            { status: 200 }
        );

    } catch (error) {
        console.error('Erro ao atualizar membro:', error);
        return NextResponse.json(
            { error: 'Erro interno do servidor' },
            { status: 500 }
        );
    }
}

// -----------------------------------
// DELETE — Remover membro
// -----------------------------------
export async function DELETE(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        await db();

        const { id } = await context.params;

        const deleted = await memberModel.findByIdAndDelete(id);

        if (!deleted) {
            return NextResponse.json(
                { error: 'Membro não encontrado' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: 'Membro deletado com sucesso' },
            { status: 200 }
        );

    } catch (error) {
        console.error('Erro ao deletar membro:', error);
        return NextResponse.json(
            { error: 'Erro interno do servidor' },
            { status: 500 }
        );
    }
}
