import moment from "moment";
import { DATE_FORMAT } from "../../../utils/usePrameter";
import { DEFAULT_TOTAL_REVENUE } from "../../calculates/Administrative costs/constant";
import { IGainOnDisposal } from "../../calculates/Revenue/type";
import { DEFAULT_GAIN_ON_DISPOSAL } from "../../calculates/constant";
import {
  calcDaysInQuarter,
  getAsAPercentOfPeriod,
  getFlagOfPeriod,
  getQuarterNumberFromModelStartDate,
  multiplyArrays,
  multiplyNumber,
  roundNumber,
  sumArray,
  sumArrays,
} from "../../calculates/utils";
import { DEFAULT_VAT, DEFAULT_WORKING_CAPITAL } from "../constant";
import { IWrokingCapital, Ivat } from "../type";

// Calcs 20 Trade debtors
export function calcTradeDebtors({
  working_capital = DEFAULT_WORKING_CAPITAL,
  vat = DEFAULT_VAT,
  modelStartDate = "2023-01-01",
  operationStartDate = "2028-01-01",
  developmentStartDate = "2023-07-01",
  decommissioningStartDate = "2068-01-01",
  decommissioningEndDate = "2068-06-30",
  totalRevenue = DEFAULT_TOTAL_REVENUE,
  gainOnDisposal = DEFAULT_GAIN_ON_DISPOSAL,
  residualRevenue = new Array(300).fill(0),
}: {
  working_capital?: IWrokingCapital;
  vat?: Ivat;
  modelStartDate?: string;
  developmentStartDate?: string;
  operationStartDate?: string;
  decommissioningStartDate?: string;
  decommissioningEndDate?: string;
  totalRevenue?: number[];
  gainOnDisposal?: IGainOnDisposal;
  residualRevenue?: number[];
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
  const developmentToDecommissioningFlag = getAsAPercentOfPeriod(
    modelStartDate,
    developmentStartDate,
    decommissioningEndDate,
    decommissioningEndDate
  );
  // Calcs 20 Trade debtors 20.01 Gross sales

  const effectiveVATRateOnRevenue =
    ((vat.vatRate / 100) * vat.percentageOfRevenueSubjectToVAT) / 100;

  const gainOnDisposalOfBatteries = multiplyNumber(
    gainOnDisposal.gainOnDisposalRevenue || new Array(period).fill(0),
    -1
  );
  // const residualValue = calcResidualRevenue();

  const netRevenue = sumArrays(
    totalRevenue,
    gainOnDisposalOfBatteries,
    multiplyNumber(residualRevenue, -1)
  );
  const vat_on_revenue = multiplyNumber(netRevenue, effectiveVATRateOnRevenue);

  const grossRevenue = sumArrays(netRevenue, vat_on_revenue);
  // Calcs 20 Trade debtors 20.02 Days calculation

  const debtor_days_assumption = working_capital.debtor_days;
  const numberOfDaysInMonth = calcDaysInQuarter(
    modelStartDate,
    decommissioningEndDate
  );

  const number_of_days_of_debtors_relating_to_month = numberOfDaysInMonth.map(
    (d, index) => Math.min(d, debtor_days_assumption) * operatingFlag[index]
  );

  const number_of_days_of_debtors_relating_to_month_1 = [];
  // const number_of_days_of_debtors_relating_to_month_2 = [];
  // const number_of_days_of_debtors_relating_to_month_3 = [];

  for (let i = 0; i < period; i++) {
    if (i == 0) {
      number_of_days_of_debtors_relating_to_month_1[i] = 0;
      // number_of_days_of_debtors_relating_to_month_2[i] = 0;
      // number_of_days_of_debtors_relating_to_month_3[i] = 0;
    } else if (i == 1) {
      number_of_days_of_debtors_relating_to_month_1[i] =
        Math.min(
          debtor_days_assumption -
            number_of_days_of_debtors_relating_to_month[i],
          numberOfDaysInMonth[i - 1]
        ) * operatingFlag[i];
      // number_of_days_of_debtors_relating_to_month_2[i] = 0;
      // number_of_days_of_debtors_relating_to_month_3[i] = 0;
    } else if (i == 2) {
      number_of_days_of_debtors_relating_to_month_1[i] =
        Math.min(
          debtor_days_assumption -
            number_of_days_of_debtors_relating_to_month[i],
          numberOfDaysInMonth[i - 1]
        ) * operatingFlag[i];
      // number_of_days_of_debtors_relating_to_month_2[i] =
      //   Math.min(
      //     debtor_days_assumption -
      //     number_of_days_of_debtors_relating_to_month[i] -
      //     number_of_days_of_debtors_relating_to_month_1[i],
      //     numberOfDaysInMonth[i - 2]
      //   ) * operatingFlag[i];
      // number_of_days_of_debtors_relating_to_month_3[i] = 0;
    } else {
      number_of_days_of_debtors_relating_to_month_1[i] =
        Math.min(
          debtor_days_assumption -
            number_of_days_of_debtors_relating_to_month[i],
          numberOfDaysInMonth[i - 1]
        ) * operatingFlag[i];
      // number_of_days_of_debtors_relating_to_month_2[i] =
      //   Math.min(
      //     debtor_days_assumption -
      //     number_of_days_of_debtors_relating_to_month[i] -
      //     number_of_days_of_debtors_relating_to_month_1[i],
      //     numberOfDaysInMonth[i - 2]
      //   ) * operatingFlag[i];
      // number_of_days_of_debtors_relating_to_month_3[i] =
      //   Math.min(
      //     debtor_days_assumption -
      //     number_of_days_of_debtors_relating_to_month[i] -
      //     number_of_days_of_debtors_relating_to_month_1[i] -
      //     number_of_days_of_debtors_relating_to_month_2[i],
      //     numberOfDaysInMonth[i - 3]
      //   ) * operatingFlag[i];
    }
  }
  // const total_number_of_days_of_debtors_in_calculation = sumArrays(
  //   number_of_days_of_debtors_relating_to_month,
  //   number_of_days_of_debtors_relating_to_month_1,
  //   number_of_days_of_debtors_relating_to_month_2,
  //   number_of_days_of_debtors_relating_to_month_3
  // );

  // Calcs 20 Trade debtors 20.03 Closing trade debtors

  const sales_per_day = grossRevenue.map(
    (d, index) => d / numberOfDaysInMonth[index]
  );

  const closing_debtors_relating_to_sales_in_month = multiplyArrays([
    sales_per_day,
    number_of_days_of_debtors_relating_to_month,
  ]);

  const closing_debtors_relating_to_sales_in_month_1 = [];
  // const closing_debtors_relating_to_sales_in_month_2 = [];
  // const closing_debtors_relating_to_sales_in_month_3 = [];

  for (let i = 0; i < period; i++) {
    if (i == 0) {
      closing_debtors_relating_to_sales_in_month_1[i] = 0;
      // closing_debtors_relating_to_sales_in_month_2[i] = 0;
      // closing_debtors_relating_to_sales_in_month_3[i] = 0;
    } else if (i == 1) {
      closing_debtors_relating_to_sales_in_month_1[i] =
        sales_per_day[i - 1] * number_of_days_of_debtors_relating_to_month_1[i];
      // closing_debtors_relating_to_sales_in_month_2[i] = 0;
      // closing_debtors_relating_to_sales_in_month_3[i] = 0;
    } else if (i == 2) {
      closing_debtors_relating_to_sales_in_month_1[i] =
        sales_per_day[i - 1] * number_of_days_of_debtors_relating_to_month_1[i];
      // closing_debtors_relating_to_sales_in_month_2[i] =
      // sales_per_day[i - 2] * number_of_days_of_debtors_relating_to_month_2[i];
      // closing_debtors_relating_to_sales_in_month_3[i] = 0;
    } else {
      closing_debtors_relating_to_sales_in_month_1[i] =
        sales_per_day[i - 1] * number_of_days_of_debtors_relating_to_month_1[i];
      // closing_debtors_relating_to_sales_in_month_2[i] =
      //   sales_per_day[i - 2] * number_of_days_of_debtors_relating_to_month_2[i];
      // closing_debtors_relating_to_sales_in_month_3[i] =
      //   sales_per_day[i - 3] * number_of_days_of_debtors_relating_to_month_3[i];
    }
  }
  const total_closing_trade_debtors = sumArrays(
    closing_debtors_relating_to_sales_in_month,
    closing_debtors_relating_to_sales_in_month_1
    // closing_debtors_relating_to_sales_in_month_2,
    // closing_debtors_relating_to_sales_in_month_3
  );

  // Calcs 20 Trade debtors 20.04 Control account

  const trade_debtors_start_balance = [];
  trade_debtors_start_balance[0] = 0;
  const trade_debtors_end_balance = multiplyArrays([
    total_closing_trade_debtors,
    developmentToDecommissioningFlag,
  ]);

  const cash_receipts = [];

  const movement_in_working_capital = [];

  for (let i = 0; i < period; i++) {
    cash_receipts[i] =
      trade_debtors_end_balance[i] -
      (grossRevenue[i] + trade_debtors_start_balance[i]) *
        developmentToDecommissioningFlag[i];
    movement_in_working_capital[i] =
      -roundNumber(
        trade_debtors_end_balance[i] - trade_debtors_start_balance[i],
        20
      ) * developmentToDecommissioningFlag[i];
    if (i != period - 1)
      trade_debtors_start_balance[i + 1] =
        trade_debtors_end_balance[i] * developmentToDecommissioningFlag[i + 1];
  }
  // trade_debtors_for_balance_sheet is shown on the balance sheet
  // as the current assets - trade debtors

  return {
    movement_in_working_capital: movement_in_working_capital,
    vat_on_revenue: vat_on_revenue,
    trade_debtors_for_balance_sheet: trade_debtors_end_balance,
  };
}
