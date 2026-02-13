'use client';

import { useState } from 'react';

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);


  async function handleUpload() {
  if (!file) {
    alert('Selecione um arquivo de áudio');
    return;
  }

  setLoading(true);
  setStatus('Processando áudio e gerando resumo...');
  setResult('');

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

    setStatus('Resumo gerado com sucesso!');
    setResult(data2.summary);
    console.log('Resumo da IA:', data2.summary);

  } catch (err) {
    setStatus('Erro ao processar o áudio.');
  } finally {
    setLoading(false); // ✅ só libera o botão quando tudo acabar
  }
}

function parseSummary(summary: string) {
  const blocks = summary.split('\n\n'); // separa por blocos

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

  return '📝'; // padrão
}

  return (
    <main style={{ padding: 40, maxWidth: 800, margin: '0 auto' }}>
      <h1>ResumoAI (MVP)</h1>

      {/* Botão para escolher arquivo */}
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

      {/* Nome do arquivo selecionado */}
      {file && (
        <p style={{ marginTop: 8 }}>
          Arquivo selecionado: <strong>{file.name}</strong>
        </p>
      )}

      <br /><br />

      {/* Botão principal */}
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

    {result && (
  <button
    onClick={() => {
      navigator.clipboard.writeText(result);
      alert('Resumo copiado para a área de transferência!');
    }}
    style={{
      marginTop: 16,
      padding: '10px 16px',
      background: '#0f172a',
      color: '#fff',
      borderRadius: 6,
      border: 'none',
      cursor: 'pointer',
      fontWeight: 'bold',
    }}
  >
    📋 Copiar resumo
  </button>
)}

{result && (
  <button
    onClick={() => {
      const blob = new Blob([result], { type: 'text/plain;charset=utf-8;' });
      const url = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = 'resumo-reuniao.txt'; // depois podemos mudar para PDF se quiser
      a.click();

      URL.revokeObjectURL(url);
    }}
    style={{
      marginTop: 12,
      marginLeft: 12,
      padding: '10px 16px',
      background: '#2563eb',
      color: '#fff',
      borderRadius: 6,
      border: 'none',
      cursor: 'pointer',
      fontWeight: 'bold',
    }}
  >
    ⬇️ Baixar resumo
  </button>
)}

      <p style={{ marginTop: 24, fontSize: 12, color: '#666' }}>
        ⚠️ Versão de teste: o resumo é gerado por IA e pode conter imprecisões.
      </p>
    </main>
  );
}
