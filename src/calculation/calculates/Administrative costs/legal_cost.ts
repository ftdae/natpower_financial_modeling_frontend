import {
  INFLATION_START_YEAR,
  MODEL_START_YEAR,
} from "../../../utils/constant";
import { IInflationForm } from "../Revenue/type";
import { DEFAULT_INFLATION_INPUTS } from "../constant";
import {
  addZeros,
  annualIndexToMonths,
  getAsAPercentOfPeriod,
  getQuarterNumberFromModelStartDate,
  inflationIndex,
  normalizeArray,
  roundArray,
} from "../utils";
import { DEFAULT_LEGAL_COST } from "./constant";
import { ILegalCost } from "./type";

export function calcLegalCosts({
  legalCosts = DEFAULT_LEGAL_COST,
  inflationInputs = DEFAULT_INFLATION_INPUTS,
  opexSensitivity = 0,
  operationStartDate = "2028-01-01",
  modelStartDate = "2023-01-01",
  operationEndDate = "2067-12-31",
  decommissioningEndDate = "2068-06-30",
}: {
  legalCosts?: ILegalCost;
  inflationInputs?: IInflationForm[];
  initialCapacity?: number;
  opexSensitivity?: number;
  operationStartDate?: string;
  modelStartDate?: string;
  operationEndDate?: string;
  decommissioningEndDate?: string;
}) {
  const period =
    getQuarterNumberFromModelStartDate(modelStartDate, decommissioningEndDate) -
    1;
  // siteSecurityCost = operationAsAPercentOfPeriod*monthlyFeesPerMW*indexValue
  const operationAsAPercentOfPeriod = getAsAPercentOfPeriod(
    modelStartDate,
    operationStartDate,
    operationEndDate,
    decommissioningEndDate
  );

  const indexValue = normalizeArray(
    annualIndexToMonths(
      inflationIndex({
        inflationInputs,
        baseYear: legalCosts.baseYear,
        profile: legalCosts.inflationProfile,
      }).slice(MODEL_START_YEAR - INFLATION_START_YEAR)
    ),
    period
  );

  const monthlyFeesPerMW =
    ((legalCosts?.annualCost || 0) * (1 + opexSensitivity)) / -12;

  const legalCostsForecast = operationAsAPercentOfPeriod.map(
    (d, index) => d * indexValue[index] * monthlyFeesPerMW
  );

  return addZeros(roundArray(legalCostsForecast, 10), period);
}
