import { createContext } from 'react';

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

export type FuelRecord = {
  currentKm: string;
  liters: string;
  totalPrice: string;
  consumption: number;
  createdAt: string;
};

export type VehicleContextData = {
  vehicle: VehicleData | null;
  fuelHistory: FuelRecord[];
  saveVehicle: (vehicle: VehicleData) => void;
  addFuelRecord: (record: FuelRecord) => void;
};

export const VehicleContext =
  createContext<VehicleContextData | null>(null);