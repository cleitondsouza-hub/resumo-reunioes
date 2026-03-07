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
  model: 'gpt-4.1-mini',
  messages: [
    {
      role: 'system',
      content: 'Você é um assistente especialista em criar resumos executivos de reuniões para líderes e gestores.'
        },
        {
          role: 'user',
          content: `
Analise a transcrição de reunião abaixo e gere um resumo claro e estruturado.

O objetivo é permitir que um gestor entenda rapidamente:
- o que foi decidido
- quais são as tarefas
- quais riscos ou pontos de atenção existem
- quais prazos foram mencionados

IMPORTANTE:
- Não invente informações
- Não invente nomes de responsáveis
- Seja objetivo
- Use frases curtas

Formato obrigatório da resposta:

Decisões:
- ...

Próximos passos:
- Tarefa — Responsável (se mencionado)
- Se não houver responsável claro, escreva apenas a tarefa

Pontos de atenção:
- ...

Prazos:
- ...

Transcrição da reunião:
${text}
      `
    }
  ],
  temperature: 0.2,
});

    const summary = completion.choices[0].message.content;

    return NextResponse.json({ summary });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Erro ao gerar resumo' }, { status: 500 });
  }
}
