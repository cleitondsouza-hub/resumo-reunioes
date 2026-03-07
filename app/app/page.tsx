'use client';

import { useState } from 'react';

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [processingTime, setProcessingTime] = useState<number | null>(null);
  const [tasks, setTasks] = useState('');
  const [minutes, setMinutes] = useState('');

  async function handleUpload() {
    if (!file) {
      alert('Selecione um arquivo de áudio');
      return;
    }

    if (file.size > 25 * 1024 * 1024) {
      alert("O arquivo é muito grande. Envie áudios de até 25MB (aprox. 20 minutos).");
      return;
    }

    const startTime = Date.now(); // ⏱️ inicia contagem

    setLoading(true);
    setStatus('Processando áudio e gerando resumo...');
    setResult('');
    setProcessingTime(null);

    const formData = new FormData();
    formData.append('audio', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (!data.text) {
        setStatus('Erro ao transcrever o áudio.');
        return;
      }

      const res2 = await fetch('/api/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: data.text }),
      });

      if (!res2.ok) {
        setStatus('Erro ao gerar o resumo com IA.');
        return;
      }

      const data2 = await res2.json();

      const endTime = Date.now(); // ⏱️ final
      const seconds = Math.round((endTime - startTime) / 1000);

      setProcessingTime(seconds);

      setStatus('Resumo gerado com sucesso!');
      setResult(data2.summary);

      console.log('Resumo da IA:', data2.summary);

    } catch (err) {
      setStatus('Erro ao processar o áudio.');
    } finally {
      setLoading(false);
    }
  }

  function parseSummary(summary: string) {
    const blocks = summary.split('\n\n');

    return blocks.map((block) => {
      const lines = block.split('\n');
      const title = lines[0].replace(':', '').trim();
      const content = lines.slice(1).join('\n').trim();

      return { title, content };
    });
  }

  function getIcon(title: string) {
    const t = title.toLowerCase();

    if (t.includes('decis')) return '📌';
    if (t.includes('próxim') || t.includes('proxim')) return '✅';
    if (t.includes('aten')) return '⚠️';
    if (t.includes('prazo')) return '📅';

    return '📝';
  }

  function downloadPDF() {
    const html = `
      <html>
        <head>
          <title>Resumo da reunião</title>
          <style>
            body { font-family: Arial; padding: 40px; }
            h2 { margin-top: 30px; }
          </style>
        </head>
        <body>
          <h1>Resumo da Reunião</h1>
          <pre style="white-space: pre-wrap; font-size: 14px;">
${result}
          </pre>
        </body>
      </html>
    `;

    const win = window.open('', '_blank');
    if (!win) return;

    win.document.write(html);
    win.document.close();
    win.print();
  }

  async function extractTasks() {

  const res = await fetch('/api/extract-tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ text: result })
  })

  const data = await res.json()

  setTasks(data.tasks)
}

async function generateMinutes() {

  const res = await fetch('/api/generate-minutes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ text: result })
  })

  const data = await res.json()

  setMinutes(data.minutes)
}

async function sendEmail() {

  const email = prompt("Digite o email")

  await fetch('/api/send-email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      content: result
    })
  })

  alert("Email enviado")
}

const actionButtonStyle = {
  padding: '10px 16px',
  borderRadius: 6,
  border: 'none',
  cursor: 'pointer',
  fontWeight: 'bold',
  color: '#fff',
};

  return (
    <main style={{ padding: 40, maxWidth: 800, margin: '0 auto' }}>
      <h1>ResumoAI (MVP)</h1>

      <label
        style={{
          display: 'inline-block',
          padding: '10px 16px',
          background: '#2563eb',
          color: '#fff',
          borderRadius: 6,
          cursor: 'pointer',
          fontWeight: 'bold',
        }}
      >
        📁 Escolher áudio
        <input
          type="file"
          accept="audio/*"
          style={{ display: 'none' }}
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
      </label>

      <p style={{ marginTop: 8, fontSize: 13, color: '#555' }}>
        Envie áudios de até 20 minutos ou 25MB.
      </p>

      {file && (
        <p style={{ marginTop: 8 }}>
          Arquivo selecionado: <strong>{file.name}</strong>
        </p>
      )}

      <br /><br />

      <button
        onClick={handleUpload}
        disabled={loading}
        style={{
          opacity: loading ? 0.6 : 1,
          cursor: loading ? 'not-allowed' : 'pointer',
          padding: '12px 20px',
          background: '#16a34a',
          color: '#fff',
          borderRadius: 6,
          border: 'none',
          fontWeight: 'bold',
          fontSize: 16,
        }}
      >
        ✨ Gerar resumo
      </button>

      <p style={{ marginTop: 16 }}>{status}</p>

      {processingTime && (
        <p style={{ fontSize: 13, color: '#666' }}>
          ⏱️ Tempo de processamento: {processingTime} segundos
        </p>
      )}

      {result && (
        <div style={{ marginTop: 24, display: 'grid', gap: 16 }}>
          {parseSummary(result).map((section, index) => (
            <div
              key={index}
              style={{
                background: '#f8fafc',
                padding: 16,
                borderRadius: 10,
                border: '1px solid #e5e7eb',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
              }}
            >
              <h3 style={{ marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
                <span>{getIcon(section.title)}</span>
                <span>{section.title}</span>
              </h3>

              <p style={{ whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>
                {section.content}
              </p>
            </div>
          ))}
        </div>
      )}

      {tasks && (
        <div style={{ marginTop: 30 }}>
          <h2>📋 Tarefas extraídas</h2>
          <pre>{tasks}</pre>
        </div>
      )}

      {minutes && (
        <div style={{ marginTop: 30 }}>
          <h2>📝 Ata da reunião</h2>
          <pre>{minutes}</pre>
        </div>
      )}

      {result && (
        <div style={{ marginTop: 24 }}>

          <h3 style={{ marginBottom: 12 }}>Ações</h3>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>

            <button
              onClick={() => {
                navigator.clipboard.writeText(result);
                alert('Resumo copiado!');
              }}
              style={{ ...actionButtonStyle, background: '#0f172a' }}
            >
              📋 Copiar resumo
            </button>

            <button
              onClick={downloadPDF}
              style={{ ...actionButtonStyle, background: '#2563eb' }}
            >
              ⬇️ Baixar PDF
            </button>

            <button
              onClick={extractTasks}
              style={{ ...actionButtonStyle, background: '#7c3aed' }}
            >
              📋 Extrair tarefas
            </button>

            <button
              onClick={generateMinutes}
              style={{ ...actionButtonStyle, background: '#ea580c' }}
            >
              📝 Gerar ata
            </button>

            <button
              onClick={sendEmail}
              style={{ ...actionButtonStyle, background: '#0ea5e9' }}
            >
              ✉️ Enviar por email
            </button>

          </div>

        </div>
      )}

      <p style={{ marginTop: 24, fontSize: 12, color: '#666' }}>
        ⚠️ Versão de teste: o resumo é gerado por IA e pode conter imprecisões.
      </p>
    </main>
  );
}