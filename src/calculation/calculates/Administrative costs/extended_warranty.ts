import moment from "moment";
import {
  INFLATION_START_YEAR,
  MODEL_START_YEAR,
} from "../../../utils/constant";
import { DATE_FORMAT } from "../../../utils/usePrameter";
import {
  IAssumptionData,
  IBatteryAugmentation,
  IBatteryCubes,
  IBatteryDisposal,
  IBatteryEfficiency,
  IBatteryExcubes,
  IBessCapexForecast,
  ICapexPaymentForm,
  ICapexPaymentMilestoneForm,
  ICapexUELForm,
  ICycleData,
  IDetailedRevenueData,
  IInflationForm,
  IRevenueSetup,
  IStartingBatteryAssumptions,
  IVintage,
} from "../Revenue/type";
import { DEFAULT_INFLATION_INPUTS, DEFAULT_VINTAGE } from "../constant";
import {
  annualIndexToMonths,
  getFlagOfPeriod,
  getQuarterNumberFromModelStartDate,
  inflationIndex,
  multiplyArrays,
  multiplyNumber,
  normalizeArray,
  sumArrays,
} from "../utils";
import { DEFAULT_EXTENDED_WARRANTY } from "./constant";
import { IExtendedWarranty } from "./type";

export function calcExtendedWarranty({
  extended_warranty = DEFAULT_EXTENDED_WARRANTY,
  battery_duration = 4,
  inflationInputs = DEFAULT_INFLATION_INPUTS,
  opexSensitivity = 0,
  modelStartDate = "2023-01-01",
  operationStartDate = "2028-01-01",
  decommissioningStartDate = "2068-01-01",
  decommissioningEndDate = "2068-06-30",
  vintage = DEFAULT_VINTAGE,
}: {
  revenueSensitivity?: number;
  revenueSetup?: IRevenueSetup;
  assumptionsData?: IAssumptionData[];
  detailedRevenueData?: IDetailedRevenueData[];
  initialCycleData?: ICycleData[];
  initialCapacity?: number;
  startingAssumptionsForBatteries?: IStartingBatteryAssumptions;
  batteryDisposals?: IBatteryDisposal;
  batteryEfficiency?: IBatteryEfficiency;
  batteryAugmentation?: IBatteryAugmentation;
  model?: string;
  batteryDuration?: number;
  batteryCubes?: IBatteryCubes;
  batteryExCubes?: IBatteryExcubes;
  inflationInputs?: IInflationForm[];
  capexPaymentsProfile?: ICapexPaymentForm[];
  capexPaymentMilestones?: ICapexPaymentMilestoneForm[];
  capexUEL?: ICapexUELForm[];
  bessCapexForecast?: IBessCapexForecast;
  batterySensitivity?: number;
  operationYears?: number;
  modelStartDate?: string;
  operationStartDate?: string;
  decommissioningStartDate?: string;
  decommissioningEndDate?: string;
  extended_warranty?: IExtendedWarranty;
  operationEndDate?: string;
  battery_duration?: number;
  opexSensitivity?: number;
  vintage?: IVintage;
}) {
  const period =
    getQuarterNumberFromModelStartDate(modelStartDate, decommissioningEndDate) -
    1;
  const operatingFlag = getFlagOfPeriod(
    modelStartDate,
    operationStartDate,
    moment(decommissioningStartDate).add(-1, "days").format(DATE_FORMAT),
    decommissioningEndDate
  );

  // Monthly cost

  const monthly_fees_per_mw =
    (-extended_warranty.extended_warranty_switch *
      ((
        extended_warranty.annual_fees_per_mw.find(
          (d) => d.duration == battery_duration
        ) || {}
      ).fee || 0) *
      (1 + opexSensitivity)) /
    4;

  // Indexation on annual timeline

  const indexation = normalizeArray(
    annualIndexToMonths(
      inflationIndex({
        inflationInputs,
        baseYear: extended_warranty.inflation_base_year_warranty,
        profile: extended_warranty.inflation_profile_warranty,
      }).slice(MODEL_START_YEAR - INFLATION_START_YEAR)
    ),
    period
  );
  // Monthly unit cost on monthly timeline

  const inflated_monthly_cost_on_annual_timeline = multiplyNumber(
    indexation,
    monthly_fees_per_mw
  );

  // MW for warranty consdieration

  const length_of_warranty = extended_warranty.length_of_warranty * 4;
  const vinatges_data = vintage.vintages;

  const number_of_vintages = vinatges_data.length;

  const vintages_capacity_added: number[][] = [];
  const vintages_flag: number[][] = [];
  const vintages_flag_another: number[][] = [];
  let vintages_total_mw: number[] = [];
  for (let i = 0; i < number_of_vintages; i++) {
    if (vinatges_data[i].data.stagingMonthNumber == 0) break;

    vintages_capacity_added[i] = [];
    vintages_flag[i] = [];
    vintages_flag_another[i] = [];
    for (let j = 0; j < period; j++) {
      if (j == vinatges_data[i].data.stagingMonthNumber - 1)
        vintages_capacity_added[i][j] =
          vinatges_data[i].data.capacityAddedAdjustedForEfficiency;
      else vintages_capacity_added[i][j] = 0;
    }
    for (let j = 0; j < period; j++) {
      if (j == 0) {
        if (vintages_capacity_added[i][j] == 0) {
          vintages_flag[i][j] = 0;
          vintages_flag_another[i][j] = 0;
        } else {
          vintages_flag[i][j] = 1;
          vintages_flag_another[i][j] = 1;
        }
      } else {
        if (vintages_flag_another[i][j - 1] < length_of_warranty) {
          if (
            vintages_flag[i][j - 1] == 0 &&
            vintages_capacity_added[i][j] != 0
          ) {
            vintages_flag[i][j] = 1;
          } else vintages_flag[i][j] = vintages_flag[i][j - 1];
        } else vintages_flag[i][j] = 0;

        vintages_flag_another[i][j] =
          vintages_flag_another[i][j - 1] * vintages_flag[i][j] +
          vintages_flag[i][j];
      }
    }
    if (i == 0) {
      vintages_total_mw = multiplyNumber(
        vintages_flag[i],
        vinatges_data[i].data.capacityAddedAdjustedForEfficiency
      );
    } else
      vintages_total_mw = sumArrays(
        vintages_total_mw,
        multiplyNumber(
          vintages_flag[i],
          vinatges_data[i].data.capacityAddedAdjustedForEfficiency
        )
      );
  }

  // Forecast cost

  const mw_for_warrantny_consideration = vintages_total_mw;
  const forecast_cost = multiplyArrays([
    multiplyArrays([mw_for_warrantny_consideration, operatingFlag]),
    inflated_monthly_cost_on_annual_timeline,
  ]);
  return forecast_cost;
}
