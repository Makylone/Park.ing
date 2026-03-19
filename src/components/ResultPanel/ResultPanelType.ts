import type { CalculationResult } from "../../interface/calculator";

export type ResultsPanelType = {
  results: CalculationResult[] | null;
  pointsNeeded: number;
};
