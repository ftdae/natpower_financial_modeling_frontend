// Calcs 24 VAT creditor

import {
  IAssetManagement,
  IBusinessRates,
  ICommunityBenefit,
  IExtendedWarranty,
  ILandRent,
  ILegalCost,
  IOAndM,
  IOtherAdminCosts,
  ISiteSecurity,
} from "../../calculates/Administrative costs/type";
import {
  IDevFeePaymentDates,
  IDevFeePaymentProfile,
} from "../../calculates/Balance sheet/type";
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
  getAsAPercentOfPeriod,
  getQuarterNumberFromModelStartDate,
  multiplyArrays,
  multiplyNumber,
  roundArray,
  sumArrays,
} from "../../calculates/utils";
import {
  DEFAULT_CAPEX_CREDITOR,
  DEFAULT_MOVEMENT_IN_TRADE_CREDITOR,
  DEFAULT_MOVEMENT_IN_TRADE_DEBTOR,
  DEFAULT_VAT,
} from "../constant";
import {
  ICapexCreditor,
  IMovementInTradeCreditor,
  IMovementInTradeDebtor,
  IWrokingCapital,
  Ivat,
} from "../type";

export function calcVATCreditor({
  vat = DEFAULT_VAT,
  modelStartDate = "2023-01-01",
  // operationStartDate = '2028-01-01',
  decommissioningEndDate = "2068-06-30",
  // decommissioningStartDate = '2068-01-01',
  developmentStartDate = "2023-07-01",
  movementInTradeCreditor = DEFAULT_MOVEMENT_IN_TRADE_CREDITOR,
  movementInTradeDebtor = DEFAULT_MOVEMENT_IN_TRADE_DEBTOR,
  capexCreditor = DEFAULT_CAPEX_CREDITOR,
}: {
  developmentFeePaymentPercentageProfile?: IDevFeePaymentProfile;
  developmentFeePaymentDateProfile?: IDevFeePaymentDates;
  length_of_decommissioning?: number;
  working_capital?: IWrokingCapital;
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
  movementInTradeCreditor?: IMovementInTradeCreditor;
  movementInTradeDebtor?: IMovementInTradeDebtor;
  capexCreditor?: ICapexCreditor;
}) {
  const period =
    getQuarterNumberFromModelStartDate(modelStartDate, decommissioningEndDate) -
    1;
  // const operatingFlag = getAsAPercentOfPeriod(
  //   modelStartDate,
  //   operationStartDate,
  //   decommissioningStartDate,
  //   decommissioningEndDate
  // );
  const developmentToDecommissioningFlag = getAsAPercentOfPeriod(
    modelStartDate,
    developmentStartDate,
    decommissioningEndDate,
    decommissioningEndDate
  );
  // 24.01 VAT accrued

  const output_vat_on_revenue = movementInTradeDebtor.vat_on_revenue;

  const input_vat_on_costs = movementInTradeCreditor.vat_on_costs;

  const input_vat_on_capex = multiplyNumber(capexCreditor.vat_on_costs, -1);
  const net_vat_accrued = sumArrays(
    output_vat_on_revenue,
    input_vat_on_costs,
    input_vat_on_capex
  );

  // vatReceipts calcs row 5086
  let vatReceipts = new Array(period).fill(0);
  // vatPayments calcs row 5087
  let vatPayments = new Array(period).fill(0);
  // netVatCashPayments calcs row 5088
  let netVatCashPayments = new Array(period).fill(0);
  for (let i = 1; i < period; i++) {
    vatReceipts[i] = -(
      (2 / 3) * (input_vat_on_costs[i] + input_vat_on_capex[i]) +
      (1 / 3) *
        (input_vat_on_costs[i - 1] + input_vat_on_capex[i - 1]) *
        developmentToDecommissioningFlag[i]
    );
    vatPayments[i] =
      -(
        (2 / 3) * output_vat_on_revenue[i] +
        (1 / 3) * output_vat_on_revenue[i - 1]
      ) * developmentToDecommissioningFlag[i];
    netVatCashPayments[i] = vatReceipts[i] + vatPayments[i];
  }

  // vatCreditorStartBalance calcs row 5094
  let vatCreditorStartBalance = new Array(period).fill(0);
  // vatCreditorEndBalance calcs row 5097
  let vatCreditorEndBalance = new Array(period).fill(0);
  // movementInWorkingCapital calcs row 5099
  let movementInWorkingCapital = new Array(period).fill(0);
  // vat_accrued calcs row 5095
  const vat_accrued = multiplyNumber(
    multiplyArrays([net_vat_accrued, developmentToDecommissioningFlag]),
    -1
  );
  // vat_paid calcs row 5096
  const vat_paid = multiplyNumber(netVatCashPayments, -1);

  for (let i = 0; i < period; i++) {
    vatCreditorEndBalance[i] =
      vatCreditorStartBalance[i] + vat_accrued[i] + vat_paid[i];
    movementInWorkingCapital[i] =
      -(vatCreditorEndBalance[i] - vatCreditorStartBalance[i]) *
      developmentToDecommissioningFlag[i];
    if (i < period - 1)
      vatCreditorStartBalance[i + 1] = vatCreditorEndBalance[i];
  }

  return {
    movement_in_working_capital: roundArray(movementInWorkingCapital, 20),
    vat_creditor_for_balance_sheet: vatCreditorEndBalance,
  };
}
