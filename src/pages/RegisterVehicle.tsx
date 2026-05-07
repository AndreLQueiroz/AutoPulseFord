import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, Car } from 'lucide-react';

import { useVehicle } from '../context/useVehicle';

export type VehicleData = {
  model: string;
  year: string;
  currentKm: string;
  averageConsumption: string;
  monthlyKm: string;
  fuelPrice: string;
  lastOilChangeKm: string;
  lastRevisionKm: string;
  lastTireChangeKm: string;
};

const initialVehicle: VehicleData = {
  model: '',
  year: '',
  currentKm: '',
  averageConsumption: '',
  monthlyKm: '',
  fuelPrice: '',
  lastOilChangeKm: '',
  lastRevisionKm: '',
  lastTireChangeKm: '',
};

export default function RegisterVehicle() {
  const navigate = useNavigate();

  const { vehicle: savedVehicle, saveVehicle } =
    useVehicle();

  const [vehicle, setVehicle] =
    useState<VehicleData>(
      savedVehicle || initialVehicle
    );

  function handleChange(
    field: keyof VehicleData,
    value: string
  ) {
    setVehicle((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  function handleSave() {
    saveVehicle(vehicle);

    navigate('/');
  }

  return (
    <section className="px-5 py-8">
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-2xl bg-[#0A84FF]/10 p-3 text-[#0A84FF]">
          <Car size={26} />
        </div>

        <div>
          <h1 className="text-3xl font-bold text-white">
            Cadastrar veículo
          </h1>

          <p className="text-sm text-slate-400">
            Informe os dados para gerar diagnósticos.
          </p>
        </div>
      </div>

      <form className="space-y-4">
        <input
          value={vehicle.model}
          onChange={(e) =>
            handleChange('model', e.target.value)
          }
          className="w-full rounded-2xl border border-white/10 bg-[#111827] px-4 py-3 text-white outline-none"
          placeholder="Modelo do carro"
        />

        <div className="grid grid-cols-2 gap-4">
          <input
            value={vehicle.year}
            onChange={(e) =>
              handleChange('year', e.target.value)
            }
            type="number"
            className="w-full rounded-2xl border border-white/10 bg-[#111827] px-4 py-3 text-white outline-none"
            placeholder="Ano"
          />

          <input
            value={vehicle.currentKm}
            onChange={(e) =>
              handleChange(
                'currentKm',
                e.target.value
              )
            }
            type="number"
            className="w-full rounded-2xl border border-white/10 bg-[#111827] px-4 py-3 text-white outline-none"
            placeholder="Km atual"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <input
            value={vehicle.averageConsumption}
            onChange={(e) =>
              handleChange(
                'averageConsumption',
                e.target.value
              )
            }
            type="number"
            className="w-full rounded-2xl border border-white/10 bg-[#111827] px-4 py-3 text-white outline-none"
            placeholder="Km/L"
          />

          <input
            value={vehicle.monthlyKm}
            onChange={(e) =>
              handleChange(
                'monthlyKm',
                e.target.value
              )
            }
            type="number"
            className="w-full rounded-2xl border border-white/10 bg-[#111827] px-4 py-3 text-white outline-none"
            placeholder="Km por mês"
          />
        </div>

        <input
          value={vehicle.fuelPrice}
          onChange={(e) =>
            handleChange(
              'fuelPrice',
              e.target.value
            )
          }
          type="number"
          step="0.01"
          className="w-full rounded-2xl border border-white/10 bg-[#111827] px-4 py-3 text-white outline-none"
          placeholder="Preço do combustível"
        />

        <div className="pt-4">
          <h2 className="mb-3 text-lg font-bold text-white">
            Histórico de manutenção
          </h2>

          <div className="space-y-4">
            <input
              value={vehicle.lastOilChangeKm}
              onChange={(e) =>
                handleChange(
                  'lastOilChangeKm',
                  e.target.value
                )
              }
              type="number"
              className="w-full rounded-2xl border border-white/10 bg-[#111827] px-4 py-3 text-white outline-none"
              placeholder="Km da última troca de óleo"
            />

            <input
              value={vehicle.lastRevisionKm}
              onChange={(e) =>
                handleChange(
                  'lastRevisionKm',
                  e.target.value
                )
              }
              type="number"
              className="w-full rounded-2xl border border-white/10 bg-[#111827] px-4 py-3 text-white outline-none"
              placeholder="Km da última revisão"
            />

            <input
              value={vehicle.lastTireChangeKm}
              onChange={(e) =>
                handleChange(
                  'lastTireChangeKm',
                  e.target.value
                )
              }
              type="number"
              className="w-full rounded-2xl border border-white/10 bg-[#111827] px-4 py-3 text-white outline-none"
              placeholder="Km da última troca dos pneus"
            />
          </div>
        </div>

        <button
          type="button"
          onClick={handleSave}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#0A84FF] px-4 py-4 font-bold text-white shadow-lg shadow-blue-500/30 transition hover:scale-[1.02]"
        >
          <Save size={20} />
          Salvar veículo
        </button>
      </form>
    </section>
  );
}