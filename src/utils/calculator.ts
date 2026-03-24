type CalculationInput = {
  currentPoints: number;
  targetPoints: number;
  eventBonus: number;
};

type GameStep = {
  number_of_game: number;
  cost_energy: number;
  event_bonus: number;
  event_point_per_game: number;
  range: { min: number; max: number };
};

type SetUp = {
  energy_usage: number;
  bracket: number;
};

export type { CalculationInput, GameStep, SetUp };
