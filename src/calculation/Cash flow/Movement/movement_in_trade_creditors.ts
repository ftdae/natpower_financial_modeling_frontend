import {
  DEFAULT_DECOMMSSIONING_COSTS,
  DEFAULT_LAND_RENT_EXEPNESE,
} from "../../calculates/Administrative costs/constant";
import {
  IAssetManagement,
  IBusinessRates,
  ICommunityBenefit,
  IDecommissioningCosts,
  IExtendedWarranty,
  ILandRent,
  ILandRentExpense,
  ILegalCost,
  IOAndM,
  IOtherAdminCosts,
  ISiteSecurity,
} from "../../calculates/Administrative costs/type";
import { ICorporationTax } from "../../calculates/Cash flow/type";
import {
  IAdjustmentTariffData,
  IAuxilliaryLosses,
  IExportChargesOfTNUoS,
  IInsurance,
  ILocalCircuits,
  ILocalSubstationTariff,
  IMetering,
  INotSharedYearRoundTariffData,
  IOptimiser,
  ISensitivity,
  ISharedYearRoundTariffData,
  ISystemTariffData,
} from "../../calculates/CoGS/type";
import { ICostOfAdditions } from "../../calculates/Depreciation/type";
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
} from "../../calculates/Revenue/type";
import {
  DEFAULT_TOTAL_ADMIN_COSTS,
  DEFAULT_TOTAL_COGS,
} from "../../calculates/constant";
import {
  calcDaysInQuarter,
  getAsAPercentOfPeriod,
  getFlagOfPeriod,
  getQuarterNumberFromModelStartDate,
  multiplyArrays,
  multiplyNumber,
  roundArray,
  sumArrays,
} from "../../calculates/utils";
import { DEFAULT_VAT, DEFAULT_WORKING_CAPITAL } from "../constant";
import { IWrokingCapital, Ivat } from "../type";

// Calcs 22 Trade creditors
export function calcTradeCreditors({
  working_capital = DEFAULT_WORKING_CAPITAL,
  vat = DEFAULT_VAT,
  modelStartDate = "2023-01-01",
  operationStartDate = "2028-01-01",
  decommissioningEndDate = "2068-06-30",
  developmentStartDate = "2023-07-01",
  totalCoGS = DEFAULT_TOTAL_COGS,
  totalAdminCosts = DEFAULT_TOTAL_ADMIN_COSTS,
  landRentExpense = DEFAULT_LAND_RENT_EXEPNESE,
  decommissioningCosts = DEFAULT_DECOMMSSIONING_COSTS,
}: {
  working_capital?: IWrokingCapital;
  length_of_decommissioning?: number;
  vat?: Ivat;
  corporationTax?: ICorporationTax;
  costOfAdditions?: ICostOfAdditions;
  capexSensitivity?: number;
  extended_warranty?: IExtendedWarranty;
  siteSecurity?: ISiteSecurity;
  otherAdministrativeCosts?: IOtherAdminCosts;
  legalCosts?: ILegalCost;
  landRent?: ILandRent;
  landSize?: number;
  insurance?: IInsurance;
  communityBenefit?: ICommunityBenefit;
  businessRates?: IBusinessRates;
  assetManagement?: IAssetManagement;
  operationAndManagementSettings?: IOAndM[];
  constraintFactor?: number;
  battery_duration?: number;
  operationEndDate?: string;
  constructionStartDate?: string;
  opex_sensitivity?: number;
  opexSensitivity?: number;
  optimiser?: IOptimiser;
  meteringSettings?: IMetering;
  auxilliaryLossesSettings?: IAuxilliaryLosses;
  averageWholeSaleDayAheadPrice?: number[];
  revenueSensitivity?: number;
  revenueSetup?: IRevenueSetup;
  assumptionsData?: IAssumptionData[];
  detailedRevenueData?: IDetailedRevenueData[];
  initialCycleData?: ICycleData[];
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
  sensitivities?: ISensitivity[];
  sharedYearRoundTariffData?: ISharedYearRoundTariffData[];
  systemPeakTariffData?: ISystemTariffData[];
  notSharedYearRoundTariffData?: INotSharedYearRoundTariffData[];
  ajdustmentTariffData?: IAdjustmentTariffData[];
  exportChargesOfTNUoS?: IExportChargesOfTNUoS;
  localSubstationTariff?: number[][];
  localSubstationSwitch?: number;
  initialCapacity?: number;
  operationYears?: number;
  length_of_construction?: number;
  modelStartDate?: string;
  operationStartDate?: string;
  decommissioningStartDate?: string;
  decommissioningEndDate?: string;
  developmentStartDate?: string;
  localCircuitsData?: ILocalCircuits[];
  vintage?: IVintage;
  totalCoGS?: number[];
  totalAdminCosts?: number[];
  landRentExpense?: ILandRentExpense;
  decommissioningCosts?: IDecommissioningCosts;
}) {
  const period =
    getQuarterNumberFromModelStartDate(modelStartDate, decommissioningEndDate) -
    1;
  const operatingFlag = getFlagOfPeriod(
    modelStartDate,
    operationStartDate,
    decommissioningEndDate,
    decommissioningEndDate
  );
  const developmentToDecommissioningFlag = getFlagOfPeriod(
    modelStartDate,
    developmentStartDate,
    decommissioningEndDate,
    decommissioningEndDate
  );

  // 22.01 Costs for trade creditors calculation ~~~ Net costs

  const effectiveVATRateOnCosts =
    ((vat.vatRate / 100) * vat.percentageOfRevenueSubjectToVAT) / 100;

  const total_administrative_expenses = totalAdminCosts;
  const less_land_rent = multiplyNumber(landRentExpense.rentToProfit, -1);
  const less_decommissioning_costs_provision = multiplyNumber(
    decommissioningCosts.decommissioning_cost,
    -1
  );
  const net_costs = sumArrays(
    total_administrative_expenses,
    totalCoGS,
    less_land_rent,
    less_decommissioning_costs_provision
  );

  const vat_on_costs = multiplyNumber(net_costs, effectiveVATRateOnCosts);

  const gross_costs = sumArrays(net_costs, vat_on_costs);
  // 22.02 Days calculation

  const creditor_days_assumption = working_capital.creditor_days;
  const numberOfDaysInMonth = calcDaysInQuarter(
    modelStartDate,
    decommissioningEndDate
  );

  const number_of_days_of_creditors_relating_to_month = numberOfDaysInMonth.map(
    (d, index) =>
      Math.min(d, creditor_days_assumption) *
      developmentToDecommissioningFlag[index]
  );

  const number_of_days_of_creditors_relating_to_month_1 = [];
  // const number_of_days_of_creditors_relating_to_month_2 = [];
  // const number_of_days_of_creditors_relating_to_month_3 = [];

  for (let i = 0; i < period; i++) {
    if (i == 0) {
      number_of_days_of_creditors_relating_to_month_1[i] = 0;
      // number_of_days_of_creditors_relating_to_month_2[i] = 0;
      // number_of_days_of_creditors_relating_to_month_3[i] = 0;
    } else if (i == 1) {
      number_of_days_of_creditors_relating_to_month_1[i] =
        Math.min(
          creditor_days_assumption -
            number_of_days_of_creditors_relating_to_month[i],
          numberOfDaysInMonth[i - 1]
        ) * developmentToDecommissioningFlag[i];
      // number_of_days_of_creditors_relating_to_month_2[i] = 0;
      // number_of_days_of_creditors_relating_to_month_3[i] = 0;
    } else if (i == 2) {
      number_of_days_of_creditors_relating_to_month_1[i] =
        Math.min(
          creditor_days_assumption -
            number_of_days_of_creditors_relating_to_month[i],
          numberOfDaysInMonth[i - 1]
        ) * developmentToDecommissioningFlag[i];
      // number_of_days_of_creditors_relating_to_month_2[i] =
      //   Math.min(
      //     creditor_days_assumption -
      //     number_of_days_of_creditors_relating_to_month[i] -
      //     number_of_days_of_creditors_relating_to_month_1[i],
      //     numberOfDaysInMonth[i - 2]
      //   ) * operatingFlag[i];
      // number_of_days_of_creditors_relating_to_month_3[i] = 0;
    } else {
      number_of_days_of_creditors_relating_to_month_1[i] =
        Math.min(
          creditor_days_assumption -
            number_of_days_of_creditors_relating_to_month[i],
          numberOfDaysInMonth[i - 1]
        ) * developmentToDecommissioningFlag[i];
      // number_of_days_of_creditors_relating_to_month_2[i] =
      //   Math.min(
      //     creditor_days_assumption -
      //     number_of_days_of_creditors_relating_to_month[i] -
      //     number_of_days_of_creditors_relating_to_month_1[i],
      //     numberOfDaysInMonth[i - 2]
      //   ) * operatingFlag[i];
      // number_of_days_of_creditors_relating_to_month_3[i] =
      //   Math.min(
      //     creditor_days_assumption -
      //     number_of_days_of_creditors_relating_to_month[i] -
      //     number_of_days_of_creditors_relating_to_month_1[i] -
      //     number_of_days_of_creditors_relating_to_month_2[i],
      //     numberOfDaysInMonth[i - 3]
      //   ) * operatingFlag[i];
    }
  }

  // 22.03 Closing trade creditors

  const costs_per_day = gross_costs.map(
    (d, index) => d / numberOfDaysInMonth[index]
  );

  const closing_creditors_relating_to_sales_in_month = multiplyArrays([
    costs_per_day,
    number_of_days_of_creditors_relating_to_month,
  ]);

  const closing_creditors_relating_to_sales_in_month_1 = [];
  const closing_creditors_relating_to_sales_in_month_2 = [];
  const closing_creditors_relating_to_sales_in_month_3 = [];

  for (let i = 0; i < period; i++) {
    if (i == 0) {
      closing_creditors_relating_to_sales_in_month_1[i] = 0;
      // closing_creditors_relating_to_sales_in_month_2[i] = 0;
      // closing_creditors_relating_to_sales_in_month_3[i] = 0;
    } else if (i == 1) {
      closing_creditors_relating_to_sales_in_month_1[i] =
        costs_per_day[i - 1] *
        number_of_days_of_creditors_relating_to_month_1[i];
      // closing_creditors_relating_to_sales_in_month_2[i] = 0;
      // closing_creditors_relating_to_sales_in_month_3[i] = 0;
    } else if (i == 2) {
      closing_creditors_relating_to_sales_in_month_1[i] =
        costs_per_day[i - 1] *
        number_of_days_of_creditors_relating_to_month_1[i];
      // closing_creditors_relating_to_sales_in_month_2[i] =
      //   costs_per_day[i - 2] *
      //   number_of_days_of_creditors_relating_to_month_2[i];
      // closing_creditors_relating_to_sales_in_month_3[i] = 0;
    } else {
      closing_creditors_relating_to_sales_in_month_1[i] =
        costs_per_day[i - 1] *
        number_of_days_of_creditors_relating_to_month_1[i];
      // closing_creditors_relating_to_sales_in_month_2[i] =
      //   costs_per_day[i - 2] *
      //   number_of_days_of_creditors_relating_to_month_2[i];
      // closing_creditors_relating_to_sales_in_month_3[i] =
      //   costs_per_day[i - 3] *
      //   number_of_days_of_creditors_relating_to_month_3[i];
    }
  }
  const total_closing_trade_creditors = sumArrays(
    closing_creditors_relating_to_sales_in_month,
    closing_creditors_relating_to_sales_in_month_1
    // closing_creditors_relating_to_sales_in_month_2,
    // closing_creditors_relating_to_sales_in_month_3
  );

  // Calcs 20 Trade creditors 20.04 Control account

  const trade_creditors_start_balance = [];
  trade_creditors_start_balance[0] = 0;
  const trade_creditors_end_balance = multiplyArrays([
    total_closing_trade_creditors,
    developmentToDecommissioningFlag,
  ]);
  const cash_payments = [];

  const movement_in_working_capital = [];

  for (let i = 0; i < period; i++) {
    cash_payments[i] =
      trade_creditors_end_balance[i] -
      (gross_costs[i] + trade_creditors_start_balance[i]) *
        developmentToDecommissioningFlag[i];
    movement_in_working_capital[i] =
      -(trade_creditors_end_balance[i] - trade_creditors_start_balance[i]) *
      developmentToDecommissioningFlag[i];
    if (i != period - 1)
      trade_creditors_start_balance[i + 1] =
        trade_creditors_end_balance[i] *
        developmentToDecommissioningFlag[i + 1];
  }

  return {
    trade_creditors_for_balance_sheet: trade_creditors_end_balance,
    movement_in_working_capital: roundArray(movement_in_working_capital, 20),
    vat_on_costs: vat_on_costs,
  };
}
