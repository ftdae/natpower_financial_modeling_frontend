// Calcs 23 Capex creditor

import {
  DEFAULT_LAND_RENT_EXEPNESE,
  DEFAULT_NG_SECURITIES,
} from "../../calculates/Administrative costs/constant";
import {
  ICommunityBenefitToCapex,
  IDevexAdditions,
  ILandRentExpense,
  INGSecurities,
} from "../../calculates/Administrative costs/type";
import { DEFAULT_COMMUNITY_BENEFIT_TO_CAPEX } from "../../calculates/Depreciation/constant";
import { IVintage } from "../../calculates/Revenue/type";
import { DEFAULT_VINTAGE } from "../../calculates/constant";
import {
  arraySum,
  getAsAPercentOfPeriod,
  getQuarterNumberFromModelStartDate,
  multiplyArrays,
  multiplyNumber,
  roundArray,
  sumArrays,
} from "../../calculates/utils";
import {
  DEFAULT_BALANCE_OF_PLANT_ADDITIONS,
  DEFAULT_CAPITAL_EXPENDITURE,
  DEFAULT_DEVEX_ADDITIONS,
  DEFAULT_EV_ADDITIONS,
  DEFAULT_LAND_ADDITIONS,
  DEFAULT_POOLING_SUBSTATION_ADDITIONS,
  DEFAULT_TRANSFORMERS_ADDITIONS,
  DEFAULT_VAT,
} from "../constant";
import { ICapitalExpenditure, Ivat } from "../type";

export function calcCapexCreditor({
  vat = DEFAULT_VAT,
  modelStartDate = "2023-01-01",
  // operationStartDate = '2028-01-01',
  decommissioningEndDate = "2068-06-30",
  // decommissioningStartDate = '2068-01-01',
  developmentStartDate = "2023-07-01",
  vintage = DEFAULT_VINTAGE,
  landAdditions = DEFAULT_LAND_ADDITIONS,
  poolingSubstationAdditions = DEFAULT_POOLING_SUBSTATION_ADDITIONS,
  transformersAdditions = DEFAULT_TRANSFORMERS_ADDITIONS,
  balanceOfPlantAdditions = DEFAULT_BALANCE_OF_PLANT_ADDITIONS,
  evAdditions = DEFAULT_EV_ADDITIONS,
  devexAdditions = DEFAULT_DEVEX_ADDITIONS,
  landRentExpense = DEFAULT_LAND_RENT_EXEPNESE,
  capitalExpenditure = DEFAULT_CAPITAL_EXPENDITURE,
  communityBenefitToCapex = DEFAULT_COMMUNITY_BENEFIT_TO_CAPEX,
  nGSecurities = DEFAULT_NG_SECURITIES,
}: {
  vat?: Ivat;
  modelStartDate?: string;
  developmentFeePaymentPercentageProfile?: any;
  developmentFeePaymentDateProfile?: any;
  working_capital?: any;
  corporationTax?: any;
  landRent?: any;
  landSize?: any;
  operationEndDate?: any;
  constructionStartDate?: any;
  costOfAdditions?: any;
  revenueSetup?: any;
  assumptionsData?: any;
  detailedRevenueData?: any;
  initialCycleData?: any;
  initialCapacity?: any;
  startingAssumptionsForBatteries?: any;
  batteryDisposals?: any;
  batteryEfficiency?: any;
  batteryAugmentation?: any;
  model?: any;
  batteryDuration?: any;
  batteryCubes?: any;
  batteryExCubes?: any;
  inflationInputs?: any;
  capexPaymentsProfile?: any;
  capexPaymentMilestones?: any;
  capexUEL?: any;
  bessCapexForecast?: any;
  batterySensitivity?: any;
  operationYears?: any;
  capexSensitivity?: any;
  operationStartDate?: string;
  decommissioningStartDate?: string;
  decommissioningEndDate?: string;
  developmentStartDate?: string;
  vintage?: IVintage;
  landAdditions?: number[];
  poolingSubstationAdditions?: number[];
  transformersAdditions?: number[];
  balanceOfPlantAdditions?: number[];
  evAdditions?: number[];
  devexAdditions?: IDevexAdditions;
  landRentExpense?: ILandRentExpense;
  capitalExpenditure?: ICapitalExpenditure;
  communityBenefitToCapex?: ICommunityBenefitToCapex;
  nGSecurities?: INGSecurities;
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

  // Calcs ~~~ 19 Fixed assets ~~~ 19.02 Cash payments
  // Capex provision length
  // Calcs ~~~ 26 Capex provisioin ~~~ 26.01 Accrual
  // Forecast cash payments
  const vintagesData = vintage.vintages;
  let vintagesAdditionsCost: number[] =
    vintagesData[0].data.forecastAdditionsByMilestones;
  const numberOfVintages = vintagesData.length;
  for (let i = 1; i < numberOfVintages; i++) {
    if (vintagesData[i].data.stagingMonthNumber == 0) break;
    else
      vintagesAdditionsCost = arraySum(
        vintagesAdditionsCost,
        vintagesData[i].data.forecastAdditionsByMilestones
      );
  }
  const vintagesGrossCashPayments = vintagesAdditionsCost.map(
    (d) => -d * (1 + vat.vatRate / 100)
  );

  const landGrossCashPayments = landAdditions.map(
    (d) => -d * (1 + vat.vatRate / 100)
  );
  const poolingSubstationGrossCashPayments = poolingSubstationAdditions.map(
    (d) => -d * (1 + vat.vatRate / 100)
  );

  const transformersGrossCashPayments = transformersAdditions.map(
    (d) => -d * (1 + vat.vatRate / 100)
  );
  const balanceOfPlantGrossCashPayments = balanceOfPlantAdditions.map(
    (d) => -d * (1 + vat.vatRate / 100)
  );
  const enterpriseValueGrossCashPayments = multiplyNumber(evAdditions, -1);

  const capitalisedRentGrossCashPayments =
    landRentExpense.rentToFixedAssets.map((d) => d * (1 + vat.vatRate / 100));
  const devexGrossCashPayments = devexAdditions.devexAdditions.map(
    (d) => -d * (1 + vat.vatRate / 100)
  );
  const capitalizedNGSecurityPremiumFees = multiplyNumber(
    nGSecurities.additionsForCapex,
    -(1 + vat.vatRate / 100)
  );
  const capitalizedCommunityBenefit = multiplyNumber(
    communityBenefitToCapex.forecastCostToCapex,
    1 + vat.vatRate / 100
  );

  // total_cash_payment is used in movement in capex creditor
  const total_cash_payment = sumArrays(
    vintagesGrossCashPayments,
    landGrossCashPayments,
    poolingSubstationGrossCashPayments,
    transformersGrossCashPayments,
    balanceOfPlantGrossCashPayments,
    enterpriseValueGrossCashPayments,
    capitalisedRentGrossCashPayments,
    devexGrossCashPayments,
    capitalizedNGSecurityPremiumFees,
    capitalizedCommunityBenefit
  );
  // 23.01 Accrual ~~~ Net costs

  const total_additions = capitalExpenditure.capexExpenditure;

  const less_development_fee = multiplyNumber(evAdditions, -1);
  const net_additions = sumArrays(total_additions, less_development_fee);

  // 23.01 Accrual ~~~ VAT on costs

  const effectiveVATRateOnCosts =
    ((vat.vatRate / 100) * vat.percentageOfRevenueSubjectToVAT) / 100;

  const net_costs = net_additions;
  const vat_on_costs = multiplyNumber(net_costs, effectiveVATRateOnCosts);

  const gross_costs = sumArrays(net_costs, vat_on_costs);

  // 23.02 Cash payment
  const development_fee = evAdditions;
  const net_cash_payment = sumArrays(total_cash_payment, development_fee);

  // 23.03 Control account
  const capex_creditors_start_balance = [];
  capex_creditors_start_balance[0] = 0;
  const accrual = multiplyArrays([
    developmentToDecommissioningFlag,
    multiplyNumber(gross_costs, -1),
  ]);
  const cash_payments = multiplyArrays([
    developmentToDecommissioningFlag,
    multiplyNumber(net_cash_payment, -1),
  ]);
  const capex_creditors_end_balance = [];
  const movement_in_working_capital = [];

  for (let i = 0; i < period; i++) {
    capex_creditors_end_balance[i] =
      capex_creditors_start_balance[i] + accrual[i] + cash_payments[i];
    if (i < period - 1)
      capex_creditors_start_balance[i + 1] = capex_creditors_end_balance[i];
    movement_in_working_capital[i] =
      -developmentToDecommissioningFlag[i] *
      (capex_creditors_end_balance[i] - capex_creditors_start_balance[i]);
  }
  return {
    capex_creditor_for_balance_sheet: capex_creditors_end_balance,
    movement_in_working_capital: roundArray(movement_in_working_capital, 20),
    vat_on_costs: vat_on_costs,
  };
}
