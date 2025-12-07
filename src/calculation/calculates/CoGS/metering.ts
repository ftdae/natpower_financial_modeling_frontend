import {
  INFLATION_START_YEAR,
  MODEL_START_YEAR,
} from "../../../utils/constant";
import {
  DEFAULT_INFLATION_INPUTS,
  DEFAULT_STARTING_BATTERY_ASSUMPTION,
} from "../constant";
import { IInflationForm, IStartingBatteryAssumptions } from "../Revenue/type";
import {
  addZeros,
  annualIndexToMonths,
  getQuarterNumberFromModelStartDate,
  getOperationsAsAPercentOfPeriod,
  inflationIndex,
  normalizeArray,
  roundArray,
  getAsAPercentOfPeriod,
} from "../utils";
import { DEFAULT_METERING } from "./constant";
import { IMetering } from "./type";

export function calcMetering({
  meteringSettings = DEFAULT_METERING,
  initialCapacity = 1000,
  startingAssumptionsForBatteries = DEFAULT_STARTING_BATTERY_ASSUMPTION,
  inflationInputs = DEFAULT_INFLATION_INPUTS,
  modelStartDate = "2023-01-01",
  decommissioningEndDate = "2068-06-30",
  operationStartDate = "2028-01-01",
  operationEndDate = "2067-12-31",
  operationYears = 40,
  opexSensitivity = 0,
}: {
  meteringSettings?: IMetering;
  initialCapacity?: number;
  startingAssumptionsForBatteries?: IStartingBatteryAssumptions;
  inflationInputs?: IInflationForm[];
  operationYears?: number;
  modelStartDate?: string;
  operationStartDate?: string;
  operationEndDate?: string;
  decommissioningEndDate?: string;
  opexSensitivity?: number;
}) {
  const period =
    getQuarterNumberFromModelStartDate(modelStartDate, decommissioningEndDate) -
    1;
  const operationsAsAPercentOfPeriod = getAsAPercentOfPeriod(
    modelStartDate,
    operationStartDate,
    operationEndDate,
    decommissioningEndDate
  );
  const indexValue = annualIndexToMonths(
    normalizeArray(
      inflationIndex({
        inflationInputs,
        baseYear: meteringSettings.baseYear,
        profile: meteringSettings.inflationProfile,
      }).slice(MODEL_START_YEAR - INFLATION_START_YEAR),
      70
    )
  );

  const capacity = initialCapacity;

  const annualCost =
    meteringSettings.annualCost?.find(
      (d) => d.duration == startingAssumptionsForBatteries.batteryDuration
    )?.annualCostPerMW || 0;
  const costPerMonth = ((1 + opexSensitivity) * annualCost * capacity) / 4;

  const metering = operationsAsAPercentOfPeriod.map(
    (d, index) => -d * indexValue[index] * costPerMonth
  );
  return addZeros(roundArray(metering, 10), period);
}
