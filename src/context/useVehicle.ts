import { useContext } from 'react';
import { VehicleContext } from './vehicle-context';

export function useVehicle() {
  const context = useContext(VehicleContext);

  if (!context) {
    throw new Error(
      'useVehicle deve ser usado dentro de VehicleProvider'
    );
  }

  return context;
}