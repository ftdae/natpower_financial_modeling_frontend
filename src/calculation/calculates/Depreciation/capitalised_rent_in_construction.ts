import moment from "moment";
import { DATE_FORMAT } from "../../../utils/usePrameter";
import { DEFAULT_LAND_RENT } from "../Administrative costs/constant";
import { calcLandRentToPL } from "../Administrative costs/land_rent";
import { ILandRent } from "../Administrative costs/type";
import { ICapexUELForm, IInflationForm } from "../Revenue/type";
import { DEFAULT_CAPEX_UEL, DEFAULT_INFLATION_INPUTS } from "../constant";
import {
  addYears,
  getAsAPercentOfPeriod,
  roundArray,
  sumArray,
} from "../utils";

export function calcCapitalizedRentInConstruction({
  capexUEL = DEFAULT_CAPEX_UEL,
  operationStartDate = "2028-01-01",
  modelStartDate = "2023-01-01",
  landRent = DEFAULT_LAND_RENT,
  landSize = 75,
  initialCapacity = 1000,
  inflationInputs = DEFAULT_INFLATION_INPUTS,
  operationEndDate = "2067-12-31",
  decommissioningStartDate = "2068-01-01",
  decommissioningEndDate = "2068-06-30",
  constructionStartDate = "2027-01-01",
  developmentStartDate = "2023-07-01",
}: {
  capexUEL?: ICapexUELForm[];
  landRent?: ILandRent;
  landSize?: number;
  initialCapacity?: number;
  inflationInputs?: IInflationForm[];
  operationStartDate?: string;
  modelStartDate?: string;
  operationEndDate?: string;
  decommissioningStartDate?: string;
  decommissioningEndDate?: string;
  constructionStartDate?: string;
  developmentStartDate?: string;
}) {
  const capitalizedRent = calcLandRentToPL({
    landRent,
    landSize,
    initialCapacity,
    inflationInputs,
    operationStartDate,
    modelStartDate,
    operationEndDate,
    decommissioningStartDate,
    decommissioningEndDate,
    constructionStartDate,
    developmentStartDate,
  }).rentToFixedAssets;
  let totalRentToFixed = 0;
  const len = capitalizedRent.length;
  for (let i = 0; i < len; i++) {
    totalRentToFixed = totalRentToFixed + capitalizedRent[i];
  }
  const monthlyDepreciationForCapitalizedRent =
    totalRentToFixed /
    (4 *
      (capexUEL.find(
        (d) => d?.capexObject == "Capitalised rent in construction"
      )?.usefulEconomicLife || 40));
  const depreciationEndDate = addYears(
    operationStartDate,
    capexUEL.find((d) => d?.capexObject == "Capitalised rent in construction")
      ?.usefulEconomicLife || 40
  );

  const capitalisedRentAsAPercentOfPeriod = getAsAPercentOfPeriod(
    modelStartDate,
    operationStartDate,
    moment(depreciationEndDate).add(-1, "days").format(DATE_FORMAT),
    decommissioningEndDate
  );
  const depreciationValue = capitalisedRentAsAPercentOfPeriod.map(
    (d) => d * monthlyDepreciationForCapitalizedRent
  );
  return roundArray(depreciationValue, 20);
}
