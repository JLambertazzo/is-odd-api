export enum EvenOddResult {
  EVEN = "even",
  ODD = "odd",
}

export declare interface Calculation {
  at: Date;
  target: number;
  result: EvenOddResult;
}

export const evaluate = (target: number): Calculation => ({
  at: new Date(),
  target,
  result: target % 2 === 0 ? EvenOddResult.EVEN : EvenOddResult.ODD,
});
