import { useState } from 'react';
import {
  Bot,
  Send,
  Sparkles,
  Fuel,
  Wrench,
  Route,
  Gauge,
  Cpu,
  Loader2,
} from 'lucide-react';

import { useVehicle } from '../context/useVehicle';

type Message = {
  role: 'assistant' | 'user';
  text: string;
};

function formatCurrency(value: number) {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}

export default function Assistant() {
  const { vehicle, fuelHistory } = useVehicle();

  const modelName = vehicle?.model || 'Ford Ranger';
  const monthlyKm = Number(vehicle?.monthlyKm || 800);
  const consumption = Number(vehicle?.averageConsumption || 9.55);
  const fuelPrice = Number(vehicle?.fuelPrice || 5.8);

  const monthlyFuelCost =
    consumption > 0 ? (monthlyKm / consumption) * fuelPrice : 0;

  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      text: `Olá, eu sou o AutoPulse AI. Estou analisando seu ${modelName}. Pode perguntar sobre consumo, revisão, custos, viagens, modos de condução ou qualquer dúvida sobre o carro.`,
    },
  ]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSend(question?: string) {
    const text = question || input;

    if (!text.trim() || loading) return;

    setMessages((prev) => [
      ...prev,
      { role: 'user', text },
    ]);

    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: text,
          vehicle,
          fuelHistory,
        }),
      });

      const contentType = response.headers.get('content-type');

      const data = contentType?.includes('application/json')
  ? await response.json()
  : { error: await response.text() };

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao consultar IA');
      }

      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: data.response || 'Não consegui gerar uma resposta agora.',
        },
      ]);
    } catch (error) {
  console.error(error);

  setMessages((prev) => [
    ...prev,
    {
      role: 'assistant',
      text:
        error instanceof Error
          ? error.message
          : 'Não consegui conectar com a IA agora. Verifique a GEMINI_API_KEY e a rota /api/chat.',
    },
  ]);
} finally {
  setLoading(false);
}
}

  return (
    <section className="flex h-screen flex-col overflow-hidden px-5 py-6">
      <div className="relative overflow-hidden rounded-3xl border border-[#0A84FF]/20 bg-gradient-to-br from-[#07111F] via-[#0B1730] to-[#020617] p-5 shadow-2xl shadow-blue-500/10">
        <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-[#0A84FF]/20 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-24 w-24 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="relative z-10 flex items-center gap-3">
          <div className="rounded-2xl bg-[#0A84FF]/10 p-3 text-[#0A84FF]">
            <Bot size={30} />
          </div>

          <div>
            <p className="text-sm font-semibold text-[#0A84FF]">
              Ford Copilot
            </p>

            <h1 className="text-3xl font-bold text-white">
              Assistente pessoal
            </h1>
          </div>
        </div>

        <div className="relative z-10 mt-5 grid grid-cols-3 gap-3">
          <div className="rounded-2xl bg-white/5 p-3">
            <p className="text-xs text-slate-400">Veículo</p>
            <strong className="text-sm text-white">{modelName}</strong>
          </div>

          <div className="rounded-2xl bg-white/5 p-3">
            <p className="text-xs text-slate-400">Consumo</p>
            <strong className="text-sm text-white">{consumption} km/L</strong>
          </div>

          <div className="rounded-2xl bg-white/5 p-3">
            <p className="text-xs text-slate-400">Gasto/mês</p>
            <strong className="text-sm text-white">
              {formatCurrency(monthlyFuelCost)}
            </strong>
          </div>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-4 gap-3">
        <button
          onClick={() => handleSend('Meu consumo está normal?')}
          className="rounded-3xl border border-white/10 bg-[#111827] p-3 text-center text-xs text-white transition hover:border-[#0A84FF]/40"
        >
          <Fuel className="mx-auto mb-2 text-[#0A84FF]" size={20} />
          Consumo
        </button>

        <button
          onClick={() => handleSend('Quando devo revisar?')}
          className="rounded-3xl border border-white/10 bg-[#111827] p-3 text-center text-xs text-white transition hover:border-[#0A84FF]/40"
        >
          <Wrench className="mx-auto mb-2 text-[#0A84FF]" size={20} />
          Revisão
        </button>

        <button
          onClick={() => handleSend('Quanto gasto em uma viagem?')}
          className="rounded-3xl border border-white/10 bg-[#111827] p-3 text-center text-xs text-white transition hover:border-[#0A84FF]/40"
        >
          <Route className="mx-auto mb-2 text-[#0A84FF]" size={20} />
          Viagem
        </button>

        <button
          onClick={() => handleSend('Qual melhor modo de condução?')}
          className="rounded-3xl border border-white/10 bg-[#111827] p-3 text-center text-xs text-white transition hover:border-[#0A84FF]/40"
        >
          <Gauge className="mx-auto mb-2 text-[#0A84FF]" size={20} />
          Drive
        </button>
      </div>

      <div className="mt-5 flex-1 overflow-y-auto rounded-3xl border border-white/10 bg-black/10 p-4 pb-8">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={`${message.role}-${index}`}
              className={`max-w-[90%] rounded-3xl p-4 shadow-lg ${
                message.role === 'assistant'
                  ? 'border border-white/10 bg-[#111827] text-slate-300 shadow-black/20'
                  : 'ml-auto bg-[#0A84FF] text-white shadow-blue-500/30'
              }`}
            >
              {message.role === 'assistant' && (
                <div className="mb-2 flex items-center gap-2 font-bold text-[#0A84FF]">
                  <Sparkles size={18} />
                  AutoPulse AI
                </div>
              )}

              <p className="text-sm leading-6">{message.text}</p>
            </div>
          ))}

          {loading && (
            <div className="max-w-[90%] rounded-3xl border border-white/10 bg-[#111827] p-4 text-slate-300 shadow-lg shadow-black/20">
              <div className="flex items-center gap-2 font-bold text-[#0A84FF]">
                <Loader2 className="animate-spin" size={18} />
                AutoPulse AI está pensando...
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 flex items-center gap-3 rounded-3xl border border-white/10 bg-[#111827]/95 p-3 shadow-lg shadow-black/20 backdrop-blur">
        <div className="rounded-2xl bg-[#0A84FF]/10 p-3 text-[#0A84FF]">
          <Cpu size={18} />
        </div>

        <input
          value={input}
          disabled={loading}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSend();
          }}
          className="flex-1 bg-transparent px-1 text-sm text-white outline-none placeholder:text-slate-500 disabled:opacity-60"
          placeholder="Pergunte sobre o carro..."
        />

        <button
          disabled={loading}
          onClick={() => handleSend()}
          className="rounded-2xl bg-[#0A84FF] p-3 text-white shadow-lg shadow-blue-500/30 transition hover:scale-105 disabled:opacity-60"
        >
          {loading ? (
            <Loader2 className="animate-spin" size={18} />
          ) : (
            <Send size={18} />
          )}
        </button>
      </div>
    </section>
  );
}