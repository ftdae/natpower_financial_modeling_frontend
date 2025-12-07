import moment from "moment";
import { ICapexUELForm } from "../Revenue/type";
import { DEFAULT_CAPEX_UEL } from "../constant";
import { addYears, getAsAPercentOfPeriod, roundArray } from "../utils";
import { DEFAULT_COST_OF_ADDITIONS } from "./constant";
import { ICostOfAdditions } from "./type";
import { DATE_FORMAT } from "../../../utils/usePrameter";

export function calcTransformers({
  capexUEL = DEFAULT_CAPEX_UEL,
  // costOfAdditions comes from fixed~~ 7 Capex~~~7.03~7.10
  costOfAdditions = DEFAULT_COST_OF_ADDITIONS,
  initialCapacity = 1000,
  capexSensitivity = 0,
  operationStartDate = "2028-01-01",
  modelStartDate = "2023-01-01",
  decommissioningEndDate = "2068-06-30",
}: {
  capexUEL?: ICapexUELForm[];
  // costOfAdditions comes from fixed~~ 7 Capex~~~7.03~7.10
  costOfAdditions?: ICostOfAdditions;
  batteryDuration?: number;
  capexSensitivity?: number;
  operationStartDate?: string;
  modelStartDate?: string;
  initialCapacity?: number;
  decommissioningEndDate?: string;
}) {
  // depreciationOfTransformers = monthlyDepreciationForTransformers*transformersAsAPercentOfPeriod

  const depreciationEndDate = addYears(
    operationStartDate,
    capexUEL.find((d) => d?.capexObject == "Transformers")
      ?.usefulEconomicLife || 0
  );
  const transformersAsAPercentOfPeriod = getAsAPercentOfPeriod(
    modelStartDate,
    operationStartDate,
    moment(depreciationEndDate).add(-1, "days").format(DATE_FORMAT),

    decommissioningEndDate
  );
  const totalTransformers =
    initialCapacity * costOfAdditions.transformers * (1 + capexSensitivity);
  const quarterlyDepreciationForTransformers =
    -totalTransformers /
    (4 *
      (capexUEL.find((d) => d?.capexObject == "Transformers")
        ?.usefulEconomicLife || 0));
  const depreciationOfTransformers = transformersAsAPercentOfPeriod.map(
    (d) => d * quarterlyDepreciationForTransformers
  );

  return roundArray(depreciationOfTransformers, 20);
}
