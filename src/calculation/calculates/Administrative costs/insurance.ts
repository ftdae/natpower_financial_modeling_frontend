import {
  INFLATION_START_YEAR,
  MODEL_START_YEAR,
} from "../../../utils/constant";
import { IInsurance } from "../CoGS/type";
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
import { DEFAULT_INSURANCE } from "./constant";

export function calcInsuranceExpense({
  insurance = DEFAULT_INSURANCE,
  inflationInputs = DEFAULT_INFLATION_INPUTS,
  initialCapacity = 1000,
  opexSensitivity = 0,
  operationStartDate = "2028-01-01",
  modelStartDate = "2023-01-01",
  operationEndDate = "2067-12-31",
  decommissioningEndDate = "2068-06-30",
}: {
  insurance?: IInsurance;
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
  // insurance expense = monthlyFeesPerMW * indexValue*operationAsAPercentOfPeriod

  const operationAsAPercentOfPeriod = getAsAPercentOfPeriod(
    modelStartDate,
    operationStartDate,
    operationEndDate,
    decommissioningEndDate
  );
  const annualFeesPerMW = insurance.annualFees || 0;
  const indexValue = normalizeArray(
    annualIndexToMonths(
      inflationIndex({
        inflationInputs,
        baseYear: insurance.inflation.baseYear,
        profile: insurance.inflation.profile,
      }).slice(MODEL_START_YEAR - INFLATION_START_YEAR)
    ),
    period
  );
  const monthlyFeesPerMW =
    ((1 + opexSensitivity) * initialCapacity * annualFeesPerMW) / -4;

  const insuranceExpense = operationAsAPercentOfPeriod.map(
    (d, index) => d * indexValue[index] * monthlyFeesPerMW
  );
  return addZeros(roundArray(insuranceExpense, 10), period);
}
