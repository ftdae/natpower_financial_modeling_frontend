// import moment from "moment";
// import {
//   INFLATION_START_YEAR,
//   MODEL_START_YEAR,
// } from "../../../utils/constant";
// import { DATE_FORMAT } from "../../../utils/usePrameter";
// import {
//   DEFAULT_INFLATION_INPUTS,
//   DEFAULT_REVENUE_SETUP,
//   DEFAULT_STARTING_BATTERY_ASSUMPTION,
//   DEFAULT_TRIADS_INCOME,
//   DEFAULT_VINTAGE,
// } from "../constant";
// import {
//   annualIndexToMonths,
//   getAsAPercentOfPeriod,
//   getQuarterNumberFromModelStartDate,
//   inflationIndex,
//   multiplyArrays,
//   multiplyNumber,
//   normalizeArray,
//   roundArray,
// } from "../utils";
// import {
//   IInflationForm,
//   IRevenueSetup,
//   IStartingBatteryAssumptions,
//   ITriadsIncome,
//   IVintage,
// } from "./type";

// export function calcTriadsIncome({
//   triadsIncomeSetting = DEFAULT_TRIADS_INCOME,
//   constraintFactor = 100,
//   revenueSetup = DEFAULT_REVENUE_SETUP,
//   startingAssumptionsForBatteries = DEFAULT_STARTING_BATTERY_ASSUMPTION,
//   inflationInputs = DEFAULT_INFLATION_INPUTS,
//   modelStartDate = "2023-01-01",
//   operationStartDate = "2028-01-01",
//   decommissioningStartDate = "2068-01-01",
//   decommissioningEndDate = "2068-06-30",
//   vintage = DEFAULT_VINTAGE,
// }: {
//   triadsIncomeSetting?: ITriadsIncome;
//   constraintFactor?: number;
//   revenueSetup?: IRevenueSetup;
//   startingAssumptionsForBatteries?: IStartingBatteryAssumptions;
//   inflationInputs?: IInflationForm[];
//   modelStartDate?: string;
//   operationStartDate?: string;
//   decommissioningStartDate?: string;
//   decommissioningEndDate?: string;
//   vintage?: IVintage;
// }) {
//   const period =
//     getQuarterNumberFromModelStartDate(modelStartDate, decommissioningEndDate) -
//     1;

//   if (triadsIncomeSetting.switch == 0) {
//     return new Array(period).fill(0);
//   } else {
//     const inflatedUnitPrice = annualIndexToMonths(
//       (triadsIncomeSetting?.value || new Array(period).fill(0)).map(
//         (d, index, arr) => (d * 3 + 9 * arr[index + 1]) / 12
//       )
//     );

//     const indexValue = annualIndexToMonths(
//       inflationIndex({
//         inflationInputs,
//         baseYear: revenueSetup?.baseYear || 2023,
//         profile: revenueSetup?.inflation || "CPI",
//       }).slice(MODEL_START_YEAR - INFLATION_START_YEAR)
//     );
//     const operationsAsAPercentOfPeriod = getAsAPercentOfPeriod(
//       modelStartDate,
//       operationStartDate,
//       moment(decommissioningStartDate).add(-1, "days").format(DATE_FORMAT),
//       decommissioningEndDate
//     );
//     const averageBatteryCapacityInPeriod = roundArray(
//       vintage.totalGenerationCapacity.map(
//         (d) => d * 0.01 * startingAssumptionsForBatteries.batteryAvailability
//       ),
//       20
//     );

//     const forecastRevenue = multiplyNumber(
//       multiplyArrays([
//         operationsAsAPercentOfPeriod,
//         averageBatteryCapacityInPeriod,
//         inflatedUnitPrice,
//         normalizeArray(indexValue, period),
//       ]),
//       constraintFactor
//     );
//     return roundArray(forecastRevenue, 20);
//   }
// }
