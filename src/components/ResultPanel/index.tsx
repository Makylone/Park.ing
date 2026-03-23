import GameRow from "../GameRow/index.tsx";
import type { ResultsPanelType } from "./ResultPanelType";
import "./index.css";
const multiplier = [1, 5, 10, 15, 20, 25, 27, 29, 31, 33, 35];
export default function ResultPanel({ games, pointsNeeded }: ResultsPanelType) {
  if (games.length === 0) return null;

  const totalGames = games[0].number_of_game;
  const eventBonus = games[0].event_bonus;
  const totalEnergy = games.reduce((sum, g) => sum + g.cost_energy, 0);

  return (
    <div className="results-panel">
      <div className="results-panel__header">
        <span className="results-panel__header-label">Points needed</span>
        <span className="results-panel__header-value">
          {pointsNeeded.toLocaleString()}
        </span>
      </div>

      <div className="results-panel__summary">
        <div className="results-panel__summary-stat">
          <span className="results-panel__summary-label">Games</span>
          <span className="results-panel__summary-value">{totalGames}</span>
        </div>
        <div className="results-panel__summary-stat">
          <span className="results-panel__summary-label">Event bonus</span>
          <span className="results-panel__summary-value">{eventBonus}%</span>
        </div>
        <div className="results-panel__summary-stat">
          <span className="results-panel__summary-label">Total energy</span>
          <span className="results-panel__summary-value">{totalEnergy}</span>
        </div>
      </div>

      <div className="results-panel__games">
        <div className="results-panel__games-header">
          <span>Game</span>
          <span>Energy</span>
          <span>Score range</span>
          <span className="results-panel__col-right">Points</span>
        </div>
        {games.map((game, i) => (
          <GameRow
            key={i}
            index={i + 1}
            energy={game.cost_energy}
            multiplier={multiplier[game.cost_energy]}
            scoreMin={game.range.min}
            scoreMax={game.range.max}
            eventPoints={game.event_point_per_game}
          />
        ))}
      </div>

      <p className="results-panel__disclaimer">
        Easy difficulty, same song repeated. Each row is one play — follow the
        sequence exactly to land on your target with zero overshoot.
      </p>
    </div>
  );
}
