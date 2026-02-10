import { NextRequest, NextResponse } from 'next/server';
import db from '@/database/db';
import userModel from '@/models/users';
import argon2 from 'argon2';

export async function POST(request: NextRequest) {
    try {
        await db();

        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json(
                { error: 'Email e senha são obrigatórios' },
                { status: 400 }
            );
        }

        // Buscar usuário
        const user = await userModel.findOne({ email }).select('+password');

        if (!user || !user.password) {
            return NextResponse.json(
                { error: 'Email ou senha incorreto' },
                { status: 401 }
            );
        }

        let isPasswordValid = false;

        if (!user.canLogin) {
            return NextResponse.json(
                { error: 'Este usuário não tem permissão para acessar o sistema' },
                { status: 403 }
            );
        }

        try {
            isPasswordValid = await argon2.verify(user.password, password);
        } catch {
            return NextResponse.json(
                { error: 'Email ou senha incorreto' },
                { status: 401 }
            );
        }

        if (!isPasswordValid) {
            return NextResponse.json(
                { error: 'Email ou senha incorreto' },
                { status: 401 }
            );
        }

        // Remover dados sensíveis
        const userClean = user.toObject();
        delete userClean.password;
        delete userClean.token;
        delete userClean.resetPasswordToken;
        delete userClean.resetPasswordExpires;

        return NextResponse.json(
            {
                message: 'Login realizado com sucesso',
                user: userClean
            },
            { status: 200 }
        );

    } catch (error) {
        console.error('Erro no login:', error);

        return NextResponse.json(
            { error: 'Erro interno do servidor' },
            { status: 500 }
        );
    }
}
