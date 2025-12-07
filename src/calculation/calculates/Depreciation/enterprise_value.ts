import moment from "moment";
import { DATE_FORMAT } from "../../../utils/usePrameter";
import { ICapexUELForm } from "../Revenue/type";
import { DEFAULT_CAPEX_UEL } from "../constant";
import {
  addYears,
  getAsAPercentOfPeriod,
  multiplyNumber,
  roundArray,
} from "../utils";
import { DEFAULT_COST_OF_ADDITIONS } from "./constant";
import { ICostOfAdditions } from "./type";

export function calcEnterpriseValue({
  capexUEL = DEFAULT_CAPEX_UEL,
  // costOfAdditions comes from fixed~~ 7 Capex~~~7.03~7.10
  costOfAdditions = DEFAULT_COST_OF_ADDITIONS,
  // batteryDuration = 4,
  initialCapacity = 1000,
  capexSensitivity = 0,
  operationStartDate = "2028-01-01",
  modelStartDate = "2023-01-01",
  decommissioningEndDate = "2068-06-30",
  evSwitch = 1,
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
  evSwitch?: number;
}) {
  // depreciationOfEnterpriseValue = monthlyDepreciationForEnterpriseValue*enterPriseValueAsAPercentOfPeriod

  const depreciationEndDate = addYears(
    operationStartDate,
    capexUEL.find((d) => d?.capexObject == "Enterprise value - Development fee")
      ?.usefulEconomicLife || 0
  );
  const enterPriseValueAsAPercentOfPeriod = getAsAPercentOfPeriod(
    modelStartDate,
    operationStartDate,
    moment(depreciationEndDate).add(-1, "days").format(DATE_FORMAT),
    decommissioningEndDate
  );
  const totalEnterpriseValue =
    initialCapacity * costOfAdditions.enterPriseValue * (1 + capexSensitivity);

  const monthlyDepreciationForEnterpriseValue =
    -totalEnterpriseValue /
    (4 *
      (capexUEL.find(
        (d) => d.capexObject == "Enterprise value - Development fee"
      )?.usefulEconomicLife || 0));
  const depreciationOfEnterpriseValue = enterPriseValueAsAPercentOfPeriod.map(
    (d) => d * monthlyDepreciationForEnterpriseValue
  );
  return evSwitch == 1
    ? roundArray(depreciationOfEnterpriseValue, 20)
    : multiplyNumber(enterPriseValueAsAPercentOfPeriod, 0);
}
