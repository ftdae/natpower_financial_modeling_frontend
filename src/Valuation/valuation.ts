// 33 Outputs

import { DEFAULT_CORPORATION_TAX } from "../calculation/calculates/Cash flow/constant";
import { ICorporationTax } from "../calculation/calculates/Cash flow/type";
import {
  DEFAULT_GAIN_ON_DISPOSAL,
  DEFAULT_MCAPEX_PROVISION,
} from "../calculation/calculates/constant";
import {
  IGainOnDisposal,
  IMCapexProvision,
} from "../calculation/calculates/Revenue/type";
import {
  getQuarterNumberFromModelStartDate,
  multiplyNumber,
  sumArray,
  sumArrays,
  XIRR,
  XNPV,
} from "../calculation/calculates/utils";
import {
  DEFAULT_CAPITAL_EXPENDITURE,
  DEFAULT_CORPORATION_TAX_VALUE,
  DEFAULT_EV_ADDITIONS,
  DEFAULT_GEARING_BY_TAXES,
  DEFAULT_OPERATING_CASH_FLOW_VALUE,
  DEFAULT_SENIOR_DEBT,
} from "../calculation/Cash flow/constant";
import {
  ICapitalExpenditure,
  ICorporationTaxValue,
  IEquity,
  IGearingByTaxes,
  ISeniorDebt,
} from "../calculation/Cash flow/type";
import { DEFAULT_RETURNS_SETTINGS, DEFAULT_VALUATION } from "./constant";
import { IReturnSettings, IValuation } from "./type";

export function projectValuation({
  valuation = DEFAULT_VALUATION,
  corporationTax = DEFAULT_CORPORATION_TAX,
  gearingByCapexType = DEFAULT_GEARING_BY_TAXES,
  seniorDebt = DEFAULT_SENIOR_DEBT,
  modelStartDate = "2023-01-01",
  decommissioningEndDate = "2068-06-30",
  mCapexProvision = DEFAULT_MCAPEX_PROVISION,
  operatingCashFlowValue = DEFAULT_OPERATING_CASH_FLOW_VALUE,
  capitalExpenditure = DEFAULT_CAPITAL_EXPENDITURE,
  corporationTaxValue = DEFAULT_CORPORATION_TAX_VALUE,
  gainOnDisposal = DEFAULT_GAIN_ON_DISPOSAL,
  fullyConsentedDate = "2026-01-01",
  returnsSettings = DEFAULT_RETURNS_SETTINGS,
  evAdditions = DEFAULT_EV_ADDITIONS,
  operationStartDate = "2030-01-01",
}: {
  valuation?: IValuation;
  gearingByCapexType?: IGearingByTaxes;
  equity?: IEquity;
  seniorDebt?: ISeniorDebt;
  corporationTax?: ICorporationTax;
  modelStartDate?: string;
  decommissioningEndDate?: string;
  mCapexProvision?: IMCapexProvision;
  operatingCashFlowValue?: number[];
  capitalExpenditure?: ICapitalExpenditure;
  gainOnDisposal?: IGainOnDisposal;
  corporationTaxValue?: ICorporationTaxValue;
  fullyConsentedDate?: string;
  returnsSettings?: IReturnSettings;
  evAdditions?: number[];
  operationStartDate?: string;
}) {
  const period =
    getQuarterNumberFromModelStartDate(modelStartDate, decommissioningEndDate) -
    1;

  const cost_of_equity =
    valuation?.cost_of_equity == 0 ? 10 : valuation?.cost_of_equity;
  const unlevered_pre_tax_discount_rate = cost_of_equity;

  const tax_rate = corporationTax?.mainRateOfTax / 100 || 0;
  const unlevered_post_tax_discount_rate = cost_of_equity;

  const gearing = gearingByCapexType?.excludingBatteries / 100 || 0;
  const cost_of_debt = seniorDebt?.seniorDebtInterst / 100 || 0;
  const levered_post_tax_discount_rate =
    (1 - gearing) * cost_of_equity + gearing * cost_of_debt * (1 - tax_rate);

  // operating_cash_flow calcs row 6453
  const operating_cash_flow =
    operatingCashFlowValue || new Array(period).fill(0);

  // capital_expenditure calcs row 6454
  const capital_expenditure =
    capitalExpenditure?.capexExpenditureForCashflow ||
    new Array(period).fill(0);

  // sale_of_fixed_asset calcs row 6455
  const sale_of_fixed_asset =
    gainOnDisposal?.forecastRecycleRevenue || new Array(period).fill(0);

  // pre_tax_unlevered_cash_flow calcs row 6456
  const pre_tax_unlevered_cash_flow =
    sumArrays(operating_cash_flow, capital_expenditure, sale_of_fixed_asset) ||
    new Array(period).fill(0);
  if (sumArray(pre_tax_unlevered_cash_flow) != 0) {
    // corporation_tax calcs row 6458
    const corporation_tax =
      corporationTaxValue?.taxPayment || new Array(period).fill(0);

    // post_tax_unlevered_cash_flow calcs row 6459
    const post_tax_unlevered_cash_flow =
      sumArrays(pre_tax_unlevered_cash_flow, corporation_tax) ||
      new Array(period).fill(0);

    // senior_debt_drwadown calcs row 6461
    const senior_debt_drwadown =
      mCapexProvision?.seniorDebtDrawdown || new Array(period).fill(0);

    // senior_debt_repayment calcs row 6462
    const senior_debt_repayment =
      mCapexProvision?.seniorDebtRepayment || new Array(period).fill(0);

    // post_tax_levered_cash_flow calcs row 6463
    const post_tax_levered_cash_flow =
      sumArrays(
        post_tax_unlevered_cash_flow,
        senior_debt_drwadown,
        senior_debt_repayment
      ) || new Array(period).fill(0);

    // discount_rate_pre_tax_and_unlevered, discount_rate_post_tax_and_unlevered, discount_rate_post_tax_and_levered calcs F6465 ~ F6467
    const discount_rate_pre_tax_and_unlevered = unlevered_pre_tax_discount_rate;
    const discount_rate_post_tax_and_unlevered =
      unlevered_post_tax_discount_rate;
    const discount_rate_post_tax_and_levered = levered_post_tax_discount_rate;

    const valuationDatePeriodNum =
      getQuarterNumberFromModelStartDate(
        modelStartDate,
        valuation?.valuation_date || "2030-01-01"
      ) - 1;

    const capexAtValDate = capital_expenditure.slice(
      valuationDatePeriodNum - 1
    );
    // capexAtValDate calcs row 6493

    // preTaxUnLeveredCFAtValDate calcs row 6494
    const preTaxUnLeveredCFAtValDate = pre_tax_unlevered_cash_flow.slice(
      valuationDatePeriodNum - 1
    );
    // postTaxUnleveredCFAtValDate calcs row 6495
    const postTaxUnleveredCFAtValDate = post_tax_unlevered_cash_flow.slice(
      valuationDatePeriodNum - 1
    );

    // postTaxLeveredCFAtValDate calcs row 6496
    const postTaxLeveredCFAtValDate = post_tax_levered_cash_flow.slice(
      valuationDatePeriodNum - 1
    );

    // deltaForPreTaxUnleveredCF calcs row 6497
    const deltaForPreTaxUnleveredCF = sumArrays(
      preTaxUnLeveredCFAtValDate,
      multiplyNumber(capexAtValDate, -1)
    );

    // deltaForPostTaxUnleveredCF calcs row 6498
    const deltaForPostTaxUnleveredCF = sumArrays(
      postTaxLeveredCFAtValDate,
      multiplyNumber(capexAtValDate, -1)
    );
    // deltaForPostTaxLeveredCF calcs row 6499
    const deltaForPostTaxLeveredCF = sumArrays(
      postTaxLeveredCFAtValDate,
      multiplyNumber(capexAtValDate, -1)
    );

    // cumPreTaxUnCFValDate calcs row  6500
    const cumPreTaxUnCFValDate: number[] = new Array(
      period - valuationDatePeriodNum + 1
    ).fill(0);
    // cumPreTaxUnCFValDate calcs row  6501
    const cumPostTaxUnCFValDate: number[] = new Array(
      period - valuationDatePeriodNum + 1
    ).fill(0);
    // cumPreTaxUnCFValDate calcs row  6502
    const cumPostTaxCFValDate: number[] = new Array(
      period - valuationDatePeriodNum + 1
    ).fill(0);

    // cumPreTaxUnCFValDate calcs row  6503
    const cumDeltaPreTaxUnCFValDate: number[] = new Array(
      period - valuationDatePeriodNum + 1
    ).fill(0);
    // cumDeltaPreTaxUnCFValDate calcs row  6504
    const cumDeltaPostTaxUnCFValDate: number[] = new Array(
      period - valuationDatePeriodNum + 1
    ).fill(0);
    // cumDeltaPreTaxUnCFValDate calcs row  6505
    const cumDeltaPostTaxCFValDate: number[] = new Array(
      period - valuationDatePeriodNum + 1
    ).fill(0);

    cumPreTaxUnCFValDate[0] = preTaxUnLeveredCFAtValDate[0];
    cumPostTaxUnCFValDate[0] = postTaxUnleveredCFAtValDate[0];
    cumPostTaxCFValDate[0] = postTaxLeveredCFAtValDate[0];
    cumDeltaPreTaxUnCFValDate[0] = deltaForPreTaxUnleveredCF[0];
    cumDeltaPostTaxUnCFValDate[0] = deltaForPostTaxUnleveredCF[0];
    cumDeltaPostTaxCFValDate[0] = deltaForPostTaxLeveredCF[0];

    for (let i = 1; i < period - valuationDatePeriodNum + 1; i++) {
      cumPreTaxUnCFValDate[i] =
        cumPreTaxUnCFValDate[i - 1] + preTaxUnLeveredCFAtValDate[i];
      cumPostTaxUnCFValDate[i] =
        cumPostTaxUnCFValDate[i - 1] + postTaxUnleveredCFAtValDate[i];
      cumPostTaxCFValDate[i] =
        cumPostTaxCFValDate[i - 1] + postTaxLeveredCFAtValDate[i];

      cumDeltaPreTaxUnCFValDate[i] =
        cumDeltaPreTaxUnCFValDate[i - 1] + deltaForPreTaxUnleveredCF[i];
      cumDeltaPostTaxUnCFValDate[i] =
        cumDeltaPostTaxUnCFValDate[i - 1] + deltaForPostTaxUnleveredCF[i];
      cumDeltaPostTaxCFValDate[i] =
        cumDeltaPostTaxCFValDate[i - 1] + deltaForPostTaxLeveredCF[i];
    }

    // preTaxUnleveredPro calcs row 6506
    const preTaxUnleveredPro: number[] = new Array(period).fill(0);
    // postTaxUnleveredPro calcs row 6507
    const postTaxUnleveredPro: number[] = new Array(period).fill(0);
    // postTaxLeveredPro calcs row 6508
    const postTaxLeveredPro: number[] = new Array(period).fill(0);

    let sumForPreTaxUnCFAtValDate: number =
      preTaxUnLeveredCFAtValDate[0] * 1 +
      preTaxUnLeveredCFAtValDate[1] * 1 +
      preTaxUnLeveredCFAtValDate[2] * 1 +
      preTaxUnLeveredCFAtValDate[3] * 1 +
      preTaxUnLeveredCFAtValDate[4] * 1;
    let sumForPostTaxUnCFValDate: number =
      postTaxUnleveredCFAtValDate[0] * 1 +
      postTaxUnleveredCFAtValDate[1] * 1 +
      postTaxUnleveredCFAtValDate[2] * 1 +
      postTaxUnleveredCFAtValDate[3] * 1 +
      postTaxUnleveredCFAtValDate[4] * 1;
    let sumForPostTaxCFAtValDate: number =
      postTaxLeveredCFAtValDate[0] * 1 +
      postTaxLeveredCFAtValDate[1] * 1 +
      postTaxLeveredCFAtValDate[2] * 1 +
      postTaxLeveredCFAtValDate[3] * 1 +
      postTaxLeveredCFAtValDate[4] * 1;
    for (let i = 4; i < period; i++) {
      preTaxUnleveredPro[i] =
        sumForPreTaxUnCFAtValDate <= 0
          ? 0
          : XIRR(
              preTaxUnLeveredCFAtValDate.slice(0, i),
              valuation?.valuation_date
            );
      sumForPreTaxUnCFAtValDate += preTaxUnLeveredCFAtValDate[i + 1] || 0;
      postTaxUnleveredPro[i] =
        sumForPostTaxUnCFValDate <= 0
          ? 0
          : XIRR(
              postTaxUnleveredCFAtValDate.slice(0, i),
              valuation.valuation_date
            );
      sumForPostTaxUnCFValDate += postTaxUnleveredCFAtValDate[i + 1] || 0;
      postTaxLeveredPro[i] =
        sumForPostTaxCFAtValDate <= 0
          ? 0
          : XIRR(
              postTaxLeveredCFAtValDate.slice(0, i),
              valuation.valuation_date
            );
      sumForPostTaxCFAtValDate += postTaxLeveredCFAtValDate[i + 1] || 0;
    }

    // profitLossAfterTax calcs row 6515
    const profitLossAfterTax: number[] = (
      mCapexProvision?.profit_loss_after_tax || new Array(period).fill(0)
    ).slice(valuationDatePeriodNum - 1);
    // cumProfitLossAfterTax calcs row 6516
    const cumProfitLossAfterTax: number[] = new Array(
      period - (valuationDatePeriodNum - 1)
    ).fill(0);

    for (let i = 1; i < period; i++) {
      cumProfitLossAfterTax[i] =
        cumProfitLossAfterTax[i - 1] + (profitLossAfterTax[i - 1] || 0);
    }

    // exceededFlagOne calcs row 6521
    const exceededFlagOne: number[] = preTaxUnleveredPro.map((d) =>
      d > returnsSettings?.stageOne?.hurdleRate / 100 ? 1 : 0
    );

    // firstPeriodHurdleExceededOne calcs row 6522
    const firstPeriodHurdleExceededOne: number[] = new Array(period).fill(0);

    // splitCFBetweenLPAndGPOne calcs row 6523
    const splitCFBetweenLPAndGPOne: number[] = new Array(period).fill(0);

    // matchPeriodOne calcs F6526
    let matchPeriodOne: number = 0;
    for (let i = 1; i < period; i++) {
      firstPeriodHurdleExceededOne[i] =
        exceededFlagOne[i - 1] == exceededFlagOne[i] ? 0 : 1;
      splitCFBetweenLPAndGPOne[i] =
        exceededFlagOne[i] - firstPeriodHurdleExceededOne[i];
      if (firstPeriodHurdleExceededOne[i] == 1) matchPeriodOne = i + 1;
    }
    matchPeriodOne = matchPeriodOne >= 2 ? matchPeriodOne : 2;
    // carryBasisOne calcs F6525
    let carryBasisOne: number = returnsSettings.carryBasis;
    // priorToHurdleOne calcs F6532
    const priorToHurdleOne: number =
      carryBasisOne == 3
        ? cumProfitLossAfterTax[matchPeriodOne - 1]
        : carryBasisOne == 2
        ? cumDeltaPreTaxUnCFValDate[matchPeriodOne - 2]
        : carryBasisOne == 1
        ? cumPreTaxUnCFValDate[matchPeriodOne - 2]
        : 0;

    // lpPortionOne calcs F6534
    const lpPortionOne: number =
      100 -
      (returnsSettings?.carryFunActiveSwitch == 1
        ? returnsSettings?.carryFunActiveSwitch == 1
          ? returnsSettings.stageOne.gpPortion
          : 0
        : 0);
    // gpPortionAfterLPOne calcs F6535
    const gpPortionAfterLPOne: number =
      returnsSettings?.carryFunActiveSwitch == 1
        ? returnsSettings?.stageOne.gpPortion
        : 0;

    // gpPortionForCarryOne calcs F6536
    const gpPortionForCarryOne: number =
      returnsSettings?.carryFunActiveSwitch == 1
        ? returnsSettings?.stageOne?.gpPortion
        : 0;
    // gpCarryOne calcs F6538
    const gpCarryOne = (priorToHurdleOne * gpPortionForCarryOne) / 100;
    // lpCFPreCarryOne calcs 6541
    const lpCFPreCarryOne = splitCFBetweenLPAndGPOne.map((d, index) =>
      d == 1
        ? carryBasisOne == 3
          ? preTaxUnLeveredCFAtValDate[index] || 0
          : carryBasisOne == 2
          ? (lpPortionOne * deltaForPreTaxUnleveredCF[index] || 0) / 100 +
              capexAtValDate[index] || 0
          : carryBasisOne == 1
          ? (lpPortionOne * preTaxUnLeveredCFAtValDate[index] || 0) / 100
          : 0
        : preTaxUnLeveredCFAtValDate[index] || 0
    );
    // gpCFExCarryForOne calcs row 6543
    const gpCFExCarryForOne: number[] = new Array(period).fill(0);
    // gpCFCarryForOne calcs row 6544
    const gpCFCarryForOne: number[] = new Array(period).fill(0);
    gpCFCarryForOne[0] = Math.max(
      Math.min(lpCFPreCarryOne[0], gpCarryOne - 0) *
        splitCFBetweenLPAndGPOne[0],
      0
    );
    // cumCarryForOne calcs row 6545
    const cumCarryForOne: number[] = new Array(period).fill(0);
    // lpCFPostCarryOne calcs row 6546
    const lpCFPostCarryOne: number[] = new Array(period).fill(0);
    lpCFPostCarryOne[0] = lpCFPreCarryOne[0] - gpCFCarryForOne[0];

    for (let i = 1; i < period; i++) {
      gpCFExCarryForOne[i] =
        (splitCFBetweenLPAndGPOne[i + 1] == 1 ? gpPortionAfterLPOne / 100 : 0) *
        (returnsSettings?.carryBasis == 1
          ? preTaxUnLeveredCFAtValDate[i] || 0
          : returnsSettings?.carryBasis == 2
          ? deltaForPreTaxUnleveredCF[i] || 0
          : profitLossAfterTax[i] || 0);
      gpCFCarryForOne[i] = Math.max(
        Math.min(lpCFPreCarryOne[i], gpCarryOne - cumCarryForOne[i - 1]) *
          splitCFBetweenLPAndGPOne[i + 1] || 0,
        0
      );
      cumCarryForOne[i] = cumCarryForOne[i - 1] + gpCFCarryForOne[i];
      lpCFPostCarryOne[i] = lpCFPreCarryOne[i] - gpCFCarryForOne[i];
    }

    // preTaxUnleveredProPreCarryOne calcs row 6542
    const preTaxUnleveredProPreCarryOne: number[] = new Array(period).fill(0);
    // postTaxUnleveredProPostCarryOne calcs row 6547
    const postTaxUnleveredProPostCarryOne: number[] = new Array(period).fill(0);

    let sumForPreTaxUnPreCarryOne: number =
      lpCFPreCarryOne[0] * 1 +
      lpCFPreCarryOne[1] * 1 +
      lpCFPreCarryOne[2] * 1 +
      lpCFPreCarryOne[3] * 1;
    let sumForPostTaxUnPostCarryOne: number =
      lpCFPostCarryOne[0] * 1 +
      lpCFPostCarryOne[1] * 1 +
      lpCFPostCarryOne[2] * 1 +
      lpCFPostCarryOne[3] * 1;

    for (let i = 4; i < period; i++) {
      preTaxUnleveredProPreCarryOne[i] =
        sumForPreTaxUnPreCarryOne <= 0
          ? 0
          : XIRR(lpCFPreCarryOne.slice(0, i), valuation.valuation_date);
      sumForPreTaxUnPreCarryOne += lpCFPreCarryOne[i + 1] || 0;
      postTaxUnleveredProPostCarryOne[i] =
        sumForPostTaxUnPostCarryOne <= 0
          ? 0
          : XIRR(lpCFPostCarryOne.slice(0, i), valuation.valuation_date);
      sumForPostTaxUnPostCarryOne += lpCFPostCarryOne[i + 1] || 0;
    }

    // exceededFlagTwo calcs row 6553
    const exceededFlagTwo: number[] = postTaxUnleveredProPostCarryOne.map((d) =>
      d > returnsSettings.stageTwo.hurdleRate / 100 ? 1 : 0
    );

    // firstPeriodHurdleExceededTwo calcs row 6554
    const firstPeriodHurdleExceededTwo: number[] = new Array(period).fill(0);

    // splitCFBetweenLPAndGPTwo calcs row 6555
    let splitCFBetweenLPAndGPTwo: number[] = new Array(period).fill(0);

    // matchPeriodTwo calcs F6556
    let matchPeriodTwo: number = 0;
    for (let i = 1; i < period; i++) {
      firstPeriodHurdleExceededTwo[i] =
        exceededFlagTwo[i - 1] == exceededFlagTwo[i] ? 0 : 1;
      splitCFBetweenLPAndGPTwo[i] =
        exceededFlagTwo[i] - firstPeriodHurdleExceededTwo[i];
      if (firstPeriodHurdleExceededTwo[i] == 1) matchPeriodTwo = i + 1;
    }

    // carryBasisTwo calcs F6525
    let carryBasisTwo: number = returnsSettings?.carryBasis;
    // priorToHurdleTwo calcs F6532
    let priorToHurdleTwo: number = 0;
    if (matchPeriodTwo != 0)
      priorToHurdleTwo =
        carryBasisTwo == 3
          ? cumProfitLossAfterTax[matchPeriodTwo - 1]
          : carryBasisTwo == 2
          ? cumDeltaPreTaxUnCFValDate[matchPeriodTwo - 2]
          : carryBasisTwo == 1
          ? cumPreTaxUnCFValDate[matchPeriodTwo - 2]
          : 0;

    // lpPortionTwo calcs F6564
    const lpPortionTwo: number =
      100 -
      (returnsSettings?.carryFunActiveSwitch == 1
        ? returnsSettings?.carryFunActiveSwitch == 1
          ? returnsSettings?.stageTwo.gpPortion
          : 0
        : 0);
    // gpPortionAfterLPTwo calcs F6565
    const gpPortionAfterLPTwo: number =
      returnsSettings?.carryFunActiveSwitch == 1
        ? returnsSettings?.stageTwo.gpPortion
        : 0;

    // gpPortionForCarryTwo calcs F6566
    const gpPortionForCarryTwo: number =
      returnsSettings?.carryFunActiveSwitch == 1
        ? returnsSettings?.stageTwo.gpPortion
        : 0;

    // gpCarryTwo calcs F6568
    const gpCarryTwo =
      (priorToHurdleTwo * (gpPortionForCarryTwo - gpPortionForCarryOne)) / 100;

    // lpCFPreCarryTwo calcs 6571
    const lpCFPreCarryTwo = splitCFBetweenLPAndGPTwo.map((d, index) =>
      d == 1
        ? carryBasisTwo == 3
          ? preTaxUnLeveredCFAtValDate[index] || 0
          : carryBasisTwo == 2
          ? (lpPortionTwo * deltaForPreTaxUnleveredCF[index] || 0) / 100 +
              capexAtValDate[index] || 0
          : carryBasisTwo == 1
          ? (lpPortionTwo * preTaxUnLeveredCFAtValDate[index] || 0) / 100
          : 0
        : lpCFPostCarryOne[index] || 0
    );
    // gpCFExCarryForTwo calcs row 6573
    const gpCFExCarryForTwo: number[] = new Array(period).fill(0);
    // gpCFCarryForTwo calcs row 6574
    const gpCFCarryForTwo: number[] = new Array(period).fill(0);
    gpCFCarryForTwo[0] = Math.max(
      Math.min(lpCFPreCarryTwo[0], gpCarryTwo - 0) *
        splitCFBetweenLPAndGPTwo[0],
      0
    );
    // cumCarryForTwo calcs row 6575
    const cumCarryForTwo: number[] = new Array(period).fill(0);
    // lpCFPostCarryTwo calcs row 6576
    const lpCFPostCarryTwo: number[] = new Array(period).fill(0);
    lpCFPostCarryTwo[0] = lpCFPreCarryTwo[0] - gpCFCarryForTwo[0];

    for (let i = 1; i < period; i++) {
      gpCFExCarryForTwo[i] =
        splitCFBetweenLPAndGPTwo[i + 1] == 1
          ? (gpPortionAfterLPTwo / 100) *
            (returnsSettings?.carryBasis == 1
              ? preTaxUnLeveredCFAtValDate[i] || 0
              : returnsSettings?.carryBasis == 2
              ? deltaForPreTaxUnleveredCF[i] || 0
              : profitLossAfterTax[i] || 0)
          : gpCFExCarryForOne[i];
      gpCFCarryForTwo[i] = Math.max(
        Math.min(lpCFPreCarryTwo[i], gpCarryTwo - cumCarryForTwo[i - 1]) *
          splitCFBetweenLPAndGPTwo[i + 1] || 0,
        0
      );
      cumCarryForTwo[i] = cumCarryForTwo[i - 1] + gpCFCarryForTwo[i];
      lpCFPostCarryTwo[i] = lpCFPreCarryTwo[i] - gpCFCarryForTwo[i];
    }
    // preTaxUnleveredProPreCarryTwo calcs row 6572
    const preTaxUnleveredProPreCarryTwo: number[] = new Array(period).fill(0);
    // postTaxUnleveredProPostCarryTwo calcs row 6577
    const postTaxUnleveredProPostCarryTwo: number[] = new Array(period).fill(0);

    let sumForPreTaxUnPreCarryTwo: number =
      lpCFPreCarryTwo[0] * 1 +
      lpCFPreCarryTwo[1] * 1 +
      lpCFPreCarryTwo[2] * 1 +
      lpCFPreCarryTwo[3] * 1;
    let sumForPostTaxUnPostCarryTwo: number =
      lpCFPostCarryTwo[0] * 1 +
      lpCFPostCarryTwo[1] * 1 +
      lpCFPostCarryTwo[2] * 1 +
      lpCFPostCarryTwo[3] * 1;

    for (let i = 4; i < period; i++) {
      preTaxUnleveredProPreCarryTwo[i] =
        sumForPreTaxUnPreCarryTwo <= 0
          ? 0
          : XIRR(lpCFPreCarryTwo.slice(0, i), valuation.valuation_date);
      sumForPreTaxUnPreCarryTwo += lpCFPreCarryTwo[i + 1] || 0;
      postTaxUnleveredProPostCarryTwo[i] =
        sumForPostTaxUnPostCarryTwo <= 0
          ? 0
          : XIRR(lpCFPostCarryTwo.slice(0, i), valuation.valuation_date);
      sumForPostTaxUnPostCarryTwo += lpCFPostCarryTwo[i + 1] || 0;
    }

    // numberOfStages calcs F6582
    const numberOfStages: number = returnsSettings.numberOfStages;
    // lpCFPostCarry calcs row 6584
    const lpCFPostCarry: number[] =
      numberOfStages == 1 ? lpCFPostCarryOne : lpCFPostCarryTwo;
    // gpCFForPreUn calcs row 6585
    const gpCFForPreUn: number[] =
      numberOfStages == 1
        ? sumArrays(gpCFExCarryForOne, gpCFCarryForOne)
        : sumArrays(gpCFExCarryForTwo, gpCFCarryForTwo);

    // the end date of the valuation date quarter
    const indexForEndDateOfValDate = valuationDatePeriodNum;
    // flagIfBeforeStart calcs row 6587
    const flagIfBeforeStart: number[] = new Array(period)
      .fill(0)
      .map((_, index) => (index < indexForEndDateOfValDate - 2 ? 1 : 0));
    // gpCFOnModelTimeline calcs row 6588
    const gpCFOnModelTimeline: number[] = new Array(period).fill(0);
    for (let i = 0; i < period; i++) {
      if (flagIfBeforeStart[i] == 1) gpCFOnModelTimeline[i] = 0;
      else {
        if (i < valuationDatePeriodNum) {
          gpCFOnModelTimeline[i] = 0;
        } else
          gpCFOnModelTimeline[i] = gpCFForPreUn[i - valuationDatePeriodNum + 2];
      }
    }

    // lpCFPostCarryForPostUn calcs row 6593
    const lpCFPostCarryForPostUn: number[] = gpCFForPreUn.map(
      (d, index) => (postTaxUnleveredCFAtValDate[index] || 0) - d
    );
    // lpCFPostCarryForPostLevered calcs row 6598
    const lpCFPostCarryForPostLevered: number[] = gpCFForPreUn.map(
      (d, index) => (postTaxLeveredCFAtValDate[index] || 0) - d
    );

    // originalDevPremium calcs row 6602
    const originalDevPremium: number[] = evAdditions;
    // flagForAfterEndOfModelTimeline calcs row 6607
    const flagForAfterEndOfModelTimeline: number[] = new Array(period).fill(0);
    // devPremium calcs row 6608
    const devPremium: number[] = new Array(period).fill(0);
    for (let i = 0; i < period; i++) {
      if (flagForAfterEndOfModelTimeline[i] == 1) devPremium[i] = 0;
      else {
        if (i > period - valuationDatePeriodNum) {
          devPremium[i] = 0;
        } else
          devPremium[i] =
            originalDevPremium[i + valuationDatePeriodNum - 1] || 0;
      }
    }
    // // npvForDevPremiumAtFCO clacs F6613
    // const npvForDevPremiumAtFCO: number = XNPV(
    //   devPremium,
    //   valuation.valuation_date,
    //   returnsSettings.discountRate / 100
    // );
    // // npvOfGPCFAtFCO clacs F6614
    // const npvOfGPCFAtFCO: number =
    //   XNPV(
    //     gpCFForPreUn,
    //     valuation.valuation_date,
    //     returnsSettings.discountRate / 100
    //   ) / Math.pow(1 + returnsSettings.discountRate / 100, 1 / 4);

    // preUnNPV calcs F6628
    const preUnNPV: number = XNPV(
      lpCFPostCarry,
      valuation.valuation_date,
      cost_of_equity
    );
    // postUnNPV calcs F6629
    const postUnNPV: number = XNPV(
      lpCFPostCarryForPostUn,
      valuation.valuation_date,
      unlevered_post_tax_discount_rate
    );
    // postNPV calcs F6630
    const postNPV: number = XNPV(
      lpCFPostCarryForPostLevered,
      valuation.valuation_date,
      levered_post_tax_discount_rate
    );
    // preUnIRR calcs F6634
    const preUnIRR: number = XIRR(lpCFPostCarry, valuation.valuation_date);
    // postUnIRR calcs F6635
    const postUnIRR: number = XIRR(
      lpCFPostCarryForPostUn,
      valuation.valuation_date
    ); // postIRR calcs F6636
    const postIRR: number = XIRR(
      lpCFPostCarryForPostLevered,
      valuation.valuation_date
    );
    // cumPreUnCF calcs row 6622
    const cumPreUnCF: number[] = new Array(period).fill(0);
    cumPreUnCF[0] = lpCFPostCarry[0];
    // cumPostUnCF calcs row 6623
    const cumPostUnCF: number[] = new Array(period).fill(0);
    cumPostUnCF[0] = lpCFPostCarryForPostUn[0];
    // cumPostCF calcs row 6624
    const cumPostCF: number[] = new Array(period).fill(0);
    cumPostCF[0] = lpCFPostCarryForPostLevered[0];

    // paybackForPreUn calcs row 6641
    const paybackForPreUnFlag: number[] = new Array(period).fill(0);
    // paybackForPostUnFlag calcs row 6642
    const paybackForPostUnFlag: number[] = new Array(period).fill(0);
    // paybackForPostFlag calcs row 6643
    const paybackForPostFlag: number[] = new Array(period).fill(0);
    let paybackPreUn: number = 0;
    let paybackPostUn: number = 0;
    let paybackPost: number = 0;
    const codIndex: number =
      getQuarterNumberFromModelStartDate(modelStartDate, operationStartDate) -
      1;
    for (let i = 1; i < period; i++) {
      cumPreUnCF[i] = cumPreUnCF[i - 1] + lpCFPostCarry[i];
      paybackForPreUnFlag[i] =
        (cumPreUnCF[i] > 0 ? 1 : 0) * (i > codIndex ? 1 : 0);

      if (paybackForPreUnFlag[i - 1] == 0 && paybackForPreUnFlag[i] == 1)
        paybackPreUn = (i + 2) / 4;
      cumPostUnCF[i] = cumPostUnCF[i - 1] + lpCFPostCarryForPostUn[i];
      paybackForPostUnFlag[i] =
        (cumPostUnCF[i] > 0 ? 1 : 0) * (i > codIndex ? 1 : 0);
      if (paybackForPostUnFlag[i - 1] == 0 && paybackForPostUnFlag[i] == 1)
        paybackPostUn = (i + 2) / 4;
      cumPostCF[i] = cumPostCF[i - 1] + lpCFPostCarryForPostLevered[i];
      paybackForPostFlag[i] =
        (cumPostCF[i] > 0 ? 1 : 0) * (i > codIndex ? 1 : 0);
      if (paybackForPostFlag[i - 1] == 0 && paybackForPostFlag[i] == 1)
        paybackPost = (i + 2) / 4;
    }

    return {
      preUn: {
        npv: preUnNPV,
        irr: preUnIRR,
        payback: paybackPreUn,
      },
      postUn: {
        npv: postUnNPV,
        irr: postUnIRR,
        payback: paybackPostUn,
      },
      post: {
        npv: postNPV,
        irr: postIRR,
        payback: paybackPost,
      },
      discount_rate_pre_tax_and_unlevered: discount_rate_pre_tax_and_unlevered,
      pre_tax_unlevered_cash_flow: pre_tax_unlevered_cash_flow,
      discount_rate_post_tax_and_unlevered:
        discount_rate_post_tax_and_unlevered,
      post_tax_unlevered_cash_flow: post_tax_unlevered_cash_flow,
      discount_rate_post_tax_and_levered: discount_rate_post_tax_and_levered,
      post_tax_levered_cash_flow: post_tax_levered_cash_flow,
    };
  } else
    return {
      preUn: {
        npv: 0,
        irr: 0,
        payback: 0,
      },
      postUn: {
        npv: 0,
        irr: 0,
        payback: 0,
      },
      post: {
        npv: 0,
        irr: 0,
        payback: 0,
      },
      discount_rate_pre_tax_and_unlevered: 0,
      pre_tax_unlevered_cash_flow: pre_tax_unlevered_cash_flow,
      discount_rate_post_tax_and_unlevered: 0,
      post_tax_unlevered_cash_flow: pre_tax_unlevered_cash_flow,
      discount_rate_post_tax_and_levered: 0,
      post_tax_levered_cash_flow: pre_tax_unlevered_cash_flow,
    };
}
