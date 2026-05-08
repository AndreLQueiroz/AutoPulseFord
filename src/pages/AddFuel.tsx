import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Fuel, Save } from 'lucide-react';

import { useVehicle } from '../context/useVehicle';
import type { FuelRecord } from '../context/vehicle-context';

export default function AddFuel() {
  const navigate = useNavigate();
  const { fuelHistory, addFuelRecord } = useVehicle();

  const [currentKm, setCurrentKm] = useState('');
  const [liters, setLiters] = useState('');
  const [totalPrice, setTotalPrice] = useState('');

  function handleSave() {
    const km = Number(currentKm);
    const fuelLiters = Number(liters);

    let consumption = 0;

    if (fuelHistory.length > 0) {
      const lastRecord = fuelHistory[fuelHistory.length - 1];
      const lastKm = Number(lastRecord.currentKm);
      const distance = km - lastKm;

      if (fuelLiters > 0) {
        consumption = distance / fuelLiters;
      }
    }

    const newRecord: FuelRecord = {
      currentKm,
      liters,
      totalPrice,
      consumption,
      createdAt: new Date().toISOString(),
    };

    addFuelRecord(newRecord);
    navigate('/fuel-history');
  }

  return (
    <section className="px-5 py-8">
      <div className="mb-8 flex items-center gap-3">
        <div className="rounded-2xl bg-[#0A84FF]/10 p-3 text-[#0A84FF]">
          <Fuel size={28} />
        </div>

        <div>
          <h1 className="text-3xl font-bold text-white">
            Registrar abastecimento
          </h1>

          <p className="text-sm text-slate-400">
            Adicione dados para gerar análises reais.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <input
          value={currentKm}
          onChange={(e) => setCurrentKm(e.target.value)}
          type="number"
          placeholder="Km atual"
          className="w-full rounded-2xl border border-white/10 bg-[#111827] px-4 py-4 text-white outline-none"
        />

        <input
          value={liters}
          onChange={(e) => setLiters(e.target.value)}
          type="number"
          placeholder="Litros abastecidos"
          className="w-full rounded-2xl border border-white/10 bg-[#111827] px-4 py-4 text-white outline-none"
        />

        <input
          value={totalPrice}
          onChange={(e) => setTotalPrice(e.target.value)}
          type="number"
          placeholder="Valor total"
          className="w-full rounded-2xl border border-white/10 bg-[#111827] px-4 py-4 text-white outline-none"
        />

        <button
          onClick={handleSave}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#0A84FF] px-4 py-4 font-bold text-white shadow-lg shadow-blue-500/30 transition hover:scale-[1.02]"
        >
          <Save size={20} />
          Salvar abastecimento
        </button>
      </div>
    </section>
  );
}