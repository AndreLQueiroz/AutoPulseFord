import { Fuel } from 'lucide-react';
import FuelChart from '../components/charts/FuelChart';

type FuelRecord = {
  currentKm: string;
  liters: string;
  totalPrice: string;
  consumption: number;
  createdAt: string;
};

function getFuelHistory(): FuelRecord[] {
  const saved =
    localStorage.getItem('autopulse_fuel_history');

  if (!saved) return [];

  return JSON.parse(saved);
  
}

export default function FuelHistory() {
  const history = getFuelHistory();

  return (
  <section className="px-5 py-8">
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-white">
        Histórico de combustível
      </h1>

      <p className="mt-2 text-slate-400">
        Evolução real do consumo do veículo.
      </p>
    </div>

    <div className="mb-6">
      <FuelChart />
    </div>

    <div className="space-y-4">
        
        {history.map((item, index) => (
          <div
            key={index}
            className="rounded-3xl border border-white/10 bg-[#111827] p-5 shadow-lg shadow-black/20"
          >
            <div className="flex items-start gap-4">
              <div className="rounded-2xl bg-[#0A84FF]/10 p-3 text-[#0A84FF]">
                <Fuel size={22} />
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h2 className="font-bold text-white">
                    {item.currentKm} km
                  </h2>

                  <span className="text-sm text-slate-400">
                    {new Date(
                      item.createdAt
                    ).toLocaleDateString('pt-BR')}
                  </span>
                </div>

                <div className="mt-3 grid grid-cols-3 gap-3">
                  <div className="rounded-2xl bg-white/5 p-3">
                    <p className="text-xs text-slate-400">
                      Litros
                    </p>

                    <strong className="text-white">
                      {item.liters}L
                    </strong>
                  </div>

                  <div className="rounded-2xl bg-white/5 p-3">
                    <p className="text-xs text-slate-400">
                      Valor
                    </p>

                    <strong className="text-white">
                      R$ {item.totalPrice}
                    </strong>
                  </div>

                  <div className="rounded-2xl bg-white/5 p-3">
                    <p className="text-xs text-slate-400">
                      Consumo
                    </p>

                    <strong className="text-white">
                      {item.consumption > 0
                        ? `${item.consumption.toFixed(
                            1
                          )} km/L`
                        : '--'}
                    </strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}