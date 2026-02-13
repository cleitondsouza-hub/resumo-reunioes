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
      content: 'Você é um assistente que cria resumos profissionais de reuniões para gestores.'
    },
    {
      role: 'user',
      content: `
Transforme a transcrição abaixo em um resumo estruturado para um líder de equipe.

Siga EXATAMENTE este formato (sem markdown, sem **negrito**, sem títulos extras):

Decisões:
- ...

Próximos passos:
- Liste tarefas com responsáveis quando isso estiver claro na transcrição.
- Se não houver responsável explícito, escreva apenas a tarefa sem nome.
- Não invente responsáveis.

Pontos de atenção:
- ...

Prazos:
- ...

Regras:
- Não use **negrito**
- Não use markdown
- Seja objetivo
- Não invente informações

Transcrição:
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
