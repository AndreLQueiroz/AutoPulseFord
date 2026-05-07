import {
  BrainCircuit,
  Sparkles,
  TriangleAlert,
  Fuel,
  type LucideIcon,
} from 'lucide-react';

type Props = {
  healthScore: number;
  fuelCost: number;
  oilRemainingKm: number;
  revisionRemainingKm: number;
};

export default function AIAssistant({
  healthScore,
  fuelCost,
  oilRemainingKm,
  revisionRemainingKm,
}: Props) {
  const insights: {
    icon: LucideIcon;
    title: string;
    description: string;
  }[] = [];

  if (fuelCost > 1000) {
    insights.push({
      icon: Fuel,
      title: 'Consumo elevado detectado',
      description:
        'Seu custo mensal está acima da média estimada para veículos similares.',
    });
  }

  if (oilRemainingKm <= 1000) {
    insights.push({
      icon: TriangleAlert,
      title: 'Troca de óleo próxima',
      description:
        'Realizar a troca agora pode evitar desgaste prematuro do motor.',
    });
  }

  if (revisionRemainingKm <= 1000) {
    insights.push({
      icon: TriangleAlert,
      title: 'Revisão próxima',
      description:
        'Uma revisão preventiva pode evitar custos maiores no futuro.',
    });
  }

  if (healthScore >= 85) {
    insights.push({
      icon: Sparkles,
      title: 'Veículo em ótimo estado',
      description:
        'Os dados atuais indicam funcionamento saudável e manutenção em dia.',
    });
  }

  return (
    <div className="col-span-2 overflow-hidden rounded-3xl border border-[#0A84FF]/20 bg-gradient-to-br from-[#07111F] to-[#0B1730] shadow-2xl shadow-blue-500/10">
      <div className="relative p-5">
        <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-[#0A84FF]/10 blur-3xl" />

        <div className="relative z-10 flex items-center gap-3">
          <div className="rounded-2xl bg-[#0A84FF]/10 p-3 text-[#0A84FF]">
            <BrainCircuit size={28} />
          </div>

          <div>
            <h2 className="text-xl font-bold text-white">
              Assistente AutoPulse
            </h2>

            <p className="text-sm text-slate-400">
              Diagnóstico inteligente baseado nos dados do veículo.
            </p>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          {insights.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="rounded-2xl border border-white/5 bg-white/5 p-4 backdrop-blur"
              >
                <div className="flex items-start gap-3">
                  <div className="rounded-xl bg-white/5 p-2 text-[#0A84FF]">
                    <Icon size={20} />
                  </div>

                  <div>
                    <h3 className="font-semibold text-white">
                      {item.title}
                    </h3>

                    <p className="mt-1 text-sm text-slate-400">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}