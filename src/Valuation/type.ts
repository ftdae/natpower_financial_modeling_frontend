export interface IValuation {
  valuation_date: string;
  cost_of_equity: number;
  date_string: string;
}
export interface IValuationResult {
  discountRate: number;
  valuation_condition: string;
  value: {
    npv: number;
    irr: number;
    payback: number;
  };
}
export interface IReturnSettings {
  carryFunActiveSwitch: number;
  numberOfStages: number;
  carryBasis: number;
  stageOne: {
    hurdleRate: number;
    gpPortion: number;
    gpPortionForCarry: number;
  };
  stageTwo: {
    hurdleRate: number;
    gpPortion: number;
    gpPortionForCarry: number;
  };
  discountRate: number;
}
