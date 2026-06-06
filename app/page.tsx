'use client';

import { useState } from 'react';

export default function LandingPage() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [challenge, setChallenge] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          role,
          challenge,
        }),
      });

      if (res.ok) {

        if (
          typeof window !== 'undefined' &&
          (window as any).fbq
        ) {
          (window as any).fbq('track', 'Lead');
        }

        setSuccess(true);

        setName('');
        setEmail('');
        setRole('');
        setChallenge('');
      }
    } catch (error) {
      alert('Erro ao enviar.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* HERO */}
      <section className="px-6 py-20 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-full text-sm font-medium mb-6">
              🚀 Acesso gratuito durante a fase de validação
            </div>

            <h1 className="text-5xl md:text-6xl font-bold leading-tight tracking-tight">
              Envie o áudio da reunião e receba decisões, tarefas e responsáveis automaticamente..
            </h1>

            <p className="mt-6 text-xl text-slate-600 leading-relaxed">
              Suba o áudio da reunião e receba automaticamente:
            </p>

            <div className="mt-6 space-y-3 text-lg">
              <div className="flex items-center gap-3">
                <span>✅</span>
                <span>Decisões organizadas</span>
              </div>

              <div className="flex items-center gap-3">
                <span>✅</span>
                <span>Tarefas com responsáveis</span>
              </div>

              <div className="flex items-center gap-3">
                <span>✅</span>
                <span>Prazos e próximos passos</span>
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg transition-all">
                <a
                  href="#formulario"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg transition-all inline-block"
                >
                  Solicitar acesso gratuito
                </a>
              </button>

              <button className="border border-slate-300 hover:border-slate-400 px-8 py-4 rounded-xl font-semibold text-lg transition-all">
                <a
                  href="#como-funciona"
                  className="border border-slate-300 hover:border-slate-400 px-8 py-4 rounded-xl font-semibold text-lg transition-all inline-block"
                >
                  Como funciona
                </a>
              </button>
            </div>

            <p className="mt-4 text-sm text-slate-500">
              Validando o MVP com líderes, coordenadores e gestores de equipe.
            </p>
          </div>

          {/* MOCK CARD */}
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 shadow-2xl">
            <div className="bg-white rounded-2xl p-5 border border-slate-200">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-lg">Resumo da reunião</h3>
                <span className="text-sm text-slate-500">Gerado por IA</span>
              </div>

              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                  <div className="font-semibold mb-2 flex items-center gap-2">
                    📌 Decisões
                  </div>
                  <p className="text-sm text-slate-700">
                    O lançamento será antecipado para a próxima semana.
                  </p>
                </div>

                <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4">
                  <div className="font-semibold mb-2 flex items-center gap-2">
                    ✅ Próximos passos
                  </div>
                  <p className="text-sm text-slate-700">
                    João irá validar os materiais até sexta-feira.
                  </p>
                </div>

                <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
                  <div className="font-semibold mb-2 flex items-center gap-2">
                    ⚠️ Pontos de atenção
                  </div>
                  <p className="text-sm text-slate-700">
                    Ajustar cronograma com o time comercial.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DOR */}
      <section className="bg-slate-50 border-y border-slate-200 py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Sua equipe sai da reunião sem clareza?
          </h2>

          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Reuniões longas, tarefas perdidas e ninguém lembra exatamente quem ficou responsável pelo quê.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mt-14">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <div className="text-4xl mb-4">😵</div>
              <h3 className="font-bold text-lg mb-3">
                Falta de clareza
              </h3>
              <p className="text-slate-600">
                Decisões importantes se perdem depois da reunião.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <div className="text-4xl mb-4">📝</div>
              <h3 className="font-bold text-lg mb-3">
                Muito retrabalho
              </h3>
              <p className="text-slate-600">
                Alguém precisa parar depois para organizar tudo manualmente.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <div className="text-4xl mb-4">⏰</div>
              <h3 className="font-bold text-lg mb-3">
                Tempo perdido
              </h3>
              <p className="text-slate-600">
                Equipes gastam tempo tentando lembrar próximos passos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section
        id="como-funciona"
        className="py-20 px-6 max-w-6xl mx-auto"
      >
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Como funciona
          </h2>

          <p className="text-xl text-slate-600">
            Simples, rápido e sem complicação.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="border border-slate-200 rounded-3xl p-8 text-center">
            <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-2xl mx-auto mb-6">
              🎙️
            </div>

            <h3 className="text-xl font-bold mb-4">
              Grave a reunião
            </h3>

            <p className="text-slate-600 leading-relaxed">
              Use o celular, Zoom ou qualquer ferramenta que preferir.
            </p>
          </div>

          <div className="border border-slate-200 rounded-3xl p-8 text-center">
            <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center text-2xl mx-auto mb-6">
              ⬆️
            </div>

            <h3 className="text-xl font-bold mb-4">
              Envie o áudio
            </h3>

            <p className="text-slate-600 leading-relaxed">
              Faça upload do arquivo em poucos segundos.
            </p>
          </div>

          <div className="border border-slate-200 rounded-3xl p-8 text-center">
            <div className="w-14 h-14 rounded-full bg-violet-100 flex items-center justify-center text-2xl mx-auto mb-6">
              ✨
            </div>

            <h3 className="text-xl font-bold mb-4">
              Receba o resumo
            </h3>

            <p className="text-slate-600 leading-relaxed">
              Decisões, tarefas e responsáveis organizados automaticamente.
            </p>
          </div>
        </div>
      </section>

      {/* DIFERENCIAL */}
      <section className="bg-slate-900 text-white py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Feito para ser simples.
          </h2>

          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Enquanto outras ferramentas exigem integrações complexas,
            o ResumoAI foi pensado para gestores que só querem sair da reunião com tudo organizado.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mt-14 text-left">
            <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700">
              <h3 className="text-2xl font-bold mb-6 text-red-300">
                Ferramentas complexas
              </h3>

              <div className="space-y-4 text-slate-300">
                <div>❌ Integrações obrigatórias</div>
                <div>❌ Configuração complicada</div>
                <div>❌ Dashboards difíceis</div>
                <div>❌ Muito excesso de informação</div>
              </div>
            </div>

            <div className="bg-emerald-600 rounded-2xl p-8 shadow-2xl">
              <h3 className="text-2xl font-bold mb-6">
                ResumoAI
              </h3>

              <div className="space-y-4 text-white">
                <div>✅ Suba o áudio e pronto</div>
                <div>✅ Resumo pronto para ação</div>
                <div>✅ Clareza para sua equipe</div>
                <div>✅ Tudo em menos de 2 minutos</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            Perguntas frequentes
          </h2>

          <div className="space-y-8">

            <div>
              <h3 className="font-bold text-lg">
                Preciso integrar com Teams ou Zoom?
              </h3>
              <p className="text-slate-600 mt-2">
                Não. Basta enviar o áudio da reunião.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-lg">
                Quanto tempo leva para gerar o resumo?
              </h3>
              <p className="text-slate-600 mt-2">
                Normalmente menos de 2 minutos.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-lg">
                Quanto custa?
              </h3>
              <p className="text-slate-600 mt-2">
                Durante a fase de validação o acesso é gratuito.
              </p>
            </div>

              <div>
                <h3 className="font-bold text-lg">
                  O que acontece após o cadastro?
                </h3>
                <p className="text-slate-600 mt-2">
                  Entraremos em contato para liberar o acesso gratuito e coletar seu feedback sobre a ferramenta.
                </p>
              </div>

          </div>
        </div>
      </section>

      {/* FORM */}
      <section id="formulario" className="py-24 px-6">
        <div className="max-w-3xl mx-auto bg-white border border-slate-200 rounded-3xl p-10 shadow-2xl">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold mb-4">
              Teste gratuitamente
            </h2>

            <p className="text-xl text-slate-600 leading-relaxed">
              Estamos buscando líderes e gestores para validar a ferramenta em reuniões reais.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block font-semibold mb-2">
                Nome
              </label>
              <input
                type="text"
                placeholder="Seu nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-slate-300 rounded-xl px-4 py-4 outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">
                Email
              </label>
              <input
                type="email"
                placeholder="voce@empresa.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-slate-300 rounded-xl px-4 py-4 outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">
                Cargo
              </label>
              <input
                type="text"
                placeholder="Ex: Coordenador, Líder, Gerente"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full border border-slate-300 rounded-xl px-4 py-4 outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">
                Qual seu maior desafio com reuniões?
              </label>

              <select
                value={challenge}
                onChange={(e) => setChallenge(e.target.value)}
                className="w-full border border-slate-300 rounded-xl px-4 py-4 outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="">Selecione</option>
                <option>Perco decisões importantes</option>
                <option>Não acompanho responsáveis</option>
                <option>Gasto tempo criando atas</option>
                <option>Esqueço próximos passos</option>
                <option>Outro</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-5 rounded-xl font-bold text-lg shadow-lg transition-all"
            >
              {loading
                ? 'Enviando...'
                : 'Solicitar acesso gratuito'}
            </button>

            <p className="text-center text-sm text-slate-500">
              ✓ Gratuito durante a fase de validação<br />
              ✓ Sem cartão de crédito<br />
              ✓ Acesso liberado em até 24 horas
            </p>

            {success && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-emerald-800">
                🎉 Cadastro realizado com sucesso!

                Nossa equipe entrará em contato em breve para liberar seu acesso gratuito ao MVP.
              </div>
            )}

          </form>

          <p className="text-center text-sm text-slate-500 mt-6">
            ⚠️ MVP em validação — buscamos feedback sincero para evoluir a ferramenta.
          </p>
        </div>
      </section>
    </main>
  )
}
