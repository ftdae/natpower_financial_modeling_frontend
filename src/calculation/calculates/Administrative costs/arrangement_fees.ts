import {
  DEFAULT_BALANCE_OF_PLANT_ADDITIONS,
  DEFAULT_CAPEX_PROVISION,
  DEFAULT_CAPITAL_EXPENDITURE,
  DEFAULT_CORPORATION_TAX_VALUE,
  DEFAULT_DEVEX_ADDITIONS,
  DEFAULT_EV_ADDITIONS,
  DEFAULT_GEARING_BY_TAXES,
  DEFAULT_LAND_ADDITIONS,
  DEFAULT_OPERATING_CASH_FLOW_VALUE,
  DEFAULT_POOLING_SUBSTATION_ADDITIONS,
  DEFAULT_SENIOR_DEBT,
  DEFAULT_TRANSFORMERS_ADDITIONS,
  DEFAULT_VAT,
} from "../../Cash flow/constant";
import {
  ICapexProvision,
  ICapitalExpenditure,
  ICorporationTaxValue,
  IGearingByTaxes,
  ISeniorDebt,
  Ivat,
} from "../../Cash flow/type";
import { ICorporationTax } from "../Cash flow/type";
import {
  DEFAULT_CAPEX_UEL,
  DEFAULT_GAIN_ON_DISPOSAL,
  DEFAULT_VINTAGE,
} from "../constant";
import { DEFAULT_COMMUNITY_BENEFIT_TO_CAPEX } from "../Depreciation/constant";
import { ICapexUELForm, IGainOnDisposal, IVintage } from "../Revenue/type";
import {
  arraySum,
  expandAndAverage,
  getAsAPercentOfPeriod,
  getQuarterNumberFromModelStartDate,
  indexOfSecondLargest,
  multiplyArrays,
  multiplyNumber,
  sumArray,
  sumArrays,
} from "../utils";
import { DEFAULT_LAND_RENT_EXEPNESE } from "./constant";
import {
  ICommunityBenefitToCapex,
  IDevexAdditions,
  ILandRentExpense,
} from "./type";

export function calcArrangementFees({
  capexProvision = DEFAULT_CAPEX_PROVISION,
  gearingByCapexType = DEFAULT_GEARING_BY_TAXES,
  seniorDebt = DEFAULT_SENIOR_DEBT,
  vat = DEFAULT_VAT,
  modelStartDate = "2023-01-01",
  decommissioningEndDate = "2068-06-30",
  developmentStartDate = "2023-07-01",
  vintage = DEFAULT_VINTAGE,
  landAdditions = DEFAULT_LAND_ADDITIONS,
  poolingSubstationAdditions = DEFAULT_POOLING_SUBSTATION_ADDITIONS,
  transformersAdditions = DEFAULT_TRANSFORMERS_ADDITIONS,
  balanceOfPlantAdditions = DEFAULT_BALANCE_OF_PLANT_ADDITIONS,
  evAdditions = DEFAULT_EV_ADDITIONS,
  devexAdditions = DEFAULT_DEVEX_ADDITIONS,
  landRentExpense = DEFAULT_LAND_RENT_EXEPNESE,
  communityBenefitToCapex = DEFAULT_COMMUNITY_BENEFIT_TO_CAPEX,
}: {
  capexProvision?: ICapexProvision[];
  gearingByCapexType?: IGearingByTaxes;
  seniorDebt?: ISeniorDebt;
  vat?: Ivat;
  modelStartDate?: string;
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
  capexUEL?: ICapexUELForm[];
  communityBenefitToCapex?: ICommunityBenefitToCapex;
  operatingCashFlowValue?: number[];
  gainOnDisposal?: IGainOnDisposal;
  capitalExpenditure?: ICapitalExpenditure;
  corporationTaxValue?: ICorporationTaxValue;
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
  //  arrangementFees calcs ~~~ row 6110
  const arrangementFees = multiplyNumber(
    seniorDebtDrawdown,
    -seniorDebt.arrangementFeePercentage / 100
  );
  return arrangementFees;
}
