import type { CalculationResult } from "../../interface/calculator";
import {
  getPointsNeeded,
  generateSolutions,
  sortSolution,
  deduplication,
} from "../../interface/algo";

export function compute(
  currentPoints: number,
  targetPoints: number,
  userMaxEvent_bonus: number,
): CalculationResult[] {
  const finalResult: CalculationResult[] = [];
  const points_needed = getPointsNeeded(targetPoints, currentPoints);
  const generateSolution = generateSolutions(userMaxEvent_bonus, points_needed);
  const sortedSolution = sortSolution(generateSolution);
  const fileterdSolution = deduplication(sortedSolution);
  for (let i = 0; i < Math.min(3, fileterdSolution.length); i++) {
    finalResult.push(fileterdSolution[i]);
  }
  return finalResult;
}
