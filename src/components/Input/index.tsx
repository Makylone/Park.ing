import { useMemo, useState } from "react";
import type { InputProps } from "./InputPropsInterface";

import "./index.css";
import Slider from "../Slider";
import { estimateMaxLiveScore } from "../../utils/algov2";

const ISV_PATTERN = /^\d{1,3}\/\d{1,3}$/;

export default function Input({ onCalculate }: InputProps) {
  const [currentPoints, setCurrentPoints] = useState<number>(970000);
  const [targetPoints, setTargetPoints] = useState<number>(1000000);
  const [eventBonus, setEventBonus] = useState<number>(150);
  const [isv, setIsv] = useState<string>("100/100");
  const [talent, setTalent] = useState<number>(250000);
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
 
  const maxLiveScore = useMemo(() => {
    if (!ISV_PATTERN.test(isv) || talent <= 0) return null;
    return estimateMaxLiveScore(talent, isv);
  }, [isv, talent]);
 
  const handleSubmit = () => {
    onCalculate({ currentPoints, targetPoints, eventBonus, isv, talent });
  };
 
  return (
    <div className="input-form">
      <div className="input-form__points-row">
        <div className="input-form__field">
          <label className="input-form__label">Current points</label>
          <input
            type="number"
            className="input-form__input"
            value={currentPoints}
            min={0}
            onChange={(e) => setCurrentPoints(Number(e.target.value))}
          />
        </div>
 
        <div className="input-form__field">
          <label className="input-form__label">Target points</label>
          <input
            type="number"
            className="input-form__input"
            value={targetPoints}
            min={0}
            onChange={(e) => setTargetPoints(Number(e.target.value))}
          />
        </div>
      </div>
 
      <div className="input-form__points-row">
        <div className="input-form__field">
          <label className="input-form__label">ISV</label>
          <input
            type="text"
            className="input-form__input"
            value={isv}
            placeholder="150/700"
            pattern="\d{1,3}/\d{1,3}"
            onChange={(e) => setIsv(e.target.value)}
          />
          <span className="input-form__hint">Format: front/back (e.g. 150/700)</span>
        </div>
 
        <div className="input-form__field">
          <label className="input-form__label">Talent</label>
          <input
            type="number"
            className="input-form__input"
            value={talent}
            min={0}
            max={999999}
            onChange={(e) => setTalent(Number(e.target.value))}
          />
        </div>
      </div>
 
      {maxLiveScore !== null && (
        <div className="input-form__score-readout">
          <span className="input-form__score-readout-label">
            Estimated max live score
            <span
              className="input-form__tooltip-wrapper"
              onClick={() => setShowTooltip(!showTooltip)}
            >
              <span className="input-form__tooltip-icon">!</span>
              {showTooltip && (
                <span className="input-form__tooltip-text">
                  This is an estimation, the actual max live score can be higher than the one shown here. 
                  That's because of the randomness skill proc, which can impact the live score at the end. <br/>
                  <b> In theory, the max live score shows here is underestimate, so the calculator wont propose a score range impossible to reach for your current team.</b> 
                </span>
              )}
            </span>
          </span>
          <span className="input-form__score-readout-value">
            {maxLiveScore.toLocaleString()}
          </span>
        </div>
      )}
 
      <Slider value={eventBonus} onChange={setEventBonus} min={0} max={475} step={5}/>
 
      <button className="input-form__submit" onClick={handleSubmit}>
        Calculate
      </button>
    </div>
  );
}
