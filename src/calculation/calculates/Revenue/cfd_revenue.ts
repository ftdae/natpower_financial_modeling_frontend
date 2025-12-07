// Calcs 17.07 Water rates

import moment from "moment";
import {
  INFLATION_START_YEAR,
  MODEL_START_YEAR,
} from "../../../utils/constant";
import { DATE_FORMAT } from "../../../utils/usePrameter";
import { ICFDSettings, IInflationForm, IVintage } from "../Revenue/type";
import {
  DEFAULT_CFD_SETTING,
  DEFAULT_INFLATION_INPUTS,
  DEFAULT_VINTAGE,
} from "../constant";
import {
  annualIndexToMonths,
  getAsAPercentOfPeriod,
  getQuarterNumberFromModelStartDate,
  inflationIndex,
  normalizeArray,
} from "../utils";

export function calcCFDRevenue({
  cfdSettings = DEFAULT_CFD_SETTING,
  inflationInputs = DEFAULT_INFLATION_INPUTS,
  modelStartDate = "2023-01-01",
  operationStartDate = "2028-01-01",
  decommissioningStartDate = "2068-01-01",
  decommissioningEndDate = "2068-06-30",
  revenueSensitivity = 0,
  vintage = DEFAULT_VINTAGE,
}: {
  cfdSettings?: ICFDSettings;
  inflationInputs?: IInflationForm[];
  modelStartDate?: string;
  initialCapacity?: number;
  operationStartDate?: string;
  decommissioningStartDate?: string;
  decommissioningEndDate?: string;
  revenueSensitivity?: number;
  vintage?: IVintage;
}) {
  const period =
    getQuarterNumberFromModelStartDate(modelStartDate, decommissioningEndDate) -
    1;
  const operations_as_a_percent_of_period = getAsAPercentOfPeriod(
    modelStartDate,
    operationStartDate,
    moment(decommissioningStartDate).add(-1, "days").format(DATE_FORMAT),
    decommissioningEndDate
  );
  const indexation = normalizeArray(
    annualIndexToMonths(
      inflationIndex({
        inflationInputs,
        baseYear: cfdSettings?.inflationBaseYear || 2023,
        profile: cfdSettings?.inflationProfile,
      }).slice(MODEL_START_YEAR - INFLATION_START_YEAR)
    ),
    period
  );

  const forecastRevenue = vintage.totalMWGenerated.map(
    (d, index) =>
      (((d *
        cfdSettings.cfdSwich *
        cfdSettings.cfdPrice *
        (revenueSensitivity + 1)) /
        100) *
        indexation[index]) /
      1000
  );
  return forecastRevenue;
}
