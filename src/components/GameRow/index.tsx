import type { GameRowProps } from "./GameRowProps";
import "./index.css";

export default function GameRow({ ...props }: GameRowProps) {
  return (
    <div className="game-row">
      <span className="game-row__index">{props.index}</span>
      <span className="game-row__energy">x{props.energy}</span>
      <span className="game-row__score">
        {props.scoreMin.toLocaleString()} – {props.scoreMax.toLocaleString()}
      </span>
      <span className="game-row__points">
        {props.eventPoints.toLocaleString()}
      </span>
    </div>
  );
}
