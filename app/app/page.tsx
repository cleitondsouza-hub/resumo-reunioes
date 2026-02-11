'use client';

import { useState } from 'react';

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState('');
  const [result, setResult] = useState('');

  async function handleUpload() {
    if (!file) {
      alert('Selecione um arquivo de áudio');
      return;
    }

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

      setTimeout(() => {
        setStatus('Resumo gerado com sucesso! (exemplo)');
        setResult(
          data.summary ||
            `🧾 Resumo da Reunião

📌 Decisões
- Seguir com o projeto piloto
- Priorizar o módulo de relatórios

✅ Próximos Passos
- João: definir escopo até sexta-feira
- Maria: validar orçamento com o financeiro

⚠️ Pontos de Atenção
- Prazo apertado para entrega inicial

📅 Prazos
- Entrega do piloto: 15/03`
        );
      }, 1000);
    } catch (err) {
      setStatus('Erro ao processar o áudio.');
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
        style={{
          padding: '12px 20px',
          background: '#16a34a',
          color: '#fff',
          borderRadius: 6,
          border: 'none',
          cursor: 'pointer',
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
        ⚠️ Versão de teste: o resumo exibido é um exemplo enquanto validamos a ideia.
      </p>
    </main>
  );
}
