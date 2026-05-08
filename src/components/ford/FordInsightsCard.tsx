import { Database, ShieldCheck, Wrench } from 'lucide-react';
import { fordInsights } from '../../data/fordInsights';

type Props = {
  modelName: string;
  userConsumption: number;
};

export default function FordInsightsCard({
  modelName,
  userConsumption,
}: Props) {
  const normalizedModel = modelName.toUpperCase();

  const insightKey = Object.keys(fordInsights).find((key) =>
    normalizedModel.includes(key)
  ) as keyof typeof fordInsights | undefined;

  const insight = insightKey
    ? fordInsights[insightKey]
    : fordInsights.RANGER;

  const consumptionDiff =
    ((userConsumption - insight.averageConsumption) /
      insight.averageConsumption) *
    100;

  const isAboveAverage = consumptionDiff < 0;

  return (
    <div className="col-span-2 rounded-3xl border border-[#0A84FF]/20 bg-[#111827] p-5 shadow-lg shadow-blue-500/10">
      <div className="mb-5 flex items-center gap-3">
        <div className="rounded-2xl bg-[#0A84FF]/10 p-3 text-[#0A84FF]">
          <Database size={26} />
        </div>

        <div>
          <h2 className="text-xl font-bold text-white">
            Ford Insights
          </h2>

          <p className="text-sm text-slate-400">
            Comparação baseada nos dados fornecidos pela Ford.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-2xl bg-white/5 p-4">
          <p className="text-xs text-slate-400">
            Modelo analisado
          </p>

          <strong className="mt-1 block text-white">
            {insight.model}
          </strong>
        </div>

        <div className="rounded-2xl bg-white/5 p-4">
          <p className="text-xs text-slate-400">
            Média Ford
          </p>

          <strong className="mt-1 block text-white">
            {insight.averageConsumption} km/L
          </strong>
        </div>

        <div className="col-span-2 rounded-2xl bg-white/5 p-4">
          <div className="mb-2 flex items-center gap-2 text-[#0A84FF]">
            <ShieldCheck size={18} />
            <strong>Comparativo inteligente</strong>
          </div>

          <p className="text-sm text-slate-300">
            Seu consumo está{' '}
            <strong
              className={
                isAboveAverage
                  ? 'text-emerald-400'
                  : 'text-yellow-400'
              }
            >
              {Math.abs(consumptionDiff).toFixed(1)}%
            </strong>{' '}
            {isAboveAverage
              ? 'melhor que a média estimada.'
              : 'acima da média estimada.'}
          </p>
        </div>

        <div className="col-span-2 rounded-2xl bg-white/5 p-4">
          <div className="mb-3 flex items-center gap-2 text-[#0A84FF]">
            <Wrench size={18} />
            <strong>Serviços mais relevantes</strong>
          </div>

          <div className="flex flex-wrap gap-2">
            {insight.commonServices.map((service) => (
              <span
                key={service}
                className="rounded-full bg-[#0A84FF]/10 px-3 py-1 text-xs text-blue-200"
              >
                {service}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}