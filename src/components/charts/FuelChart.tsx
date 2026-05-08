import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

import type { FuelRecord } from '../../context/vehicle-context';

type Props = {
  fuelHistory: FuelRecord[];
};

export default function FuelChart({ fuelHistory }: Props) {
  const chartData = fuelHistory.map((item, index) => ({
    name: `#${index + 1}`,
    consumo: Number(item.consumption.toFixed(1)),
  }));

  return (
    <div className="rounded-3xl border border-white/10 bg-[#111827] p-5 shadow-lg shadow-black/20">
      <div className="mb-5">
        <h2 className="text-xl font-bold text-white">
          Evolução do consumo
        </h2>

        <p className="text-sm text-slate-400">
          Histórico real de eficiência do veículo.
        </p>
      </div>

      {chartData.length === 0 ? (
        <div className="flex h-72 items-center justify-center rounded-2xl bg-white/5 text-center text-sm text-slate-400">
          Nenhum dado suficiente para gerar o gráfico.
        </div>
      ) : (
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />

              <XAxis dataKey="name" stroke="#64748B" />

              <Tooltip
                contentStyle={{
                  background: '#0F172A',
                  border: '1px solid #1E293B',
                  borderRadius: '16px',
                  color: '#fff',
                }}
              />

              <Line
                type="monotone"
                dataKey="consumo"
                stroke="#0A84FF"
                strokeWidth={4}
                dot={{
                  r: 5,
                  fill: '#0A84FF',
                }}
                activeDot={{
                  r: 8,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}