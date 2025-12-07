import moment from "moment";
import {
  INFLATION_START_YEAR,
  MODEL_START_YEAR,
} from "../../../utils/constant";
import { DATE_FORMAT } from "../../../utils/usePrameter";
import { IInflationForm } from "../Revenue/type";
import { DEFAULT_INFLATION_INPUTS } from "../constant";
import {
  annualIndexToMonths,
  calcDaysInQuarter,
  getAsAPercentOfPeriod,
  getEndDateOfQuarter,
  getOperationsAsAPercentOfPeriod,
  getFlagOfPeriod,
  getQuarterDates,
  getQuarterNumber,
  getQuarterNumberFromModelStartDate,
  inflationIndex,
  multiplyArrays,
  multiplyNumber,
  normalizeArray,
  roundArray,
  sumArray,
  sumArrays,
} from "../utils";
import { DEFAULT_LAND_RENT } from "./constant";
import { ILandRent } from "./type";

export function calcLandRentToPL({
  landRent = DEFAULT_LAND_RENT,
  landSize = 75,
  initialCapacity = 1000,
  inflationInputs = DEFAULT_INFLATION_INPUTS,
  operationStartDate = "2028-01-01",
  modelStartDate = "2023-01-01",
  operationEndDate = "2067-12-31",
  decommissioningStartDate = "2068-01-01",
  decommissioningEndDate = "2068-06-30",
  constructionStartDate = "2027-01-01",
  developmentStartDate = "2023-07-01",
}: {
  landRent?: ILandRent;
  landSize?: number;
  initialCapacity?: number;
  inflationInputs?: IInflationForm[];
  operationStartDate?: string;
  modelStartDate?: string;
  operationEndDate?: string;
  decommissioningStartDate?: string;
  decommissioningEndDate?: string;
  constructionStartDate?: string;
  developmentStartDate?: string;
}) {
  const numberOfDaysInMonth = calcDaysInQuarter(
    modelStartDate,
    decommissioningEndDate
  );
  const period =
    getQuarterNumberFromModelStartDate(modelStartDate, decommissioningEndDate) -
    1;
  const landRentInflationIndex = normalizeArray(
    annualIndexToMonths(
      roundArray(
        inflationIndex({
          inflationInputs,
          baseYear: landRent.inflation.baseYear,
          profile: landRent.inflation.profile,
        }),
        10
      ).slice(MODEL_START_YEAR - INFLATION_START_YEAR)
    ),
    period
  );
  const developmentFlag = getFlagOfPeriod(
    modelStartDate,
    developmentStartDate,
    moment(constructionStartDate).add(-1, "days").format(DATE_FORMAT),
    decommissioningEndDate
  );
  // calcs 18.02 Standard land rent ~~~ Post grid connection forecast cost row 2871

  // annualLandRent = calcs 18.02 Standard land rent ~~~ Post grid connection forecast cost F2854
  const annualLandRent =
    landRent.switch *
    ((landRent.annualLandRent.landRentBasis == "per acre" ? 1 : 0) *
      landRent.annualLandRent.annualLandRentPerAcreCharge *
      landSize +
      (landRent.annualLandRent.landRentBasis == "per MW" ? 1 : 0) *
        landRent.annualLandRent.annualLandRentPerMWCharge *
        initialCapacity +
      (landRent.annualLandRent.landRentBasis == "" ? 1 : 0) * 0);
  // quarterlyLandRent = calcs 18.02 Standard land rent ~~~ Post grid connection forecast cost F2854
  const quarterlyLandRent = annualLandRent / 4;
  const constructionAsAPercentOfPeriod = getAsAPercentOfPeriod(
    modelStartDate,
    constructionStartDate,
    moment(operationStartDate).add(-1, "days").format(DATE_FORMAT),
    decommissioningEndDate
  );
  const constructionFlag = getFlagOfPeriod(
    modelStartDate,
    constructionStartDate,
    moment(operationStartDate).add(-1, "days").format(DATE_FORMAT),
    decommissioningEndDate
  );
  const operationsAsAPercentOfPeriod = getAsAPercentOfPeriod(
    modelStartDate,
    operationStartDate,
    operationEndDate,
    decommissioningEndDate
  );
  const decommissioningAsAPercentOfPeriod = getAsAPercentOfPeriod(
    modelStartDate,
    decommissioningStartDate,
    decommissioningEndDate,
    decommissioningEndDate
  );

  // postConstructionForecastCost row 2871 is included as an administrative expense to Profit and loss account. calcs row 2871

  const postConstructionForecastCost = operationsAsAPercentOfPeriod.map(
    (d, index) =>
      ((d * landRent.annualLandRent.portionPayableDuringOperations +
        decommissioningAsAPercentOfPeriod[index] *
          landRent.annualLandRent.portionPayableDuringDecommissioning) /
        100) *
      -quarterlyLandRent *
      landRentInflationIndex[index]
  );
  // preConstructionForecastCost row 2870
  const preConstructionForecastCost = constructionAsAPercentOfPeriod.map(
    (d, index) =>
      ((d * landRent.annualLandRent.portionPayableDuringConstruction) / 100) *
      quarterlyLandRent *
      landRentInflationIndex[index]
  );
  // totalStandardLentCost row 2872
  const totalStandardLentCost: number[] = sumArrays(
    preConstructionForecastCost,
    postConstructionForecastCost
  );

  let landRentSensitivity = 0;
  if (landRent.sensitivity == 1) {
    landRentSensitivity = landRent.sensitivity_magnitude / 100;
  } else landRentSensitivity = 0;
  // bespokeMonthlyChargePerMWForecast is included as an administrative expense to Profit and loss account.
  const bespokeMonthlyChargePerMWForecast = operationsAsAPercentOfPeriod.map(
    (d, index) =>
      (((((d * landRent.annualLandRent.portionPayableDuringOperations +
        decommissioningAsAPercentOfPeriod[index] *
          landRent.annualLandRent.portionPayableDuringDecommissioning +
        landRent.annualLandRent.portionPayableDuringConstruction *
          constructionFlag[index]) *
        initialCapacity *
        landRent.switch *
        landRent.optionChargeOne.annualLandRentPerMWCharge) /
        12) *
        (1 + landRentSensitivity)) /
        100) *
      landRentInflationIndex[index]
  );
  // bespokeMonthlyChargePerAcreForecast is included as an administrative expense to Profit and loss account.

  const bespokeMonthlyChargePerAcreForecast = normalizeArray(
    landRentInflationIndex.map(
      (d) =>
        (d *
          landRent.switch *
          landRent.optionChargeTwo.annualLandRentPerAcreCharge *
          landSize) /
        12
    ),
    bespokeMonthlyChargePerMWForecast.length
  );

  // calcs Option rent 1
  // annualLandRentForOne ~~~ calcs F2900
  const annualLandRentForOne: number =
    landRent.switch *
    ((landRent.optionChargeOne.landRentBasis == "per acre" ? 1 : 0) *
      landRent.optionChargeOne.annualLandRentPerAcreCharge *
      (landSize * 1 + landRent.optionChargeTwo.landSizeForOptionTwo * 1) +
      (landRent.optionChargeOne.landRentBasis == "per MW" ? 1 : 0) *
        landRent.optionChargeTwo.annualLandRentPerMWCharge *
        initialCapacity +
      (landRent.optionChargeOne.landRentBasis == "" ? 1 : 0) * 0);
  // quarterlyLandRentForOne ~~~ calcs F2901
  const quarterlyLandRentForOne = annualLandRentForOne / -4;
  // rentFlagForOptionOne ~~~ calcs row 2909
  const rentFlagForOptionOne: number[] = getAsAPercentOfPeriod(
    modelStartDate,
    landRent.optionChargeOne.startDate,
    landRent.optionChargeOne.endDate,
    decommissioningEndDate
  );
  const lastDateOfOne =
    getQuarterNumberFromModelStartDate(
      modelStartDate,
      landRent.optionChargeOne.endDate
    ) - 1;
  // rentFlagForOptionTwo[lastDateOfTwo - 1] =
  //   new Date(landRent.optionChargeTwo.endDate + "Z").getUTCDate() /
  //   numberOfDaysInMonth[lastDateOfTwo - 1];
  rentFlagForOptionOne[lastDateOfOne - 1] =
    new Date(landRent.optionChargeOne.endDate + "Z").getUTCDate() /
    numberOfDaysInMonth[lastDateOfOne - 1];

  // forecastCostForOptionOne ~~~ calcs row 2913
  const forecastCostForOptionOne = multiplyNumber(
    multiplyArrays([rentFlagForOptionOne, landRentInflationIndex]),
    quarterlyLandRentForOne
  );
  // preGridConnectionForecastForOne ~~~ calcs row 2915
  const preGridConnectionForecastForOne = forecastCostForOptionOne.map(
    (d, index) => d * Math.max(developmentFlag[index], constructionFlag[index])
  );

  // postGridConnectionForecastForOne ~~~ calcs row 2916
  const postGridConnectionForecastForOne = forecastCostForOptionOne.map(
    (d, index) => d - preGridConnectionForecastForOne[index]
  );
  // calcs Option rent 2
  // annualLandRentForTwo ~~~ calcs F2930
  const annualLandRentForTwo: number =
    landRent.switch *
    ((landRent.optionChargeTwo.landRentBasis == "per acre" ? 1 : 0) *
      landRent.optionChargeTwo.annualLandRentPerAcreCharge *
      (landRent.optionChargeTwo.landSizeForOptionTwo * 1) +
      (landRent.optionChargeTwo.landRentBasis == "per MW" ? 1 : 0) *
        landRent.optionChargeTwo.annualLandRentPerMWCharge *
        initialCapacity +
      (landRent.optionChargeTwo.landRentBasis == "" ? 1 : 0) * 0);
  // quarterlyLandRentForTwo ~~~ calcs F2931
  const quarterlyLandRentForTwo = annualLandRentForTwo / -4;
  // rentFlagForOptionTwo ~~~ calcs row 2939
  const rentFlagForOptionTwo: number[] = getAsAPercentOfPeriod(
    modelStartDate,
    landRent.optionChargeTwo.startDate,
    landRent.optionChargeTwo.endDate,
    decommissioningEndDate
  );
  const lastDateOfTwo =
    getQuarterNumberFromModelStartDate(
      modelStartDate,
      landRent.optionChargeTwo.endDate
    ) - 1;

  rentFlagForOptionTwo[lastDateOfTwo - 1] =
    new Date(landRent.optionChargeTwo.endDate + "Z").getUTCDate() /
    numberOfDaysInMonth[lastDateOfTwo - 1];
  // forecastCostForOptionTwo ~~~ calcs row 2943
  const forecastCostForOptionTwo = multiplyNumber(
    multiplyArrays([rentFlagForOptionTwo, landRentInflationIndex]),
    quarterlyLandRentForTwo
  );

  // preGridConnectionForecastForTwo ~~~ calcs row 2945
  const preGridConnectionForecastForTwo = forecastCostForOptionTwo.map(
    (d, index) => d * Math.max(developmentFlag[index], constructionFlag[index])
  );

  // postGridConnectionForecastForTwo ~~~ calcs row 2946
  const postGridConnectionForecastForTwo = forecastCostForOptionTwo.map(
    (d, index) => d - preGridConnectionForecastForTwo[index]
  );

  // calcs NPV of substation rent at end of decommissioning

  const timeRemainingOnLeaseByQuarters =
    landRent.substationRent.timeRemainingOnLease / 3;
  // decommissioningEndDateFlag calcs ~~~ row 2953
  let decommissioningEndDateFlag: number[] = new Array(period).fill(0);
  decommissioningEndDateFlag[period - 1] = 1;

  // quarterlyRentAtEndOfProject calcs ~~~ F2954
  let quarterlyRentAtEndOfProject: number;
  quarterlyRentAtEndOfProject =
    (sumArray(
      multiplyArrays([decommissioningEndDateFlag, totalStandardLentCost])
    ) /
      landRent.annualLandRent.portionPayableDuringDecommissioning) *
    100 *
    3;

  // quarterlyRentAtEndOfProjectPerAcre calcs ~~~ F2955
  const quarterlyRentAtEndOfProjectPerAcre =
    quarterlyRentAtEndOfProject /
    (landSize * 1 + landRent.optionChargeTwo.landSizeForOptionTwo * 1);

  // quarterlyRentForSubstationAtEndOfProject calcs ~~~ F2958
  const quarterlyRentForSubstationAtEndOfProject =
    quarterlyRentAtEndOfProjectPerAcre *
    landRent.substationRent.acresForSubstation;

  // netPresentValue calcs ~~~ F3207 netPresentValue calculation to be added
  const netPresentValue = 0;

  // substationRentPaymentAtEndOfProject calcs ~~~ row 3209
  const substationRentPaymentAtEndOfProject = multiplyNumber(
    decommissioningEndDateFlag,
    netPresentValue
  );

  // oneTimePayment calcs F2876
  const oneTimePayment = landRent.oneTimePayment.paymentAmount;
  // quarterEndPaymentDate calcs F2878
  const quarterStartAndEndDateForPayment = getQuarterDates(
    landRent.oneTimePayment.paymentDate
  );
  const quarterEndPaymentDate = quarterStartAndEndDateForPayment.end;

  // paymentFlagForOneTimePayment calcs row 2880
  const paymentFlagForOneTimePayment = getAsAPercentOfPeriod(
    modelStartDate,
    quarterStartAndEndDateForPayment.start,
    quarterEndPaymentDate,
    decommissioningEndDate
  );

  //  paymentOnModelTimeForOneTime calcs row 2881
  const paymentOnModelTimeForOneTime = multiplyNumber(
    paymentFlagForOneTimePayment,
    landRent.oneTimePayment.paymentAmount * -1
  );
  //  preConnectionForecastCostForOneTime calcs row 2883
  const preConnectionForecastCostForOneTime = paymentOnModelTimeForOneTime.map(
    (d, index) =>
      d *
      Math.max(developmentFlag[index], constructionAsAPercentOfPeriod[index])
  );

  //  postConnectionForecastCostForOneTime calcs row 2884
  const postConnectionForecastCostForOneTime = sumArrays(
    paymentOnModelTimeForOneTime,
    multiplyNumber(paymentOnModelTimeForOneTime, -1)
  );

  const forecastLandRentToPL = sumArrays(
    postConstructionForecastCost,
    postConnectionForecastCostForOneTime,
    postGridConnectionForecastForOne,
    postGridConnectionForecastForTwo,
    substationRentPaymentAtEndOfProject
  );
  // Calculation of capitalized rent

  // optionOnePaymentFlagWithPaymentTerms calcs rpw 3219
  const optionOnePaymentTerms = landRent.optionChargeOne.paymentTerms;
  let optionOnePaymentFlagWithPaymentTerms: number[] = new Array(period).fill(
    0
  );

  // optionOnePaymentForCapitalizedRent calcs row 3220
  let optionOnePaymentForCapitalizedRent: number[] = new Array(period).fill(0);

  const quarterNumberOfTheOptionOneStartDate = getQuarterNumber(
    landRent.optionChargeOne.startDate
  );
  for (let i = 0; i < period; i++) {
    i % 4 == quarterNumberOfTheOptionOneStartDate - 1
      ? (optionOnePaymentFlagWithPaymentTerms[i] = 1)
      : (optionOnePaymentFlagWithPaymentTerms[i] = 0);
    if (i < period - 3)
      optionOnePaymentForCapitalizedRent[i] =
        optionOnePaymentFlagWithPaymentTerms[i] *
        (preGridConnectionForecastForOne[i] +
          preGridConnectionForecastForOne[i + 1] +
          preGridConnectionForecastForOne[i + 2] +
          preGridConnectionForecastForOne[i + 3]);
    if (i == period - 3)
      optionOnePaymentForCapitalizedRent[i] =
        optionOnePaymentFlagWithPaymentTerms[i] *
        (preGridConnectionForecastForOne[i] +
          preGridConnectionForecastForOne[i + 1] +
          preGridConnectionForecastForOne[i + 2]);
    if (i == period - 2)
      optionOnePaymentForCapitalizedRent[i] =
        optionOnePaymentFlagWithPaymentTerms[i] *
        (preGridConnectionForecastForOne[i] +
          preGridConnectionForecastForOne[i + 1]);
    if (i == period - 1)
      optionOnePaymentForCapitalizedRent[i] =
        optionOnePaymentFlagWithPaymentTerms[i] *
        preGridConnectionForecastForOne[i];
  }

  // optionTwoPaymentFlagWithPaymentTerms calcs rpw 3226
  const optionTwoPaymentTerms = landRent.optionChargeOne.paymentTerms;
  let optionTwoPaymentFlagWithPaymentTerms: number[] = new Array(period).fill(
    0
  );

  // optionTwoPaymentForCapitalizedRent calcs row 3227
  let optionTwoPaymentForCapitalizedRent: number[] = new Array(period).fill(0);

  const quarterNumberOfTheOptionTwoStartDate = getQuarterNumber(
    landRent.optionChargeTwo.startDate
  );
  for (let i = 0; i < period; i++) {
    i % 4 == quarterNumberOfTheOptionTwoStartDate - 1
      ? (optionTwoPaymentFlagWithPaymentTerms[i] = 1)
      : 0;
    if (i < period - 3)
      optionTwoPaymentForCapitalizedRent[i] =
        optionTwoPaymentFlagWithPaymentTerms[i] *
        (preGridConnectionForecastForTwo[i] +
          preGridConnectionForecastForTwo[i + 1] +
          preGridConnectionForecastForTwo[i + 2] +
          preGridConnectionForecastForTwo[i + 3]);
    if (i == period - 3)
      optionTwoPaymentForCapitalizedRent[i] =
        optionTwoPaymentFlagWithPaymentTerms[i] *
        (preGridConnectionForecastForTwo[i] +
          preGridConnectionForecastForTwo[i + 1] +
          preGridConnectionForecastForTwo[i + 2]);
    if (i == period - 2)
      optionTwoPaymentForCapitalizedRent[i] =
        optionTwoPaymentFlagWithPaymentTerms[i] *
        (preGridConnectionForecastForTwo[i] +
          preGridConnectionForecastForTwo[i + 1]);
    if (i == period - 1)
      optionTwoPaymentForCapitalizedRent[i] =
        optionTwoPaymentFlagWithPaymentTerms[i] *
        preGridConnectionForecastForTwo[i];
  }

  // real return:  return forecastLandRentToPL;

  // capitalizedRentToFixedAssets calcs ~~~ row 3236
  const capitalizedRentToFixedAssets = sumArrays(
    multiplyNumber(preConstructionForecastCost, -1),
    optionTwoPaymentForCapitalizedRent,
    optionOnePaymentForCapitalizedRent,
    preConnectionForecastCostForOneTime
  );

  return {
    rentToProfit: roundArray(forecastLandRentToPL, 10),
    rentToFixedAssets: capitalizedRentToFixedAssets,
    postGridConnectionForecastForOne: postGridConnectionForecastForOne,
    postGridConnectionForecastForTwo: postGridConnectionForecastForTwo,
  };
}
