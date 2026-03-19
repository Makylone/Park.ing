type CalculationInput = {
  currentPoints: number;
  targetPoints: number;
  eventBonus: number;
};

type CalculationResult = {
  rank: number;
  overshoot: number;
  number_of_game: number;
  cost_energy: number;
  multiplier: number;
  event_bonus: number;
  event_point_per_game: number;
  last_game_set_up?: SetUp | null;
  range: { min: number; max: number };
};

type SetUp = {
  energy_usage: number;
  bracket: number;
};

export type { CalculationInput, CalculationResult, SetUp };
