import moment from "moment";
import {
  annualIndexToMonths,
  getAsAPercentOfPeriod,
  roundArray,
} from "../utils";
import {
  DEFAULT_EXPORT_CHARGES_OF_TNUOS,
  DEFAULT_LOCAL_CIRCUITS,
} from "./constant";
import { IExportChargesOfTNUoS, ILocalCircuits } from "./type";
import { DATE_FORMAT } from "../../../utils/usePrameter";

export function calcLocalCircuits({
  exportChargesOfTNUoS = DEFAULT_EXPORT_CHARGES_OF_TNUOS,
  localCircuitsData = DEFAULT_LOCAL_CIRCUITS,
  modelStartDate = "2023-01-01",
  operationStartDate = "2028-01-01",
  decommissioningStartDate = "2068-01-01",
  decommissioningEndDate = "2068-06-30",
}: {
  exportChargesOfTNUoS?: IExportChargesOfTNUoS;
  localCircuitsData?: ILocalCircuits[];
  operationYears?: number;
  modelStartDate?: string;
  operationStartDate?: string;
  decommissioningStartDate?: string;
  decommissioningEndDate?: string;
}) {
  const operatingFlag = getAsAPercentOfPeriod(
    modelStartDate,
    operationStartDate,
    moment(decommissioningStartDate).add(-1, "days").format(DATE_FORMAT),
    decommissioningEndDate
  );
  const tempLocalCircuitsValue =
    localCircuitsData?.find((d) => d.zone == exportChargesOfTNUoS.localCircuits)
      ?.value || new Array(300).fill(0);

  const tempLocalCircuitsLength = tempLocalCircuitsValue.length;

  const localCircuits: number[] = [];
  for (let i = 0; i < tempLocalCircuitsLength; i++) {
    localCircuits[i] =
      ((tempLocalCircuitsValue[i + 1] || tempLocalCircuitsValue[i]) * 3) / 12 +
      ((tempLocalCircuitsValue[i + 2] ||
        tempLocalCircuitsValue[i + 1] ||
        tempLocalCircuitsValue[i]) *
        9) /
        12;
  }

  const forecastLocalCircuits = roundArray(
    operatingFlag.map(
      (d, index) => (d * annualIndexToMonths(localCircuits)[index]) / -4
    ),
    10
  );

  return forecastLocalCircuits;
}
