// import {
//   IAssetManagement,
//   IBusinessRates,
//   ICommunityBenefit,
//   IExtendedWarranty,
//   ILandRent,
//   ILegalCost,
//   IOAndM,
//   IOtherAdminCosts,
//   ISiteSecurity,
// } from "../calculation/calculates/Administrative costs/type";
// import {
//   IDevFeePaymentDates,
//   IDevFeePaymentProfile,
// } from "../calculation/calculates/Balance sheet/type";
// import { ICorporationTax } from "../calculation/calculates/Cash flow/type";
// import {
//   IAdjustmentTariffData,
//   IAuxilliaryLosses,
//   IExportChargesOfTNUoS,
//   IInsurance,
//   ILocalCircuits,
//   ILocalSubstationTariff,
//   IMetering,
//   INotSharedYearRoundTariffData,
//   IOptimiser,
//   ISensitivity,
//   ISharedYearRoundTariffData,
//   ISystemTariffData,
// } from "../calculation/calculates/CoGS/type";
// import { ICostOfAdditions } from "../calculation/calculates/Depreciation/type";
// import {
//   IAssumptionData,
//   IBatteryAugmentation,
//   IBatteryCubes,
//   IBatteryDisposal,
//   IBatteryEfficiency,
//   IBatteryExcubes,
//   IBessCapexForecast,
//   ICapexPaymentForm,
//   ICapexPaymentMilestoneForm,
//   ICapexUELForm,
//   ICycleData,
//   IDetailedRevenueData,
//   IInflationForm,
//   IRevenueSetup,
//   IStartingBatteryAssumptions,
// } from "../calculation/calculates/Revenue/type";
// import {
//   calcPeriod,
//   getQuarterNumberFromModelStartDate,
//   npv,
//   paybackPeriod,
// } from "../calculation/calculates/utils";
// import {
//   ICapexProvision,
//   ICashRequirements,
//   IDividends,
//   IEquity,
//   IGearingByTaxes,
//   INationalGridSecurities,
//   ISeniorDebt,
//   IVariableProfileForAttributableCosts,
//   Ivat,
//   IWrokingCapital,
// } from "../calculation/Cash flow/type";
// import { IValuation } from "./type";
// import { projectValuation } from "./valuation";

// export function calculatedKPIs({
//   valuation_date = "2028-01-01",
//   modelStartDate = "2023-01-01",
//   operationStartDate = "2028-01-01",
// }: {
//   valuation_date?: string;
//   valuation?: IValuation;
//   national_grid_securities?: INationalGridSecurities;
//   variable_profile_for_attributable_costs?: IVariableProfileForAttributableCosts;
//   fullyConsentedDate?: string;
//   capexProvision?: ICapexProvision[];
//   cashRequirements?: ICashRequirements;
//   gearingByCapexType?: IGearingByTaxes;
//   equity?: IEquity;
//   seniorDebt?: ISeniorDebt;
//   dividends?: IDividends;
//   developmentFeePaymentPercentageProfile?: IDevFeePaymentProfile;
//   developmentFeePaymentDateProfile?: IDevFeePaymentDates;

//   working_capital?: IWrokingCapital;
//   vat?: Ivat;
//   corporationTax?: ICorporationTax;
//   costOfAdditions?: ICostOfAdditions;
//   capexSensitivity?: number;
//   extended_warranty?: IExtendedWarranty;
//   siteSecurity?: ISiteSecurity;
//   otherAdministrativeCosts?: IOtherAdminCosts;
//   legalCosts?: ILegalCost;
//   landRent?: ILandRent;
//   landSize?: number;
//   insurance?: IInsurance;
//   communityBenefit?: ICommunityBenefit;
//   businessRates?: IBusinessRates;
//   assetManagement?: IAssetManagement;
//   operationAndManagementSettings?: IOAndM[];
//   constraintFactor?: number;
//   battery_duration?: number;
//   operationEndDate?: string;
//   constructionStartDate?: string;
//   opex_sensitivity?: number;
//   opexSensitivity?: number;
//   optimiser?: IOptimiser;
//   meteringSettings?: IMetering;
//   auxilliaryLossesSettings?: IAuxilliaryLosses;
//   averageWholeSaleDayAheadPrice?: number[];
//   revenueSensitivity?: number;
//   revenueSetup?: IRevenueSetup;
//   assumptionsData?: IAssumptionData[];
//   detailedRevenueData?: IDetailedRevenueData[];
//   initialCycleData?: ICycleData[];
//   startingAssumptionsForBatteries?: IStartingBatteryAssumptions;
//   batteryDisposals?: IBatteryDisposal;
//   batteryEfficiency?: IBatteryEfficiency;
//   batteryAugmentation?: IBatteryAugmentation;
//   model?: string;
//   batteryDuration?: number;
//   batteryCubes?: IBatteryCubes;
//   batteryExCubes?: IBatteryExcubes;
//   inflationInputs?: IInflationForm[];
//   capexPaymentsProfile?: ICapexPaymentForm[];
//   capexPaymentMilestones?: ICapexPaymentMilestoneForm[];
//   capexUEL?: ICapexUELForm[];
//   bessCapexForecast?: IBessCapexForecast;
//   sensitivity?: number;
//   sensitivities?: ISensitivity[];
//   sharedYearRoundTariffData?: ISharedYearRoundTariffData[];
//   systemPeakTariffData?: ISystemTariffData[];
//   notSharedYearRoundTariffData?: INotSharedYearRoundTariffData[];
//   ajdustmentTariffData?: IAdjustmentTariffData[];
//   exportChargesOfTNUoS?: IExportChargesOfTNUoS;
//   localSubstationTariff?: ILocalSubstationTariff[];
//   localSubstationSwitch?: number;
//   initialCapacity?: number;
//   operationYears?: number;
//   length_of_construction?: number;
//   modelStartDate?: string;
//   operationStartDate?: string;
//   decommissioningStartDate?: string;
//   decommissioningEndDate?: string;
//   developmentStartDate?: string;
//   localCircuitsData?: ILocalCircuits[];
// }) {
//   const operation_start_date_month_number = getQuarterNumberFromModelStartDate(
//     modelStartDate,
//     operationStartDate
//   );
//   const period = calcPeriod();
//   const valuation_date_month_number = getQuarterNumberFromModelStartDate(
//     modelStartDate,
//     valuation_date
//   );

//   const npv_calculation_data = projectValuation({});

//   const pre_tax_unlevered_cash_flow_from_valuation_date = [];
//   const cumulative_pre_tax_unlevered_cash_flow_from_valuation_date = [];
//   const post_tax_unlevered_cash_flow_from_valuation_date = [];
//   const cumulative_post_tax_unlevered_cash_flow_from_valuation_date = [];

//   const post_tax_levered_cash_flow_from_valuation_date = [];
//   const cumulative_post_tax_levered_cash_flow_from_valuation_date = [];

//   for (let i = 0; i < period; i++) {
//     if (i >= valuation_date_month_number) {
//       pre_tax_unlevered_cash_flow_from_valuation_date[
//         i - valuation_date_month_number
//       ] = npv_calculation_data.pre_tax_unlevered_cash_flow[i];

//       post_tax_unlevered_cash_flow_from_valuation_date[
//         i - valuation_date_month_number
//       ] = npv_calculation_data.post_tax_unlevered_cash_flow[i];

//       post_tax_levered_cash_flow_from_valuation_date[
//         i - valuation_date_month_number
//       ] = npv_calculation_data.post_tax_levered_cash_flow[i];
//     }
//   }
//   const pre_tax_unlevered_npv_at_valuation_date = npv(
//     npv_calculation_data.discount_rate_pre_tax_and_unlevered,
//     pre_tax_unlevered_cash_flow_from_valuation_date
//   );
//   // const irr_pre_tax_unlevered_at_valuation_date = calcIRR(
//   //   pre_tax_unlevered_npv_at_valuation_date,
//   //   npv_calculation_data.discount_rate_pre_tax_and_unlevered,
//   //   pre_tax_unlevered_cash_flow_from_valuation_date
//   // );

//   const payback_period_pre_tax_unlevered = paybackPeriod(
//     pre_tax_unlevered_cash_flow_from_valuation_date,
//     operation_start_date_month_number - valuation_date_month_number
//   );

//   const post_tax_unlevered_npv_at_valuation_date = npv(
//     npv_calculation_data.discount_rate_post_tax_and_unlevered,
//     post_tax_unlevered_cash_flow_from_valuation_date
//   );

//   // const irr_post_tax_unlevered_at_valuation_date = calcIRR(
//   //   post_tax_unlevered_npv_at_valuation_date,
//   //   npv_calculation_data.discount_rate_post_tax_and_unlevered,
//   //   post_tax_unlevered_cash_flow_from_valuation_date
//   // );
//   const payback_period_post_tax_unlevered = paybackPeriod(
//     post_tax_unlevered_cash_flow_from_valuation_date,
//     operation_start_date_month_number - valuation_date_month_number
//   );

//   const post_tax_levered_npv_at_valuation_date = npv(
//     npv_calculation_data.discount_rate_post_tax_and_levered,
//     post_tax_levered_cash_flow_from_valuation_date
//   );

//   // const irr_post_tax_levered_at_valuation_date = calcIRR(
//   //   post_tax_levered_npv_at_valuation_date,
//   //   npv_calculation_data.discount_rate_post_tax_and_levered,
//   //   post_tax_levered_cash_flow_from_valuation_date
//   // );
//   const payback_period_post_tax_levered = paybackPeriod(
//     post_tax_levered_cash_flow_from_valuation_date,
//     operation_start_date_month_number - valuation_date_month_number
//   );

//   return [
//     {
//       valuation_condition: "Pre-tax unlevered",
//       value: {
//         pre_tax_unlevered_npv_at_valuation_date:
//           pre_tax_unlevered_npv_at_valuation_date,
//         // irr_pre_tax_unlevered_at_valuation_date:
//         //   irr_pre_tax_unlevered_at_valuation_date,
//         payback_period: payback_period_pre_tax_unlevered,
//       },
//     },
//     {
//       valuation_condition: "Post-tax unlevered",
//       value: {
//         post_tax_unlevered_npv_at_valuation_date:
//           post_tax_unlevered_npv_at_valuation_date,
//         // irr_post_tax_unlevered_at_valuation_date:
//         //   irr_post_tax_unlevered_at_valuation_date,
//         payback_period: payback_period_post_tax_unlevered,
//       },
//     },
//     {
//       valuation_condition: "Post-tax levered",
//       value: {
//         post_tax_levered_npv_at_valuation_date:
//           post_tax_levered_npv_at_valuation_date,
//         // irr_post_tax_levered_at_valuation_date:
//         //   irr_post_tax_levered_at_valuation_date,
//         payback_period: payback_period_post_tax_levered,
//       },
//     },
//   ];
// }
