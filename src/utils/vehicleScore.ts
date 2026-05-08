type ScoreInput = {
  averageConsumption: number;
  fordAverageConsumption: number;

  oilRemainingKm: number;
  revisionRemainingKm: number;
  tireRemainingKm: number;

  monthlyFuelCost: number;
};

export type VehicleScoreResult = {
  score: number;
  status: 'excellent' | 'good' | 'warning' | 'critical';
  label: string;
};

export function calculateVehicleScore({
  averageConsumption,
  fordAverageConsumption,

  oilRemainingKm,
  revisionRemainingKm,
  tireRemainingKm,

  monthlyFuelCost,
}: ScoreInput): VehicleScoreResult {
  let score = 100;

  // óleo
  if (oilRemainingKm <= 0) {
    score -= 25;
  } else if (oilRemainingKm <= 1000) {
    score -= 10;
  }

  // revisão
  if (revisionRemainingKm <= 0) {
    score -= 25;
  } else if (revisionRemainingKm <= 1000) {
    score -= 10;
  }

  // pneus
  if (tireRemainingKm <= 0) {
    score -= 20;
  } else if (tireRemainingKm <= 3000) {
    score -= 8;
  }

  // consumo comparado Ford
  const consumptionDiff =
    ((averageConsumption - fordAverageConsumption) /
      fordAverageConsumption) *
    100;

  if (consumptionDiff < -15) {
    score -= 15;
  } else if (consumptionDiff < -8) {
    score -= 8;
  }

  // gasto mensal
  if (monthlyFuelCost >= 1800) {
    score -= 10;
  } else if (monthlyFuelCost >= 1200) {
    score -= 5;
  }

  score = Math.max(0, Math.min(100, score));

  if (score >= 90) {
    return {
      score,
      status: 'excellent',
      label: 'Excelente',
    };
  }

  if (score >= 75) {
    return {
      score,
      status: 'good',
      label: 'Bom',
    };
  }

  if (score >= 60) {
    return {
      score,
      status: 'warning',
      label: 'Atenção',
    };
  }

  return {
    score,
    status: 'critical',
    label: 'Crítico',
  };
}