import moment from "moment";
import { ICapexUELForm } from "../Revenue/type";
import { DEFAULT_CAPEX_UEL } from "../constant";
import { addYears, getAsAPercentOfPeriod, roundArray } from "../utils";
import { DEFAULT_COST_OF_ADDITIONS } from "./constant";
import { ICostOfAdditions } from "./type";
import { DATE_FORMAT } from "../../../utils/usePrameter";

export function calcBalanceOfPlant({
  capexUEL = DEFAULT_CAPEX_UEL,
  // costOfAdditions comes from fixed~~ 7 Capex~~~7.03~7.10
  costOfAdditions = DEFAULT_COST_OF_ADDITIONS,
  batteryDuration = 4,
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
  decommissioningEndDate?: string;
}) {
  // depreciationOfTransformers = monthlyDepreciationForBalanceOfPlant*balanceOfPlantAsAPercentOfPeriod
  const depreciationEndDate = addYears(
    operationStartDate,
    capexUEL.find((d) => d.capexObject == "Balance of Plant")
      ?.usefulEconomicLife || 0
  );
  const balanceOfPlantAsAPercentOfPeriod = getAsAPercentOfPeriod(
    modelStartDate,
    operationStartDate,
    moment(depreciationEndDate).add(-1, "days").format(DATE_FORMAT),
    decommissioningEndDate
  );

  const totalBalanceOfPlant =
    costOfAdditions.balanceOfPlant.find((d) => d.duration == batteryDuration)
      ?.value || 0 * (1 + capexSensitivity);

  const monthlyDepreciationForBalanceOfPlant =
    -totalBalanceOfPlant /
    (4 *
      (capexUEL.find((d) => d.capexObject == "Balance of Plant")
        ?.usefulEconomicLife || 0));

  const depreciationOfBalanceOfPlant = balanceOfPlantAsAPercentOfPeriod.map(
    (d) => d * monthlyDepreciationForBalanceOfPlant
  );
  return roundArray(depreciationOfBalanceOfPlant, 20);
}
