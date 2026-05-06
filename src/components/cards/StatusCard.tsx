import type { LucideIcon } from 'lucide-react';

type StatusCardProps = {
  title: string;
  value: string;
  description: string;
  icon: LucideIcon;
  status?: 'ok' | 'warning' | 'danger';
};

const statusColor = {
  ok: 'text-emerald-400',
  warning: 'text-yellow-400',
  danger: 'text-red-400',
};

const statusBg = {
  ok: 'bg-emerald-400/10',
  warning: 'bg-yellow-400/10',
  danger: 'bg-red-400/10',
};

export default function StatusCard({
  title,
  value,
  description,
  icon: Icon,
  status = 'ok',
}: StatusCardProps) {
  return (
    <div className="rounded-3xl border border-white/10 bg-[#111827] p-5 shadow-lg shadow-black/20">
      <div className="mb-4 flex items-center justify-between">
        <div className={`rounded-2xl p-3 ${statusBg[status]}`}>
          <Icon className={statusColor[status]} size={24} />
        </div>

        <span className={`text-xs font-bold ${statusColor[status]}`}>
          {status.toUpperCase()}
        </span>
      </div>

      <h3 className="text-sm text-slate-400">{title}</h3>
      <p className="mt-1 text-xl font-bold text-white">{value}</p>
      <p className="mt-2 text-sm text-slate-400">{description}</p>
    </div>
  );
}