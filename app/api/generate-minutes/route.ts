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
          content: 'Você cria atas profissionais de reunião.'
        },
        {
          role: 'user',
          content: `
Crie uma ata de reunião profissional baseada na transcrição.

Formato:

Resumo da reunião:
...

Decisões:
- ...

Tarefas:
- ...

Prazos:
- ...

Pontos importantes:
- ...

Transcrição:
${text}
`
        }
      ]
    })

    return NextResponse.json({
      minutes: completion.choices[0].message.content
    })

  } catch (error) {

    console.error(error)

    return NextResponse.json(
      { error: 'Erro ao gerar ata' },
      { status: 500 }
    )
  }

}