import { ICorporationTax, Iebit } from "./type";

export const DEFAULT_CORPORATION_TAX = {
  smallProfitsTaxRate: 19,
  mainRateOfTax: 25,
  profitThresholdForSmallProfits: 50,
  annualInvestmentAllowance: 1000,
  rateForCapitalAllowancesSpecialPool: 6,
  smallPoolAllowanceThreshold: 1,
  rateForCapitalAllowancesMainPool: 18,
} as ICorporationTax;
export const DEFAULT_EBIT = {
  ebit: new Array(300).fill(0),
  ebitda: new Array(300).fill(0),
} as Iebit;
