import { DEFAULT_CAPITAL_EXPENDITURE } from "../../../../Cash flow/constant";
import { ICapitalExpenditure } from "../../../../Cash flow/type";
import {
  DEFAULT_GAIN_ON_DISPOSAL,
  DEFAULT_TOTAL_DEPRECIATION,
} from "../../../constant";
import { IGainOnDisposal } from "../../../Revenue/type";
import {
  getQuarterNumberFromModelStartDate,
  roundArray,
  sumArray,
} from "../../../utils";
// import { calcDevexAdditions } from "../Balance sheet/Non current asset/Fixed asset/devex";

export function fixedAssetsForBalanceSheet({
  modelStartDate = "2023-01-01",
  developmentStartDate = "2023-07-01",
  decommissioningEndDate = "2068-06-30",
  totalDepreciation = DEFAULT_TOTAL_DEPRECIATION,
  gainOnDisposal = DEFAULT_GAIN_ON_DISPOSAL,
  capitalExpenditure = DEFAULT_CAPITAL_EXPENDITURE,
}: {
  modelStartDate?: string;
  developmentStartDate?: string;
  operationStartDate?: string;
  decommissioningEndDate?: string;
  totalDepreciation?: number[];
  gainOnDisposal?: IGainOnDisposal;
  capitalExpenditure?: ICapitalExpenditure;
}) {
  const period =
    getQuarterNumberFromModelStartDate(modelStartDate, decommissioningEndDate) -
    1;
  const developmentToDecommissioningFlag = [];
  const developmentStartDateMonthNumber =
    getQuarterNumberFromModelStartDate(modelStartDate, developmentStartDate) -
    1;
  for (let i = 0; i < period; i++) {
    if (i < developmentStartDateMonthNumber)
      developmentToDecommissioningFlag[i] = 0;
    else developmentToDecommissioningFlag[i] = 1;
  }
  const fixed_assets_additions =
    capitalExpenditure.fixed_assets_additions_for_balance_sheet;
  const disposals = gainOnDisposal.bookValueAtPointOfDisposal;

  const fixed_assets_start_balance = [];
  fixed_assets_start_balance[0] = 0;
  const fixed_assets_end_balance = [];
  for (let i = 0; i < period; i++) {
    fixed_assets_end_balance[i] =
      fixed_assets_start_balance[i] -
      disposals[i] +
      fixed_assets_additions[i] +
      totalDepreciation[i];
    if (i < period - 1)
      fixed_assets_start_balance[i + 1] =
        fixed_assets_end_balance[i] * developmentToDecommissioningFlag[i + 1];
  }
  return roundArray(fixed_assets_end_balance, 10);
}
