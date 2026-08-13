import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, role, challenge } = await req.json();

    // Valida campos obrigatórios
    if (
      !name?.trim() ||
      !email?.trim() ||
      !role?.trim() ||
      !challenge?.trim()
    ) {
      return NextResponse.json(
        {
          error: 'Todos os campos são obrigatórios.',
        },
        {
          status: 400,
        }
      );
    }

    // Valida formato do e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email.trim())) {
      return NextResponse.json(
        {
          error: 'Email inválido.',
        },
        {
          status: 400,
        }
      );
    }

    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'cleitondsouza@gmail.com',
      subject: 'Novo lead - ResumoAI',
      html: `
        <h2>Novo lead da landing</h2>

        <p><strong>Nome:</strong> ${name.trim()}</p>
        <p><strong>Email:</strong> ${email.trim()}</p>
        <p><strong>Cargo:</strong> ${role.trim()}</p>
        <p><strong>Maior desafio:</strong> ${challenge.trim()}</p>
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