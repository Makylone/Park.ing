import { useState } from "react";
import type { InputProps } from "./InputPropsInterface";

import "./index.css";
import Slider from "../Slider";

export default function Input({ onCalculate }: InputProps) {
  const [currentPoints, setCurrentPoints] = useState<number>(970000);
  const [targetPoints, setTargetPoints] = useState<number>(1000000);
  const [eventBonus, setEventBonus] = useState<number>(150);

  const handleSubmit = () => {
    onCalculate({ currentPoints, targetPoints, eventBonus });
  };

  return (
    <div className="input-form">
      <div className="input-form__points-row">
        <div className="input-form__field">
          <label className="input-form__label">Current points</label>
          <input
            type="number"
            className="input-form__input"
            value={Number(currentPoints).toString()}
            min={0}
            onChange={(e) => setCurrentPoints(Number(e.target.value))}
          />
        </div>

        <div className="input-form__field">
          <label className="input-form__label">Target points</label>
          <input
            type="number"
            className="input-form__input"
            value={Number(targetPoints).toString()}
            min={0}
            onChange={(e) => setTargetPoints(Number(e.target.value))}
          />
        </div>
      </div>

      <Slider
        value={eventBonus}
        onChange={setEventBonus}
        min={0}
        max={475}
        step={1}
      />

      <button className="input-form__submit" onClick={handleSubmit}>
        Calculate
      </button>
    </div>
  );
}
