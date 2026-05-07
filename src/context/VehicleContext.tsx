import { useState, type ReactNode } from 'react';
import {
  VehicleContext,
  type FuelRecord,
  type VehicleData,
} from './vehicle-context';

function getStoredVehicle(): VehicleData | null {
  const saved = localStorage.getItem('autopulse_vehicle');

  if (!saved) return null;

  return JSON.parse(saved) as VehicleData;
}

function getStoredFuelHistory(): FuelRecord[] {
  const saved = localStorage.getItem('autopulse_fuel_history');

  if (!saved) return [];

  return JSON.parse(saved) as FuelRecord[];
}

export function VehicleProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [vehicle, setVehicle] =
    useState<VehicleData | null>(() => getStoredVehicle());

  const [fuelHistory, setFuelHistory] =
    useState<FuelRecord[]>(() => getStoredFuelHistory());

  function saveVehicle(newVehicle: VehicleData) {
    localStorage.setItem(
      'autopulse_vehicle',
      JSON.stringify(newVehicle)
    );

    setVehicle(newVehicle);
  }

  function addFuelRecord(record: FuelRecord) {
    const updatedHistory = [...fuelHistory, record];

    localStorage.setItem(
      'autopulse_fuel_history',
      JSON.stringify(updatedHistory)
    );

    setFuelHistory(updatedHistory);
  }

  return (
    <VehicleContext.Provider
      value={{
        vehicle,
        fuelHistory,
        saveVehicle,
        addFuelRecord,
      }}
    >
      {children}
    </VehicleContext.Provider>
  );
}