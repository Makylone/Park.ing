import type { GameStep } from "../interface/calculator";

/**
 * Represents one possible way to earn event points in a single game.
 * Each combination of energy level and score bracket produces a unique
 * event point value (after applying the event bonus).
 */
type GameOption = {
  eventPoints: number;
  energyLevel: number;
  scoreBracket: number;
};

/** Maps energy level (0–10) to its point multiplier. */
const ENERGY_MULTIPLIERS = [1, 5, 10, 15, 20, 25, 27, 29, 31, 33, 35];

/** Number of score brackets (score / 20000, ranging from 0 to 124). */
const SCORE_BRACKET_COUNT = 101;

/** Number of energy levels available (0 through 10). */
const ENERGY_LEVEL_COUNT = 11;

/**
 * Generates every unique event point value achievable for a given event bonus.
 *
 * Iterates over all combinations of score brackets (0–124) and energy levels (0–10),
 * computes the event points using the formula:
 *   eventPoints = multiplier × ⌊(100 + bracket) × (1 + eventBonus / 100)⌋
 *
 * Deduplicates by event point value, keeping only the first occurrence
 * (which has the lowest energy and score bracket for that point value).
 */
function buildGameOptionsTable(eventBonus: number): GameOption[] {
  const seenPointValues = new Set<number>();
  const options: GameOption[] = [];

  for (let bracket = 0; bracket < SCORE_BRACKET_COUNT; bracket++) {
    for (let energy = 0; energy < ENERGY_LEVEL_COUNT; energy++) {
      const baseScore = 100 + bracket;
      const bonusMultiplier = 1 + eventBonus / 100;
      const eventPoints =
        ENERGY_MULTIPLIERS[energy] * Math.floor(baseScore * bonusMultiplier);

      if (!seenPointValues.has(eventPoints)) {
        seenPointValues.add(eventPoints);
        options.push({
          eventPoints,
          energyLevel: energy,
          scoreBracket: bracket,
        });
      }
    }
  }

  return options;
}

/**
 * Finds the minimum number of games needed to reach exactly `target` points,
 * using a dynamic programming approach (coin change problem).
 *
 * Returns null if no exact combination exists.
 *
 * `minGamesAt[i]` = the fewest games needed to earn exactly `i` event points.
 * `bestOptionAt[i]` = which GameOption was used to reach `i` points
 *                      (used later to reconstruct the full game sequence).
 */
function findMinGames(
  availableOptions: GameOption[],
  target: number,
): { totalGames: number; bestOptionAt: GameOption[] } | null {
  const UNREACHABLE = target + 1;

  const minGamesAt = new Array(target + 1).fill(UNREACHABLE);
  const bestOptionAt = new Array<GameOption>(target + 1).fill(null as any);

  minGamesAt[0] = 0;

  for (let points = 1; points <= target; points++) {
    for (const option of availableOptions) {
      if (option.eventPoints > points) continue;

      const previousPoints = points - option.eventPoints;
      const gamesIfUsingThisOption = 1 + minGamesAt[previousPoints];

      if (gamesIfUsingThisOption < minGamesAt[points]) {
        minGamesAt[points] = gamesIfUsingThisOption;
        bestOptionAt[points] = option;
      }
    }
  }

  if (minGamesAt[target] === UNREACHABLE) return null;

  return {
    totalGames: minGamesAt[target],
    bestOptionAt,
  };
}

/**
 * Reconstructs the sequence of games from the DP lookup table.
 *
 * Starting from `target`, repeatedly looks up which GameOption was chosen
 * at each point value, subtracts its event points, and continues until
 * the remaining points reach zero.
 */
function reconstructGameSequence(
  bestOptionAt: GameOption[],
  target: number,
): GameOption[] {
  const sequence: GameOption[] = [];
  let remainingPoints = target;

  while (remainingPoints > 0) {
    const chosenOption = bestOptionAt[remainingPoints];
    sequence.push(chosenOption);
    remainingPoints -= chosenOption.eventPoints;
  }

  return sequence;
}

/**
 * Main entry point: computes the optimal game-by-game plan to earn
 * exactly (targetPoints - currentPoints) event points.
 *
 * Tries the user's max event bonus first, then decreases by 1 each
 * iteration until an exact solution is found. Returns the game sequence
 * for the highest event bonus that works.
 */
export default function compute(
  currentPoints: number,
  targetPoints: number,
  maxEventBonus: number,
): GameStep[] {
  const pointsNeeded = targetPoints - currentPoints;

  for (let eventBonus = maxEventBonus; eventBonus >= 0; eventBonus--) {
    const options = buildGameOptionsTable(eventBonus);
    const result = findMinGames(options, pointsNeeded);

    if (result === null) continue;

    const gameSequence = reconstructGameSequence(
      result.bestOptionAt,
      pointsNeeded,
    );

    return gameSequence.map((option) => ({
      overshoot: 0,
      number_of_game: result.totalGames,
      cost_energy: option.energyLevel,
      event_bonus: eventBonus,
      event_point_per_game: option.eventPoints,
      range: {
        min: option.scoreBracket * 20000,
        max: option.scoreBracket * 20000 + 19999,
      },
    }));
  }

  return [];
}
