import { useVehicle } from '../context/useVehicle';
import { motion } from 'framer-motion';

import {
  Bell,
  ChevronDown,
  Fuel,
  Gauge,
  ShieldCheck,
} from 'lucide-react';

import { Link } from 'react-router-dom';

import Reveal from '../components/animations/Reveal';
import StatusCard from '../components/cards/StatusCard';
import CarScene from '../components/vehicle/CarScene';
import HealthChart from '../components/charts/HealthChart';
import AIAssistant from '../components/ai/AIAssistant';
import FordInsightsCard from '../components/ford/FordInsightsCard';

import { calculateVehicleScore } from '../utils/vehicleScore';

type StatusType = 'ok' | 'warning' | 'danger';

function formatCurrency(value: number) {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}

function getStatusByRemainingKm(
  remainingKm: number
): StatusType {
  if (remainingKm <= 0) return 'danger';

  if (remainingKm <= 1000) return 'warning';

  return 'ok';
}

export default function Home() {
  const { vehicle } = useVehicle();

  const currentKm = Number(
    vehicle?.currentKm || 12500
  );

  const monthlyKm = Number(
    vehicle?.monthlyKm || 800
  );

  const averageConsumption = Number(
    vehicle?.averageConsumption || 10
  );

  const fuelPrice = Number(
    vehicle?.fuelPrice || 5.8
  );

  const lastOilChangeKm = Number(
    vehicle?.lastOilChangeKm || 8000
  );

  const lastRevisionKm = Number(
    vehicle?.lastRevisionKm || 5000
  );

  const lastTireChangeKm = Number(
    vehicle?.lastTireChangeKm || 0
  );

  const oilLimitKm = 10000;
  const revisionLimitKm = 10000;
  const tireLimitKm = 40000;

  const oilRemainingKm =
    lastOilChangeKm + oilLimitKm - currentKm;

  const revisionRemainingKm =
    lastRevisionKm + revisionLimitKm - currentKm;

  const tireRemainingKm =
    lastTireChangeKm + tireLimitKm - currentKm;

  const oilStatus =
    getStatusByRemainingKm(oilRemainingKm);

  const revisionStatus =
    getStatusByRemainingKm(
      revisionRemainingKm
    );

  const tireStatus =
    getStatusByRemainingKm(
      tireRemainingKm
    );

  const monthlyFuelCost =
    averageConsumption > 0
      ? (monthlyKm / averageConsumption) *
        fuelPrice
      : 0;

  const vehicleScore =
    calculateVehicleScore({
      averageConsumption,
      fordAverageConsumption: 9.55,

      oilRemainingKm,
      revisionRemainingKm,
      tireRemainingKm,

      monthlyFuelCost,
    });

  const healthScore = vehicleScore.score;

  const mainStatus =
    vehicleScore.status === 'excellent'
      ? 'Veículo em excelente estado'
      : vehicleScore.status === 'good'
        ? 'Veículo saudável'
        : vehicleScore.status === 'warning'
          ? 'Atenção leve no veículo'
          : 'Revisão recomendada';

  const mainMessage =
    vehicleScore.status === 'excellent'
      ? 'Os dados indicam ótimo desempenho e manutenção em dia.'
      : vehicleScore.status === 'good'
        ? 'Nenhum alerta crítico encontrado nos dados atuais.'
        : vehicleScore.status === 'warning'
          ? 'Existem pontos de manutenção chegando perto do limite.'
          : 'Alguns itens passaram do limite recomendado de manutenção.';

  const modelName =
    vehicle?.model ||
    'Ford Territory Titanium';

  const consumptionText =
    `${averageConsumption} km/L`;

  const fuelCostText =
    formatCurrency(monthlyFuelCost);

  const generalStatus: StatusType =
    vehicleScore.status === 'excellent' ||
    vehicleScore.status === 'good'
      ? 'ok'
      : vehicleScore.status === 'warning'
        ? 'warning'
        : 'danger';

  return (
    <section>
      <div className="relative rounded-b-[2.5rem] bg-gradient-to-b from-[#07111F] via-[#003478] to-[#07111F] px-6 pb-8 pt-8 text-white">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute left-10 top-24 h-32 w-32 rounded-full bg-[#0A84FF] blur-3xl" />

          <div className="absolute right-8 top-52 h-24 w-24 rounded-full bg-blue-400 blur-3xl" />
        </div>

        <div className="relative z-10 mb-8 flex items-center justify-between">
          <button className="rounded-full border border-white/10 bg-white/10 p-3 text-[#0A84FF] backdrop-blur">
            <ChevronDown size={26} />
          </button>

          <h1 className="text-lg font-bold tracking-wide">
            AutoPulse
          </h1>

          <button className="rounded-full border border-white/10 bg-white/10 p-3 backdrop-blur">
            <Bell size={22} />
          </button>
        </div>

        <div className="relative z-10">
          <p className="text-sm text-blue-100">
            {modelName}
          </p>

          <h2 className="mt-1 text-2xl font-bold">
            Saúde do veículo
          </h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 my-8"
        >
          <div className="h-56 w-full rounded-[2rem] border border-white/10 bg-white/5 shadow-inner backdrop-blur">
            <CarScene />
          </div>
        </motion.div>

        <div className="relative z-10 rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur">
          <div className="flex items-center gap-3">
            <span
              className={`h-3 w-3 rounded-full ${
                generalStatus === 'ok'
                  ? 'bg-emerald-400 shadow-emerald-400/40'
                  : generalStatus === 'warning'
                    ? 'bg-yellow-400 shadow-yellow-400/40'
                    : 'bg-red-400 shadow-red-400/40'
              } shadow-lg`}
            />

            <div>
              <p className="font-bold">
                {mainStatus}
              </p>

              <p className="text-sm text-blue-100">
                {mainMessage}
              </p>
            </div>
          </div>

          <div className="mt-5">
            <div className="mb-2 flex justify-between text-sm text-blue-100">
              <span>Score inteligente</span>

              <strong className="text-white">
                {healthScore}%
              </strong>
            </div>

            <div className="h-3 rounded-full bg-white/10">
              <div
                className="h-3 rounded-full bg-[#0A84FF] shadow-lg shadow-blue-400/40"
                style={{
                  width: `${healthScore}%`,
                }}
              />
            </div>
          </div>
        </div>

        <Link
          to="/register"
          className="relative z-10 mt-5 block rounded-2xl bg-[#0A84FF] px-4 py-3 text-center font-bold text-white shadow-lg shadow-blue-500/30 transition hover:scale-[1.02]"
        >
          {vehicle
            ? 'Editar veículo'
            : 'Cadastrar meu veículo'}
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4 px-5 py-6 items-start">
        <Reveal delay={0.1}>
          <StatusCard
            title="Combustível"
            value={`${fuelCostText}/mês`}
            description={`Estimativa baseada em ${monthlyKm} km.`}
            icon={Fuel}
            status="warning"
          />
        </Reveal>

        <Reveal delay={0.2}>
          <StatusCard
            title="Consumo"
            value={consumptionText}
            description="Média cadastrada pelo usuário."
            icon={Gauge}
          />
        </Reveal>

        <Reveal delay={0.3}>
          <StatusCard
            title="Óleo"
            value={
              oilRemainingKm > 0
                ? `${oilRemainingKm} km`
                : 'Vencido'
            }
            description="Até a próxima troca recomendada."
            icon={ShieldCheck}
            status={oilStatus}
          />
        </Reveal>

        <Reveal delay={0.4}>
          <StatusCard
            title="Revisão"
            value={
              revisionRemainingKm > 0
                ? `${revisionRemainingKm} km`
                : 'Vencida'
            }
            description="Baseada na última revisão cadastrada."
            icon={ShieldCheck}
            status={revisionStatus}
          />
        </Reveal>

        <Reveal delay={0.5}>
          <StatusCard
            title="Pneus"
            value={
              tireRemainingKm > 0
                ? `${tireRemainingKm} km`
                : 'Verificar'
            }
            description="Estimativa de vida útil restante."
            icon={ShieldCheck}
            status={tireStatus}
          />
        </Reveal>

        <Reveal delay={0.6}>
          <StatusCard
            title="Status geral"
            value={vehicleScore.label}
            description="Baseado em manutenção, consumo e dados Ford."
            icon={ShieldCheck}
            status={generalStatus}
          />
        </Reveal>

        <Reveal
          delay={0.7}
          className="col-span-2"
        >
          <FordInsightsCard
            modelName={modelName}
            userConsumption={averageConsumption}
          />
        </Reveal>

        <Reveal
          delay={0.8}
          className="col-span-2"
        >
          <AIAssistant
            healthScore={healthScore}
            fuelCost={monthlyFuelCost}
            oilRemainingKm={oilRemainingKm}
            revisionRemainingKm={revisionRemainingKm}
          />
        </Reveal>

        <Reveal
          delay={0.9}
          className="col-span-2"
        >
          <HealthChart />
        </Reveal>
      </div>
    </section>
  );
}