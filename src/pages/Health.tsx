import { useMemo, useState } from 'react';

import {
  Car,
  Mountain,
  Fuel,
  Zap,
  Route,
  Gauge,
} from 'lucide-react';

import StatusCard from '../components/cards/StatusCard';
import { useVehicle } from '../context/useVehicle';

type ModeType =
  | 'urban'
  | 'road'
  | 'offroad'
  | 'eco';

const modes = [
  {
    id: 'urban',
    title: 'Urbano',
    icon: Car,
    color: 'bg-blue-500/20 text-blue-300',
  },

  {
    id: 'road',
    title: 'Estrada',
    icon: Route,
    color: 'bg-emerald-500/20 text-emerald-300',
  },

  {
    id: 'offroad',
    title: 'Off-road',
    icon: Mountain,
    color: 'bg-orange-500/20 text-orange-300',
  },

  {
    id: 'eco',
    title: 'Eco',
    icon: Zap,
    color: 'bg-cyan-500/20 text-cyan-300',
  },
] as const;

export default function Health() {
  const { vehicle } = useVehicle();

  const [mode, setMode] =
    useState<ModeType>('urban');

  const averageConsumption = Number(
    vehicle?.averageConsumption || 9.5
  );

  const fuelPrice = Number(
    vehicle?.fuelPrice || 5.8
  );

  const monthlyKm = Number(
    vehicle?.monthlyKm || 800
  );

  const simulation = useMemo(() => {
    switch (mode) {
      case 'urban':
        return {
          consumption:
            averageConsumption * 0.88,

          wear: 'Alto',

          monthlyCost:
            ((monthlyKm /
              (averageConsumption * 0.88)) *
              fuelPrice),

          recommendation:
            'Maior desgaste de freios e consumo elevado em trânsito intenso.',

          glow: 'from-blue-500/20 to-blue-900/20',
        };

      case 'road':
        return {
          consumption:
            averageConsumption * 1.18,

          wear: 'Baixo',

          monthlyCost:
            ((monthlyKm /
              (averageConsumption * 1.18)) *
              fuelPrice),

          recommendation:
            'Melhor eficiência e menor desgaste em velocidade constante.',

          glow: 'from-emerald-500/20 to-emerald-900/20',
        };

      case 'offroad':
        return {
          consumption:
            averageConsumption * 0.68,

          wear: 'Muito alto',

          monthlyCost:
            ((monthlyKm /
              (averageConsumption * 0.68)) *
              fuelPrice),

          recommendation:
            'Uso severo aumenta desgaste de pneus e suspensão.',

          glow: 'from-orange-500/20 to-orange-900/20',
        };

      case 'eco':
        return {
          consumption:
            averageConsumption * 1.35,

          wear: 'Muito baixo',

          monthlyCost:
            ((monthlyKm /
              (averageConsumption * 1.35)) *
              fuelPrice),

          recommendation:
            'Modo otimizado para máxima autonomia e economia.',

          glow: 'from-cyan-500/20 to-cyan-900/20',
        };

      default:
        return {
          consumption:
            averageConsumption,

          wear: 'Normal',

          monthlyCost:
            ((monthlyKm /
              averageConsumption) *
              fuelPrice),

          recommendation:
            'Condução padrão.',

          glow: 'from-blue-500/20 to-blue-900/20',
        };
    }
  }, [
    mode,
    averageConsumption,
    monthlyKm,
    fuelPrice,
  ]);

  return (
    <section className="px-5 py-8">
      <div className="mb-6">
        <p className="text-sm font-semibold text-[#0A84FF]">
          Ford Drive Simulation
        </p>

        <h1 className="mt-1 text-3xl font-bold text-white">
          Simulador de uso
        </h1>

        <p className="mt-2 text-slate-400">
          Veja como diferentes estilos de condução impactam consumo,
          desgaste e custo mensal do veículo.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {modes.map((item) => {
          const Icon = item.icon;

          const active =
            mode === item.id;

          return (
            <button
              key={item.id}
              onClick={() =>
                setMode(item.id)
              }
              className={`rounded-3xl border p-5 text-left transition-all duration-300 ${
                active
                  ? `border-white/20 ${item.color} shadow-lg`
                  : 'border-white/10 bg-[#111827]'
              }`}
            >
              <Icon size={28} />

              <h2 className="mt-4 text-lg font-bold text-white">
                {item.title}
              </h2>
            </button>
          );
        })}
      </div>

      <div
        className={`mt-6 rounded-3xl border border-white/10 bg-gradient-to-br ${simulation.glow} p-6 shadow-2xl`}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-300">
              Simulação ativa
            </p>

            <h2 className="mt-1 text-3xl font-bold text-white">
              {
                modes.find(
                  (m) =>
                    m.id === mode
                )?.title
              }
            </h2>
          </div>

          <div className="rounded-2xl bg-white/10 p-4">
            <Gauge
              size={32}
              className="text-white"
            />
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <StatusCard
            title="Consumo estimado"
            value={`${simulation.consumption.toFixed(
              1
            )} km/L`}
            description="Baseado no estilo selecionado."
            icon={Fuel}
          />

          <StatusCard
            title="Desgaste"
            value={simulation.wear}
            description="Impacto previsto nos componentes."
            icon={Gauge}
            status={
              simulation.wear ===
              'Muito alto'
                ? 'danger'
                : simulation.wear ===
                    'Alto'
                  ? 'warning'
                  : 'ok'
            }
          />

          <div className="col-span-2">
            <StatusCard
              title="Custo mensal estimado"
              value={simulation.monthlyCost.toLocaleString(
                'pt-BR',
                {
                  style: 'currency',
                  currency: 'BRL',
                }
              )}
              description="Estimativa baseada no modo de condução."
              icon={Fuel}
              status="warning"
            />
          </div>
        </div>

        <div className="mt-6 rounded-3xl bg-black/20 p-5 backdrop-blur">
          <h3 className="text-lg font-bold text-white">
            Recomendação inteligente
          </h3>

          <p className="mt-3 text-sm leading-6 text-slate-300">
            {simulation.recommendation}
          </p>
        </div>
      </div>
    </section>
  );
}