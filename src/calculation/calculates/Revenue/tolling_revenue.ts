import {
  DEFAULT_DETAILED_REVENUE_DATA,
  DEFAULT_INFLATION_INPUTS,
  DEFAULT_REVENUE_ASSUMPTIONS_DATA,
  DEFAULT_REVENUE_SETUP,
  DEFAULT_STARTING_BATTERY_ASSUMPTION,
  DEFAULT_TOLLING_SETTING,
  DEFAULT_VINTAGE,
} from "../constant";
import { getAsAPercentOfPeriod, multiplyNumber, roundArray } from "../utils";
import {
  IAssumptionData,
  IDetailedRevenueData,
  IInflationForm,
  IRevenueSetup,
  IStartingBatteryAssumptions,
  ITollingSetting,
  IVintage,
} from "./type";

export function calcTollingRevenue({
  tollingSetting = DEFAULT_TOLLING_SETTING,
  vintage = DEFAULT_VINTAGE,
  startingAssumptionsForBatteries = DEFAULT_STARTING_BATTERY_ASSUMPTION,
  modelStartDate = "2023-01-01",
  decommissioningEndDate = "2068-06-30",
}: {
  tollingSetting?: ITollingSetting;
  vintage?: IVintage;
  batteryDuration?: number;
  revenueSensitivity?: number;
  revenueSetup?: IRevenueSetup;
  assumptionsData?: IAssumptionData[];
  detailedRevenueData?: IDetailedRevenueData[];
  startingAssumptionsForBatteries?: IStartingBatteryAssumptions;
  inflationInputs?: IInflationForm[];
  modelStartDate?: string;
  operationStartDate?: string;
  developmentStartDate?: string;
  decommissioningStartDate?: string;
  decommissioningEndDate?: string;
}) {
  // const period =
  //   getQuarterNumberFromModelStartDate(modelStartDate, decommissioningEndDate) -
  //   1;
  // // numberOfDaysInQuarter calcs row 2003
  // const numberOfDaysInQuarter = calcDaysInQuarter(
  //   modelStartDate,
  //   decommissioningEndDate
  // );
  // tollingAsAPercentOfPeriod calcs row 2008
  const tollingAsAPercentOfPeriod = getAsAPercentOfPeriod(
    modelStartDate,
    tollingSetting.startDate,
    tollingSetting.endDate,
    decommissioningEndDate
  );

  // degradadedCapacityAdjustedForEffiAndAvailability calcs row 1900
  const degradadedCapacityAdjustedForEffiAndAvailability = roundArray(
    vintage?.totalGenerationCapacity.map(
      (d: number) =>
        d * 0.01 * startingAssumptionsForBatteries.batteryAvailability
    ),
    20
  );
  // // cyclesInPeriod calcs row 1906
  // const cyclesInPeriod = getCyclesPerMonth({
  //   revenueSetup,
  //   assumptionsData,
  //   startingAssumptionsForBatteries,
  //   detailedRevenueData,
  //   modelStartDate,
  //   operationStartDate,
  //   decommissioningStartDate,
  //   decommissioningEndDate
  // })
  // // devToDecomEndFlag calcs row 1905
  // const devToDecomEndFlag = getAsAPercentOfPeriod(
  //   modelStartDate,
  //   developmentStartDate,
  //   decommissioningEndDate,
  //   decommissioningEndDate
  // );

  // tollingActiveRevenueSplit calcs F1934
  const tollingActiveRevenueSplit =
    tollingSetting.tollingSwitch * tollingSetting.tollingPercentage;

  // totalCapactiyForTolling calcs row 1961
  const totalCapactiyForTolling = tollingAsAPercentOfPeriod.map(
    (value, index) =>
      value *
      degradadedCapacityAdjustedForEffiAndAvailability[index] *
      tollingActiveRevenueSplit
  );
  // // totalGenerationForTolling calcs row 1966
  // const totalGenerationForTolling = degradadedCapacityAdjustedForEffiAndAvailability.map((value, index) => (
  //   devToDecomEndFlag[index] * cyclesInPeriod[index] * batteryDuration * value
  // ))
  // quarterlyTollingFees calcs F2013
  const quarterlyTollingFees = tollingSetting.tollingPrice / 4;
  // forecastRevenueForTolling calcs row 2021
  const forecastRevenueForTolling = multiplyNumber(
    totalCapactiyForTolling,
    quarterlyTollingFees
  );
  return forecastRevenueForTolling;
}
