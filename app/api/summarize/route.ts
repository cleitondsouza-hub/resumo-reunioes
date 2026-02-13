import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { text } = await req.json();

    if (!text) {
      return NextResponse.json({ error: 'Texto não enviado' }, { status: 400 });
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content:
            'Você é um assistente que gera resumos de reuniões em português, com seções: Decisões, Próximos Passos (com responsáveis), Pontos de Atenção e Prazos.',
        },
        {
          role: 'user',
          content: text,
        },
      ],
    });

    const summary = completion.choices[0].message.content;

    return NextResponse.json({ summary });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Erro ao gerar resumo' }, { status: 500 });
  }
}
