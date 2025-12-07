import moment from "moment";
import { DATE_FORMAT } from "../../../utils/usePrameter";
import {
  getAsAPercentOfPeriod,
  getFlagOfPeriod,
  getQuarterNumberFromModelStartDate,
  multiplyNumber,
  roundArray,
  sumArray,
} from "../utils";

export function calcDecommissiongCosts({
  length_of_construction = 12,
  modelStartDate = "2023-01-01",
  developmentStartDate = "2023-07-01",
  constructionStartDate = "2027-01-01",
  operationStartDate = "2028-01-01",
  decommissioningStartDate = "2068-01-01",
  decommissioningEndDate = "2068-06-30",
  length_of_decommissioning = 6,
  decommissioningCost = 5000,
}: {
  length_of_construction?: number;
  modelStartDate?: string;
  developmentStartDate?: string;
  constructionStartDate?: string;
  operationStartDate?: string;
  decommissioningStartDate?: string;
  decommissioningEndDate?: string;
  length_of_decommissioning?: number;
  decommissioningCost?: number;
}) {
  const period =
    getQuarterNumberFromModelStartDate(modelStartDate, decommissioningEndDate) -
    1;
  const developmentToDecommissioningFlag = getFlagOfPeriod(
    modelStartDate,
    developmentStartDate,
    decommissioningEndDate,
    decommissioningEndDate
  );
  const decommissioning_as_a_percent_of_period = getAsAPercentOfPeriod(
    modelStartDate,
    decommissioningStartDate,
    decommissioningEndDate,
    decommissioningEndDate
  );
  // 28.01 Decommissioning costs
  const construction_as_a_percent_of_period = getAsAPercentOfPeriod(
    modelStartDate,
    constructionStartDate,
    moment(operationStartDate).add(-1, "days").format(DATE_FORMAT),
    decommissioningEndDate
  );
  const total_cost = decommissioningCost;

  const quarterlyCost = (-total_cost * 3) / length_of_construction;
  const decommissioning_cost = multiplyNumber(
    construction_as_a_percent_of_period,
    quarterlyCost
  );
  // 28.02 Decommissioning cash
  const decomLength = sumArray(decommissioning_as_a_percent_of_period);
  // const release_per_month = total_cost / (length_of_decommissioning / 3);
  const release_per_month = total_cost / decomLength;

  const cash_payment = new Array(period).fill(0);
  // 28.02 Control account

  const decommissioning_provision_start_balance = [];
  decommissioning_provision_start_balance[0] = 0;
  const accrual = decommissioning_cost;
  let release = new Array(period).fill(0);
  const decommissioning_provision_end_balance = [];
  const movement_in_working_capital = [];
  for (let i = 0; i < period; i++) {
    cash_payment[i] =
      i == period - 1
        ? decommissioning_provision_start_balance[i]
        : -decommissioning_as_a_percent_of_period[i] * release_per_month;
    release[i] = -cash_payment[i];
    decommissioning_provision_end_balance[i] =
      decommissioning_provision_start_balance[i] + accrual[i] + release[i];
    movement_in_working_capital[i] = -(
      decommissioning_provision_end_balance[i] -
      decommissioning_provision_start_balance[i]
    );
    if (i < period - 1)
      decommissioning_provision_start_balance[i + 1] =
        decommissioning_provision_end_balance[i] *
        developmentToDecommissioningFlag[i + 1];
  }
  return {
    decommissioning_cost: decommissioning_cost,
    movement_in_working_capital: roundArray(movement_in_working_capital, 20),
    decommissioning_provision_for_balance_sheet:
      decommissioning_provision_end_balance,
  };
}
