import {
  INFLATION_START_YEAR,
  MODEL_START_YEAR,
} from "../../../utils/constant";
import { IInflationForm } from "../Revenue/type";
import { DEFAULT_INFLATION_INPUTS } from "../constant";
import {
  annualIndexToMonths,
  getAsAPercentOfPeriod,
  getQuarterNumberFromModelStartDate,
  inflationIndex,
  normalizeArray,
  roundArray,
} from "../utils";
import { DEFAULT_SITE_SECURITY } from "./constant";
import { ISiteSecurity } from "./type";

export function calcSiteSecurity({
  initialCapacity = 1000,
  inflationInputs = DEFAULT_INFLATION_INPUTS,
  modelStartDate = "2023-01-01",
  operationStartDate = "2028-01-01",
  operationEndDate = "2068-01-01",
  decommissioningEndDate = "2068-06-30",
  siteSecurity = DEFAULT_SITE_SECURITY,
}: {
  siteSecurity?: ISiteSecurity;
  initialCapacity?: number;
  inflationInputs?: IInflationForm[];
  sensitivity?: number;
  operationYears?: number;
  modelStartDate?: string;
  operationStartDate?: string;
  decommissioningStartDate?: string;
  decommissioningEndDate?: string;
  operationEndDate?: string;
  battery_duration?: number;
}) {
  // siteSecurityCost = operationAsAPercentOfPeriod*monthlyFeesPerMW*indexValue
  const operationAsAPercentOfPeriod = getAsAPercentOfPeriod(
    modelStartDate,
    operationStartDate,
    operationEndDate,
    decommissioningEndDate
  );
  const period =
    getQuarterNumberFromModelStartDate(modelStartDate, decommissioningEndDate) -
    1;
  const indexValue = normalizeArray(
    annualIndexToMonths(
      inflationIndex({
        inflationInputs,
        baseYear: siteSecurity.baseYear,
        profile: siteSecurity.inflationProfile,
      }).slice(MODEL_START_YEAR - INFLATION_START_YEAR)
    ),
    period
  );

  const monthlyFeesPerMW =
    ((siteSecurity.annualFeesPerMW || 0) * initialCapacity) / -4;

  const siteSecurityCost = operationAsAPercentOfPeriod.map(
    (d, index) => d * indexValue[index] * monthlyFeesPerMW
  );

  return roundArray(siteSecurityCost, 10);
}
