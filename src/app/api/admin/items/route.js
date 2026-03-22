import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req) {
try {
    const body = await req.json();
    const { title, description, category, userId } = body;

    if (!title || !category || !userId) {
    return NextResponse.json(
        { error: 'title, category e userId sao obrigatorios' },
        { status: 400 }
    );
    }

    const item = await prisma.item.create({
    data: {
        title,
        description: description || '',
        category,
        status: 'ACTIVE',
        userId,
    },
    });

    return NextResponse.json(item, { status: 201 });
} catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
}
}