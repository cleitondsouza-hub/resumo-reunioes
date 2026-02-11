import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('audio') as File;

    if (!file) {
      return NextResponse.json({ error: 'Nenhum arquivo enviado' }, { status: 400 });
    }

    // Simula um "tempo de processamento"
    await new Promise((resolve) => setTimeout(resolve, 1500));

    return NextResponse.json({
      transcription: `🧪 Transcrição simulada (mock)

Arquivo recebido: ${file.name}

Aqui é onde o texto real do áudio vai aparecer quando você ativar o faturamento da IA.

Exemplo de resumo:
- Ponto 1 discutido
- Ponto 2 decidido
- Próximas ações: fazer X, decidir Y
`,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Erro no mock' }, { status: 500 });
  }
}
