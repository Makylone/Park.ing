import { useState } from "react";
import Input from "../Input";
import ResultPanel from "../ResultPanel";
import type { GameStep, CalculationInput } from "../../interface/calculator";
import "./index.css";
import compute from "../../interface/algov2";

export default function UserEntry() {
  const [games, setGames] = useState<GameStep[]>([]);
  const [pointsNeeded, setPointsNeeded] = useState<number>(0);

  const handleCalculate = (input: CalculationInput) => {
    const needed = input.targetPoints - input.currentPoints;
    setPointsNeeded(needed);

    if (needed <= 0) {
      setGames([]);
      return;
    }

    const steps = compute(
      input.currentPoints,
      input.targetPoints,
      input.eventBonus,
    );
    setGames(steps);
  };

  return (
    <div className="calculator">
      <header className="calculator__header">
        <h1 className="calculator__title">Event point calculator</h1>
        <p className="calculator__subtitle">
          Plan your final push — same song, Easy difficulty.
        </p>
      </header>

      <Input onCalculate={handleCalculate} />
      <ResultPanel games={games} pointsNeeded={pointsNeeded} />
    </div>
  );
}
