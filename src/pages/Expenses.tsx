import { Fuel, PiggyBank, Wrench } from 'lucide-react';
import StatusCard from '../components/cards/StatusCard';

export default function Expenses() {
  return (
    <section className="px-5 py-8">
      <h1 className="text-3xl font-bold">Gastos</h1>
      <p className="mt-2 text-slate-400">
        Veja uma previsão simples do custo real do carro.
      </p>

      <div className="mt-6 space-y-4">
        <StatusCard
          title="Combustível mensal"
          value="R$ 464"
          description="Baseado em 800 km/mês e gasolina a R$ 5,80."
          icon={Fuel}
          status="warning"
        />

        <StatusCard
          title="Manutenção prevista"
          value="R$ 850"
          description="Estimativa para óleo, filtros e revisão básica."
          icon={Wrench}
        />

        <StatusCard
          title="Custo anual estimado"
          value="R$ 6.418"
          description="Combustível + manutenção preventiva."
          icon={PiggyBank}
          status="danger"
        />
      </div>
    </section>
  );
}