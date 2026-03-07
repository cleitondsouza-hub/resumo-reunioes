import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export async function POST(req: Request) {

  try {

    const { text } = await req.json()

    const completion = await openai.chat.completions.create({
      model: 'gpt-4.1-mini',
      temperature: 0.2,
      messages: [
        {
          role: 'system',
          content: 'Você é um assistente que extrai tarefas objetivas de reuniões.'
        },
        {
          role: 'user',
          content: `
Extraia tarefas da transcrição abaixo.

Formato:

Tarefas:
- tarefa (responsável se citado)

Regras:
- Não invente responsáveis
- Seja objetivo
- Liste apenas tarefas claras

Transcrição:
${text}
`
        }
      ]
    })

    return NextResponse.json({
      tasks: completion.choices[0].message.content
    })

  } catch (error) {

    console.error(error)

    return NextResponse.json(
      { error: 'Erro ao extrair tarefas' },
      { status: 500 }
    )
  }

}