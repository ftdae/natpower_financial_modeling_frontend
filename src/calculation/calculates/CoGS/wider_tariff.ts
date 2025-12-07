import {
  annualIndexToMonths,
  getAsAPercentOfPeriod,
  getOperationsAsAPercentOfPeriod,
  roundArray,
  sumArray,
} from "../utils";

import {
  DEFAULT_ADJUSTMENT_TARIFF_Data,
  DEFAULT_EXPORT_CHARGES_OF_TNUOS,
  DEFAULT_NOT_SHARED_YEAR_ROUND_TARIFF_DATA,
  DEFAULT_SHARED_YEAR_ROUND_TARIFF_DATA,
  DEFAULT_SYSTEM_PEAK_TARIFF_DATA,
} from "./constant";
import {
  IAdjustmentTariffData,
  IExportChargesOfTNUoS,
  INotSharedYearRoundTariffData,
  ISharedYearRoundTariffData,
  ISystemTariffData,
} from "./type";

export function calcWiderTariff({
  exportChargesOfTNUoS = DEFAULT_EXPORT_CHARGES_OF_TNUOS,
  systemPeakTariffData = DEFAULT_SYSTEM_PEAK_TARIFF_DATA,
  sharedYearRoundTariffData = DEFAULT_SHARED_YEAR_ROUND_TARIFF_DATA,
  notSharedYearRoundTariffData = DEFAULT_NOT_SHARED_YEAR_ROUND_TARIFF_DATA,
  ajdustmentTariffData = DEFAULT_ADJUSTMENT_TARIFF_Data,
  operationYears = 40,
  modelStartDate = "2023-01-01",
  operationStartDate = "2028-01-01",
  operationEndDate = "2067-12-31",
  decommissioningEndDate = "2068-06-30",
}: {
  exportChargesOfTNUoS?: IExportChargesOfTNUoS;
  sharedYearRoundTariffData?: ISharedYearRoundTariffData[];
  systemPeakTariffData?: ISystemTariffData[];
  notSharedYearRoundTariffData?: INotSharedYearRoundTariffData[];
  ajdustmentTariffData?: IAdjustmentTariffData[];
  operationYears?: number;
  modelStartDate?: string;
  operationStartDate?: string;
  decommissioningStartDate?: string;
  operationEndDate?: string;
  decommissioningEndDate?: string;
}) {
  // const transmissionGenerationTariff = [];
  const operationsAsAPercentOfPeriod = getAsAPercentOfPeriod(
    modelStartDate,
    operationStartDate,
    operationEndDate,
    decommissioningEndDate
  );
  const selectedSystemPeak =
    systemPeakTariffData.find((d) => d.zone == exportChargesOfTNUoS.zone)
      ?.value || new Array(300).fill(0);

  const selectedSharedYearRound =
    sharedYearRoundTariffData.find((d) => d.zone == exportChargesOfTNUoS.zone)
      ?.value || new Array(300).fill(0);

  const selectedNotSharedYearRound =
    notSharedYearRoundTariffData.find(
      (d) => d.zone == exportChargesOfTNUoS.zone
    )?.value || new Array(300).fill(0);

  const selectedAdjustment =
    ajdustmentTariffData.find((d) => d.zone == exportChargesOfTNUoS.zone)
      ?.value || new Array(300).fill(0);
  const tempWiderTariffForecast = selectedSystemPeak.map(
    (d, index) =>
      d * 1 +
      ((1 * selectedSharedYearRound[index] +
        1 * selectedNotSharedYearRound[index]) *
        exportChargesOfTNUoS.annualLoadFactor) /
        100 +
      1 * selectedAdjustment[index]
  );

  const tempLength = tempWiderTariffForecast.length;
  const widerTariff: number[] = [];
  for (let i = 0; i < tempLength - 1; i++) {
    if (i < 2) widerTariff[i] = 0;
    else
      widerTariff[i] =
        (tempWiderTariffForecast[i] * 3) / 12 +
        (tempWiderTariffForecast[i + 1] * 9) / 12;
  }

  const widerTariffForecast = roundArray(
    operationsAsAPercentOfPeriod.map(
      (d, index) => (d / -4) * annualIndexToMonths(widerTariff.slice(1))[index]
    ),
    10
  );

  return widerTariffForecast;
}
