// import { DEFAULT_CORPORATION_TAX } from "../calculation/calculates/Cash flow/constant";
// import { ICorporationTax } from "../calculation/calculates/Cash flow/type";
// import {
//   DEFAULT_GAIN_ON_DISPOSAL,
//   DEFAULT_MCAPEX_PROVISION,
// } from "../calculation/calculates/constant";
// import {
//   IGainOnDisposal,
//   IMCapexProvision,
// } from "../calculation/calculates/Revenue/type";
// import { getQuarterNumberFromModelStartDate } from "../calculation/calculates/utils";
// import {
//   DEFAULT_CAPITAL_EXPENDITURE,
//   DEFAULT_CORPORATION_TAX_VALUE,
//   DEFAULT_EV_ADDITIONS,
//   DEFAULT_GEARING_BY_TAXES,
//   DEFAULT_OPERATING_CASH_FLOW_VALUE,
//   DEFAULT_SENIOR_DEBT,
// } from "../calculation/Cash flow/constant";
// import {
//   ICapitalExpenditure,
//   ICorporationTaxValue,
//   IEquity,
//   IGearingByTaxes,
//   ISeniorDebt,
// } from "../calculation/Cash flow/type";
// import { DEFAULT_RETURNS_SETTINGS, DEFAULT_VALUATION } from "./constant";
// import { IReturnSettings, IValuation } from "./type";
// import { projectValuation } from "./valuation";

// export function calcKPIs({
//   valuation = DEFAULT_VALUATION,
//   corporationTax = DEFAULT_CORPORATION_TAX,
//   gearingByCapexType = DEFAULT_GEARING_BY_TAXES,
//   seniorDebt = DEFAULT_SENIOR_DEBT,
//   decommissioningEndDate = "2068-06-30",
//   mCapexProvision = DEFAULT_MCAPEX_PROVISION,
//   operatingCashFlowValue = DEFAULT_OPERATING_CASH_FLOW_VALUE,
//   capitalExpenditure = DEFAULT_CAPITAL_EXPENDITURE,
//   corporationTaxValue = DEFAULT_CORPORATION_TAX_VALUE,
//   gainOnDisposal = DEFAULT_GAIN_ON_DISPOSAL,
//   returnsSettings = DEFAULT_RETURNS_SETTINGS,
//   evAdditions = DEFAULT_EV_ADDITIONS,
//   operationStartDate = "2030-01-01",
// }: {
//   valuation?: IValuation;
//   mCapexProvision?: IMCapexProvision;
//   operatingCashFlowValue?: number[];
//   capitalExpenditure?: ICapitalExpenditure;
//   gainOnDisposal?: IGainOnDisposal;
//   corporationTaxValue?: ICorporationTaxValue;
//   valuation_date?: string;
//   gearingByCapexType?: IGearingByTaxes;
//   equity?: IEquity;
//   seniorDebt?: ISeniorDebt;
//   corporationTax?: ICorporationTax;
//   decommissioningEndDate?: string;
//   returnsSettings?: IReturnSettings;
//   evAdditions?: number[];
//   operationStartDate?: string;
// }) {
//   const modelStartDate = "2023-01-01";
//   const operation_start_date = "2028-01-01";
//   // const operation_start_date_month_number = getQuarterNumberFromModelStartDate(
//   //   modelStartDate,
//   //   operation_start_date
//   // );
//   // // const period = calcPeriod();
//   // const period =
//   //   getQuarterNumberFromModelStartDate(modelStartDate, decommissioningEndDate) -
//   //   1;
//   // const valuation_date_month_number = getQuarterNumberFromModelStartDate(
//   //   modelStartDate,
//   //   valuation.valuation_date
//   // );

//   const resultData = projectValuation({
//     valuation,
//     corporationTax,
//     gearingByCapexType,
//     seniorDebt,
//     modelStartDate,
//     decommissioningEndDate,
//     mCapexProvision,
//     operatingCashFlowValue,
//     capitalExpenditure,
//     corporationTaxValue,
//     gainOnDisposal,
//     returnsSettings,
//     evAdditions,
//     operationStartDate,
//   });

//   return [
//     {
//       discountRate: resultData.discount_rate_pre_tax_and_unlevered,
//       valuation_condition: "Pre-tax unlevered",
//       value: resultData.preUn,
//     },
//     {
//       discountRate: resultData.discount_rate_post_tax_and_unlevered,
//       valuation_condition: "Post-tax unlevered",
//       value: resultData.postUn,
//     },
//     {
//       discountRate: resultData.discount_rate_post_tax_and_levered,
//       valuation_condition: "Post-tax levered",
//       value: resultData.post,
//     },
//   ];
// }
