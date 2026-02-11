import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const transcription = body.transcription;

    if (!transcription) {
      return NextResponse.json({ error: 'Transcrição não enviada' }, { status: 400 });
    }

    // Simula processamento
    await new Promise((resolve) => setTimeout(resolve, 1200));

    return NextResponse.json({
      summary: `🧪 Resumo automático da reunião (mock)

📌 Tema principal:
Alinhamento do projeto de MVP

✅ Decisões:
- Avançar com a versão inicial do produto
- Validar com usuários reais

🛠️ Próximas ações:
- Criar landing page
- Ajustar fluxo de upload de áudio
- Testar com 3 pessoas

👥 Responsáveis:
- Você (produto)
- Futuro usuário (feedback)
`,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Erro ao gerar resumo (mock)' }, { status: 500 });
  }
}
