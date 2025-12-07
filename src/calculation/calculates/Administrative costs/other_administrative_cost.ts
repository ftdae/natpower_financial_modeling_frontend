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
import { DEFAULT_OTHER_ADMIN_COSTs } from "./constant";
import { IOtherAdminCosts } from "./type";

export function calcOtherAdminCosts({
  otherAdministrativeCosts = DEFAULT_OTHER_ADMIN_COSTs,
  opexSensitivity = 0,
  inflationInputs = DEFAULT_INFLATION_INPUTS,
  operationStartDate = "2028-01-01",
  modelStartDate = "2023-01-01",
  operationEndDate = "2067-12-31",
  decommissioningEndDate = "2068-06-30",
}: {
  otherAdministrativeCosts?: IOtherAdminCosts;
  opexSensitivity?: number;
  inflationInputs?: IInflationForm[];
  operationStartDate?: string;
  modelStartDate?: string;
  operationEndDate?: string;
  decommissioningEndDate?: string;
}) {
  const period =
    getQuarterNumberFromModelStartDate(modelStartDate, decommissioningEndDate) -
    1;
  const monthlyCost =
    ((otherAdministrativeCosts.annualAccountingFeesAndAudit * 1 +
      otherAdministrativeCosts.annualIT * 1 +
      otherAdministrativeCosts.annualOtherCost * 1) *
      (1 + opexSensitivity)) /
    4;
  const operationsAsAPercentOfPeriod = getAsAPercentOfPeriod(
    modelStartDate,
    operationStartDate,
    operationEndDate,
    decommissioningEndDate
  );

  const indexValue = normalizeArray(
    annualIndexToMonths(
      inflationIndex({
        inflationInputs,
        baseYear: otherAdministrativeCosts.baseYear,
        profile: otherAdministrativeCosts.inflationProfile,
      }).slice(MODEL_START_YEAR - INFLATION_START_YEAR)
    ),
    period
  );

  const forecastOtherAdminCosts = operationsAsAPercentOfPeriod.map(
    (d, index) => -d * monthlyCost * indexValue[index]
  );

  return roundArray(forecastOtherAdminCosts, 10);
}
