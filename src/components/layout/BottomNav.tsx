import { NavLink } from 'react-router-dom';
import {Bell, Bot,Car,Fuel,Gauge,} from 'lucide-react';

const items = [
  { path: '/', label: 'Início', icon: Car },
  { path: '/health', label: 'Drive', icon: Gauge },
  { path: '/expenses', label: 'Gastos', icon: Fuel },
  { path: '/assistant', label: 'Assistente', icon: Bot },
  { path: '/alerts', label: 'Alertas', icon: Bell },
];

export default function BottomNav() {
  return (
    <nav className="grid grid-cols-5 rounded-t-3xl border border-white/10 bg-[#0F172A]/95 px-2 py-3 shadow-2xl backdrop-blur">
      {items.map((item) => {
        const Icon = item.icon;

        return (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 text-xs transition ${
                isActive ? 'text-[#0A84FF]' : 'text-slate-400'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div
                  className={`rounded-2xl p-2 transition ${
                    isActive
                      ? 'bg-[#0A84FF] text-white shadow-lg shadow-blue-500/30'
                      : 'bg-transparent'
                  }`}
                >
                  <Icon size={22} />
                </div>
                <span>{item.label}</span>
              </>
            )}
          </NavLink>
        );
      })}
    </nav>
  );
}