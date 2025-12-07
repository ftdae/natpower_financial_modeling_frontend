import moment from "moment";
import { DATE_FORMAT } from "../../utils/usePrameter";
import { DEFAULT_LAND_RENT_EXEPNESE } from "../calculates/Administrative costs/constant";
import {
  IAssetManagement,
  IBusinessRates,
  ICommunityBenefit,
  ICommunityBenefitToCapex,
  IDevexAdditions,
  IExtendedWarranty,
  ILandRent,
  ILandRentExpense,
  ILegalCost,
  IOAndM,
  IOtherAdminCosts,
  ISiteSecurity,
} from "../calculates/Administrative costs/type";
import {
  IDevFeePaymentDates,
  IDevFeePaymentProfile,
} from "../calculates/Balance sheet/type";
import { DEFAULT_EBIT } from "../calculates/Cash flow/constant";
import { ICorporationTax, Iebit } from "../calculates/Cash flow/type";
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
} from "../calculates/CoGS/type";
import { DEFAULT_COMMUNITY_BENEFIT_TO_CAPEX } from "../calculates/Depreciation/constant";
import { ICostOfAdditions } from "../calculates/Depreciation/type";
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
  IGainOnDisposal,
  IInflationForm,
  IRevenueSetup,
  IStartingBatteryAssumptions,
  IVintage,
} from "../calculates/Revenue/type";
import {
  DEFAULT_CAPEX_UEL,
  DEFAULT_GAIN_ON_DISPOSAL,
  DEFAULT_VINTAGE,
} from "../calculates/constant";
import {
  arraySum,
  expandAndAverage,
  expandAndSum,
  getAsAPercentOfPeriod,
  getQuarterNumberFromModelStartDate,
  indexOfSecondLargest,
  minArray,
  multiplyArrays,
  multiplyNumber,
  // nthLargest,
  sumArray,
  sumArrays,
} from "../calculates/utils";
import {
  DEFAULT_BALANCE_OF_PLANT_ADDITIONS,
  DEFAULT_CAPEX_PROVISION,
  DEFAULT_CAPITAL_EXPENDITURE,
  DEFAULT_CASH_REQUIREMENTS,
  DEFAULT_CORPORATION_TAX_VALUE,
  DEFAULT_DEVEX_ADDITIONS,
  DEFAULT_DIVIDENDS,
  DEFAULT_EQUITY,
  DEFAULT_EV_ADDITIONS,
  DEFAULT_GEARING_BY_TAXES,
  DEFAULT_LAND_ADDITIONS,
  DEFAULT_OPERATING_CASH_FLOW_VALUE,
  DEFAULT_POOLING_SUBSTATION_ADDITIONS,
  DEFAULT_SENIOR_DEBT,
  DEFAULT_TRANSFORMERS_ADDITIONS,
  DEFAULT_VAT,
} from "./constant";
import {
  ICapexProvision,
  ICapitalExpenditure,
  ICashRequirements,
  ICorporationTaxValue,
  IDividends,
  IEquity,
  IGearingByTaxes,
  INationalGridSecurities,
  ISeniorDebt,
  IVariableProfile,
  IWrokingCapital,
  Ivat,
} from "./type";

export function calcCapexProvision({
  capexProvision = DEFAULT_CAPEX_PROVISION,
  cashRequirements = DEFAULT_CASH_REQUIREMENTS,
  gearingByCapexType = DEFAULT_GEARING_BY_TAXES,
  equity = DEFAULT_EQUITY,
  seniorDebt = DEFAULT_SENIOR_DEBT,
  dividends = DEFAULT_DIVIDENDS,
  vat = DEFAULT_VAT,
  modelStartDate = "2023-01-01",
  decommissioningEndDate = "2068-06-30",
  developmentStartDate = "2023-07-01",
  vintage = DEFAULT_VINTAGE,
  ebit = DEFAULT_EBIT,

  operatingCashFlowValue = DEFAULT_OPERATING_CASH_FLOW_VALUE,
  corporationTaxValue = DEFAULT_CORPORATION_TAX_VALUE,
  capitalExpenditure = DEFAULT_CAPITAL_EXPENDITURE,
  landAdditions = DEFAULT_LAND_ADDITIONS,
  poolingSubstationAdditions = DEFAULT_POOLING_SUBSTATION_ADDITIONS,
  transformersAdditions = DEFAULT_TRANSFORMERS_ADDITIONS,
  balanceOfPlantAdditions = DEFAULT_BALANCE_OF_PLANT_ADDITIONS,
  evAdditions = DEFAULT_EV_ADDITIONS,
  devexAdditions = DEFAULT_DEVEX_ADDITIONS,
  landRentExpense = DEFAULT_LAND_RENT_EXEPNESE,
  gainOnDisposal = DEFAULT_GAIN_ON_DISPOSAL,
  capexUEL = DEFAULT_CAPEX_UEL,
  communityBenefitToCapex = DEFAULT_COMMUNITY_BENEFIT_TO_CAPEX,
}: // arrangementFees = new Array(300).fill(0)
{
  national_grid_securities?: INationalGridSecurities;
  variable_profile_for_attributable_costs?: IVariableProfile[];
  fullyConsentedDate?: string;
  capexProvision?: ICapexProvision[];
  cashRequirements?: ICashRequirements;
  gearingByCapexType?: IGearingByTaxes;
  length_of_decommissioning?: number;
  equity?: IEquity;
  seniorDebt?: ISeniorDebt;
  dividends?: IDividends;
  developmentFeePaymentPercentageProfile?: IDevFeePaymentProfile;
  developmentFeePaymentDateProfile?: IDevFeePaymentDates;
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
  ebit?: Iebit;
  operatingCashFlowValue?: number[];
  corporationTaxValue?: ICorporationTaxValue;
  landAdditions?: number[];
  poolingSubstationAdditions?: number[];
  transformersAdditions?: number[];
  balanceOfPlantAdditions?: number[];
  evAdditions?: number[];
  devexAdditions?: IDevexAdditions;
  landRentExpense?: ILandRentExpense;
  gainOnDisposal?: IGainOnDisposal;
  capitalExpenditure?: ICapitalExpenditure;
  communityBenefitToCapex?: ICommunityBenefitToCapex;

  // arrangementFees?: number[]
}) {
  const period =
    getQuarterNumberFromModelStartDate(modelStartDate, decommissioningEndDate) -
    1;
  const developmentToDecommissioningFlag = getAsAPercentOfPeriod(
    modelStartDate,
    developmentStartDate,
    decommissioningEndDate,
    decommissioningEndDate
  );

  // Calcs ~~~ 19 Fixed assets ~~~ 19.02 Cash payments
  // Capex provision length
  // Calcs ~~~ 26 Capex provisioin ~~~ 26.01 Accrual
  // Forecast cash payments
  const vintagesData = vintage?.vintages;
  let vintagesAdditionsCost =
    vintagesData[0]?.data?.forecastAdditionsByMilestones;
  const numberOfVintages = vintagesData.length;
  for (let i = 1; i < numberOfVintages; i++) {
    if (vintagesData[i]?.data?.stagingMonthNumber == 0) break;
    else
      vintagesAdditionsCost = arraySum(
        vintagesAdditionsCost,
        vintagesData[i]?.data?.forecastAdditionsByMilestones
      );
  }
  const vintagesGrossCashPayments = multiplyNumber(
    vintagesAdditionsCost,
    1 + vat.vatRate / 100
  );
  const landGrossCashPayments = landAdditions.map(
    (d) => d * (1 + (1 * vat.vatRate) / 100)
  );
  const poolingSubstationGrossCashPayments = poolingSubstationAdditions.map(
    (d) => d * (1 + (1 * vat.vatRate) / 100)
  );
  const transformersGrossCashPayments = transformersAdditions.map(
    (d) => d * (1 + (1 * vat.vatRate) / 100)
  );
  const balanceOfPlantGrossCashPayments = balanceOfPlantAdditions.map(
    (d) => d * (1 + (1 * vat.vatRate) / 100)
  );
  const enterpriseValueGrossCashPayments = multiplyNumber(evAdditions, 1);

  const capitalisedRentGrossCashPayments =
    landRentExpense.rentToFixedAssets.map(
      (d) => -d * (1 + (1 * vat.vatRate) / 100)
    );

  const devexGrossCashPayments = devexAdditions.devexAdditions.map(
    (d) => d * (1 + (1 * vat.vatRate) / 100)
  );
  const communityBenefitCashPayments = multiplyNumber(
    communityBenefitToCapex.forecastCostToCapex,
    -(1 + vat.vatRate / 100)
  );
  // total_cash_payment is used in movementin capex creditor
  const total_cash_payment = sumArrays(
    vintagesGrossCashPayments,
    landGrossCashPayments,
    poolingSubstationGrossCashPayments,
    transformersGrossCashPayments,
    balanceOfPlantGrossCashPayments,
    enterpriseValueGrossCashPayments,
    capitalisedRentGrossCashPayments,
    devexGrossCashPayments
  );

  // Calcs ~~~ 26 Capex provisioin ~~~ 26.01 Accrual
  // Total accrual

  let vintagesAccrual = new Array(period).fill(0);
  let devexAccrual = new Array(period).fill(0);
  let capitalisedRentAccrual = new Array(period).fill(0);
  let landAccrual = new Array(period).fill(0);
  let enterpriseValueAccrual = new Array(period).fill(0);
  let poolingSubstationAccrual = new Array(period).fill(0);
  let transformersAccrual = new Array(period).fill(0);
  let balanceOfPlantAccrual = new Array(period).fill(0);
  let communityBenefitAccrual = new Array(period).fill(0);
  const vintagesAccrualMonth =
    capexProvision.find((d) => d.capexObject == "Batteries")?.months || 0;
  if (vintagesAccrualMonth != 0) {
    vintagesAccrual = expandAndAverage(
      vintagesGrossCashPayments,
      vintagesAccrualMonth
    );
  } else vintagesAccrual = vintagesGrossCashPayments;

  const devexAccrualMonth =
    capexProvision.find((d) => d.capexObject == "Devex")?.months || 0;

  if (devexAccrualMonth != 0) {
    devexAccrual = expandAndAverage(devexGrossCashPayments, devexAccrualMonth);
  } else devexAccrual = devexGrossCashPayments;

  const landAccrualMonth =
    capexProvision.find((d) => d.capexObject == "Land")?.months || 0;

  if (landAccrualMonth != 0) {
    landAccrual = expandAndAverage(landGrossCashPayments, landAccrualMonth);
  } else landAccrual = landGrossCashPayments;

  const capitalisedRentAccrualMonth =
    capexProvision.find(
      (d) => d.capexObject == "Capitalised rent in construction"
    )?.months || 0;
  if (capitalisedRentAccrualMonth != 0) {
    capitalisedRentAccrual = expandAndAverage(
      capitalisedRentGrossCashPayments,
      capitalisedRentAccrualMonth
    );
  } else capitalisedRentAccrual = capitalisedRentGrossCashPayments;

  const poolingSubstationAccrualMonth =
    capexProvision.find((d) => d.capexObject == "Pooling substation")?.months ||
    0;

  if (poolingSubstationAccrualMonth != 0) {
    poolingSubstationAccrual = expandAndAverage(
      poolingSubstationGrossCashPayments,
      poolingSubstationAccrualMonth
    );
  } else poolingSubstationAccrual = poolingSubstationGrossCashPayments;
  const transformersAccrualMonth =
    capexProvision.find((d) => d.capexObject == "Transformers")?.months || 0;

  if (transformersAccrualMonth != 0) {
    transformersAccrual = expandAndAverage(
      transformersGrossCashPayments,
      transformersAccrualMonth
    );
  } else transformersAccrual = transformersGrossCashPayments;

  const balanceOfPlantAccrualMonth =
    capexProvision.find((d) => d.capexObject == "Balance of Plant")?.months ||
    0;

  if (balanceOfPlantAccrualMonth != 0) {
    balanceOfPlantAccrual = expandAndAverage(
      balanceOfPlantGrossCashPayments,
      balanceOfPlantAccrualMonth
    );
  } else balanceOfPlantAccrual = balanceOfPlantGrossCashPayments;
  const enterpriseValueAccrualMonth =
    capexProvision.find(
      (d) => d.capexObject == "Enterprise value - Development fee"
    )?.months || 0;

  if (enterpriseValueAccrualMonth != 0) {
    enterpriseValueAccrual = expandAndAverage(
      enterpriseValueGrossCashPayments,
      enterpriseValueAccrualMonth
    );
  } else enterpriseValueAccrual = enterpriseValueGrossCashPayments;

  const communityBenefitAccrualmonth =
    capexProvision.find((d) => d.capexObject == "Community benefit")?.months ||
    0;

  if (communityBenefitAccrualmonth != 0) {
    communityBenefitAccrual = expandAndAverage(
      communityBenefitCashPayments,
      communityBenefitAccrualmonth
    );
  } else communityBenefitAccrual = communityBenefitCashPayments;

  const accrualByVintages = [];
  for (let i = 0; i < numberOfVintages; i++) {
    if (vintagesData[i].data.stagingMonthNumber == 0) break;
    else if (vintagesAccrualMonth == 0) {
      accrualByVintages[i] = vintagesData[
        i
      ].data.forecastAdditionsByMilestones.map(
        (d: number) => d * (1 + (1 * vat.vatRate) / 100)
      );
    } else {
      accrualByVintages[i] = expandAndAverage(
        vintagesData[i].data.forecastAdditionsByMilestones.map(
          (d: number) => d * (1 + (1 * vat.vatRate) / 100)
        ),
        vintagesAccrualMonth
      );
    }
  }
  // Calcs ~~~ 26 Capex provisioin ~~~ 26.02 Cash payment

  // Calcs ~~~ 27 Senior debt ~~~ 27.01 Drawdowns
  // Capex total cash drawdowns per provision

  // capexExcludingBatteries calcs row 5962
  let capexExcludingBatteries = new Array(period).fill(0);
  capexExcludingBatteries = sumArrays(
    devexAccrual,
    capitalisedRentAccrual,
    landAccrual,
    enterpriseValueAccrual,
    poolingSubstationAccrual,
    transformersAccrual,
    balanceOfPlantAccrual,
    communityBenefitAccrual
  );

  // Calcs ~~~ 27 Senior debt ~~~ 27.01 Drawdowns
  // Minimum cash drawdown

  // let operatingCashflow = calcEBIT().ebitda.map(
  // 	(d, index) =>
  // 		d - calcGainOnDisposal().gainOnDisposalRevenue[index]
  // );
  const operatingCashflow = operatingCashFlowValue;

  const capitalExpenditureValue =
    capitalExpenditure.capexExpenditureForCashflow;
  const saleOfFixedAssets = gainOnDisposal.forecastRecycleRevenue;

  const corporationTaxPayment = corporationTaxValue.taxPayment;

  const sum = sumArrays(
    operatingCashflow,
    capitalExpenditureValue,
    saleOfFixedAssets,
    corporationTaxPayment
  );

  // Calcs ~~~ 27 Senior debt ~~~ 27.01 Drawdowns
  // Gearing

  const capacityPreAdjustmentForEfficiency = [];
  for (let i = 0; i < numberOfVintages; i++) {
    if (vintagesData[i].data.stagingMonthNumber == 0) break;
    else
      capacityPreAdjustmentForEfficiency[i] =
        vintagesData[i].data.capacityPreAdjustmentForEfficiency;
  }

  const drawdownedBatteryNumber =
    indexOfSecondLargest(capacityPreAdjustmentForEfficiency) + 1 || 1;
  //  batteriesDrawdown calcs ~~~ row 6034

  //  batteriesDrawdown calcs ~~~ row 6034
  const batteriesDrawdown = multiplyNumber(
    accrualByVintages[drawdownedBatteryNumber - 1] || new Array(300).fill(0),
    0 / 100
  );

  const nonBatteriesDrawdown = multiplyNumber(
    capexExcludingBatteries,
    gearingByCapexType.excludingBatteries
  );
  let seniorDebtDrawdown = new Array(period).fill(0);
  if (seniorDebt.repaymentStrategy != 2)
    seniorDebtDrawdown = multiplyArrays([
      sumArrays(batteriesDrawdown, nonBatteriesDrawdown),
      developmentToDecommissioningFlag,
    ]);

  if (seniorDebt.repaymentStrategy == 2) {
    // vintagesGCP is Gross cash payments row 4417~4456
    // vintagesGCP is used as Forecast cash payments in row 5732 ~ 5771
    let vintagesGCP: number[][] = new Array(40).fill(new Array(period).fill(0));

    // vintagesCTCD is Capex total cash drawdowns in  row 6372 ~ 6411
    let vintagesCTCD: number[][] = new Array(40).fill(
      new Array(period).fill(0)
    );
    // batteryAccrueMonth cell F5714
    const batteryAccrueMonth = capexProvision[0].months || 0;

    // vintagesCED is Equity first - cumulative equity drawdowns in  row 6597 ~ 6636
    let vintagesCED: number[][] = new Array(40).fill(new Array(period).fill(0));

    // vintagesED is Equity first - equity drawdowns in  row 6642 ~ 6681
    let vintagesED: number[][] = new Array(40).fill(new Array(period).fill(0));

    // vintagesSDD is Equity first - senior debt drawdowns in  row 6689 ~ 6728
    let vintagesSDD: number[][] = new Array(40).fill(new Array(period).fill(0));

    // percentageOfEquity cell F6507 ~ F6546
    let percentageOfEquity: number[] = new Array(40).fill(1);

    // vintagesEquityCap cell F6552 ~ F6591
    let vintagesEquityCap: number[] = new Array(40).fill(0);

    // devex row 6413
    let devex = new Array(period).fill(0);

    // devexFCP row 5773
    let devexFCP = new Array(period).fill(0);

    // devexAccrual row 6270
    let devexAccrual = new Array(period).fill(0);

    // nonBatteriesDEC cell F6593
    const nonBatteriesDEC =
      (sumArray(capexExcludingBatteries) *
        gearingByCapexType.excludingBatteries) /
      100;

    for (let i = 0; i < 40; i++) {
      vintagesGCP[i] = multiplyNumber(
        vintage.vintages[i].data.forecastAdditionsByMilestones,
        (100 + 1 * vat.vatRate) / -100
      );

      vintagesCTCD[i] = !batteryAccrueMonth
        ? vintagesGCP[i]
        : new Array(period).fill(0);
      vintagesEquityCap[i] = -sumArray(vintagesCTCD[i]) * percentageOfEquity[i];

      if (vintage.vintages[i].data.stagingMonthNumber == 0) break;
      else {
        for (let j = 1; j < period; j++) {
          vintagesED[i][j] = Math.min(
            vintagesCTCD[i][j],
            vintagesEquityCap[i] - vintagesCED[i][j - 1]
          );

          vintagesCED[i][j] = vintagesCED[i][j - 1] + vintagesED[i][j];
          vintagesSDD[i][j] = vintagesCTCD[i][j] - vintagesED[i][j];

          seniorDebtDrawdown[j] += vintagesSDD[i][j];
        }
      }
    }

    // nonBatteriesCED row 6638
    let nonBatteriesCED: number[] = new Array(period).fill(0);

    // nonBatteriesED row 6683
    let nonBatteriesED: number[] = new Array(period).fill(0);

    // nonBatteriesSDD row 6730
    let nonBatteriesSDD: number[] = new Array(period).fill(0);

    for (let i = 1; i < period; i++) {
      nonBatteriesED[i] = Math.min(
        devex[i],
        nonBatteriesDEC - nonBatteriesCED[i - 1]
      );

      nonBatteriesCED[i] = nonBatteriesCED[i - 1] + nonBatteriesED[i];

      nonBatteriesSDD[i] = capexExcludingBatteries[i] - nonBatteriesED[i];
      seniorDebtDrawdown[i] += nonBatteriesSDD[i];
    }
  }
  // Calcs ~~~ 27 Senior debt ~~~ 27.01 Drawdowns
  // Adjustment for capex accrual before start of development

  const preDevelopmentFlag = getAsAPercentOfPeriod(
    modelStartDate,
    modelStartDate,
    moment(developmentStartDate).add(-1, "days").format(DATE_FORMAT),
    decommissioningEndDate
  );

  const preDevelopmentAccruals = sumArray(
    multiplyArrays([preDevelopmentFlag, capexExcludingBatteries])
  );
  const firstDevelopmentMonthNumber = getQuarterNumberFromModelStartDate(
    modelStartDate,
    developmentStartDate
  );
  const firstDevelopmentFlag = new Array(period).fill(0);
  for (let i = 0; i < period; i++) {
    if (i != firstDevelopmentMonthNumber - 1) firstDevelopmentFlag[i] = 0;
    else firstDevelopmentFlag[i] = 1;
  }
  const pre_DevelopmentAccruals = multiplyNumber(
    firstDevelopmentFlag,
    preDevelopmentAccruals
  );

  const totalCashDrawdownsRequired = new Array(period).fill(0);
  const cashAvailableBeforeDrawdown = new Array(period).fill(0);
  const cashDrawdownsRequired = new Array(period).fill(0);
  const balanceToEquity = new Array(period).fill(0);

  // FS_M ~~~ 1 Cash flow
  // Calcs ~~~ 27 Senior debt ~~~ 27.01 Drawdowns
  // Minimum cash drawdown

  const cashStartBalance = new Array(period).fill(0);
  cashStartBalance[0] = 0;
  // const cashflow = new Array(period).fill(0);
  const cashEndBalance = new Array(period).fill(0);

  // Calcs 31 Shareholder loan ~~~ 31.01 Drawdowns
  // const equityDrawdowns = new Array(period).fill(0);
  const shareholderLoanDrawdown = new Array(period).fill(0);
  const shareCapitalDrawdown = new Array(period).fill(0);
  // Calcs 31 Shareholder loan ~~~ 31.02 Interest
  const shareholder_loan_interest_rate = equity.shareholderLoanInterest;
  const shareholder_loan_monthly_interest_rate =
    Math.pow(1 + shareholder_loan_interest_rate / 100, 1 / 4) - 1;
  // Calcs 31 Shareholder loan ~~~
  // 31.03 Repayment ~~~ Cash available before shareholder loan repayment

  const cash_available_before_shareholder_loan_repayment = new Array(
    period
  ).fill(0);

  // Calcs 31 Shareholder loan ~~~
  // 31.03 Repayment ~~~ Cash sweep

  const minimum_cash_available_and_lookforward_restriction = new Array(
    period
  ).fill(0);
  const control_account_balance_before_shareholder_loan_repayment = new Array(
    period
  ).fill(0);

  // Calcs 31 Shareholder loan ~~~ 31.04 Control account

  const shareholder_loan_start_balance = new Array(period).fill(0);
  shareholder_loan_start_balance[0] = 0;
  const shareholder_loan_drawdown = new Array(period).fill(0);
  const shareholder_loan_interest = new Array(period).fill(0);
  const shareholder_loan_interest_expense_for_profit_and_loss = new Array(
    period
  ).fill(0);
  const shareholder_loan_repayment = new Array(period).fill(0);
  const shareholder_loan_end_balance = new Array(period).fill(0);

  // Calcs 27.03 Repayments ~~~ Cash available before senior debt repayment
  const cashAvailableBeforeSeniorDebtRepayment = new Array(period).fill(0);
  // Calcs 27.03 Repayments ~~~ Cash look-forward workings
  const lookForward = new Array(period).fill(0);
  const cumulativeLookForward = new Array(period).fill(0);
  let minimumCumulative = new Array(period).fill(0);
  for (let i = 0; i < period; i++) {
    if (i != period - 1) lookForward[i] = sum[i + 1];
    else lookForward[i] = 0;
  }
  if (
    cashRequirements?.cashSwitch == 1 &&
    cashRequirements?.cashRequirementLookForwardRestriction != 0
  ) {
    for (
      let i = 0;
      i < 1 * cashRequirements?.cashRequirementLookForwardRestriction;
      i++
    ) {
      cumulativeLookForward[i] = expandAndSum(lookForward, i + 1);
    }
    minimumCumulative = minArray(cumulativeLookForward);
  }
  // Calcs 27.03 Repayments ~~~ Look-forward restriction
  // let cashAvailableForSeniorDebtRepaymentLessMinimum =
  // 	cashAvailableBeforeSeniorDebtRepayment.map(
  // 		(d) => d - cashRequirements.minimumCashBalance
  // 	);

  // let lookForwardRestriction = multiplyArrays(
  // 	developmentToDecommissioningFlag,
  // 	sumArrays(
  // 		cashAvailableForSeniorDebtRepaymentLessMinimum,
  // 		minimumCumulative
  // 	)
  // );

  // Calcs 27.03 Repayments ~~~ Cash sweep
  // let minimumCashAvailableAndLookForwardRestriction = multiplyArrays(
  // 	developmentToDecommissioningFlag,
  // 	lookForwardRestriction.map(
  // 		(d, index) =>
  // 			(Math.min(
  // 				d,
  // 				cashAvailableForSeniorDebtRepaymentLessMinimum[index]
  // 			) *
  // 				seniorDebt.cashSweepPercentOfAvailableCash) /
  // 			100
  // 	)
  // );
  const lookForwardRestriction = new Array(period).fill(0);
  const minimumCashAvailableAndLookForwardRestriction = new Array(period).fill(
    0
  );
  const netCashflow = new Array(period).fill(0);
  const cashAvailableForSeniorDebtRepaymentLessMinimum = new Array(period).fill(
    0
  );
  const seniorDebtRepayment = new Array(period).fill(0);
  const controlAccountBalanceBeforeRepayment = new Array(period).fill(0);
  const seniorDebtRepaymentForControlAccount = new Array(period).fill(0);
  const seniorDebtRepaymentForCashFlow = new Array(period).fill(0);

  // Calcs 27.02 Interest
  // Calcs 27.04 Control account

  const seniorDebtStartBalance = new Array(period).fill(0);
  seniorDebtStartBalance[0] = 0;
  const seniorDebtEndBalance = new Array(period).fill(0);
  const interest = new Array(period).fill(0);
  const repayments = new Array(period).fill(0);
  const monthlyInterestRate =
    Math.pow(1 + (1 * seniorDebt.seniorDebtInterst) / 100, 1 / 4) - 1;

  // Calcs 32 Dividends

  // 32.01 Cash available before dividends

  // cash_available_before_shareholder_loan_repayment is already calculated
  // shareholder_loan_repayment is already calculated and this
  // is same with the value in the profit and loss account
  const cash_available_before_dividends = new Array(period).fill(0);

  // retained_earnings_start_balance comes from FS_M
  const retained_earnings_start_balance = new Array(period).fill(0);
  retained_earnings_start_balance[0] = 0;
  const profit_loss_before_tax = new Array(period).fill(0);
  const corporation_tax_for_profit_and_loss_account =
    corporationTaxValue.forecastTaxCharge;
  const profit_loss_after_tax = new Array(period).fill(0);
  const retained_earnings_end_balance = new Array(period).fill(0);
  const ebitValue = ebit.ebit;

  const dividends_for_retained_earnings = new Array(period).fill(0);
  const retained_earnings_balance_before_dividends = new Array(period).fill(0);
  const share_capital_start_balance: number[] = new Array(period).fill(0);
  share_capital_start_balance[0] = 0;
  const share_capital_repayment: number[] = new Array(period).fill(0);
  const share_capital_end_balance: number[] = new Array(period).fill(0);
  const cash_available_before_share_capital_repayment: number[] = new Array(
    period
  ).fill(0);
  const total_cash_look_forward_restriction_in_share_capital: number[] =
    new Array(period).fill(0);
  const minimum_cash_available_and_look_forward_restriction_in_share_capital: number[] =
    new Array(period).fill(0);
  const control_account_balance_before_repayment_in_share_capital: number[] =
    new Array(period).fill(0);

  // minimum_cash_available_and_lookforward_restriction_for_dividends is the value of Calcs 5730 row
  const minimum_cash_available_and_lookforward_restriction_for_dividends =
    new Array(period).fill(0);
  for (let i = 0; i < period; i++) {
    interest[i] =
      (seniorDebtStartBalance[i] - seniorDebtDrawdown[i]) *
      monthlyInterestRate *
      developmentToDecommissioningFlag[i];

    // controlAccountBalanceBeforeRepayment ~~~ calcs row 6102
    controlAccountBalanceBeforeRepayment[i] =
      seniorDebtStartBalance[i] - seniorDebtDrawdown[i] + interest[i];

    cashAvailableBeforeDrawdown[i] =
      cashStartBalance[i] +
      operatingCashflow[i] +
      capitalExpenditureValue[i] +
      saleOfFixedAssets[i] +
      corporationTaxPayment[i];

    cashDrawdownsRequired[i] =
      -Math.min(
        cashAvailableBeforeDrawdown[i] -
          1 * cashRequirements.minimumCashBalance,
        0
      ) *
      developmentToDecommissioningFlag[i] *
      cashRequirements.cashSwitch;

    // Calcs ~~~ 27 Senior debt ~~~ 27.01 Drawdowns
    // Total drawdowns

    totalCashDrawdownsRequired[i] =
      (pre_DevelopmentAccruals[i] +
        cashDrawdownsRequired[i] +
        capexExcludingBatteries[i] +
        vintagesAccrual[i]) *
      developmentToDecommissioningFlag[i];

    balanceToEquity[i] = totalCashDrawdownsRequired[i] - seniorDebtDrawdown[i];

    shareholderLoanDrawdown[i] =
      (balanceToEquity[i] * equity.equitySplitToShareholderLoan) / 100;
    shareholder_loan_drawdown[i] = -shareholderLoanDrawdown[i];
    shareholder_loan_interest[i] =
      (shareholder_loan_start_balance[i] + shareholder_loan_drawdown[i]) *
      shareholder_loan_monthly_interest_rate *
      developmentToDecommissioningFlag[i];
    shareholder_loan_interest_expense_for_profit_and_loss[i] =
      shareholder_loan_interest[i];

    shareCapitalDrawdown[i] =
      (balanceToEquity[i] * equity.equitySplitToShareholderCapital) / 100;
    cashAvailableBeforeSeniorDebtRepayment[i] =
      cashStartBalance[i] +
      operatingCashflow[i] +
      capitalExpenditureValue[i] +
      saleOfFixedAssets[i] +
      corporationTaxPayment[i] +
      seniorDebtDrawdown[i] +
      shareholderLoanDrawdown[i] +
      shareCapitalDrawdown[i];

    cashAvailableForSeniorDebtRepaymentLessMinimum[i] =
      cashAvailableBeforeSeniorDebtRepayment[i] -
      1 * cashRequirements.minimumCashBalance;

    lookForwardRestriction[i] =
      (minimumCumulative[i] +
        cashAvailableForSeniorDebtRepaymentLessMinimum[i]) *
      developmentToDecommissioningFlag[i];

    // minimumCashAvailableAndLookForwardRestriction ~~~ calcs row 6101
    minimumCashAvailableAndLookForwardRestriction[i] =
      (Math.min(
        cashAvailableForSeniorDebtRepaymentLessMinimum[i],
        lookForwardRestriction[i]
      ) *
        developmentToDecommissioningFlag[i] *
        seniorDebt.cashSweepPercentOfAvailableCash) /
      100;
    // seniorDebtRepaymentForControlAccount ~~~ calcs row 6104
    seniorDebtRepaymentForControlAccount[i] = Math.min(
      Math.max(0, minimumCashAvailableAndLookForwardRestriction[i]),
      -controlAccountBalanceBeforeRepayment[i]
    );

    seniorDebtRepaymentForCashFlow[i] =
      -seniorDebtRepaymentForControlAccount[i];

    // seniorDebtRepayment is shown on the income statement
    seniorDebtRepayment[i] = seniorDebtRepaymentForCashFlow[i];

    cash_available_before_shareholder_loan_repayment[i] =
      seniorDebtRepayment[i] + cashAvailableBeforeSeniorDebtRepayment[i];
    minimum_cash_available_and_lookforward_restriction[i] =
      (Math.min(
        lookForwardRestriction[i] + seniorDebtRepaymentForCashFlow[i],
        cash_available_before_shareholder_loan_repayment[i] -
          1 * cashRequirements.minimumCashBalance
      ) *
        equity.shareholderLoanCashSweepPercentage) /
      100;
    control_account_balance_before_shareholder_loan_repayment[i] =
      shareholder_loan_start_balance[i] +
      shareholder_loan_drawdown[i] +
      shareholder_loan_interest[i];

    shareholder_loan_repayment[i] =
      -Math.min(
        Math.max(0, minimum_cash_available_and_lookforward_restriction[i]),
        -control_account_balance_before_shareholder_loan_repayment[i]
      ) * developmentToDecommissioningFlag[i];
    profit_loss_before_tax[i] =
      ebitValue[i] + interest[i] + shareholder_loan_interest[i];

    profit_loss_after_tax[i] =
      profit_loss_before_tax[i] +
      corporation_tax_for_profit_and_loss_account[i];

    retained_earnings_balance_before_dividends[i] =
      retained_earnings_start_balance[i] * 1 + profit_loss_after_tax[i] * 1;

    minimum_cash_available_and_lookforward_restriction_for_dividends[i] =
      (Math.min(
        lookForwardRestriction[i] +
          seniorDebtRepaymentForCashFlow[i] +
          shareholder_loan_repayment[i],
        cash_available_before_shareholder_loan_repayment[i] +
          shareholder_loan_repayment[i] -
          1 * cashRequirements?.minimumCashBalance || 0
      ) * dividends?.dividends_cash_sweep_percent_of_available_cash || 0) / 100;
    dividends_for_retained_earnings[i] =
      -Math.max(
        Math.min(
          minimum_cash_available_and_lookforward_restriction_for_dividends[i],
          retained_earnings_balance_before_dividends[i]
        ),
        0
      ) * developmentToDecommissioningFlag[i];

    retained_earnings_end_balance[i] =
      retained_earnings_start_balance[i] * 1 +
      profit_loss_after_tax[i] * 1 +
      dividends_for_retained_earnings[i] * 1;
    shareholder_loan_end_balance[i] =
      shareholder_loan_start_balance[i] +
      shareholder_loan_drawdown[i] +
      shareholder_loan_interest[i] -
      shareholder_loan_repayment[i];

    repayments[i] = seniorDebtRepaymentForControlAccount[i];

    cash_available_before_dividends[i] =
      cash_available_before_shareholder_loan_repayment[i] +
      shareholder_loan_repayment[i];

    cash_available_before_share_capital_repayment[i] =
      cash_available_before_dividends[i] + dividends_for_retained_earnings[i];
    total_cash_look_forward_restriction_in_share_capital[i] =
      lookForwardRestriction[i] +
      seniorDebtRepaymentForCashFlow[i] +
      shareholder_loan_repayment[i] +
      dividends_for_retained_earnings[i];
    minimum_cash_available_and_look_forward_restriction_in_share_capital[i] =
      (Math.min(
        total_cash_look_forward_restriction_in_share_capital[i],
        cash_available_before_share_capital_repayment[i] -
          cashRequirements.minimumCashBalance
      ) *
        equity.shareCapitalCashSweepPercentage) /
      100;

    control_account_balance_before_repayment_in_share_capital[i] =
      share_capital_start_balance[i] + shareCapitalDrawdown[i];

    share_capital_repayment[i] =
      -Math.min(
        Math.max(
          0,
          minimum_cash_available_and_look_forward_restriction_in_share_capital[
            i
          ]
        ),
        control_account_balance_before_repayment_in_share_capital[i]
      ) * developmentToDecommissioningFlag[i];
    share_capital_end_balance[i] =
      share_capital_start_balance[i] +
      shareCapitalDrawdown[i] +
      share_capital_repayment[i];

    seniorDebtEndBalance[i] =
      seniorDebtStartBalance[i] -
      seniorDebtDrawdown[i] +
      interest[i] +
      repayments[i];

    netCashflow[i] =
      operatingCashflow[i] +
      capitalExpenditureValue[i] +
      saleOfFixedAssets[i] +
      corporationTaxPayment[i] +
      seniorDebtDrawdown[i] +
      shareholderLoanDrawdown[i] +
      shareCapitalDrawdown[i] +
      seniorDebtRepayment[i] +
      shareholder_loan_repayment[i];
    cashEndBalance[i] = cashStartBalance[i] + netCashflow[i];

    if (i != period - 1) {
      cashStartBalance[i + 1] = cashEndBalance[i];
      seniorDebtStartBalance[i + 1] =
        seniorDebtEndBalance[i] * developmentToDecommissioningFlag[i + 1];
      shareholder_loan_start_balance[i + 1] =
        shareholder_loan_end_balance[i] *
        developmentToDecommissioningFlag[i + 1];
      retained_earnings_start_balance[i + 1] =
        retained_earnings_end_balance[i] * developmentToDecommissioningFlag[i];
      share_capital_start_balance[i + 1] =
        share_capital_end_balance[i] * developmentToDecommissioningFlag[i];
    }
  }

  return {
    total_cash_payment: total_cash_payment,
    seniorDebtDrawdown: seniorDebtDrawdown,
    shareholderLoanDrawdown: shareholderLoanDrawdown,
    senior_debt_interest: interest,
    shareCapitalDrawdown: shareCapitalDrawdown,
    seniorDebtRepayment: seniorDebtRepayment,
    senior_debt_for_balance_sheet: seniorDebtEndBalance,
    netCashflow: netCashflow,
    cashStartBalance: cashStartBalance,
    cashEndBalance: cashEndBalance,
    shareholder_loan_for_balance_sheet: shareholder_loan_end_balance,
    shareholder_loan_repayment: shareholder_loan_repayment,
    shareholder_loan_interest:
      shareholder_loan_interest_expense_for_profit_and_loss,
    profit_loss_before_tax: profit_loss_before_tax,
    profit_loss_after_tax: profit_loss_after_tax,
    dividends: dividends_for_retained_earnings,
    retained_earnings_start_balance: retained_earnings_start_balance,
    retained_earnings_end_balance: retained_earnings_end_balance,
    share_capital_repayment: share_capital_repayment,
    share_capital_end_balance: share_capital_end_balance,
  };
}
