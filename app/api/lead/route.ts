import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, role, meetings, challenge } = await req.json();

    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'cleitondsouza@gmail.com',
      subject: 'Novo lead - ResumoAI',
      html: `
        <h2>Novo lead da landing</h2>

        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Cargo:</strong> ${role}</p>
        <p><strong>Reuniões por semana:</strong> ${meetings}</p>
        <p><strong>Maior desafio:</strong> ${challenge}</p>
      `,
    });

    return NextResponse.json({
      success: true,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: 'Erro ao processar lead',
      },
      {
        status: 500,
      }
    );
  }
}