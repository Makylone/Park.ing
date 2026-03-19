import type { SolutionCardType } from "./SolutionCardType";
import "./index.css";

const energyMultipliers = [1, 5, 10, 15, 20, 25, 27, 29, 31, 33, 35];

function formatScore(value: number): string {
  return value.toLocaleString();
}

export default function SolutionCard({ solution, index }: SolutionCardType) {
  const labels = ["Best match", "Alternative 1", "Alternative 2"];
  const label = labels[index] ?? `Option ${index + 1}`;
  const isPerfect = solution.overshoot === 0;

  const lastGame = solution.last_game_set_up;
  const lastGameScoreMin = lastGame ? lastGame.bracket * 20000 : null;
  const lastGameScoreMax = lastGame ? lastGameScoreMin! + 19999 : null;
  const lastGameMultiplier = lastGame
    ? energyMultipliers[lastGame.energy_usage]
    : null;

  return (
    <div
      className={`solution-card ${index === 0 ? "solution-card--best" : ""}`}
    >
      <div className="solution-card__header">
        <span className="solution-card__label">{label}</span>
        {isPerfect && <span className="solution-card__badge">Exact</span>}
        {!isPerfect && (
          <span className="solution-card__overshoot">
            +{solution.overshoot} overshoot
          </span>
        )}
      </div>

      <div className="solution-card__grid">
        <div className="solution-card__stat">
          <span className="solution-card__stat-label">Games</span>
          <span className="solution-card__stat-value">
            {solution.number_of_game}
          </span>
        </div>

        <div className="solution-card__stat">
          <span className="solution-card__stat-label">Energy</span>
          <span className="solution-card__stat-value">
            {solution.cost_energy}x
            <span className="solution-card__stat-sub">
              (×{solution.multiplier} multiplier)
            </span>
          </span>
        </div>

        <div className="solution-card__stat">
          <span className="solution-card__stat-label">Event bonus</span>
          <span className="solution-card__stat-value">
            {solution.event_bonus}%
          </span>
        </div>

        <div className="solution-card__stat">
          <span className="solution-card__stat-label">Points / game</span>
          <span className="solution-card__stat-value">
            {formatScore(solution.event_point_per_game)}
          </span>
        </div>
      </div>

      <div className="solution-card__score-section">
        <span className="solution-card__score-label">Score range</span>
        <span className="solution-card__score-value">
          {formatScore(solution.range.min)} – {formatScore(solution.range.max)}
        </span>
      </div>

      {lastGame && (
        <div className="solution-card__last-game">
          <span className="solution-card__last-game-title">
            Last game (adjusted)
          </span>
          <div className="solution-card__last-game-details">
            <span>
              Energy: {lastGame.energy_usage}
              <span className="solution-card__stat-sub">
                {" "}
                (×{lastGameMultiplier})
              </span>
            </span>
            <span>
              Score: {formatScore(lastGameScoreMin!)} –{" "}
              {formatScore(lastGameScoreMax!)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
