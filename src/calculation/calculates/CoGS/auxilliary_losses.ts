import { MODEL_START_YEAR } from "../../../utils/constant";
import {
  DEFAULT_AFRY_REVENUE_DATA,
  DEFAULT_DETAILED_REVENUE_DATA,
  DEFAULT_INFLATION_INPUTS,
  DEFAULT_REVENUE_ASSUMPTIONS_DATA,
  DEFAULT_REVENUE_SETUP,
  DEFAULT_STARTING_BATTERY_ASSUMPTION,
} from "../constant";
import {
  IAfryRevenueData,
  IAssumptionData,
  IDetailedRevenueData,
  IInflationForm,
  IRevenueSetup,
  IStartingBatteryAssumptions,
} from "../Revenue/type";
import { calcInflationAdjustmentFactor } from "../Revenue/wholesale_day_ahead";
import {
  addZeros,
  annualIndexToMonths,
  getCyclesPerMonth,
  getQuarterNumberFromModelStartDate,
  inflationIndex,
  multiplyArrays,
  multiplyNumber,
  normalizeArray,
  normalizeArrayBySeasonality,
  roundArray,
} from "../utils";
import {
  DEFAULT_AUXILLIARY,
  DEFAULT_AVERAGE_WHOLESALE_DAY_AHEAD_PRICE,
} from "./constant";
import { IAuxilliaryLosses } from "./type";

export function calcAuxilliaryLosses({
  auxilliaryLossesSettings = DEFAULT_AUXILLIARY,
  averageWholeSaleDayAheadPrice = DEFAULT_AVERAGE_WHOLESALE_DAY_AHEAD_PRICE,
  revenueSetup = DEFAULT_REVENUE_SETUP,
  assumptionsData = DEFAULT_REVENUE_ASSUMPTIONS_DATA,
  initialCapacity = 1000,
  startingAssumptionsForBatteries = DEFAULT_STARTING_BATTERY_ASSUMPTION,
  inflationInputs = DEFAULT_INFLATION_INPUTS,
  modelStartDate = "2023-01-01",
  decommissioningStartDate = "2068-01-01",
  decommissioningEndDate = "2068-06-30",
  operationStartDate = "2028-01-01",
  operationYears = 40,
  detailedRevenueData = DEFAULT_DETAILED_REVENUE_DATA,
  afryRevenueData = DEFAULT_AFRY_REVENUE_DATA,
}: {
  auxilliaryLossesSettings?: IAuxilliaryLosses;
  averageWholeSaleDayAheadPrice?: number[];
  revenueSetup?: IRevenueSetup;
  assumptionsData?: IAssumptionData[];
  detailedRevenueData?: IDetailedRevenueData[];
  initialCapacity?: number;
  startingAssumptionsForBatteries?: IStartingBatteryAssumptions;
  inflationInputs?: IInflationForm[];
  operationYears?: number;
  modelStartDate?: string;
  operationStartDate?: string;
  decommissioningStartDate?: string;
  decommissioningEndDate?: string;
  afryRevenueData?: IAfryRevenueData[];
}) {
  const period =
    getQuarterNumberFromModelStartDate(modelStartDate, decommissioningEndDate) -
    1;

  // calcs 17.04 Auxiliary losses ~~~ Indexed quarterly cost on annual timeline ~~~ Indexation on model timeline row 2570
  const indexValue = annualIndexToMonths(
    normalizeArray(
      inflationIndex({
        inflationInputs,
        baseYear: auxilliaryLossesSettings.baseYear,
        profile: auxilliaryLossesSettings.inflationProfile,
      }).slice(MODEL_START_YEAR - 2021),
      operationYears + 20
    )
  );

  const selectedAssumptionsData = assumptionsData?.find(
    (d) => d?.providerName == revenueSetup.forecastProviderChoice
  )?.data;

  const tempinflationAdjustmentFactor = calcInflationAdjustmentFactor({
    inflationInputs,
    providerInflationProfile: selectedAssumptionsData?.inflation as string,
    providerBaseYear: selectedAssumptionsData?.baseYear as number,
    projectInflationProfile: revenueSetup.inflation,
    projectBaseYear: revenueSetup.baseYear,
  });
  // calcs 15.02 Project inflation to use in financial model ~~~ Inflation adjustment factor row 2378
  const inflationAdjustmentFactor = normalizeArray(
    annualIndexToMonths(tempinflationAdjustmentFactor),
    period
  );

  // calcs 17.04 Auxiliary losses ~~~ Quarterly cost ~~~ Import price row 2558
  const importPrice = multiplyArrays([
    normalizeArrayBySeasonality(
      multiplyNumber(averageWholeSaleDayAheadPrice, 1),
      period
    ),
    inflationAdjustmentFactor,
  ]);

  // calcs 17.04 Auxiliary losses ~~~ Quarterly cost ~~~ Auxiliary loss factor row 2559
  const auxilliaryLossFactor =
    auxilliaryLossesSettings?.lossFactor?.find(
      (d) => d.duration == startingAssumptionsForBatteries.batteryDuration
    )?.auxiliaryLossValue / 100 || 0;
  // calcs 17.04 Auxiliary losses ~~~ Quarterly cost ~~~ Installed capacity row 2560
  const installedCapacity = initialCapacity;

  // calcs 17.04 Auxiliary losses ~~~ Quarterly cost ~~~ Auxiliary losses row 2562
  const auxiliaryLosses =
    auxilliaryLossFactor *
    installedCapacity *
    startingAssumptionsForBatteries.batteryDuration;

  // calcs 17.04 Auxiliary losses ~~~ Quarterly cost ~~~ Cycles in period row 2563
  const cyclesInPeriod = getCyclesPerMonth({
    revenueSetup,
    assumptionsData,
    startingAssumptionsForBatteries,
    detailedRevenueData,
    modelStartDate,
    operationStartDate,
    decommissioningStartDate,
    decommissioningEndDate,
    afryRevenueData,
  });

  // calcs 17.04 Auxiliary losses ~~~ Quarterly cost ~~~ Cost per quarter row 2564

  const costPerQuarter = multiplyNumber(
    multiplyArrays([importPrice, cyclesInPeriod]),
    auxiliaryLosses / 1000
  );

  // calcs 17.04 Auxiliary losses ~~~ Forecast cost on model timeline ~~~ Auxiliary losses row 2576
  const auxiliaryCostResult = roundArray(
    costPerQuarter.map((d, index) => -d * indexValue[index]),
    10
  );

  return addZeros(auxiliaryCostResult, period);
}
