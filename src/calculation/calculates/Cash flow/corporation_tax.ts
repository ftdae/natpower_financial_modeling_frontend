// import moment from "moment";
// import { DEFAULT_CAPITAL_EXPENDITURE } from "../../Cash flow/constant";
// import { ICapitalExpenditure } from "../../Cash flow/type";
// import {
//   getAsAPercentOfPeriod,
//   getFlagOfPeriod,
//   getQuarterNumberFromModelStartDate,
//   multiplyArrays,
//   multiplyNumber,
//   sumArray,
//   sumArrays,
// } from "../utils";
// import { DEFAULT_CORPORATION_TAX, DEFAULT_EBIT } from "./constant";
// import { ICorporationTax, Iebit } from "./type";
// import { DATE_FORMAT } from "../../../utils/usePrameter";

// export function calcCorporationTax({
//   corporationTax = DEFAULT_CORPORATION_TAX,
//   modelStartDate = "2023-01-01",
//   operationStartDate = "2028-01-01",
//   decommissioningEndDate = "2068-06-30",
//   decommissioningStartDate = "2068-01-01",
//   developmentStartDate = "2023-07-01",
//   ebit = DEFAULT_EBIT,
//   capitalExpenditure = DEFAULT_CAPITAL_EXPENDITURE,
// }: {
//   corporationTax?: ICorporationTax;
//   modelStartDate?: string;
//   operationStartDate?: string;
//   decommissioningStartDate?: string;
//   decommissioningEndDate?: string;
//   developmentStartDate?: string;
//   ebit?: Iebit;
//   capitalExpenditure?: ICapitalExpenditure;
//   landRent?: any;
//   landSize?: any;
//   operationEndDate?: any;
//   constructionStartDate?: any;
//   costOfAdditions?: any;
//   revenueSetup?: any;
//   assumptionsData?: any;
//   detailedRevenueData?: any;
//   initialCycleData?: any;
//   initialCapacity?: any;
//   startingAssumptionsForBatteries?: any;
//   batteryDisposals?: any;
//   batteryEfficiency?: any;
//   batteryAugmentation?: any;
//   model?: any;
//   batteryDuration?: any;
//   batteryCubes?: any;
//   batteryExCubes?: any;
//   inflationInputs?: any;
//   capexPaymentsProfile?: any;
//   capexPaymentMilestones?: any;
//   capexUEL?: any;
//   bessCapexForecast?: any;
//   batterySensitivity?: any;
//   operationYears?: any;
//   capexSensitivity?: any;

//   meteringSettings?: any;
//   auxilliaryLossesSettings?: any;
//   systemPeakTariffData?: any;
//   sharedYearRoundTariffData?: any;
//   notSharedYearRoundTariffData?: any;
//   ajdustmentTariffData?: any;
//   exportChargesOfTNUoS?: any;
//   localSubstationTariff?: any;
//   localSubstationSwitch?: any;
//   localCircuitsData?: any;
//   battery_duration?: any;
//   extended_warranty?: any;
//   siteSecurity?: any;
//   otherAdministrativeCosts?: any;
//   legalCosts?: any;
//   insurance?: any;
//   communityBenefit?: any;
//   averageWholeSaleDayAheadPrice?: any;
//   businessRates?: any;
//   assetManagement?: any;
//   revenueSensitivity?: any;
//   operationAndManagementSettings?: any;
//   constraintFactor?: any;
//   opexSensitivity?: any;
//   vintage?: any;
// }) {
//   const operationStartDateMonthNumber =
//     getQuarterNumberFromModelStartDate(modelStartDate, operationStartDate) - 1;

//   const period =
//     getQuarterNumberFromModelStartDate(modelStartDate, decommissioningEndDate) -
//     1;
//   const operationEndDateMonthNumber =
//     getQuarterNumberFromModelStartDate(
//       modelStartDate,
//       decommissioningStartDate
//     ) - 2;
//   const operationFlag = getFlagOfPeriod(
//     modelStartDate,
//     operationStartDate,
//     moment(decommissioningStartDate).add(-1, "days").format(DATE_FORMAT),
//     decommissioningEndDate
//   );
//   const developmentStartDateMonthNumber =
//     getQuarterNumberFromModelStartDate(modelStartDate, developmentStartDate) -
//     1;
//   const developmentToDecommissioningFlag: number[] = [];
//   for (let i = 0; i < period; i++) {
//     if (i < developmentStartDateMonthNumber)
//       developmentToDecommissioningFlag[i] = 0;
//     else developmentToDecommissioningFlag[i] = 1;
//   }
//   // Calc ~~~ 26 Corporate tax creditor ~~~
//   // 26.01 Capital allowances ~~~ Additions adjusted for AIA

//   // firstOperatingFlag calcs ~~~ row 5108
//   let firstOperatingFlag: number[] = new Array(period).fill(0);
//   firstOperatingFlag[operationStartDateMonthNumber - 1] = 1;

//   // preOpertationFlag calcs ~~~ row 5109
//   const preOpertationFlag: number[] = getFlagOfPeriod(
//     modelStartDate,
//     modelStartDate,
//     moment(operationStartDate)
//       .startOf("quarter")
//       .add(-1, "days")
//       .format(DATE_FORMAT),
//     decommissioningEndDate
//   );
//   // additionsExcBatteries cacls ~~~ row 5111
//   const additionsExcBatteries = capitalExpenditure.additionsExcludingBatteries;
//   // additionsBatteriesOnly cacls ~~~ row 5112
//   const additionsBatteriesOnly = capitalExpenditure.additionsBatteriesOnly;

//   // additionsPreOperationsExcBatteries calcs ~~~ row 5114
//   const additionsPreOperationsExcBatteries = multiplyArrays([
//     preOpertationFlag,
//     additionsExcBatteries,
//   ]);
//   // additionsPreOperationsBatteriesOnly calcs ~~~ row 5115
//   const additionsPreOperationsBatteriesOnly = multiplyArrays([
//     preOpertationFlag,
//     additionsBatteriesOnly,
//   ]);

//   // additionsPreOperationsExcBatteriesAtFirstOperatinPeriod calcs ~~~ row 5117
//   const additionsPreOperationsExcBatteriesAtFirstOperatinPeriod =
//     multiplyNumber(
//       firstOperatingFlag,
//       sumArray(additionsPreOperationsExcBatteries)
//     );
//   // additionsPreOperationsBatteriesOnlyAtFirstOperatingPeriod calcs ~~~ row 5118
//   const additionsPreOperationsBatteriesOnlyAtFirstOperatingPeriod =
//     multiplyNumber(
//       firstOperatingFlag,
//       sumArray(additionsPreOperationsBatteriesOnly)
//     );
//   // additionsDuringOperationsExcBatteries calcs row 5119
//   const additionsDuringOperationsExcBatteries = multiplyArrays([
//     operationFlag,
//     additionsExcBatteries,
//   ]);

//   // additionsDuringOperationsBatteriesOnly calcs row 5120
//   const additionsDuringOperationsBatteriesOnly = multiplyArrays([
//     operationFlag,
//     additionsBatteriesOnly,
//   ]);
//   // total calcs row 5121
//   const total = sumArrays(
//     additionsPreOperationsBatteriesOnlyAtFirstOperatingPeriod,
//     additionsPreOperationsExcBatteriesAtFirstOperatinPeriod,
//     additionsDuringOperationsBatteriesOnly,
//     additionsDuringOperationsExcBatteries
//   );
//   const additions = capitalExpenditure.capexExpenditure;
//   let additionsPreOperations = [];
//   let additionsDuringOperations = [];
//   // annualInvestmentAllowance ~~~ calc F5123
//   const annualInvestmentAllowance = corporationTax.annualInvestmentAllowance;
//   // annualInvestmentAllowanceUtilised ~~~ calcs row 5124
//   let annualInvestmentAllowanceUtilised = new Array(period).fill(0);
//   for (let i = 4; i < period; i++) {
//     annualInvestmentAllowanceUtilised[i] = -Math.min(
//       total[i],
//       annualInvestmentAllowance * 1 +
//         (annualInvestmentAllowanceUtilised[i - 4] * 1 +
//           annualInvestmentAllowanceUtilised[i - 3] * 1 +
//           annualInvestmentAllowanceUtilised[i - 2] * 1 +
//           annualInvestmentAllowanceUtilised[i - 1] * 1)
//     );
//   }

//   // capexAdjustedForAIAToMainRatePoolPreFYAAdjustment ~~~ calc row 5128
//   const capexAdjustedForAIAToMainRatePoolPreFYAAdjustment = sumArrays(
//     additionsPreOperationsBatteriesOnlyAtFirstOperatingPeriod,
//     annualInvestmentAllowanceUtilised,
//     additionsDuringOperationsBatteriesOnly
//   );

//   // capexAdjustedForAIAToSpecialRatePool calcs ~~~ row 5129
//   const capexAdjustedForAIAToSpecialRatePool = sumArrays(
//     additionsPreOperationsExcBatteriesAtFirstOperatinPeriod,
//     additionsDuringOperationsExcBatteries
//   );

//   // firstYearFlag calcs row 5133
//   let firstYearFlag = new Array(period).fill(0);
//   for (let i = 0; i < 4; i++) {
//     firstYearFlag[operationStartDateMonthNumber + i - 1] = 1;
//   }
//   // firstYearAdditionsToMainRatePool calc row 5134
//   const firstYearAdditionsToMainRatePool = multiplyArrays([
//     firstYearFlag,
//     capexAdjustedForAIAToMainRatePoolPreFYAAdjustment,
//   ]);

//   // firstYearAllowanceDeductionPercentage calc F5135
//   const firstYearAllowanceDeductionPercentage = 100;

//   // firstYearAllowanceDeduction calc row 5136 = row 5154
//   const firstYearAllowanceDeduction = multiplyNumber(
//     firstYearAdditionsToMainRatePool,
//     -firstYearAllowanceDeductionPercentage / 100
//   );
//   // rateForCapitalAllowancesMainPool calc F5140
//   const rateForCapitalAllowancesMainPool =
//     corporationTax.rateForCapitalAllowancesMainPool;
//   // specialRatePerQuarter calc F5141
//   const specialRatePerQuarter = rateForCapitalAllowancesMainPool / 4;

//   // balanceBeforeCapitalAllowancesClaimed ~~~ calcs row 5143
//   let balanceBeforeCapitalAllowancesClaimed = new Array(period).fill(0);

//   // capitalAllowancesClaimed ~~~ calcs row 5144 = row 5155
//   let capitalAllowancesClaimed = new Array(period).fill(0);

//   // mainRatePoolStartBalance calcs row 5152
//   let mainRatePoolStartBalance: number[] = new Array(period).fill(0);
//   // mainRatePoolEndBalance calcs row 5156
//   let mainRatePoolEndBalance: number[] = new Array(period).fill(0);
//   // additionsAdjustedForAIA calcs row 5153
//   const additionsAdjustedForAIA =
//     capexAdjustedForAIAToMainRatePoolPreFYAAdjustment;
//   for (let i = 0; i < period; i++) {
//     balanceBeforeCapitalAllowancesClaimed[i] =
//       mainRatePoolStartBalance[i] +
//       firstYearAllowanceDeduction[i] +
//       additionsAdjustedForAIA[i];
//     capitalAllowancesClaimed[i] =
//       -(balanceBeforeCapitalAllowancesClaimed[i] <
//       corporationTax.smallPoolAllowanceThreshold
//         ? 1
//         : specialRatePerQuarter / 100) *
//       balanceBeforeCapitalAllowancesClaimed[i] *
//       operationFlag[i];
//     mainRatePoolEndBalance[i] =
//       mainRatePoolStartBalance[i] +
//       additionsAdjustedForAIA[i] +
//       firstYearAllowanceDeduction[i] +
//       capitalAllowancesClaimed[i];
//     if (i < period - 1)
//       mainRatePoolStartBalance[i + 1] =
//         mainRatePoolEndBalance[i] * developmentToDecommissioningFlag[i + 1];
//   }
//   // specialRatePoolPerQuarter calcs F5161
//   const specialRatePoolPerQuarter =
//     corporationTax.rateForCapitalAllowancesSpecialPool / 4;
//   // balanceBeforeCapitalAllowancesClaimedForSpecialRatePool calcs row 5163
//   const balanceBeforeCapitalAllowancesClaimedForSpecialRatePool = new Array(
//     period
//   ).fill(0);
//   // capitalAllowancesClaimedForSpecialRatePool calcs row 5164 = row 5174
//   const capitalAllowancesClaimedForSpecialRatePool = new Array(period).fill(0);
//   // specialRatePoolStartBalance calcs row 5172
//   const specialRatePoolStartBalance = new Array(period).fill(0);
//   // specialRatePoolEndBalance calcs row 5175
//   const specialRatePoolEndBalance = [];

//   for (let i = 0; i < period; i++) {
//     balanceBeforeCapitalAllowancesClaimedForSpecialRatePool[i] =
//       specialRatePoolStartBalance[i] + capexAdjustedForAIAToSpecialRatePool[i];
//     capitalAllowancesClaimedForSpecialRatePool[i] =
//       -(balanceBeforeCapitalAllowancesClaimedForSpecialRatePool[i] <
//       corporationTax.smallPoolAllowanceThreshold
//         ? 1
//         : specialRatePoolPerQuarter / 100) *
//       balanceBeforeCapitalAllowancesClaimedForSpecialRatePool[i] *
//       operationFlag[i];
//     specialRatePoolEndBalance[i] =
//       specialRatePoolStartBalance[i] +
//       capexAdjustedForAIAToSpecialRatePool[i] +
//       capitalAllowancesClaimedForSpecialRatePool[i];
//     if (i < period - 1)
//       specialRatePoolStartBalance[i + 1] =
//         specialRatePoolEndBalance[i] * developmentToDecommissioningFlag[i + 1];
//   }

//   // taxLossAccrued calcs row 5181 = row 5194
//   const taxLossAccrued = new Array(period).fill(0);
//   // taxLossUtilised ~~~ row 5185 = row 5195
//   const taxLossUtilised: number[] = new Array(period).fill(0);
//   // taxLossStartBalance calcs row 5193
//   const taxLossStartBalance = new Array(period).fill(0);
//   // taxLossEndBalance calcs row 5196
//   const taxLossEndBalance = new Array(period).fill(0);
//   // earningsBeforeIT calcs row 5200
//   const earningsBeforeIT = ebit.ebit;

//   // adjustedProfitBeforeTax calcs row 5206
//   const adjustedProfitBeforeTax = new Array(period).fill(0);
//   for (let i = 0; i < period; i++) {
//     taxLossUtilised[i] = Math.min(
//       -taxLossStartBalance[i],
//       Math.max(
//         0,
//         earningsBeforeIT[i] +
//           annualInvestmentAllowanceUtilised[i] +
//           firstYearAllowanceDeduction[i] +
//           capitalAllowancesClaimed[i] +
//           capitalAllowancesClaimedForSpecialRatePool[i]
//       )
//     );
//     adjustedProfitBeforeTax[i] =
//       earningsBeforeIT[i] +
//       annualInvestmentAllowanceUtilised[i] +
//       firstYearAllowanceDeduction[i] +
//       capitalAllowancesClaimed[i] +
//       capitalAllowancesClaimedForSpecialRatePool[i] -
//       taxLossUtilised[i];
//     taxLossAccrued[i] = Math.min(adjustedProfitBeforeTax[i], 0);
//     taxLossEndBalance[i] =
//       taxLossStartBalance[i] + taxLossAccrued[i] + taxLossUtilised[i];
//     if (i < period - 1)
//       taxLossStartBalance[i + 1] =
//         taxLossEndBalance[i] * developmentToDecommissioningFlag[i + 1];
//   }

//   // annualTaxAdjustedPBT calcs row 5217
//   const leftPeriod: number = period % 4;
//   const calculationPeriodByYears =
//     leftPeriod == 0 ? period / 4 : (period - leftPeriod) / 4 + 1;
//   let annualTaxAdjustedPBT: number[] = new Array(calculationPeriodByYears).fill(
//     0
//   );

//   for (let i = 0; i < calculationPeriodByYears - 1; i++) {
//     annualTaxAdjustedPBT[i] =
//       adjustedProfitBeforeTax[i * 4] +
//       adjustedProfitBeforeTax[i * 4 + 1] +
//       adjustedProfitBeforeTax[i * 4 + 2] +
//       adjustedProfitBeforeTax[i * 4 + 3];
//   }
//   if (leftPeriod != 0 && period < 200) {
//     for (let i = 0; i < leftPeriod - 1; i++) {
//       annualTaxAdjustedPBT[calculationPeriodByYears - 1] +=
//         adjustedProfitBeforeTax[(calculationPeriodByYears - 1) * 4 + i + 1];
//     }
//   }
//   // for (let i = 0; i < leftPeriod; i++) {
//   //   annualTaxAdjustedPBT[calculationPeriodByYears - 1] +=
//   //     adjustedProfitBeforeTax[period - i - 1];
//   // }
//   // taxRateOnAnnualTimeline calcs row 5218
//   let taxRateOnAnnualTimeline: number[] = new Array(
//     calculationPeriodByYears
//   ).fill(corporationTax.smallProfitsTaxRate);
//   taxRateOnAnnualTimeline = annualTaxAdjustedPBT.map((d) =>
//     d > corporationTax.profitThresholdForSmallProfits
//       ? corporationTax.mainRateOfTax
//       : corporationTax.smallProfitsTaxRate
//   );

//   // taxRateOnQuarterlyTimeline calcs row 5220
//   let taxRateOnQuarterlyTimeline: number[] = new Array(period).fill(0);
//   for (let i = 0; i < period; i++) {
//     taxRateOnQuarterlyTimeline[i] = taxRateOnAnnualTimeline[(i - (i % 4)) / 4];
//   }

//   // forecastTaxCharge calcs row 5223
//   const forecastTaxCharge: number[] = adjustedProfitBeforeTax.map(
//     (d, index) =>
//       Math.min(0, (-taxRateOnQuarterlyTimeline[index] / 100) * d) *
//       developmentToDecommissioningFlag[index]
//   );
//   // taxPaymentFlag calcs row 5228
//   const taxPaymentFlag: number[] = new Array(period).fill(0);
//   taxPaymentFlag[7] = 1;

//   for (let i = 8; i < period; i++) {
//     taxPaymentFlag[i] = taxPaymentFlag[i - 4];
//   }
//   // taxPayment calcs row 5229
//   const taxPayment: number[] = new Array(period).fill(0);

//   for (let i = 7; i < period; i++) {
//     taxPayment[i] =
//       (forecastTaxCharge[i - 7] +
//         forecastTaxCharge[i - 6] +
//         forecastTaxCharge[i - 5] +
//         forecastTaxCharge[i - 4]) *
//       taxPaymentFlag[i] *
//       developmentToDecommissioningFlag[i];
//   }
//   // corporateTaxStartBalance calcs row 5235
//   const corporateTaxStartBalance = new Array(period).fill(0);
//   // corporateTaxEndBalance calcs row 5238
//   const corporateTaxEndBalance = new Array(period).fill(0);
//   // taxPaymentForControlAccount calcs row 5237
//   let taxPaymentForControlAccount: number[] = new Array(period).fill(0);
//   // calcs row 5236 Tax charge equals Forecast tax charge

//   for (let i = 0; i < period; i++) {
//     taxPaymentForControlAccount[i] = -taxPayment[i];
//     corporateTaxEndBalance[i] =
//       corporateTaxStartBalance[i] +
//       forecastTaxCharge[i] +
//       taxPaymentForControlAccount[i];
//     if (i < period - 1)
//       corporateTaxStartBalance[i + 1] =
//         corporateTaxEndBalance[i] * developmentToDecommissioningFlag[i + 1];
//   }
//   taxPayment[period - 1] +=
//     corporateTaxStartBalance[period - 1] + forecastTaxCharge[period - 1];
//   return {
//     taxPayment: taxPayment,
//     forecastTaxCharge: forecastTaxCharge,
//     corporate_tax_creditor_for_balance_sheet: corporateTaxEndBalance,
//   };
// }
