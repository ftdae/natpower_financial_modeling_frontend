// import moment from "moment";
// import {
//   DEFAULT_AFRY_REVENUE_DATA,
//   DEFAULT_DETAILED_REVENUE_DATA,
//   DEFAULT_INFLATION_INPUTS,
//   DEFAULT_REVENUE_ASSUMPTIONS_DATA,
//   DEFAULT_REVENUE_SETUP,
//   DEFAULT_STARTING_BATTERY_ASSUMPTION,
//   DEFAULT_VINTAGE,
// } from "../constant";
// import {
//   addZeros,
//   annualIndexToMonths,
//   getAsAPercentOfPeriod,
//   getQuarterNumberFromModelStartDate,
//   normalizeArray,
//   normalizeArrayBySeasonality,
//   roundArray,
//   sumArrays,
// } from "../utils";
// import {
//   IAfryRevenueData,
//   IAssumptionData,
//   IDetailedRevenueData,
//   IInflationForm,
//   IRevenueSetup,
//   IStartingBatteryAssumptions,
//   IVintage,
// } from "./type";
// import {
//   calcInflationAdjustmentFactor,
//   getActiveScenarioRevenueItems,
// } from "./wholesale_day_ahead";
// import { DATE_FORMAT } from "../../../utils/usePrameter";

// export function calcBalancingMechanismRevenue({
//   revenueSensitivity = 0,
//   revenueSetup = DEFAULT_REVENUE_SETUP,
//   assumptionsData = DEFAULT_REVENUE_ASSUMPTIONS_DATA,
//   detailedRevenueData = DEFAULT_DETAILED_REVENUE_DATA,
//   startingAssumptionsForBatteries = DEFAULT_STARTING_BATTERY_ASSUMPTION,
//   inflationInputs = DEFAULT_INFLATION_INPUTS,
//   modelStartDate = "2023-01-01",
//   operationStartDate = "2028-01-01",
//   decommissioningStartDate = "2068-01-01",
//   decommissioningEndDate = "2068-06-30",
//   vintage = DEFAULT_VINTAGE,
//   afryRevenueData = DEFAULT_AFRY_REVENUE_DATA,
// }: {
//   revenueSensitivity?: number;
//   revenueSetup?: IRevenueSetup;
//   assumptionsData?: IAssumptionData[];
//   detailedRevenueData?: IDetailedRevenueData[];
//   startingAssumptionsForBatteries?: IStartingBatteryAssumptions;
//   inflationInputs?: IInflationForm[];
//   modelStartDate?: string;
//   operationStartDate?: string;
//   decommissioningStartDate?: string;
//   decommissioningEndDate?: string;
//   vintage?: IVintage;
//   afryRevenueData?: IAfryRevenueData[];
// }) {
//   const period =
//     getQuarterNumberFromModelStartDate(modelStartDate, decommissioningEndDate) -
//     1;
//   //wholeSaleDayAheadRevenue = forecastProviderInputs * inflationAdjustmentFactor * operationsAsAPercentOfPeriod *Degraded capacity adjusted for efficiency and availability*(1+revenue sensitivity)

//   const selectedAssumptionsData = assumptionsData.find(
//     (d) => d?.providerName == revenueSetup.forecastProviderChoice
//   )?.data;

//   let forecastProviderInputs = new Array(period).fill(0);
//   if (revenueSetup.forecastProviderChoice == "Modo")
//     forecastProviderInputs = normalizeArrayBySeasonality(
//       roundArray(
//         getActiveScenarioRevenueItems({
//           revenueSetup,
//           assumptionsData,
//           startingAssumptionsForBatteries,
//           detailedRevenueData,
//         })
//           ?.find((d) => d?.item == "Balancing Mechanism Revenues")
//           ?.data.map((d) => d / 1000) || new Array(period).fill(0),
//         20
//       ),
//       period
//     );
//   else if (revenueSetup.forecastProviderChoice == "Afry") {
//     const sellData: number[] = afryRevenueData.find(
//       (d) => d?.item == "Balancing Mechanism Offer Revenues"
//     )?.data;
//     const buyData: number[] = afryRevenueData.find(
//       (d) => d?.item == "Balancing Mechanism Bid Costs"
//     )?.data;
//     forecastProviderInputs = normalizeArrayBySeasonality(
//       sumArrays(sellData, buyData),
//       period
//     );
//   }
//   const tempinflationAdjustmentFactor = roundArray(
//     calcInflationAdjustmentFactor({
//       inflationInputs,
//       providerInflationProfile: selectedAssumptionsData?.inflation as string,
//       providerBaseYear: selectedAssumptionsData?.baseYear as number,
//       projectInflationProfile: revenueSetup.inflation,
//       projectBaseYear: revenueSetup.baseYear,
//     }),
//     10
//   );
//   const inflationAdjustmentFactor = normalizeArray(
//     annualIndexToMonths(tempinflationAdjustmentFactor),
//     period
//   );
//   const operationsAsAPercentOfPeriod = getAsAPercentOfPeriod(
//     modelStartDate,
//     operationStartDate,
//     moment(decommissioningStartDate).add(-1, "days").format(DATE_FORMAT),
//     decommissioningEndDate
//   );
//   const degradadedCapacityAdjustedForEffiAndAvailability = roundArray(
//     vintage.totalGenerationCapacity.map(
//       (d) => d * 0.01 * startingAssumptionsForBatteries.batteryAvailability
//     ),
//     10
//   );
//   return addZeros(
//     roundArray(
//       degradadedCapacityAdjustedForEffiAndAvailability.map(
//         (d, index) =>
//           d *
//           forecastProviderInputs[index] *
//           operationsAsAPercentOfPeriod[index] *
//           inflationAdjustmentFactor[index] *
//           (1 + revenueSensitivity)
//       ),
//       20
//     ),
//     period
//   );
// }
