import { Bell, Mail, Wrench } from 'lucide-react';

const alerts = [
  {
    title: 'Troca de óleo próxima',
    desc: 'Faltam cerca de 500 km para a troca recomendada.',
    icon: Wrench,
  },
  {
    title: 'Email ativado',
    desc: 'Você receberá alertas importantes automaticamente.',
    icon: Mail,
  },
  {
    title: 'Consumo acima da média',
    desc: 'O gasto mensal estimado subiu em relação ao padrão anterior.',
    icon: Bell,
  },
];

export default function Alerts() {
  return (
    <section className="px-5 py-8">
      <h1 className="text-3xl font-bold">Alertas</h1>
      <p className="mt-2 text-slate-400">
        Notificações preventivas para evitar problemas caros.
      </p>

      <div className="mt-6 space-y-4">
        {alerts.map((alert) => {
          const Icon = alert.icon;

          return (
            <div
              key={alert.title}
              className="rounded-3xl border border-white/10 bg-[#111827] p-5 shadow-lg shadow-black/20"
            >
              <div className="mb-3 flex items-center gap-3">
                <div className="rounded-2xl bg-[#0A84FF]/10 p-3 text-[#0A84FF]">
                  <Icon size={22} />
                </div>

                <h2 className="font-bold text-white">{alert.title}</h2>
              </div>

              <p className="text-sm text-slate-400">{alert.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}