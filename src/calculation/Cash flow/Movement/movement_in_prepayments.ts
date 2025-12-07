import {
  DEFAULT_LAND_RENT,
  DEFAULT_LAND_RENT_EXEPNESE,
} from "../../calculates/Administrative costs/constant";
import {
  ILandRent,
  ILandRentExpense,
} from "../../calculates/Administrative costs/type";
import { IInflationForm } from "../../calculates/Revenue/type";
import {
  getAsAPercentOfPeriod,
  getFlagOfPeriod,
  getQuarterNumberFromModelStartDate,
  roundArray,
  sumArrays,
} from "../../calculates/utils";

// Calcs 21 Prepayments
export function calcPrepayments({
  landRent = DEFAULT_LAND_RENT,
  // operationStartDate = '2028-01-01',
  modelStartDate = "2023-01-01",
  developmentStartDate = "2023-07-01",
  // decommissioningStartDate = '2068-01-01',
  decommissioningEndDate = "2068-06-30",
  landRentExpense = DEFAULT_LAND_RENT_EXEPNESE,
}: {
  landRent?: ILandRent;
  landSize?: number;
  initialCapacity?: number;
  inflationInputs?: IInflationForm[];
  operationStartDate?: string;
  modelStartDate?: string;
  operationEndDate?: string;
  decommissioningStartDate?: string;
  developmentStartDate?: string;
  decommissioningEndDate?: string;
  constructionStartDate?: string;
  landRentExpense?: ILandRentExpense;
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
  const developmentToDecommissioningFlag = getFlagOfPeriod(
    modelStartDate,
    developmentStartDate,
    decommissioningEndDate,
    decommissioningEndDate
  );

  // 21.01 Profit and loss expense
  // landRentOptionOne calcs row 4932
  // landRentOptionTwo calcs row 4933
  const landRentOptionOne = landRentExpense.postGridConnectionForecastForOne;
  const landRentOptionTwo = landRentExpense.postGridConnectionForecastForTwo;
  // totalRent calcs row 4934
  const totalRent = sumArrays(landRentOptionOne, landRentOptionTwo);

  // startDateForOne calcs F4944
  const startDateForOne = landRent.optionChargeOne.startDate;
  // quarterNumberForOne calcs F4945
  const quarterNumberForOne =
    (getQuarterNumberFromModelStartDate(modelStartDate, startDateForOne) - 1) %
    4;
  // annualFlagForOne calcs row 4946
  let annualFlagForOne: number[] = new Array(period).fill(0);
  // rentOnePrepayment calcs row 4948
  let rentOnePrepayment: number[] = new Array(period).fill(0);

  // startDateForTwo calcs F4953
  const startDateForTwo = landRent.optionChargeTwo.startDate;
  // quarterNumberForTwo calcs F4954
  const quarterNumberForTwo =
    (getQuarterNumberFromModelStartDate(modelStartDate, startDateForTwo) - 1) %
    4;
  // annualFlagForTwo calcs row 4956
  let annualFlagForTwo: number[] = new Array(period).fill(0);
  // rentTwoPrepayment calcs row 4957
  let rentTwoPrepayment: number[] = new Array(period).fill(0);

  for (let i = 0; i < period; i++) {
    annualFlagForOne[i] = (i + 1) % 4 == quarterNumberForOne ? 1 : 0;
    annualFlagForTwo[i] = (i + 1) % 4 == quarterNumberForTwo ? 1 : 0;
    if (i < period - 4) {
      rentOnePrepayment[i] =
        -annualFlagForOne[i] *
        (landRentOptionOne[i] +
          landRentOptionOne[i + 1] +
          landRentOptionOne[i + 2] +
          landRentOptionOne[i + 3]);
      rentTwoPrepayment[i] =
        -annualFlagForTwo[i] *
        (landRentOptionTwo[i] +
          landRentOptionTwo[i + 1] +
          landRentOptionTwo[i + 2] +
          landRentOptionTwo[i + 3]);
    }
  }
  rentOnePrepayment[period - 3] =
    -annualFlagForOne[period - 3] *
    (landRentOptionOne[period - 3] +
      landRentOptionOne[period - 2] +
      landRentOptionOne[period - 1]);
  rentOnePrepayment[period - 2] =
    -annualFlagForOne[period - 2] *
    (landRentOptionOne[period - 2] + landRentOptionOne[period - 1]);
  rentOnePrepayment[period - 1] =
    -annualFlagForOne[period - 1] * landRentOptionOne[period - 1];
  rentTwoPrepayment[period - 3] =
    -annualFlagForTwo[period - 3] *
    (landRentOptionTwo[period - 3] +
      landRentOptionTwo[period - 2] +
      landRentOptionTwo[period - 1]);
  rentTwoPrepayment[period - 2] =
    -annualFlagForTwo[period - 2] *
    (landRentOptionTwo[period - 2] + landRentOptionTwo[period - 1]);
  rentTwoPrepayment[period - 1] =
    -annualFlagForTwo[period - 1] * landRentOptionTwo[period - 1];

  // totalPrePayment calcs row 4968
  const totalPrePayment = sumArrays(rentOnePrepayment, rentTwoPrepayment);

  // prepaymentsStartBalance calcs row 4974
  let prepaymentsStartBalance: number[] = new Array(period).fill(0);
  // prepaymentsEndBalance calcs row 4977
  let prepaymentsEndBalance: number[] = new Array(period).fill(0);

  // movementInWorkingCapital calcs row 4979
  let movementInWorkingCapital: number[] = new Array(period).fill(0);
  for (let i = 0; i < period; i++) {
    prepaymentsEndBalance[i] =
      prepaymentsStartBalance[i] + totalPrePayment[i] + totalRent[i];
    if (i < period - 1)
      prepaymentsStartBalance[i + 1] =
        prepaymentsEndBalance[i] * developmentToDecommissioningFlag[i + 1];
    movementInWorkingCapital[i] =
      -(prepaymentsEndBalance[i] - prepaymentsStartBalance[i]) *
      developmentToDecommissioningFlag[i];
  }

  return {
    movement_in_working_capital: roundArray(movementInWorkingCapital, 20),
    prepayments_for_balance_sheet: prepaymentsEndBalance,
  };
}
