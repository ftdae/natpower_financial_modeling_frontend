import moment from "moment";
import { DATE_FORMAT } from "../../../utils/usePrameter";
import {
  DEFAULT_AFRY_REVENUE_DATA,
  DEFAULT_DETAILED_REVENUE_DATA,
  DEFAULT_INFLATION_INPUTS,
  DEFAULT_REVENUE_ASSUMPTIONS_DATA,
  DEFAULT_REVENUE_SETUP,
  DEFAULT_STARTING_BATTERY_ASSUMPTION,
  DEFAULT_VINTAGE,
} from "../constant";
import {
  addZeros,
  annualIndexToMonths,
  arrayDivide,
  getAsAPercentOfPeriod,
  // getAsAPercentOfPeriodUpdated,
  getQuarterNumberFromModelStartDate,
  inflationIndex,
  normalizeArray,
  normalizeArrayBySeasonality,
  roundArray,
  sumArrays,
} from "../utils";
import {
  IAfryRevenueData,
  IAssumptionData,
  IDetailedRevenueData,
  IInflationForm,
  IRevenueSetup,
  IScenario,
  IStartingBatteryAssumptions,
  IVintage,
} from "./type";

export function getActiveScenarioRevenueItems({
  revenueSetup = DEFAULT_REVENUE_SETUP,
  assumptionsData = DEFAULT_REVENUE_ASSUMPTIONS_DATA,
  startingAssumptionsForBatteries = DEFAULT_STARTING_BATTERY_ASSUMPTION,
  detailedRevenueData = DEFAULT_DETAILED_REVENUE_DATA,
}: {
  revenueSetup: IRevenueSetup;
  assumptionsData: IAssumptionData[];
  startingAssumptionsForBatteries: IStartingBatteryAssumptions;
  detailedRevenueData: IDetailedRevenueData[];
}): IScenario[] {
  const selectedAssumptionsData = assumptionsData.find(
    (d) => d?.providerName == revenueSetup.forecastProviderChoice
  )?.data;
  const activeScenario =
    detailedRevenueData
      .find((d) => d?.forecastProvider == revenueSetup.forecastProviderChoice)
      ?.dataByBatteryDuration.find(
        (d) => d?.duration == startingAssumptionsForBatteries.batteryDuration
      )
      ?.dataByTradingStrategy.find(
        (d) => d?.tradingStrategy == selectedAssumptionsData?.tradingStrategy
      )
      ?.dataByRegion.find((d) => d?.region == selectedAssumptionsData?.region)
      ?.dataByItems || new Array(300).fill(0);

  return activeScenario;
}

/**14 Revenue Forecasts  ~~~  The first above line of 14.04 Revenue forecast*/
export function calcInflationAdjustmentFactor({
  inflationInputs = DEFAULT_INFLATION_INPUTS,
  providerInflationProfile = "CPI to 2050 then nil",
  providerBaseYear = 2023,
  projectInflationProfile = "CPI to 2050 then nil",
  projectBaseYear = 2023,
}: {
  inflationInputs: IInflationForm[];
  providerInflationProfile: string;
  providerBaseYear: number;
  projectInflationProfile: string;
  projectBaseYear: number;
}) {
  const providerInflationValue = inflationIndex({
    inflationInputs,
    baseYear: providerBaseYear,
    profile: providerInflationProfile,
  });
  let projectInflatonValue = new Array(250).fill(1);

  if (projectInflationProfile == "") {
    projectInflatonValue = new Array(250).fill(1);
  } else {
    projectInflatonValue = inflationIndex({
      inflationInputs,
      baseYear: projectBaseYear,
      profile: projectInflationProfile,
    });
  }
  const inflationAdjustmentFactor = arrayDivide(
    projectInflatonValue,
    providerInflationValue
  );
  const len = inflationAdjustmentFactor.length;
  const adjustedArray = [];
  for (let i = 0; i < len; i++) {
    if (i >= 2) adjustedArray[i - 2] = inflationAdjustmentFactor[i];
  }

  return roundArray(adjustedArray, 20);
}

/**Calcs 8 Bess generation  ~~~ 8.01 Total generation  ~~~ Degraded capacity adjusted for efficiency and availability
 */
export function calcDegradedCapacityAdjustedForEfficiencyAndAvailability({
  // startingAssumptionsForBatteries = DEFAULT_STARTING_BATTERY_ASSUMPTION,
  degradadedCapaityAdjustedForEfficiency = [],
}: {
  startingAssumptionsForBatteries: IStartingBatteryAssumptions;
  degradadedCapaityAdjustedForEfficiency: number[];
}): number[] {
  // const degradedCapacityAdjustedForEfficiencyAndAvailability =
  //   degradadedCapaityAdjustedForEfficiency.map(
  //     (d) => d * startingAssumptionsForBatteries.batteryAvailability
  //   );
  return degradadedCapaityAdjustedForEfficiency;
}

export function calcWholeSaleDayAheadRevenue({
  revenueSensitivity = 0,
  revenueSetup = DEFAULT_REVENUE_SETUP,
  assumptionsData = DEFAULT_REVENUE_ASSUMPTIONS_DATA,
  detailedRevenueData = DEFAULT_DETAILED_REVENUE_DATA,
  startingAssumptionsForBatteries = DEFAULT_STARTING_BATTERY_ASSUMPTION,
  inflationInputs = DEFAULT_INFLATION_INPUTS,
  modelStartDate = "2023-01-01",
  operationStartDate = "2028-01-01",
  decommissioningStartDate = "2068-01-01",
  decommissioningEndDate = "2068-06-30",
  vintage = DEFAULT_VINTAGE,
  afryRevenueData = DEFAULT_AFRY_REVENUE_DATA,
}: {
  revenueSensitivity?: number;
  revenueSetup?: IRevenueSetup;
  assumptionsData?: IAssumptionData[];
  detailedRevenueData?: IDetailedRevenueData[];
  startingAssumptionsForBatteries?: IStartingBatteryAssumptions;
  inflationInputs?: IInflationForm[];
  modelStartDate?: string;
  operationStartDate?: string;
  decommissioningStartDate?: string;
  decommissioningEndDate?: string;
  vintage?: IVintage;
  afryRevenueData?: IAfryRevenueData[];
}) {
  const period =
    getQuarterNumberFromModelStartDate(modelStartDate, decommissioningEndDate) -
    1;
  //wholeSaleDayAheadRevenue = forecastProviderInputs * inflationAdjustmentFactor * operationsAsAPercentOfPeriod *Degraded capacity adjusted for efficiency and availability*(1+revenue sensitivity)
  const selectedAssumptionsData = assumptionsData.find(
    (d) => d?.providerName == revenueSetup.forecastProviderChoice
  )?.data;

  // const data =
  //   getActiveScenarioRevenueItems({
  //     revenueSetup,
  //     assumptionsData,
  //     startingAssumptionsForBatteries,
  //     detailedRevenueData,
  //   })?.find((d) => d?.item == "Wholesale Day Ahead Total Revenues")?.data ||
  //   new Array(300).fill(0);

  let forecastProviderInputs = new Array(period).fill(0);
  if (revenueSetup.forecastProviderChoice == "Modo")
    forecastProviderInputs = normalizeArrayBySeasonality(
      roundArray(
        getActiveScenarioRevenueItems({
          revenueSetup,
          assumptionsData,
          startingAssumptionsForBatteries,
          detailedRevenueData,
        })
          ?.find((d) => d?.item == "Wholesale Day Ahead Total Revenues")
          ?.data.map((d) => d / 1000) || new Array(period).fill(0),
        20
      ),
      period
    );
  else if (revenueSetup.forecastProviderChoice == "Afry") {
    const sellData: number[] = afryRevenueData.find(
      (d) => d?.item == "Day Ahead Sell Revenue"
    )?.data;
    const buyData: number[] = afryRevenueData.find(
      (d) => d?.item == "Day Ahead Buy Costs"
    )?.data;
    forecastProviderInputs = sumArrays(sellData, buyData);
  }
  // const forecastProviderInputs =
  //   normalizeArrayBySeasonality(multiplyNumber(data, 1), period).map(
  //     (d) => d / 1000
  //   ) || new Array(300).fill(0);

  const tempinflationAdjustmentFactor = roundArray(
    calcInflationAdjustmentFactor({
      inflationInputs,
      providerInflationProfile: selectedAssumptionsData?.inflation as string,
      providerBaseYear: selectedAssumptionsData?.baseYear as number,
      projectInflationProfile: revenueSetup.inflation,
      projectBaseYear: revenueSetup.baseYear,
    }),
    20
  );
  const inflationAdjustmentFactor = normalizeArray(
    annualIndexToMonths(tempinflationAdjustmentFactor),
    period
  );

  const operationsAsAPercentOfPeriod = getAsAPercentOfPeriod(
    modelStartDate,
    operationStartDate,
    moment(decommissioningStartDate).add(-1, "days").format(DATE_FORMAT),
    decommissioningEndDate
  );

  const degradadedCapacityAdjustedForEffiAndAvailability = roundArray(
    vintage.totalGenerationCapacity.map(
      (d) => d * 0.01 * startingAssumptionsForBatteries.batteryAvailability
    ),
    20
  );

  // const percentTest = getAsAPercentOfPeriodUpdated(modelStartDate, "2030-01-01", "2069-12-31", '2070-06-30')
  return addZeros(
    roundArray(
      degradadedCapacityAdjustedForEffiAndAvailability.map(
        (d, index) =>
          d *
          forecastProviderInputs[index] *
          operationsAsAPercentOfPeriod[index] *
          inflationAdjustmentFactor[index] *
          (1 + revenueSensitivity)
      ),
      20
    ),
    period
  );
}
