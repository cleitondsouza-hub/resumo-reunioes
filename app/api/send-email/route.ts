import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {

  try {

    const { email, content } = await req.json()

    await resend.emails.send({
      from: 'Reunioes <onboarding@resend.dev>',
      to: email,
      subject: 'Resumo da reunião',
      text: content
    })

    return NextResponse.json({ success: true })

  } catch (error) {

    console.error(error)

    return NextResponse.json(
      { error: 'Erro ao enviar email' },
      { status: 500 }
    )
  }

}