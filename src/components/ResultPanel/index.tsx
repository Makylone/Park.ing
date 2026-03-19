import SolutionCard from "../SolutionCard/index.tsx";
import type { ResultsPanelType } from "./ResultPanelType";
import "./index.css";

export default function ResultPanel({
  results,
  pointsNeeded,
}: ResultsPanelType) {
  if (results === null || results.length === 0) return null;

  return (
    <div className="results-panel">
      <div className="results-panel__header">
        <span className="results-panel__header-label">Points needed</span>
        <span className="results-panel__header-value">
          {pointsNeeded.toLocaleString()}
        </span>
      </div>

      <div className="results-panel__list">
        {results.map((solution, i) => (
          <SolutionCard key={solution.rank} solution={solution} index={i} />
        ))}
      </div>

      <p className="results-panel__disclaimer">
        Any difficulty, same song repeated. The calculator shows the top
        solutions sorted by highest event bonus, fewest games, and lowest energy
        cost.
      </p>
    </div>
  );
}
