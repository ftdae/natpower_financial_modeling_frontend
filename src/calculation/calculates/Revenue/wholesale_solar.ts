import { DEFAULT_AVERAGE_WHOLESALE_DAY_AHEAD_PRICE } from "../CoGS/constant";
import {
  DEFAULT_AFRY_REVENUE_DATA,
  DEFAULT_DETAILED_REVENUE_DATA,
  DEFAULT_INFLATION_INPUTS,
  DEFAULT_RAMP_RATE_SETTINGS,
  DEFAULT_REVENUE_ASSUMPTIONS_DATA,
  DEFAULT_REVENUE_SETUP,
  DEFAULT_SOLAR_REVENUE_SETTINGS,
  DEFAULT_STARTING_BATTERY_ASSUMPTION,
  DEFAULT_VINTAGE,
} from "../constant";
import {
  annualIndexToMonths,
  getFlagOfPeriod,
  getQuarterNumberFromModelStartDate,
  normalizeArray,
  roundArray,
} from "../utils";
import {
  IAfryRevenueData,
  IAssumptionData,
  IDetailedRevenueData,
  IInflationForm,
  IRampRateSettings,
  IRevenueSetup,
  ISolarRevenueSettings,
  IStartingBatteryAssumptions,
  IVintage,
} from "./type";
import { calcInflationAdjustmentFactor } from "./wholesale_day_ahead";

export function calcSolarRevenue({
  // solarFlag
  // ramp rate restriction
  // solar generation
  //
  solarRevenueSettings = DEFAULT_SOLAR_REVENUE_SETTINGS,
  initialCapacity = 1000,
  operationEndDate = "2067-12-31",
  modelStartDate = "2023-01-01",
  operationStartDate = "2028-01-01",
  decommissioningStartDate = "2068-01-01",
  decommissioningEndDate = "2068-06-30",
  vintage = DEFAULT_VINTAGE,
  averageWholeSaleDayAheadPrice = DEFAULT_AVERAGE_WHOLESALE_DAY_AHEAD_PRICE,
  revenueSensitivity = 0,
  rampRateSettings = DEFAULT_RAMP_RATE_SETTINGS,

  revenueSetup = DEFAULT_REVENUE_SETUP,
  assumptionsData = DEFAULT_REVENUE_ASSUMPTIONS_DATA,
  detailedRevenueData = DEFAULT_DETAILED_REVENUE_DATA,
  startingAssumptionsForBatteries = DEFAULT_STARTING_BATTERY_ASSUMPTION,
  inflationInputs = DEFAULT_INFLATION_INPUTS,

  afryRevenueData = DEFAULT_AFRY_REVENUE_DATA,
}: {
  solarRevenueSettings?: ISolarRevenueSettings;
  initialCapacity?: number;
  operationEndDate?: string;
  modelStartDate?: string;
  operationStartDate?: string;
  decommissioningStartDate?: string;
  decommissioningEndDate?: string;
  averageWholeSaleDayAheadPrice?: number[];
  revenueSensitivity?: number;
  rampRateSettings?: IRampRateSettings;

  revenueSetup?: IRevenueSetup;
  assumptionsData?: IAssumptionData[];
  detailedRevenueData?: IDetailedRevenueData[];
  startingAssumptionsForBatteries?: IStartingBatteryAssumptions;
  inflationInputs?: IInflationForm[];

  vintage?: IVintage;
  afryRevenueData?: IAfryRevenueData[];
}) {
  const period =
    getQuarterNumberFromModelStartDate(modelStartDate, decommissioningEndDate) -
    1;

  const solarFlag = solarRevenueSettings.solarSwitch;
  const quarterlyPVenergyProduction =
    (solarRevenueSettings.pvEnergy *
      (1 + solarRevenueSettings.trackingPercentage / 100)) /
    4;
  const operationStartQuarterNumber =
    getQuarterNumberFromModelStartDate(modelStartDate, operationStartDate) - 1;

  const operationFlag = getFlagOfPeriod(
    modelStartDate,
    operationStartDate,
    operationEndDate,
    decommissioningEndDate
  );

  let solarTotalGeneration: number[] = new Array(period).fill(0);
  const quarterlySolarRetentionPercentage = annualIndexToMonths(
    solarRevenueSettings.solarRetentionRate
  );
  //   const bessGeneration = vintage.electricitySold;
  for (let i = 0; i < period; i++) {
    if (i < operationStartQuarterNumber - 1) solarTotalGeneration[i] = 0;
    else
      solarTotalGeneration[i] =
        (quarterlySolarRetentionPercentage[
          i + 1 - operationStartQuarterNumber
        ] *
          initialCapacity *
          quarterlyPVenergyProduction *
          operationFlag[i] *
          solarFlag) /
        100;
  }
  //   const totalGeneration = sumArrays(bessGeneration, solarTotalGeneration);

  const selectedAssumptionsData = assumptionsData.find(
    (d) => d?.providerName == revenueSetup.forecastProviderChoice
  )?.data;

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
  const tempinflationAdjustmentFactor = roundArray(
    calcInflationAdjustmentFactor({
      inflationInputs,
      providerInflationProfile: selectedAssumptionsData?.inflation as string,
      providerBaseYear: selectedAssumptionsData?.baseYear as number,
      projectInflationProfile: revenueSetup.inflation,
      projectBaseYear: revenueSetup.baseYear,
    }),
    10
  );

  const inflationAdjustmentFactor = normalizeArray(
    annualIndexToMonths(tempinflationAdjustmentFactor),
    period
  );
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
  const rampRate = rampRateSettings.rampPercentage / 100;
  const solarRevenueResult = solarTotalGeneration.map(
    (d, index) =>
      d *
      (1 + revenueSensitivity) *
      (1 + rampRate) *
      averageWholeSaleDayAheadPrice[index] *
      inflationAdjustmentFactor[index]
  );
  return solarRevenueResult;
}
