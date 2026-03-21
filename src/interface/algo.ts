import type { SetUp, CalculationResult } from "./calculator";

const multiplier = [1, 5, 10, 15, 20, 25, 27, 29, 31, 33, 35];

function findMinSettingsForLastGame(
  remaining_points: number,
  event_bonus: number,
): SetUp | null {
  for (let e = 0; e <= 10; e++) {
    for (let b = 0; b < 101; b++) {
      if (
        remaining_points <=
        multiplier[e] * Math.floor((100 + b) * (event_bonus / 100 + 1))
      ) {
        return { energy_usage: e, bracket: b };
      }
    }
  }
  return null;
}

function getPointsNeeded(targetPoints: number, currentPoints: number): number {
  return targetPoints - currentPoints;
}

function generateSolutions(
  userMaxEvent_bonus: number,
  points_needed: number,
): CalculationResult[] {
  const result: CalculationResult[] = [];
  let i = 1;
  for (
    let event_bonus = userMaxEvent_bonus;
    event_bonus >= 0;
    event_bonus -= 1
  ) {
    for (let energy = 10; energy >= 0; energy -= 1) {
      for (let bracket = 0; bracket < 101; bracket++) {
        const base_point = 100 + bracket;
        const event_points =
          multiplier[energy] * Math.floor(base_point * (event_bonus / 100 + 1));
        const num_games = Math.ceil(points_needed / event_points);
        const remaining_points = points_needed - event_points * (num_games - 1);
        const overshoot = event_points * num_games - points_needed;
        if (overshoot > 0) {
          i++;
          continue;
        }
        let last_game_set_up: SetUp | null = null;
        if (remaining_points < event_points && num_games > 1) {
          last_game_set_up = findMinSettingsForLastGame(
            remaining_points,
            event_bonus,
          );
        }
        const min = bracket * 20000;
        const max = min + 19999;
        const solution: CalculationResult = {
          rank: i,
          overshoot: overshoot,
          number_of_game: num_games,
          cost_energy: energy,
          multiplier: multiplier[energy],
          event_bonus: event_bonus,
          event_point_per_game: event_points,
          last_game_set_up: last_game_set_up,
          range: {
            min,
            max,
          },
        };
        result.push(solution);
        i += 1;
      }
    }
  }
  return result;
}

function sortSolution(result: CalculationResult[]): CalculationResult[] {
  const sortedSolution = result.sort((a, b) => {
    if (a.overshoot !== b.overshoot) {
      return a.overshoot - b.overshoot;
    }
    if (a.event_bonus !== b.event_bonus) {
      return b.event_bonus - a.event_bonus;
    }
    if (a.number_of_game !== b.number_of_game) {
      return a.number_of_game - b.number_of_game;
    }
    if (a.range.min !== b.range.min) {
      return a.range.min - b.range.min;
    }
    return 0;
  });
  return sortedSolution;
}

function deduplication(
  sortedSolution: CalculationResult[],
): CalculationResult[] {
  const seen = new Set();
  const filteredSolution: CalculationResult[] = [];
  for (const solution of sortedSolution) {
    const key = `${solution.event_bonus}-${solution.number_of_game}-${solution.range.min}`;
    if (!seen.has(key)) {
      seen.add(key);
      filteredSolution.push(solution);
    }
  }
  return filteredSolution;
}

export { deduplication, sortSolution, generateSolutions, getPointsNeeded };
