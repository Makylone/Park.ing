export type InputProps = {
  onCalculate: (input: {
    currentPoints: number;
    targetPoints: number;
    eventBonus: number;
  }) => void;
};
