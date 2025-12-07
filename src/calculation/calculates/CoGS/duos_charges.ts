import {
  INFLATION_START_YEAR,
  MODEL_START_YEAR,
} from "../../../utils/constant";
import {
  DEFAULT_AFRY_REVENUE_DATA,
  DEFAULT_BATTERY_DISPOSAL,
  DEFAULT_DETAILED_REVENUE_DATA,
  DEFAULT_INFLATION_INPUTS,
  DEFAULT_REVENUE_ASSUMPTIONS_DATA,
  DEFAULT_REVENUE_SETUP,
  DEFAULT_STARTING_BATTERY_ASSUMPTION,
  DEFAULT_VINTAGE,
} from "../constant";
import {
  IAfryRevenueData,
  IAssumptionData,
  IDetailedRevenueData,
  IInflationForm,
  IRevenueSetup,
  IStartingBatteryAssumptions,
  IVintage,
} from "../Revenue/type";
import {
  annualIndexToMonths,
  calcDaysInQuarter,
  getAsAPercentOfPeriod,
  getCyclesPerMonth,
  getQuarterNumberFromModelStartDate,
  inflationIndex,
  multiplyArrays,
  multiplyNumber,
  normalizeArray,
  sumArray,
  sumArrays,
} from "../utils";
import { DEFAULT_DUOS_CHARGE_SETTING } from "./constant";
import { IDuosChargeSetting } from "./type";

export function calcDUoSCharges({
  duosChargeSetting = DEFAULT_DUOS_CHARGE_SETTING,
  revenueSetup = DEFAULT_REVENUE_SETUP,
  assumptionsData = DEFAULT_REVENUE_ASSUMPTIONS_DATA,
  startingAssumptionsForBatteries = DEFAULT_STARTING_BATTERY_ASSUMPTION,
  modelStartDate = "2023-01-01",
  decommissioningStartDate = "2068-01-01",
  decommissioningEndDate = "2068-06-30",
  operationStartDate = "2028-01-01",
  operationEndDate = "2067-12-31",
  detailedRevenueData = DEFAULT_DETAILED_REVENUE_DATA,
  vintage = DEFAULT_VINTAGE,
  batteryDuration = 4,
  inflationInputs = DEFAULT_INFLATION_INPUTS,
  operationYears = 40,
  initialCapacity = 1000,
  opexSensitivity = 0,
  afryRevenueData = DEFAULT_AFRY_REVENUE_DATA,
}: {
  duosChargeSetting?: IDuosChargeSetting;
  revenueSetup?: IRevenueSetup;
  assumptionsData?: IAssumptionData[];
  detailedRevenueData?: IDetailedRevenueData[];
  startingAssumptionsForBatteries?: IStartingBatteryAssumptions;
  modelStartDate?: string;
  operationStartDate?: string;
  operationEndDate?: string;
  decommissioningStartDate?: string;
  decommissioningEndDate?: string;
  vintage?: IVintage;
  batteryDuration?: number;
  initialCapacity?: number;
  inflationInputs?: IInflationForm[];
  operationYears?: number;
  opexSensitivity?: number;
  afryRevenueData?: IAfryRevenueData[];
}) {
  const period =
    getQuarterNumberFromModelStartDate(modelStartDate, decommissioningEndDate) -
    1;
  // operationsAsAPercentOfPeriod calcs row 2626
  const numberOfDaysInMonth = calcDaysInQuarter(
    modelStartDate,
    decommissioningEndDate
  );
  // operationsAsAPercentOfPeriod calcs row 2627
  const operationsAsAPercentOfPeriod = getAsAPercentOfPeriod(
    modelStartDate,
    operationStartDate,
    operationEndDate,
    decommissioningEndDate
  );
  // cyclesInPeriod calcs row 2631
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
  // capacity calcs row 2630
  const capacity = vintage.totalGenerationCapacity;
  // mwhInPeriod calcs row 2632
  const mwhInPeriod = operationsAsAPercentOfPeriod.map(
    (d, index) => d * batteryDuration * cyclesInPeriod[index] * capacity[index]
  );
  if (duosChargeSetting.dnoRegion == -1) return new Array(period).fill(0);
  else {
    // calcs row 2645 ~ row 2654
    const demandRed = multiplyNumber(
      mwhInPeriod,
      (-duosChargeSetting.connectionSwitch *
        duosChargeSetting.demandRed *
        duosChargeSetting.duosData[0][duosChargeSetting.dnoRegion - 1]) /
        100
    );
    const demandGreen = multiplyNumber(
      mwhInPeriod,
      (-duosChargeSetting.connectionSwitch *
        duosChargeSetting.demandGreen *
        duosChargeSetting.duosData[2][duosChargeSetting.dnoRegion - 1]) /
        100
    );
    const demandAmber = multiplyNumber(
      mwhInPeriod,
      (-duosChargeSetting.connectionSwitch *
        duosChargeSetting.demandAmber *
        duosChargeSetting.duosData[1][duosChargeSetting.dnoRegion - 1]) /
        100
    );
    const importFixedCharge = multiplyNumber(
      mwhInPeriod,
      (-duosChargeSetting.connectionSwitch *
        duosChargeSetting.meteringPoints *
        duosChargeSetting.duosData[3][duosChargeSetting.dnoRegion - 1]) /
        100
    );
    const importCapacityCharge = multiplyNumber(
      multiplyArrays([operationsAsAPercentOfPeriod, numberOfDaysInMonth]),
      (-duosChargeSetting.connectionSwitch *
        initialCapacity *
        duosChargeSetting.duosData[4][duosChargeSetting.dnoRegion - 1]) /
        100
    );
    const exportExceededCapacityCharge = multiplyNumber(
      multiplyArrays([operationsAsAPercentOfPeriod, numberOfDaysInMonth]),
      (-duosChargeSetting.connectionSwitch *
        initialCapacity *
        duosChargeSetting.duosData[5][duosChargeSetting.dnoRegion - 1]) /
        100
    );
    const generationRed = multiplyNumber(
      mwhInPeriod,
      (-duosChargeSetting.connectionSwitch *
        duosChargeSetting.generationRed *
        duosChargeSetting.duosData[6][duosChargeSetting.dnoRegion - 1]) /
        100
    );
    const generationAmber = multiplyNumber(
      mwhInPeriod,
      (-duosChargeSetting.connectionSwitch *
        duosChargeSetting.generationAmber *
        duosChargeSetting.duosData[7][duosChargeSetting.dnoRegion - 1]) /
        100
    );
    const generationGreen = multiplyNumber(
      mwhInPeriod,
      (-duosChargeSetting.connectionSwitch *
        duosChargeSetting.generationGreen *
        duosChargeSetting.duosData[8][duosChargeSetting.dnoRegion - 1]) /
        100
    );
    const exportFixedCharge = multiplyNumber(
      multiplyArrays([operationsAsAPercentOfPeriod, numberOfDaysInMonth]),
      (-duosChargeSetting.connectionSwitch *
        duosChargeSetting.meteringPoints *
        duosChargeSetting.duosData[9][duosChargeSetting.dnoRegion - 1]) /
        100
    );

    // total calcs row 2655
    const total = sumArrays(
      demandAmber,
      demandGreen,
      demandRed,
      importFixedCharge,
      importCapacityCharge,
      exportExceededCapacityCharge,
      generationRed,
      generationGreen,
      generationAmber,
      exportFixedCharge
    );
    // indexValue calcs row 2663
    const indexValue = annualIndexToMonths(
      normalizeArray(
        inflationIndex({
          inflationInputs,
          baseYear: duosChargeSetting.baseYear,
          profile: duosChargeSetting.inflationProfile,
        }).slice(MODEL_START_YEAR - INFLATION_START_YEAR),
        operationYears + 10
      )
    );
    const forecastDUoScharge = total.map(
      (d, index) => d * indexValue[index] * (1 + opexSensitivity)
    );
    return forecastDUoScharge;
  }
}
