export type InputProps = {
  onCalculate: (input: {
    currentPoints: number;
    targetPoints: number;
    eventBonus: number;
    isv: string;
    talent: number;
  }) => void;
};
