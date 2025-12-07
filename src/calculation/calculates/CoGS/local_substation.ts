import {
  getAsAPercentOfPeriod,
  getOperationsAsAPercentOfPeriod,
} from "../utils";
import {
  DEFAULT_EXPORT_CHARGES_OF_TNUOS,
  DEFAULT_LOCAL_SUBSTATION_TARIFF,
} from "./constant";
import { IExportChargesOfTNUoS, ILocalSubstationTariff } from "./type";

export function calcLocalSubstation({
  exportChargesOfTNUoS = DEFAULT_EXPORT_CHARGES_OF_TNUOS,
  localSubstationTariff = DEFAULT_LOCAL_SUBSTATION_TARIFF,
  localSubstationSwitch = 1,
  operationYears = 40,
  modelStartDate = "2023-01-01",
  operationStartDate = "2028-01-01",
  decommissioningEndDate = "2068-06-30",
  operationEndDate = "2067-12-31",
}: {
  exportChargesOfTNUoS?: IExportChargesOfTNUoS;
  localSubstationTariff?: number[][];
  localSubstationSwitch?: number;
  operationYears?: number;
  modelStartDate?: string;
  operationStartDate?: string;
  decommissioningStartDate?: string;
  decommissioningEndDate?: string;
  operationEndDate?: string;
}) {
  const operationsAsAPercentOfPeriod = getAsAPercentOfPeriod(
    modelStartDate,
    operationStartDate,
    operationEndDate,
    decommissioningEndDate
  );
  const localSubstationTariffValue =
    localSubstationTariff[exportChargesOfTNUoS?.localSubstationType - 1][
      exportChargesOfTNUoS?.gridConnectionVoltage - 1
    ];

  const forecastLocalSubstation = operationsAsAPercentOfPeriod?.map(
    (d) => (-d * localSubstationTariffValue * localSubstationSwitch) / 4
  );

  return forecastLocalSubstation;
}
