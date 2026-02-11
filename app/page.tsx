export default function LandingPage() {
  return (
    <main style={{ padding: 40, maxWidth: 900, margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      {/* Hero */}
      <section style={{ marginBottom: 60 }}>
        <h1 style={{ fontSize: 36, marginBottom: 8 }}>
          ResumoAI
        </h1>
        <h2 style={{ fontSize: 28, marginBottom: 16 }}>
          Transforme reuniões em decisões claras em 1 clique.
        </h2>
        <p style={{ fontSize: 18, maxWidth: 700 }}>
          Resumos automáticos com decisões, tarefas e responsáveis para líderes de equipe
          que não querem perder tempo revendo reuniões longas.
        </p>
        <p style={{ marginTop: 8, color: '#555' }}>
          Ideal para gestores e líderes de times remotos que fazem muitas reuniões no Zoom, Meet ou Teams.
        </p>
        <a
          href="/app"
          style={{
            display: 'inline-block',
            marginTop: 20,
            padding: '12px 20px',
            background: '#2563eb',
            color: '#fff',
            borderRadius: 6,
            textDecoration: 'none',
            fontWeight: 'bold',
          }}
        >
          Quero testar gratuitamente
        </a>
      </section>

      {/* Problema */}
      <section style={{ marginBottom: 40 }}>
        <h2>O problema</h2>
        <ul>
          <li>❌ Decisões se perdem no meio da reunião</li>
          <li>❌ Tarefas ficam sem responsável claro</li>
          <li>❌ Rever gravações é demorado e pouco prático</li>
        </ul>
      </section>

      {/* Solução */}
      <section style={{ marginBottom: 40 }}>
        <h2>A solução</h2>
        <p>
          O <strong>ResumoAI</strong> transforma automaticamente a gravação da reunião em um resumo organizado,
          destacando decisões, próximos passos e responsáveis. Em segundos, você tem clareza
          para alinhar o time.
        </p>
      </section>

      {/* Como funciona */}
      <section style={{ marginBottom: 40 }}>
        <h2>Como funciona</h2>
        <ol>
          <li>1️⃣ Envie o áudio da reunião</li>
          <li>2️⃣ A IA transcreve e organiza os pontos principais</li>
          <li>3️⃣ Você recebe um resumo pronto para compartilhar com o time</li>
        </ol>
      </section>

      {/* Benefícios */}
      <section style={{ marginBottom: 60 }}>
        <h2>Benefícios</h2>
        <ul>
          <li>⏱️ Economize tempo em reuniões e revisões</li>
          <li>📌 Registre decisões com clareza</li>
          <li>🧠 Evite esquecimentos e retrabalho</li>
          <li>🤝 Alinhe o time mais rápido</li>
        </ul>
      </section>

      {/* CTA final */}
      <section style={{ textAlign: 'center', padding: 40, background: '#f5f7ff', borderRadius: 8 }}>
        <h2>Pronto para ganhar tempo nas suas reuniões?</h2>
        <p>Teste gratuitamente o ResumoAI e veja como é fácil transformar reuniões em ações claras.</p>
        <a
          href="/app"
          style={{
            display: 'inline-block',
            marginTop: 16,
            padding: '12px 20px',
            background: '#16a34a',
            color: '#fff',
            borderRadius: 6,
            textDecoration: 'none',
            fontWeight: 'bold',
          }}
        >
          Testar agora
        </a>
      </section>
    </main>
  );
}
