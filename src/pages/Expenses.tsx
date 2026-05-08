import { Fuel, PiggyBank, Wrench, Gauge } from 'lucide-react';
import StatusCard from '../components/cards/StatusCard';
import { useVehicle } from '../context/useVehicle';

function formatCurrency(value: number) {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}

export default function Expenses() {
  const { vehicle, fuelHistory } = useVehicle();

  const monthlyKm = Number(vehicle?.monthlyKm || 800);
  const averageConsumption = Number(vehicle?.averageConsumption || 10);
  const fuelPrice = Number(vehicle?.fuelPrice || 5.8);

  const monthlyFuelCost =
    averageConsumption > 0 ? (monthlyKm / averageConsumption) * fuelPrice : 0;

  const totalFuelSpent = fuelHistory.reduce(
    (total, item) => total + Number(item.totalPrice || 0),
    0
  );

  const averageFuelTicket =
    fuelHistory.length > 0 ? totalFuelSpent / fuelHistory.length : 0;

  const validConsumptions = fuelHistory.filter((item) => item.consumption > 0);

  const realAverageConsumption =
    validConsumptions.length > 0
      ? validConsumptions.reduce((total, item) => total + item.consumption, 0) /
        validConsumptions.length
      : averageConsumption;

  const annualFuelCost = monthlyFuelCost * 12;
  const estimatedMaintenance = 850;
  const annualTotalCost = annualFuelCost + estimatedMaintenance;

  const costPerKm =
    monthlyKm > 0 ? monthlyFuelCost / monthlyKm : 0;

  return (
    <section className="px-5 py-8">
      <h1 className="text-3xl font-bold text-white">Gastos</h1>

      <p className="mt-2 text-slate-400">
        Análise financeira baseada nos dados cadastrados e abastecimentos.
      </p>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <StatusCard
          title="Combustível mensal"
          value={formatCurrency(monthlyFuelCost)}
          description={`Baseado em ${monthlyKm} km/mês.`}
          icon={Fuel}
          status="warning"
        />

        <StatusCard
          title="Gasto registrado"
          value={formatCurrency(totalFuelSpent)}
          description={`${fuelHistory.length} abastecimento(s) salvos.`}
          icon={PiggyBank}
        />

        <StatusCard
          title="Ticket médio"
          value={formatCurrency(averageFuelTicket)}
          description="Média por abastecimento registrado."
          icon={Fuel}
        />

        <StatusCard
          title="Custo por km"
          value={formatCurrency(costPerKm)}
          description="Estimativa de gasto por quilômetro."
          icon={Gauge}
          status="warning"
        />

        <StatusCard
          title="Consumo real"
          value={`${realAverageConsumption.toFixed(1)} km/L`}
          description="Média baseada no histórico salvo."
          icon={Gauge}
        />

        <StatusCard
          title="Manutenção prevista"
          value={formatCurrency(estimatedMaintenance)}
          description="Óleo, filtros e revisão básica."
          icon={Wrench}
          status="warning"
        />

        <div className="col-span-2">
          <StatusCard
            title="Custo anual estimado"
            value={formatCurrency(annualTotalCost)}
            description="Combustível anual + manutenção preventiva."
            icon={PiggyBank}
            status="danger"
          />
        </div>
      </div>
    </section>
  );
}