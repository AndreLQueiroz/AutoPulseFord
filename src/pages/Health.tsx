import {
  Battery,
  CircleGauge,
  Disc3,
  Droplets,
  Filter,
  Wrench,
} from 'lucide-react';
import StatusCard from '../components/cards/StatusCard';

export default function Health() {
  return (
    <section className="px-5 py-8">
      <h1 className="text-3xl font-bold">Saúde</h1>
      <p className="mt-2 text-slate-400">
        Acompanhe os principais pontos de manutenção do veículo.
      </p>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <StatusCard
          title="Óleo"
          value="Atenção"
          description="Troca recomendada em breve."
          icon={Droplets}
          status="warning"
        />

        <StatusCard
          title="Freios"
          value="OK"
          description="Dentro do prazo estimado."
          icon={Disc3}
        />

        <StatusCard
          title="Bateria"
          value="Boa"
          description="Sem alerta registrado."
          icon={Battery}
        />

        <StatusCard
          title="Filtro de ar"
          value="Verificar"
          description="Pode afetar o consumo."
          icon={Filter}
          status="warning"
        />

        <StatusCard
          title="Pneus"
          value="Calibrar"
          description="Verifique semanalmente."
          icon={CircleGauge}
          status="warning"
        />

        <StatusCard
          title="Revisão"
          value="7.000 km"
          description="Desde a última revisão."
          icon={Wrench}
          status="danger"
        />
      </div>
    </section>
  );
}