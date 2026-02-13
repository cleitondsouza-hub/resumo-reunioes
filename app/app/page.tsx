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
  } catch (err) {
    setStatus('Erro ao processar o áudio.');
  } finally {
    setLoading(false); // ✅ só libera o botão quando tudo acabar
  }
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
        <div
          style={{
            marginTop: 24,
            background: '#f8fafc',
            padding: 20,
            borderRadius: 8,
            border: '1px solid #e5e7eb',
            lineHeight: 1.6,
            whiteSpace: 'pre-wrap',
          }}
        >
          {result}
        </div>
      )}

      <p style={{ marginTop: 24, fontSize: 12, color: '#666' }}>
        ⚠️ Versão de teste: o resumo é gerado por IA e pode conter imprecisões.
      </p>
    </main>
  );
}
