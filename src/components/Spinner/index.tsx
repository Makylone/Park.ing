import type { SpinnerType } from "./SpinnerType";
import "./index.css";

export default function Spinner({ label = "Calculating..." }: SpinnerType) {
  return (
    <div className="spinner">
      <div className="spinner__icon" />
      <span className="spinner__label">{label}</span>
    </div>
  );
}
