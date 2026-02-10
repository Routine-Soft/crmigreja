import { NextRequest, NextResponse } from 'next/server';
import db from '@/database/db';
import userModel from '@/models/users';

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

        // 🔥 BUSCA APENAS OS FILHOS DO PAI
        const users = await userModel
            .find({ owner })
            .sort({ createdAt: -1 });

        if (!users || users.length === 0) {
            return NextResponse.json(
                { error: 'Não há usuários ainda' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            {
                message: 'Usuários listados com sucesso',
                users
            },
            { status: 200 }
        );

    } catch (error) {
        console.error('Erro ao listar usuários:', error);

        return NextResponse.json(
            {
                error: 'Erro interno do servidor'
            },
            { status: 500 }
        );
    }
}
