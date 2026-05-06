import { Bot, Send } from 'lucide-react';

export default function Assistant() {
  return (
    <section className="flex min-h-screen flex-col px-5 py-8">
      <h1 className="text-3xl font-bold">Assistente</h1>
      <p className="mt-2 text-slate-400">
        Entenda problemas do carro em uma linguagem simples.
      </p>

      <div className="mt-6 flex-1 space-y-4">
        <div className="max-w-[85%] rounded-3xl border border-white/10 bg-[#111827] p-4 shadow-lg shadow-black/20">
          <div className="mb-2 flex items-center gap-2 font-bold text-[#0A84FF]">
            <Bot size={20} />
            AutoPulse
          </div>

          <p className="text-sm text-slate-300">
            Seu consumo aumentou nos últimos registros. Isso pode estar ligado a
            pneus descalibrados, filtro de ar sujo ou revisão atrasada.
          </p>
        </div>

        <div className="ml-auto max-w-[85%] rounded-3xl bg-[#0A84FF] p-4 text-white shadow-lg shadow-blue-500/30">
          Meu carro está gastando mais gasolina. O que pode ser?
        </div>
      </div>

      <div className="mt-6 flex items-center gap-3 rounded-3xl border border-white/10 bg-[#111827] p-3 shadow-lg shadow-black/20">
        <input
          className="flex-1 bg-transparent px-2 text-sm text-white outline-none placeholder:text-slate-500"
          placeholder="Digite sua dúvida..."
        />

        <button className="rounded-2xl bg-[#0A84FF] p-3 text-white shadow-lg shadow-blue-500/30">
          <Send size={18} />
        </button>
      </div>
    </section>
  );
}