import { IValuation } from "./type";

export const DEFAULT_VALUATION = {
  valuation_date: "2024-01-31",
  cost_of_equity: 10,
  date_string: "Fully consented",
} as IValuation;

export const DEFAULT_RETURNS_SETTINGS = {
  carryFunActiveSwitch: 0,
  numberOfStages: 0,
  carryBasis: 0,
  stageOne: {
    hurdleRate: 0,
    gpPortion: 0,
    gpPortionForCarry: 0,
  },
  stageTwo: {
    hurdleRate: 0,
    gpPortion: 0,
    gpPortionForCarry: 0,
  },
  discountRate: 0.07,
};
