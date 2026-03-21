import type { SliderType } from "./SliderType";
import "./index.css";
export default function Slider({ ...props }: SliderType) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = Number(e.target.value);
    const clamped = Math.max(props.min, Math.min(props.max, raw));
    props.onChange(clamped);
  };

  return (
    <div className="bonus-slider">
      <label className="bonus-slider__label">Max event bonus</label>
      <div className="bonus-slider__row">
        <input
          type="range"
          className="bonus-slider__input"
          min={props.min}
          max={props.max}
          step={props.step}
          value={props.value}
          onChange={handleChange}
        />
        <div className="bonus-slider__number-group">
          <input
            type="number"
            className="bonus-slider__number"
            min={props.min}
            max={props.max}
            step={props.step}
            value={Number(props.value).toString()}
            onChange={handleChange}
          />
          <span className="bonus-slider__unit">%</span>
        </div>
      </div>
    </div>
  );
}
