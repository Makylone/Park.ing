import { useState } from "react";
import Input from "../Input";
import ResultPanel from "../ResultPanel";
import Spinner from "../Spinner";
import type { GameStep, CalculationInput } from "../../utils/calculator";
import "./index.css";
import compute from "../../utils/algov2";

export default function UserEntry() {
  const [games, setGames] = useState<GameStep[]>([]);
  const [pointsNeeded, setPointsNeeded] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleCalculate = (input: CalculationInput) => {
    const needed = input.targetPoints - input.currentPoints;
    setPointsNeeded(needed);

    if (needed <= 0) {
      setGames([]);
      return;
    }

    setIsLoading(true);
    setGames([]);

    setTimeout(() => {
      const steps = compute(
        input.currentPoints,
        input.targetPoints,
        input.eventBonus,
      );
      setGames(steps);
      setIsLoading(false);
    }, 0);
  };

  return (
    <div className="calculator">
      <header className="calculator__header">
        <h1 className="calculator__title">Event point calculator</h1>
        <p className="calculator__subtitle">
          Plan your final push, with the same song.
        </p>
      </header>
      <Input onCalculate={handleCalculate} />
      {isLoading && <Spinner />}
      {!isLoading && (
        <ResultPanel games={games} pointsNeeded={pointsNeeded} />
      )}{" "}
    </div>
  );
}
