import { useState } from "react";
import Input from "../Input";
import ResultPanel from "../ResultPanel";
import type {
  CalculationInput,
  CalculationResult,
} from "../../interface/calculator";
import "./index.css";
import { compute } from ".";

export default function UserEntry() {
  const [results, setResults] = useState<CalculationResult[]>([]);
  const [pointsNeeded, setPointsNeeded] = useState<number>(0);

  const handleCalculate = (input: CalculationInput) => {
    const needed = input.targetPoints - input.currentPoints;
    setPointsNeeded(needed);

    if (needed <= 0) {
      setResults([]);
      return;
    }

    const solutions = compute(
      input.currentPoints,
      input.targetPoints,
      input.eventBonus,
    );
    setResults(solutions);
  };

  return (
    <div className="calculator">
      <header className="calculator__header">
        <h1 className="calculator__title">Event point calculator</h1>
        <p className="calculator__subtitle">Plan your final push.</p>
      </header>

      <Input onCalculate={handleCalculate} />
      <ResultPanel results={results} pointsNeeded={pointsNeeded} />
    </div>
  );
}
