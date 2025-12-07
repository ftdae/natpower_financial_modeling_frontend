import moment from "moment";
import { INFLATION_START_YEAR, MODEL_START_YEAR } from "../../utils/constant";
import {
  DEFAULT_AFRY_REVENUE_DATA,
  DEFAULT_BATTERY_AUGMENTATION,
  DEFAULT_BATTERY_CUBES,
  DEFAULT_BATTERY_DISPOSAL,
  DEFAULT_BATTERY_EFFICIENCY,
  DEFAULT_BATTERY_EXCUBES,
  DEFAULT_BESS_CAPEX_FORECAST,
  DEFAULT_CAPEX_FORECAST_SCENARIO_DATA,
  DEFAULT_CAPEX_PAYMENT_MILESTONES,
  DEFAULT_CAPEX_PAYMENTS_PROFILE,
  DEFAULT_CAPEX_UEL,
  DEFAULT_DETAILED_REVENUE_DATA,
  DEFAULT_INFLATION_INPUTS,
  DEFAULT_INITIAL_CYCLE_DATA,
  DEFAULT_REVENUE_ASSUMPTIONS_DATA,
  DEFAULT_REVENUE_SETUP,
  DEFAULT_STARTING_BATTERY_ASSUMPTION,
} from "./constant";
import {
  IAfryRevenueData,
  IAssumptionData,
  IBatteryAugmentation,
  IBatteryCubes,
  IBatteryDisposal,
  IBatteryEfficiency,
  IBatteryExcubes,
  IBessCapexForecast,
  ICapexForecastData,
  ICapexPaymentForm,
  ICapexPaymentMilestoneForm,
  ICapexUELForm,
  ICycleData,
  IDetailedRevenueData,
  IInflationForm,
  IRevenueSetup,
  IStartingBatteryAssumptions,
} from "./Revenue/type";
import { getActiveScenarioRevenueItems } from "./Revenue/wholesale_day_ahead";
import { dateFormats } from "highcharts";
import { DATE_FORMAT } from "../../utils/usePrameter";
import { differenceInDays } from "date-fns";

export function calcNumberOfDaysInMonth(
  modelStartDate = "2023-01-01",
  operationStartDate = "2028-01-01",
  operationYears = 40
): number[] {
  let modelStartDateObj = new Date(modelStartDate);
  let operationStartDateObj = new Date(operationStartDate);
  operationStartDateObj.setFullYear(
    operationStartDateObj.getFullYear() + operationYears
  );

  if (modelStartDateObj > operationStartDateObj) {
    const temp = modelStartDateObj;
    modelStartDateObj = operationStartDateObj;
    operationStartDateObj = temp;
  }

  const daysInMonths: number[] = [];

  while (modelStartDateObj < operationStartDateObj) {
    const year = modelStartDateObj.getFullYear();
    const month = modelStartDateObj.getMonth();
    let daysInMonth = new Date(year, month + 1, 0).getDate();

    if (modelStartDateObj.getDate() > 1) {
      daysInMonth -= modelStartDateObj.getDate() - 1;
      modelStartDateObj.setDate(1);
    }

    if (
      modelStartDateObj.getFullYear() === operationStartDateObj.getFullYear() &&
      modelStartDateObj.getMonth() === operationStartDateObj.getMonth() &&
      operationStartDateObj.getDate() !== new Date(year, month + 1, 0).getDate()
    ) {
      daysInMonth -=
        new Date(year, month + 1, 0).getDate() -
        operationStartDateObj.getDate();
    }

    daysInMonths.push(daysInMonth);
    modelStartDateObj.setMonth(modelStartDateObj.getMonth() + 1);
  }

  return daysInMonths;
}

export function getOperationsAsAPercentOfPeriod({
  modelStartDate = "2023-01-01",
  operationStartDate = "2028-01-01",
  operationYears = 40,
}: {
  modelStartDate?: string;
  operationStartDate?: string;
  operationYears?: number;
}): number[] {
  let modelStartDateObj = new Date(modelStartDate);
  let operationStartDateObj = new Date(operationStartDate);
  operationStartDateObj.setFullYear(
    operationStartDateObj.getFullYear() + operationYears
  );

  if (modelStartDateObj > operationStartDateObj) {
    const temp = modelStartDateObj;
    modelStartDateObj = operationStartDateObj;
    operationStartDateObj = temp;
  }

  const values: number[] = [];

  while (modelStartDateObj < operationStartDateObj) {
    if (
      modelStartDateObj <=
      new Date(
        operationStartDateObj.getFullYear() - operationYears,
        operationStartDateObj.getMonth(),
        operationStartDateObj.getDate()
      )
    ) {
      values.push(0);
    } else {
      values.push(1);
    }

    modelStartDateObj.setMonth(modelStartDateObj.getMonth() + 3);
  }

  return values;
}
export function getQuarterNumberFromModelStartDate(
  date1: string = "2023-01-01",
  date2: string = "2068-06-30"
): number {
  // Validate date format
  const validateDateFormat = (date: string): boolean => {
    return /^\d{4}-\d{2}-\d{2}$/.test(date);
  };

  if (!validateDateFormat(date1) || !validateDateFormat(date2)) {
    throw new Error("Invalid date format. Please use 'YYYY-MM-DD'.");
  }

  const date1Parts = date1.split("-").map(Number) as [number, number, number];
  const date2Parts = date2.split("-").map(Number) as [number, number, number];

  let date1Obj = new Date(
    Date.UTC(date1Parts[0], date1Parts[1] - 1, date1Parts[2])
  );
  let date2Obj = new Date(
    Date.UTC(date2Parts[0], date2Parts[1] - 1, date2Parts[2])
  );

  // Validate dates
  if (isNaN(date1Obj.getTime()) || isNaN(date2Obj.getTime())) {
    throw new Error("Invalid date format. Please use 'YYYY-MM-DD'.");
  }

  // Set the day to the first of the month (UTC)
  date1Obj.setUTCDate(1);
  date2Obj.setUTCDate(1);

  // Swap dates if date1 is greater than date2
  if (date1Obj > date2Obj) {
    [date1Obj, date2Obj] = [date2Obj, date1Obj]; // Swap using destructuring
  }

  const years = date2Obj.getUTCFullYear() - date1Obj.getUTCFullYear();
  const months = date2Obj.getUTCMonth() - date1Obj.getUTCMonth();

  const monthNumberFromModelStartDate =
    Math.floor((years * 12 + months) / 3) + 1;

  return monthNumberFromModelStartDate + 1;
}
export function getMonthNumberFromModelStartDate(
  date1: string = "2023-01-01",
  date2: string = "2068-06-30"
): number {
  // Validate date format
  const validateDateFormat = (date: string): boolean => {
    return /^\d{4}-\d{2}-\d{2}$/.test(date);
  };

  if (!validateDateFormat(date1) || !validateDateFormat(date2)) {
    throw new Error("Invalid date format. Please use 'YYYY-MM-DD'.");
  }

  const date1Parts = date1.split("-").map(Number) as [number, number, number];
  const date2Parts = date2.split("-").map(Number) as [number, number, number];

  let date1Obj = new Date(
    Date.UTC(date1Parts[0], date1Parts[1] - 1, date1Parts[2])
  );
  let date2Obj = new Date(
    Date.UTC(date2Parts[0], date2Parts[1] - 1, date2Parts[2])
  );

  // Validate dates
  if (isNaN(date1Obj.getTime()) || isNaN(date2Obj.getTime())) {
    throw new Error("Invalid date format. Please use 'YYYY-MM-DD'.");
  }

  // Set the day to the first of the month (UTC)
  date1Obj.setUTCDate(1);
  date2Obj.setUTCDate(1);

  // Swap dates if date1 is greater than date2
  if (date1Obj > date2Obj) {
    [date1Obj, date2Obj] = [date2Obj, date1Obj]; // Swap using destructuring
  }

  const years = date2Obj.getUTCFullYear() - date1Obj.getUTCFullYear();
  const months = date2Obj.getUTCMonth() - date1Obj.getUTCMonth();

  // Calculate the total number of months from date1 to date2
  const monthNumberFromModelStartDate = years * 12 + months + 1; // +1 for the current month

  return monthNumberFromModelStartDate;
}

// export function getPeriodFlag(
//   startDate: Date | string,
//   date1: Date | string,
//   date2: Date | string,
//   endDate: Date | string
// ): number[] {
//   const arr: number[] = [];

//   // Convert inputs to Date objects
//   startDate = new Date(startDate);
//   date1 = new Date(date1);
//   date2 = new Date(date2);
//   endDate = new Date(endDate);

//   // Ensure valid date conversion
//   const startParts = [
//     startDate.getUTCFullYear(),
//     startDate.getUTCMonth(),
//     startDate.getUTCDate(),
//   ] as [number, number, number];
//   const date1Parts = [
//     date1.getUTCFullYear(),
//     date1.getUTCMonth(),
//     date1.getUTCDate(),
//   ] as [number, number, number];
//   const date2Parts = [
//     date2.getUTCFullYear(),
//     date2.getUTCMonth(),
//     date2.getUTCDate(),
//   ] as [number, number, number];
//   const endParts = [
//     endDate.getUTCFullYear(),
//     endDate.getUTCMonth(),
//     endDate.getUTCDate(),
//   ] as [number, number, number];

//   while (startDate <= endDate) {
//     if (startDate >= date1 && startDate <= date2) {
//       arr.push(1);
//     } else {
//       arr.push(0);
//     }
//     startDate.setUTCMonth(startDate.getUTCMonth() + 3);
//   }

//   return arr;
// }

export function getAsAPercentOfPeriod(
  startDate: Date | string,
  date1: Date | string,
  date2: Date | string,
  endDate: Date | string
): number[] {
  const start = new Date(startDate);
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const end = new Date(endDate);

  const results: number[] = [];

  // Check if the start date is after the end date
  if (start > end) {
    return results; // Return empty array
  }

  while (start <= end) {
    const quarterEnd = getQuarterEnd(start);

    // If the quarter ends before date1
    if (quarterEnd <= d1) {
      results.push(0);
    }
    // If date1 is within the quarter
    else if (d1 >= start && d1 <= quarterEnd) {
      const daysInQuarter =
        (quarterEnd.getTime() - start.getTime()) / (1000 * 60 * 60 * 24) + 1;
      const daysFromD1ToQuarterEnd =
        (quarterEnd.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24) + 1;
      results.push(daysFromD1ToQuarterEnd / daysInQuarter);
    }
    // If quarter ends before date2
    else if (quarterEnd <= d2 && d1 < start) {
      results.push(1);
    }
    // If date2 is within the quarter
    else if (d2 > start && d2 <= quarterEnd) {
      const daysInQuarter =
        (quarterEnd.getTime() - start.getTime()) / (1000 * 60 * 60 * 24) + 1;
      const daysFromStartToD2 =
        (d2.getTime() - start.getTime()) / (1000 * 60 * 60 * 24) + 1;
      results.push(daysFromStartToD2 / daysInQuarter);
    }
    // If both dates are before the current quarter
    else {
      results.push(0);
    }

    // Move to the next quarter
    start.setUTCMonth(start.getUTCMonth() + 3);
  }

  return results;
}
export function getFlagOfPeriod(
  startDate: Date | string,
  date1: Date | string,
  date2: Date | string,
  endDate: Date | string
): number[] {
  const start = new Date(startDate);
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const end = new Date(endDate);

  const results: number[] = [];

  // Check if the start date is after the end date
  if (start > end) {
    return results; // Return empty array
  }

  while (start <= end) {
    const quarterEnd = getQuarterEnd(start);

    // If the quarter ends before date1
    if (quarterEnd <= d1) {
      results.push(0);
    }
    // If date1 is within the quarter
    else if (d1 >= start && d1 <= quarterEnd) {
      const daysInQuarter =
        (quarterEnd.getTime() - start.getTime()) / (1000 * 60 * 60 * 24) + 1;
      const daysFromD1ToQuarterEnd =
        (quarterEnd.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24) + 1;
      results.push(1);
    }
    // If quarter ends before date2
    else if (quarterEnd <= d2 && d1 < start) {
      results.push(1);
    }
    // If date2 is within the quarter
    else if (d2 > start && d2 <= quarterEnd) {
      const daysInQuarter =
        (quarterEnd.getTime() - start.getTime()) / (1000 * 60 * 60 * 24) + 1;
      const daysFromStartToD2 =
        (d2.getTime() - start.getTime()) / (1000 * 60 * 60 * 24) + 1;
      results.push(1);
    }
    // If both dates are before the current quarter
    else {
      results.push(0);
    }

    // Move to the next quarter
    start.setUTCMonth(start.getUTCMonth() + 3);
  }

  return results;
}
// export function getFlagOfPeriod(
//   startDate: Date | string,
//   date1: Date | string,
//   date2: Date | string,
//   endDate: Date | string
// ): number[] {
//   const arr: number[] = [];

//   // Convert inputs to Date objects
//   startDate = new Date(startDate);
//   date1 = new Date(date1);
//   date2 = new Date(date2);
//   endDate = new Date(endDate);

//   // Ensure valid date conversion
//   const startParts = [
//     startDate.getUTCFullYear(),
//     startDate.getUTCMonth(),
//     startDate.getUTCDate(),
//   ] as [number, number, number];
//   const date1Parts = [
//     date1.getUTCFullYear(),
//     date1.getUTCMonth(),
//     date1.getUTCDate(),
//   ] as [number, number, number];
//   const date2Parts = [
//     date2.getUTCFullYear(),
//     date2.getUTCMonth(),
//     date2.getUTCDate(),
//   ] as [number, number, number];
//   const endParts = [
//     endDate.getUTCFullYear(),
//     endDate.getUTCMonth(),
//     endDate.getUTCDate(),
//   ] as [number, number, number];

//   while (startDate <= endDate) {
//     if (startDate >= date1 && startDate <= date2) {
//       arr.push(1);
//     } else {
//       arr.push(0);
//     }
//     startDate.setUTCMonth(startDate.getUTCMonth() + 3);
//   }

//   return arr;
// }
export function getQuarterEnd(date: Date): Date {
  const month = date.getUTCMonth();
  const year = date.getUTCFullYear();
  const quarterEndMonth = month + (3 - (month % 3));
  return new Date(Date.UTC(year, quarterEndMonth, 0)); // Last day of the quarter
}

// export function calcDaysInQuarter(
//   modelStartDate: string = "2023-01-01",
//   operationEndDate: string = "2070-07-01"
// ): number[] {
//   // Convert strings to Date objects in UTC
//   const modelStartParts = modelStartDate.split("-").map(Number);
//   const operationEndParts = operationEndDate.split("-").map(Number);

//   let modelStart: Date = new Date(
//     Date.UTC(modelStartParts[0], modelStartParts[1] - 1, modelStartParts[2])
//   );
//   let operationEnd: Date = new Date(
//     Date.UTC(
//       operationEndParts[0],
//       operationEndParts[1] - 1,
//       operationEndParts[2]
//     )
//   );

//   const daysInQuarters: number[] = [];

//   while (modelStart < operationEnd) {
//     const year: number = modelStart.getUTCFullYear();
//     const quarterStartMonth: number =
//       Math.floor(modelStart.getUTCMonth() / 3) * 3;
//     const quarterEndMonth: number = quarterStartMonth + 2; // Last month of the quarter (0-based)

//     let daysInQuarter: number = 0;

//     // Calculate days in the current quarter
//     for (let month = quarterStartMonth; month <= quarterEndMonth; month++) {
//       const startDay =
//         month === quarterStartMonth ? modelStart.getUTCDate() : 1;
//       const endDay = new Date(Date.UTC(year, month + 1, 0)).getUTCDate(); // Last day of the month

//       // Adjust the end day if it's the last month and within operation end date
//       const adjustedEndDay =
//         month === quarterEndMonth
//           ? Math.min(operationEnd.getUTCDate(), endDay)
//           : endDay;

//       // Count the days in the month
//       daysInQuarter += adjustedEndDay - startDay + 1;
//     }

//     // Adjust the first quarter if it starts on January 1st
//     if (quarterStartMonth === 0 && modelStart.getUTCDate() === 1) {
//       daysInQuarter += 1; // Correct for January 1st being counted
//     }

//     // Adjust the last quarter if it ends before December 31st
//     if (quarterEndMonth === 11 && operationEnd.getUTCDate() < 31) {
//       daysInQuarter += 1; // Correct for not counting the last day of December
//     }

//     daysInQuarters.push(daysInQuarter);

//     // Move to the next quarter
//     modelStart.setUTCMonth(quarterStartMonth + 3);
//     modelStart.setUTCDate(1); // Reset to the first day of the new month
//   }
//   return daysInQuarters;
// }
export function calcDaysInQuarter(
  modelStartDate: string = "2023-01-01",
  operationEndDate: string = "2070-07-01"
): number[] {
  // Parse the input dates as UTC
  const startDate = new Date(
    Date.UTC(
      parseInt(modelStartDate.slice(0, 4)), // Year
      parseInt(modelStartDate.slice(5, 7)) - 1, // Month (0-indexed)
      parseInt(modelStartDate.slice(8, 10)) // Day
    )
  );
  const endDate = new Date(
    Date.UTC(
      parseInt(operationEndDate.slice(0, 4)), // Year
      parseInt(operationEndDate.slice(5, 7)) - 1, // Month (0-indexed)
      parseInt(operationEndDate.slice(8, 10)) // Day
    )
  );

  if (startDate > endDate) {
    throw new Error(
      "modelStartDate must be before or equal to operationEndDate"
    );
  }

  const daysInQuarters: number[] = [];
  let currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    const year = currentDate.getUTCFullYear();
    const month = currentDate.getUTCMonth();
    const quarterStartMonth = Math.floor(month / 3) * 3; // Start month of the quarter (0-indexed)
    const quarterEndMonth = quarterStartMonth + 2; // End month of the quarter (0-indexed)

    // Calculate the start and end dates of the quarter in UTC
    const quarterStartDate = new Date(Date.UTC(year, quarterStartMonth, 1));
    const quarterEndDate = new Date(Date.UTC(year, quarterEndMonth + 1, 0)); // Last day of the quarter

    // Adjust the start and end dates based on the currentDate and endDate
    const start =
      currentDate > quarterStartDate ? currentDate : quarterStartDate;
    const end = endDate < quarterEndDate ? endDate : quarterEndDate;

    // Calculate the difference in days (UTC)
    const timeDiff = end.getTime() - start.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)) + 1;

    // Add the days to the result array
    daysInQuarters.push(daysDiff);

    // Move to the next quarter
    currentDate = new Date(Date.UTC(year, quarterEndMonth + 1, 1));
  }
  return daysInQuarters;
}
export function calcPeriod(): number {
  const period = getQuarterNumberFromModelStartDate() - 1;
  return period;
}

export function yearlyFlag(arr: number[], startDate: string): number[] {
  const startMonth = new Date(startDate).getMonth() + 1;
  const sumArr: number[] = [];
  let sum = 0;

  for (let i = 0; i < arr.length; i++) {
    if (i < 12 - startMonth) {
      sum += arr[i];
      if (i === 11 - startMonth) {
        if (sum > 0) sumArr.push(1);
        else sumArr.push(0);
        sum = 0;
      }
    } else {
      sum += arr[i];
      if ((i - (11 - startMonth)) % 12 === 0) {
        if (sum > 0) sumArr.push(1);
        else sumArr.push(0);
        sum = 0;
      } else if (i === arr.length - 1) {
        if (sum > 0) sumArr.push(1);
        else sumArr.push(0);
      }
    }
  }

  return sumArr;
}

export function normalizeArray(
  array: any[],
  length: number,
  defaultValue?: any
): any[] {
  const array_length = array.length;
  const d: any =
    defaultValue ||
    (array[array_length - 1] != 0
      ? array[array_length - 1]
      : array[array_length - 2]);

  for (let i = array_length; i < length; i++) {
    array.push(d);
  }

  array = array.slice(0, length);
  return array;
}
export function normalizeArrayBySeasonality(arr: any[], length: number): any[] {
  const arr_length = arr?.length;
  let resultArr: number[] = [];
  for (let i = 0; i < arr_length; i++) {
    resultArr[i] = arr[i];
  }
  for (let i = arr_length; i < length; i++) {
    resultArr.push(arr[i - 4]);
  }

  return resultArr;
}

export function roundArray(value: number[], numDigits: number): number[] {
  return value?.map((d) => parseFloat(d.toFixed(numDigits)));
}

export function arrayDivide(array1: number[], array2: number[]): number[] {
  return array1.map((d, index) => d / array2[index]);
}

export function roundNumber(value: number, numDigits: number): number {
  return parseFloat(value.toFixed(numDigits));
}

export function cumulativeMultiply(arr: number[]): number[] {
  const arrayLength = arr?.length;
  const value: number[] = [];

  value[0] = 1;
  for (let i = 1; i < arrayLength; i++) {
    value[i] = value[i - 1] * (1 + arr[i] / 100);
  }

  return value;
}

export function annualIndexToMonths(array: number[]): number[] {
  const len = array.length;
  const resultArray: number[] = [];

  for (let i = 0; i < len; i++) {
    for (let j = 0; j < 4; j++) {
      resultArray[i * 4 + j] = array[i];
    }
  }

  return resultArray;
}

export function addYears(dateString: string, years: number): string {
  const date: Date = new Date(dateString);
  date.setFullYear(date.getFullYear() + years);
  return date.toISOString().split("T")[0];
}

export function arraySum(array1: number[], array2: number[]): number[] {
  return array1.map((d, index) => d + array2[index]);
}
export function addZeros(array: number[], length: number): number[] {
  const array_length = array.length;
  const _d = 0;

  for (let i = array_length; i < length; i++) {
    array.push(_d);
  }

  array = array.slice(0, length);
  return array;
}

export function sumMonthlyValues(arr: number[], startDate: string): number[] {
  const startMonth = new Date(startDate).getMonth() + 1;
  const sumArr: number[] = [];
  let sum = 0;

  for (let i = 0; i < arr.length; i++) {
    if (i < 12 - startMonth) {
      sum += arr[i];
      if (i === 11 - startMonth) {
        sumArr.push(sum);
        sum = 0;
      }
    } else {
      sum += arr[i];
      if ((i - (11 - startMonth)) % 12 === 0) {
        sumArr.push(sum);
        sum = 0;
      } else if (i === arr.length - 1) {
        sumArr.push(sum);
      }
    }
  }

  return sumArr;
}

export function expandAndAverage(arr: number[], num: number): number[] {
  // Expand array with zeros
  for (let i = 0; i < num; i++) {
    arr.push(0);
  }
  // Create a new array for the averages
  const averages: number[] = [];
  // Calculate average for each element
  for (let i = 0; i < arr.length - num; i++) {
    let sum = 0;
    for (let j = i + 1; j <= i + num; j++) {
      sum += arr[j];
    }
    averages.push(sum / num);
  }
  return averages;
}

export function sumArrays(...arrays: any[][]): number[] {
  const length = arrays[0]?.length;
  const result: number[] = new Array(length).fill(0);

  for (const array of arrays) {
    for (let i = 0; i < length; i++) {
      result[i] += isNaN(array[i]) ? 0 : array[i];
    }
  }

  return result;
}

export function multiplyNumber(array: number[], num: number): number[] {
  const len = array?.length;
  const result = [];
  for (let i = 0; i < len; i++) result[i] = array[i] * num;
  return result;
}

export function nthLargest(
  arr: number[],
  n: number
): { index: number; value: number } {
  const indexedArr = arr.map((e, i) => ({ index: i, value: e }));
  indexedArr.sort((a, b) => b.value - a.value);
  return indexedArr[n - 1];
}

export function multiplyArrays(ararys: number[][]): number[] {
  const length = ararys[0].length;
  const result = new Array(length).fill(1);

  for (const array of ararys) {
    for (let i = 0; i < length; i++) {
      result[i] *= array[i];
    }
  }
  return result;
}

export function sumArray(arr: number[]): number {
  const len = arr.length;
  let sum = 0;
  for (let i = 0; i < len; i++) {
    sum += arr[i];
  }
  return sum;
}

export function expandAndSum(arr: number[], num: number): number[] {
  // Create a copy of the original array
  const arrCopy = [...arr];

  // Expand array with zeros
  for (let i = 0; i < num; i++) {
    arrCopy.push(0);
  }

  // Create a new array for the averages
  const sums = [];

  // Calculate average for each element
  for (let i = 0; i < arrCopy.length - num; i++) {
    let sum = 0;
    for (let j = i; j < i + num; j++) {
      sum += arrCopy[j];
    }
    sums.push(sum);
  }

  return sums;
}

export function minArray(arr: number[][]) {
  const result = [];
  for (let i = 0; i < arr[0]?.length; i++) {
    let min = arr[0][i];
    for (let j = 0; j < arr?.length; j++) {
      if (arr[j][i] < min) {
        min = arr[j][i];
      }
    }
    result.push(min);
  }
  return result;
}

export function sum(arr: number[]): number {
  const len = arr.length;
  let sum = 0;
  for (let i = 0; i < len; i++) {
    sum += arr[i];
  }
  return sum;
}

export function npv(rate: number, cashflows: number[]): number {
  let npv = 0;
  const len = cashflows.length;
  const real_rate = Math.pow(1 + rate, 1 / 4);
  for (let i = 0; i < len; i++) {
    npv += cashflows[i] / Math.pow(real_rate, i + 1);
  }
  return npv;
}

export function calcIRR(
  temp_npv: number,
  temp_discount_rate: number,
  cash_flow: number[]
): number {
  const inc = 0.25;
  const dec = -0.25;
  let count = 1;
  while (Math.abs(temp_npv) > 0.01) {
    if (temp_npv > 0) {
      temp_discount_rate = temp_discount_rate * (1 + inc / count);
    } else temp_discount_rate = temp_discount_rate * (1 + dec / count);

    temp_npv = npv(temp_discount_rate, cash_flow);
    count++;
  }

  const irr = temp_discount_rate;
  return irr;
}
export function calcXIRR(
  temp_npv: number,
  temp_discount_rate: number,
  cash_flow: number[],
  index: number
): number {
  const inc = 0.25;
  const dec = -0.25;
  let count = 1;
  while (Math.abs(temp_npv) > 1) {
    if (temp_npv > 0) {
      temp_discount_rate = temp_discount_rate * (1 + inc / 2);
    } else temp_discount_rate = temp_discount_rate * (1 + dec / 2);

    temp_npv = npv(temp_discount_rate, cash_flow.slice(0, index));
    // count++;
  }

  const irr = temp_discount_rate;
  return irr;
}

export function paybackPeriod(
  cashflow: number[],
  payback_start_date_month_number_from_valuation_date: number
): number {
  let sum = 0;
  let i = 0;
  while (i <= payback_start_date_month_number_from_valuation_date) {
    sum += cashflow[i];
    i++;
  }
  while (sum < 0) {
    sum += cashflow[i];
    i++;
  }

  const payback_period = (i + 1) / 12;
  return payback_period;
}

/*Calcs ~~~ 3.04 Live selection*/

export function getLiveDegradationPerCycle(
  initialCycleData = [
    {
      averageCyclesPerDay: 2.0,
      retentionRate: [
        92.22, 88.58, 85.59, 83.04, 80.74, 78.63, 76.66, 74.82, 73.08, 71.41,
        69.79, 68.23, 66.71, 65.19, 63.67, 62.15, 60.63, 59.11, 57.59, 56.07,
        54.55, 53.03, 51.51, 49.99, 48.47, 46.95, 45.43, 43.91, 42.39, 40.87,
        39.35, 37.83, 36.31, 34.79, 33.27, 31.75, 30.23, 28.71, 27.19, 25.67,
        24.15, 22.63, 21.11, 19.59, 18.07,
      ],
    },
    {
      averageCyclesPerDay: 1.5,
      retentionRate: [
        92.83, 89.56, 86.89, 84.61, 82.56, 80.68, 78.93, 77.29, 75.75, 74.27,
        72.83, 71.44, 70.09, 68.79, 67.52, 66.28, 65.08, 63.88, 62.68, 61.48,
        60.28, 59.08, 57.88, 56.68, 55.48, 54.28, 53.08, 51.88, 50.68, 49.48,
        48.28, 47.08, 45.88, 44.68, 43.48, 42.28, 41.08, 39.88, 38.68, 37.48,
        36.28, 35.08, 33.88, 32.68, 31.48,
      ],
    },
    {
      averageCyclesPerDay: 1.0,
      retentionRate: [
        93.46, 90.59, 88.25, 86.27, 84.49, 82.85, 81.34, 79.93, 78.6, 77.33,
        76.08, 74.88, 73.72, 72.6, 71.5, 70.44, 69.4, 68.38, 67.39, 66.41,
        65.43, 64.45, 63.47, 62.49, 61.51, 60.53, 59.55, 58.57, 57.59, 56.61,
        55.63, 54.65, 53.67, 52.69, 51.71, 50.73, 49.75, 48.77, 47.79, 46.81,
        45.83, 44.85, 43.87, 42.89, 41.91,
      ],
    },
  ],
  startingAssumptionsForBatteries = {
    degradationForecastAverageCyclesPerDay: 1.25,
    batteryAvailability: 97,
    batteryDuration: 4,
  }
) {
  /*liveCycle  ~~~  3.04 Degradation forecast selection*/

  const liveCycleData = [];
  const degradationPerCycleData = getDegradationPerCycle(initialCycleData);
  const years = degradationPerCycleData[0].degradationPerCycle.length;

  if (
    startingAssumptionsForBatteries.degradationForecastAverageCyclesPerDay >=
    degradationPerCycleData[1].averagePerCycle
  ) {
    const a =
      degradationPerCycleData[0].averagePerCycle -
      startingAssumptionsForBatteries.degradationForecastAverageCyclesPerDay;
    const b =
      startingAssumptionsForBatteries.degradationForecastAverageCyclesPerDay -
      degradationPerCycleData[1].averagePerCycle;

    for (let i = 0; i < years; i++) {
      for (let k = 0; k < 4; k++) {
        liveCycleData[i * 4 + k] =
          (b * degradationPerCycleData[0].degradationPerCycle[i] +
            a * degradationPerCycleData[1].degradationPerCycle[i]) /
          (a + b) /
          365 /
          100 /
          startingAssumptionsForBatteries.degradationForecastAverageCyclesPerDay;
      }
    }
  } else {
    const c =
      degradationPerCycleData[1].averagePerCycle -
      startingAssumptionsForBatteries.degradationForecastAverageCyclesPerDay;
    const d =
      startingAssumptionsForBatteries.degradationForecastAverageCyclesPerDay -
      degradationPerCycleData[2].averagePerCycle;
    for (let i = 0; i < years; i++) {
      for (let k = 0; k < 4; k++) {
        liveCycleData[i * 4 + k] =
          (d * degradationPerCycleData[1].degradationPerCycle[i] +
            c * degradationPerCycleData[2].degradationPerCycle[i]) /
          (c + d) /
          365 /
          100 /
          startingAssumptionsForBatteries.degradationForecastAverageCyclesPerDay;
      }
    }
  }
  /*liveCycleData  ~~~  3.04 Degradation per cycle*/

  return roundArray(liveCycleData, 20);
}

/*4Capex  ~~~  Battery Cubes Forecast*/
export function calcCapexForecast({
  capexForecastScenarioData = DEFAULT_CAPEX_FORECAST_SCENARIO_DATA,
  model = "Afry central",
  batteryDuration = 4,
  batteryCubes = {
    baseYear: 2023,
    data: [
      { duration: 2, value: 198.463 },
      { duration: 4, value: 396.925 },
    ],
    value: 0,
  },
  batteryExCubes = {
    baseYear: 2023,
    data: [
      { duration: 2, value: 41.572 },
      { duration: 4, value: 83.144 },
    ],
    value: 0,
  },
  inflationInputs = [
    {
      profile: "No inflation",
      rate: [
        0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
        0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
        0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
        0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
      ],
    },
    {
      profile: "RPI",
      rate: [
        4.0, 11.6, 10.0, 5.1, 2.6, 2.5, 2.8, 2.9, 2.9, 2.0, 2.0, 2.0, 2.0, 2.0,
        2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0,
        2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0,
        2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0,
      ],
    },
    {
      profile: "CPI",
      rate: [
        2.6, 9.1, 7.4, 3.6, 1.8, 1.4, 1.7, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0,
        2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0,
        2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0,
        2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0,
      ],
    },
    {
      profile: "Tees rent high case",
      rate: [
        5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0,
        5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0,
        5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0,
        5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0,
      ],
    },
    {
      profile: "FES to 2050 then nil",
      rate: [
        0.23, 2.58, 4.59, 2.85, 1.7, 1.51, 1.85, 1.99, 2.15, 2.19, 2.18, 2.18,
        2.18, 2.18, 2.18, 2.19, 2.19, 2.19, 2.19, 2.19, 2.19, 2.18, 2.18, 2.18,
        2.17, 2.17, 2.17, 2.17, 2.17, 2.17, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
        0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
        0.0,
      ],
    },
    {
      profile: "FES constant from 2050",
      rate: [
        0.23, 2.58, 4.59, 2.85, 1.7, 1.51, 1.85, 1.99, 2.15, 2.19, 2.18, 2.18,
        2.18, 2.18, 2.18, 2.19, 2.19, 2.19, 2.19, 2.19, 2.19, 2.18, 2.18, 2.18,
        2.17, 2.17, 2.17, 2.17, 2.17, 2.17, 2.17, 2.17, 2.17, 2.17, 2.17, 2.17,
        2.17, 2.17, 2.17, 2.17, 2.17, 2.17, 2.17, 2.17, 2.17, 2.17, 2.17, 2.17,
        2.17, 2.17, 2.17, 2.17,
      ],
    },
    {
      profile: "CPI to 2050 then nil",
      rate: [
        2.6, 9.1, 7.4, 3.6, 1.8, 1.4, 1.7, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0,
        2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0,
        2.0, 2.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
        0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
      ],
    },
    {
      profile: "CPI with 2% collar and 5% cap",
      rate: [
        2.6, 5.0, 5.0, 3.6, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0,
        2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0,
        2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0,
        2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0,
      ],
    },
    {
      profile: "spare",
      rate: [
        0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
        0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
        0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
        0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
      ],
    },
  ],
  bessCapexForecast = {
    inflationProfile: "No inflation",
    baseYear: 2023,
  },
  batterySensitivity = 0,
  operationYears = 40,
}: {
  capexForecastScenarioData?: ICapexForecastData[];
  model?: string;
  batteryDuration?: number;
  batteryCubes?: IBatteryCubes;
  batteryExCubes?: IBatteryExcubes;
  inflationInputs?: IInflationForm[];
  bessCapexForecast?: IBessCapexForecast;
  batterySensitivity?: number;
  operationYears?: number;
}) {
  const selectedData = capexForecastScenarioData.find((m) => m?.model == model);
  // if(mode == 'Live selection')
  //     return selectedData;
  // if(mode == 'Long-term profile - absolute'){
  //     // selectedData.map()
  //     return selectedData;
  // }

  const percentageData = {
    model: selectedData?.model as string,
    data: (
      selectedData?.data || [
        {
          duration: 2,
          data: new Array(300).fill(0),
        },
        {
          duration: 4,
          data: new Array(300).fill(0),
        },
        {
          duration: 8,
          data: new Array(300).fill(0),
        },
      ]
    ).map((d) => {
      return {
        duration: d.duration,
        data: d?.data.map((dd, index, arr) => {
          if (index == 0) return 0;
          if (dd == null || (index != 0 && arr[index - 1] == 0)) return 0;
          return parseFloat((dd / arr[index - 1]).toFixed(10));
        }),
      };
    }),
  };

  // const cubesBasePrice =
  //   batteryCubes.data.find((d) => d?.duration == batteryDuration)?.value || 0;
  const cubesBasePrice = batteryCubes.value;
  // const cubesExBasePrice =
  //   batteryExCubes.data.find((d) => d?.duration == batteryDuration)?.value || 0;
  const cubesExBasePrice = batteryExCubes.value;
  const indexValue = inflationIndex({
    inflationInputs,
    baseYear: bessCapexForecast.baseYear,
    profile: bessCapexForecast.inflationProfile,
  });

  const batteryCubesForecast = multiplyNumber(
    calcCumulativeMultiply(
      normalizeArray(
        percentageData.data.find((d) => d.duration == batteryDuration)?.data ||
          [],
        operationYears + 15
      ),
      batteryCubes.baseYear
    ),
    cubesBasePrice * batteryDuration
  ).map((d, index) => d * indexValue[index]);

  const batteryExCubesForecast = multiplyNumber(
    calcCumulativeMultiply(
      normalizeArray(
        percentageData.data.find((d) => d.duration == batteryDuration)?.data ||
          [],
        operationYears + 15
      ),
      batteryCubes.baseYear
    ),
    cubesExBasePrice * batteryDuration
  ).map((d, index) => d * indexValue[index]);

  const annualBatteriesCapexForecast = batteryCubesForecast.map((b, index) => {
    return (
      (b * 1 + 1 * batteryExCubesForecast[index]) *
      // normalizeArray(indexValue, operationYears + 10)[index] *
      (1 + batterySensitivity)
    );
  });

  return [
    roundArray(batteryCubesForecast.slice(MODEL_START_YEAR - 2021), 10) ||
      new Array(300).fill(0),
    roundArray(batteryExCubesForecast.slice(MODEL_START_YEAR - 2021), 10) ||
      new Array(300).fill(0),
    roundArray(
      annualBatteriesCapexForecast.slice(MODEL_START_YEAR - 2021),
      10
    ) || new Array(300).fill(0),
  ];
}

/**Calc 8 Cycles Cycles per month ~~~ Retrun the array of 540 elements*/

export function getCyclesPerMonth({
  revenueSetup = DEFAULT_REVENUE_SETUP,
  assumptionsData = DEFAULT_REVENUE_ASSUMPTIONS_DATA,
  startingAssumptionsForBatteries = DEFAULT_STARTING_BATTERY_ASSUMPTION,
  detailedRevenueData = DEFAULT_DETAILED_REVENUE_DATA,
  modelStartDate = "2023-01-01",
  operationStartDate = "2028-01-01",
  decommissioningStartDate = "2068-01-01",
  decommissioningEndDate = "2068-06-30",
  operationEndDate = "2067-12-31",
  afryRevenueData = DEFAULT_AFRY_REVENUE_DATA,
}: {
  revenueSetup?: IRevenueSetup;
  assumptionsData?: IAssumptionData[];
  startingAssumptionsForBatteries?: IStartingBatteryAssumptions;
  detailedRevenueData?: IDetailedRevenueData[];
  modelStartDate?: string;
  operationStartDate?: string;
  operationYears?: number;
  decommissioningStartDate?: string;
  decommissioningEndDate?: string;
  operationEndDate?: string;
  afryRevenueData?: IAfryRevenueData[];
}) {
  const period =
    getQuarterNumberFromModelStartDate(modelStartDate, decommissioningEndDate) -
    1;

  const numberOfDaysInQuarter = calcDaysInQuarter(
    modelStartDate,
    decommissioningEndDate
  );
  let cycles = new Array(period).fill(0);

  if (revenueSetup.forecastProviderChoice == "Modo")
    cycles =
      getActiveScenarioRevenueItems({
        revenueSetup,
        assumptionsData,
        startingAssumptionsForBatteries,
        detailedRevenueData,
      })?.find((d) => d?.item == "Avg. Cycles per day")?.data ||
      new Array(period).fill(0);
  else if (revenueSetup.forecastProviderChoice == "Afry") {
    cycles = afryRevenueData.find(
      (d) => d?.item == "Avg. Cycles per day"
    )?.data;
  }

  const cyclesPerDay = normalizeArrayBySeasonality(
    multiplyNumber(cycles, 1),
    period
  );
  const operationsAsAPercentOfPeriod = getAsAPercentOfPeriod(
    modelStartDate,
    operationStartDate,
    moment(decommissioningStartDate).add(-1, "days").format(DATE_FORMAT),
    decommissioningEndDate
  );

  // cyclesInPeriod is the result of calcs ~~ 6.02 Cycles per quarter ~~ Cycles in period
  const cyclesInPeriod = numberOfDaysInQuarter.map(
    (d, index) => d * cyclesPerDay[index] * operationsAsAPercentOfPeriod[index]
  );

  return cyclesInPeriod;
}
/*15 Inflation   ~~~ 15.02 2021 real terms*/

export function getInflationIndex({
  inflationInputs = DEFAULT_INFLATION_INPUTS,
}: {
  inflationInputs?: IInflationForm[];
}) {
  const inflationIndex = inflationInputs.map((d) => {
    return {
      profile: d.profile,
      rate: roundArray(cumulativeMultiply(d.rate), 10),
    };
  });
  return inflationIndex;
}

/*Calculating inflation index under the given base year and profile*/

export function inflationIndex({
  inflationInputs = [
    {
      profile: "No inflation",
      rate: [
        0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
        0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
        0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
        0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
      ],
    },
    {
      profile: "RPI",
      rate: [
        4.0, 11.6, 10.0, 5.1, 2.6, 2.5, 2.8, 2.9, 2.9, 2.0, 2.0, 2.0, 2.0, 2.0,
        2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0,
        2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0,
        2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0,
      ],
    },
    {
      profile: "CPI",
      rate: [
        2.6, 9.1, 7.4, 3.6, 1.8, 1.4, 1.7, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0,
        2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0,
        2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0,
        2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0,
      ],
    },
    {
      profile: "Tees rent high case",
      rate: [
        5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0,
        5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0,
        5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0,
        5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0,
      ],
    },
    {
      profile: "FES to 2050 then nil",
      rate: [
        0.23, 2.58, 4.59, 2.85, 1.7, 1.51, 1.85, 1.99, 2.15, 2.19, 2.18, 2.18,
        2.18, 2.18, 2.18, 2.19, 2.19, 2.19, 2.19, 2.19, 2.19, 2.18, 2.18, 2.18,
        2.17, 2.17, 2.17, 2.17, 2.17, 2.17, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
        0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
        0.0,
      ],
    },
    {
      profile: "FES constant from 2050",
      rate: [
        0.23, 2.58, 4.59, 2.85, 1.7, 1.51, 1.85, 1.99, 2.15, 2.19, 2.18, 2.18,
        2.18, 2.18, 2.18, 2.19, 2.19, 2.19, 2.19, 2.19, 2.19, 2.18, 2.18, 2.18,
        2.17, 2.17, 2.17, 2.17, 2.17, 2.17, 2.17, 2.17, 2.17, 2.17, 2.17, 2.17,
        2.17, 2.17, 2.17, 2.17, 2.17, 2.17, 2.17, 2.17, 2.17, 2.17, 2.17, 2.17,
        2.17, 2.17, 2.17, 2.17,
      ],
    },
    {
      profile: "CPI to 2050 then nil",
      rate: [
        2.6, 9.1, 7.4, 3.6, 1.8, 1.4, 1.7, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0,
        2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0,
        2.0, 2.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
        0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
      ],
    },
    {
      profile: "CPI with 2% collar and 5% cap",
      rate: [
        2.6, 5.0, 5.0, 3.6, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0,
        2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0,
        2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0,
        2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0,
      ],
    },
    {
      profile: "spare",
      rate: [
        0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
        0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
        0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
        0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
      ],
    },
  ],
  baseYear = 2023,
  profile = "CPI to 2050 then nil",
}: {
  inflationInputs?: IInflationForm[];
  baseYear?: number;
  profile?: string;
}) {
  if (profile != "") {
    const matchData =
      getInflationIndex({ inflationInputs }).find((d) => d?.profile == profile)
        ?.rate || [];
    let baseValue = matchData[baseYear - INFLATION_START_YEAR];
    if (baseValue == 0) baseValue = 1;
    return matchData.map((m) => m / baseValue);
  } else return new Array(250).fill(0);
}

/*calcs 3.03 Degradaion per cycle*/
export function getDegradationPerCycle(
  initialCycleData = [
    {
      averageCyclesPerDay: 2.0,
      retentionRate: [
        92.22, 88.58, 85.59, 83.04, 80.74, 78.63, 76.66, 74.82, 73.08, 71.41,
        69.79, 68.23, 66.71, 65.19, 63.67, 62.15, 60.63, 59.11, 57.59, 56.07,
        54.55, 53.03, 51.51, 49.99, 48.47, 46.95, 45.43, 43.91, 42.39, 40.87,
        39.35, 37.83, 36.31, 34.79, 33.27, 31.75, 30.23, 28.71, 27.19, 25.67,
        24.15, 22.63, 21.11, 19.59, 18.07,
      ],
    },
    {
      averageCyclesPerDay: 1.5,
      retentionRate: [
        92.83, 89.56, 86.89, 84.61, 82.56, 80.68, 78.93, 77.29, 75.75, 74.27,
        72.83, 71.44, 70.09, 68.79, 67.52, 66.28, 65.08, 63.88, 62.68, 61.48,
        60.28, 59.08, 57.88, 56.68, 55.48, 54.28, 53.08, 51.88, 50.68, 49.48,
        48.28, 47.08, 45.88, 44.68, 43.48, 42.28, 41.08, 39.88, 38.68, 37.48,
        36.28, 35.08, 33.88, 32.68, 31.48,
      ],
    },
    {
      averageCyclesPerDay: 1.0,
      retentionRate: [
        93.46, 90.59, 88.25, 86.27, 84.49, 82.85, 81.34, 79.93, 78.6, 77.33,
        76.08, 74.88, 73.72, 72.6, 71.5, 70.44, 69.4, 68.38, 67.39, 66.41,
        65.43, 64.45, 63.47, 62.49, 61.51, 60.53, 59.55, 58.57, 57.59, 56.61,
        55.63, 54.65, 53.67, 52.69, 51.71, 50.73, 49.75, 48.77, 47.79, 46.81,
        45.83, 44.85, 43.87, 42.89, 41.91,
      ],
    },
  ]
) {
  /*initialCycleData  ~~~  calcs 3.01 Degradaion input curves*/
  const ceilingCycle = initialCycleData[0].averageCyclesPerDay;
  const middleCycle = initialCycleData[1].averageCyclesPerDay;
  const floorCycle = initialCycleData[2].averageCyclesPerDay;

  const ceilingRetentionRate = initialCycleData[0].retentionRate;
  const middleRetentionRate = initialCycleData[1].retentionRate;
  const floorRetentionRate = initialCycleData[2].retentionRate;

  const ceilingDegradationPerCycle = [];
  const middleDegradationPerCycle = [];
  const floorDegradationPerCycle = [];
  const years = ceilingRetentionRate.length;

  for (let i = 0; i < years; i++) {
    if (i == 0) {
      ceilingDegradationPerCycle[i] = 100 - ceilingRetentionRate[i];

      middleDegradationPerCycle[i] = 100 - middleRetentionRate[i];
      floorDegradationPerCycle[i] = 100 - floorRetentionRate[i];
    } else {
      ceilingDegradationPerCycle[i] =
        ceilingRetentionRate[i - 1] - ceilingRetentionRate[i];

      middleDegradationPerCycle[i] =
        middleRetentionRate[i - 1] - middleRetentionRate[i];
      floorDegradationPerCycle[i] =
        floorRetentionRate[i - 1] - floorRetentionRate[i];
    }
  }

  // const degradationPerCycleData = [
  // 	{
  // 		averagePerCycle: ceilingCycle,
  // 		degradationPerCycle: ceilingDegradationPerCycle,
  // 	},
  // 	{
  // 		averagePerCycle: middleCycle,
  // 		degradationPerCycle: middleDegradationPerCycle,
  // 	},
  // 	{
  // 		averagePerCycle: floorCycle,
  // 		degradationPerCycle: floorDegradationPerCycle,
  // 	},
  // ];
  const degradationPerCycleData = [
    {
      averagePerCycle: ceilingCycle,
      degradationPerCycle: ceilingDegradationPerCycle,
    },
    {
      averagePerCycle: middleCycle,
      degradationPerCycle: middleDegradationPerCycle,
    },
    {
      averagePerCycle: floorCycle,
      degradationPerCycle: floorDegradationPerCycle,
    },
  ];

  return degradationPerCycleData;
}

export function calcVintages({
  revenueSetup = DEFAULT_REVENUE_SETUP,
  assumptionsData = DEFAULT_REVENUE_ASSUMPTIONS_DATA,
  detailedRevenueData = DEFAULT_DETAILED_REVENUE_DATA,
  initialCycleData = DEFAULT_INITIAL_CYCLE_DATA,
  initialCapacity = 1000,
  startingAssumptionsForBatteries = DEFAULT_STARTING_BATTERY_ASSUMPTION,
  batteryDisposals = DEFAULT_BATTERY_DISPOSAL,
  batteryEfficiency = DEFAULT_BATTERY_EFFICIENCY,
  batteryAugmentation = DEFAULT_BATTERY_AUGMENTATION,
  model = "Conservative",
  batteryDuration = 4,
  batteryCubes = DEFAULT_BATTERY_CUBES,
  batteryExCubes = DEFAULT_BATTERY_EXCUBES,
  inflationInputs = DEFAULT_INFLATION_INPUTS,
  capexPaymentsProfile = DEFAULT_CAPEX_PAYMENTS_PROFILE,
  capexPaymentMilestones = DEFAULT_CAPEX_PAYMENT_MILESTONES,
  capexUEL = DEFAULT_CAPEX_UEL,
  bessCapexForecast = DEFAULT_BESS_CAPEX_FORECAST,
  batterySensitivity = 0,
  operationYears = 40,
  modelStartDate = "2023-01-01",
  operationStartDate = "2028-01-01",
  decommissioningEndDate = "2068-06-30",
  decommissioningStartDate = "2068-01-01",
  capexForecastScenarioData = DEFAULT_CAPEX_FORECAST_SCENARIO_DATA,
  afryRevenueData = DEFAULT_AFRY_REVENUE_DATA,
  bopCapexPercentage = 0.05,
}: {
  revenueSetup?: IRevenueSetup;
  assumptionsData?: IAssumptionData[];
  detailedRevenueData?: IDetailedRevenueData[];
  initialCycleData?: ICycleData[];
  initialCapacity?: number;
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
  operationYears?: number;
  modelStartDate?: string;
  operationStartDate?: string;
  decommissioningEndDate?: string;
  decommissioningStartDate?: string;
  capexForecastScenarioData?: ICapexForecastData[];
  afryRevenueData?: IAfryRevenueData[];
  bopCapexPercentage?: number;
}) {
  const period =
    getQuarterNumberFromModelStartDate(modelStartDate, decommissioningEndDate) -
      1 || 190;

  const diposalMonth =
    getQuarterNumberFromModelStartDate(
      modelStartDate,
      decommissioningStartDate
    ) - 1;

  /** Creation of Vintage array composed of empty objects */
  const vintages = [];
  for (let i = 0; i < 40; i++)
    vintages.push({
      name: `Vintage${i + 1}`,
      data: {
        stagingMonthNumber: 0,
        stagingFlag: "",
        additionsCost: 0.0,
        paymentMilestones: new Array(period).fill(0),
        forecastAdditionsByMilestones: new Array(period).fill(0),
        grossCashPayments: "",
        forecastDepreciationChargeByPeriod: new Array(period).fill(0),
        startBalance: new Array(period).fill(0),
        endBalance: new Array(period).fill(0),
        disposalMonthNumber: 0,
        disposalFlag: 0,
        capacityPreAdjustmentForEfficiency: 0,
        capacityAddedAdjustedForEfficiency: 0.0,
        capacityPostEfficiencyAndDegradation: "",
        cumulativeDegradation: 0,
        degradationInPeriod: "",
        generationCapacityInPeriod: new Array(period).fill(0),
        forecastCapexPrice: "",
        forecastCapexAdditions: "",
      },
    });
  /**Degradation by Vintage: Calculation of 7.03 Technical specifications of Calcs Sheet*/
  const degradationPerCycle = getLiveDegradationPerCycle(
    initialCycleData,
    startingAssumptionsForBatteries
  );
  /**cyclesPerPeriod: Calculation of 7.04 Cycles per Period of Calcs Sheet  */
  const cyclesPerPeriod = getCyclesPerMonth({
    revenueSetup,
    assumptionsData,
    startingAssumptionsForBatteries,
    detailedRevenueData,
    modelStartDate,
    operationStartDate,
    decommissioningStartDate,
    decommissioningEndDate,
    afryRevenueData,
  });
  const operationStartQuarter =
    (getQuarterNumberFromModelStartDate(modelStartDate, operationStartDate) -
      1) %
    4;
  // capexForecast is the annual forecast price of the batteries.
  const capexForecast = annualIndexToMonths(
    calcCapexForecast({
      capexForecastScenarioData,
      model,
      batteryDuration,
      batteryCubes,
      batteryExCubes,
      inflationInputs,
      bessCapexForecast,
      batterySensitivity,
      operationYears,
    })[2]
  );
  // bessPaymentProfile is the batteries payment profile
  const bessPaymentProfileByMonth =
    capexPaymentMilestones.find(
      (d) =>
        d.profileName ==
        capexPaymentsProfile.find((d) => d?.capexObject == "Batteries")
          ?.paymentProfile
    )?.timing || new Array(period).fill(0);

  let bessPaymentProfile: number[] = new Array(11).fill(0);
  bessPaymentProfile[0] =
    (bessPaymentProfileByMonth[0] || 0) * 1 +
    (bessPaymentProfileByMonth[1] || 0) * 1;
  for (let i = 1; i < 10; i++) {
    bessPaymentProfile[i] =
      1 * (bessPaymentProfileByMonth[i * 3 - 1] || 0) +
      1 * (bessPaymentProfileByMonth[i * 3] || 0) +
      1 * (bessPaymentProfileByMonth[i * 3 + 1] || 0);
  }
  bessPaymentProfile[10] = bessPaymentProfileByMonth[29] || 0;

  const paymentProfileLength = bessPaymentProfile?.length || 0;
  const batteriesUEL =
    capexUEL.find((d) => d.capexObject == "Batteries")?.usefulEconomicLife ||
    1.0;

  vintages[0].data.stagingMonthNumber =
    getQuarterNumberFromModelStartDate(modelStartDate, operationStartDate) - 1;
  vintages[0].data.capacityPreAdjustmentForEfficiency = initialCapacity;
  let realBatteryEfficiency: number[];
  if (batteryEfficiency.efficiencySwitch == 0)
    realBatteryEfficiency = new Array(period).fill(
      batteryEfficiency?.fixedEfficiency || 0
    );
  else
    realBatteryEfficiency = annualIndexToMonths(
      batteryEfficiency?.forecastEfficiency
    );
  vintages[0].data.capacityAddedAdjustedForEfficiency =
    realBatteryEfficiency[0] == 0
      ? 0
      : parseFloat(
          (
            (vintages[0].data.capacityPreAdjustmentForEfficiency * 100) /
            realBatteryEfficiency[0]
          ).toFixed(20)
        );
  vintages[0].data.additionsCost =
    capexForecast[vintages[0].data.stagingMonthNumber - 1] *
    vintages[0].data.capacityAddedAdjustedForEfficiency;

  let totalGenerationCapacity: number[] = new Array(period).fill(0);
  const decommissioningStartMonthNumber =
    getQuarterNumberFromModelStartDate(
      modelStartDate,
      decommissioningStartDate
    ) - 1;

  for (let j = 0; j < period; j++) {
    totalGenerationCapacity[j] = 0;
  }

  for (let k = 0; k < 40; k++) {
    const degradationValue = new Array(period).fill(0);
    const generationCapacity = new Array(period).fill(0);
    let cumulativeDegradationValue = 0;
    const paymentSchedule = new Array(period).fill(0);

    for (let i = 0; i < period; i++) {
      // calculation of additions of batteries monthly per vintage based on payments milestones.
      if (
        i >= vintages[k].data.stagingMonthNumber - paymentProfileLength &&
        i < vintages[k].data.stagingMonthNumber
      ) {
        paymentSchedule[i] =
          bessPaymentProfile[
            i + paymentProfileLength - vintages[k].data.stagingMonthNumber
          ];
      } else {
        paymentSchedule[i] = 0;
      }

      vintages[k].data.forecastAdditionsByMilestones[i] = roundNumber(
        (paymentSchedule[i] / 100) * vintages[k].data.additionsCost,
        20
      );

      // calculation of degradation, generation capacity of batteries.
      if (
        vintages[k].data.stagingMonthNumber - 1 > i ||
        vintages[k].data.disposalFlag == 1 ||
        i >= diposalMonth - 1
      ) {
        degradationValue[i] = 0;
        generationCapacity[i] = 0;
        cumulativeDegradationValue =
          cumulativeDegradationValue + degradationValue[i];
      } else {
        if (i >= diposalMonth - 1) {
          degradationValue[i] = 0;
        } else {
          degradationValue[i] =
            degradationPerCycle[i - vintages[k].data.stagingMonthNumber + 1] *
            cyclesPerPeriod[i];
        }
        cumulativeDegradationValue =
          cumulativeDegradationValue + degradationValue[i];

        if (
          cumulativeDegradationValue >=
            (100 - batteryDisposals.disposedRetentionRate) / 100 &&
          i % 4 == (operationStartQuarter + 2) % 4
        ) {
          if (
            i <=
            vintages[0].data.stagingMonthNumber +
              (operationYears -
                batteryAugmentation.batteryAugmentationStopYear -
                1) *
                4 +
              ((operationStartQuarter + 2) % 4)
          ) {
            vintages[k].data.disposalMonthNumber = i + 2;
            vintages[k].data.disposalFlag = 1;
          } else
            vintages[k].data.disposalMonthNumber =
              decommissioningStartMonthNumber;
          // vintages[k].data.cumulativeDegradation = 0;
        } else if (
          cumulativeDegradationValue <
            100 - batteryDisposals.disposedRetentionRate &&
          i >=
            vintages[0].data.stagingMonthNumber +
              (operationYears -
                batteryAugmentation.batteryAugmentationStopYear -
                1) *
                4
        ) {
          vintages[k].data.disposalMonthNumber =
            decommissioningStartMonthNumber;
        }
        generationCapacity[i] = parseFloat(
          (
            vintages[k].data.capacityPreAdjustmentForEfficiency *
            (1 - cumulativeDegradationValue)
          ).toFixed(10)
        );
      }
    }
    const monthlyDepreciationAmount =
      vintages[k].data.additionsCost / (4 * batteriesUEL);
    // calculation of depreciation monthly per vintage
    for (let j = 0; j < period; j++) {
      if (
        j >= vintages[k].data.stagingMonthNumber - 1 &&
        j < vintages[k].data.disposalMonthNumber - 1 &&
        j < vintages[k].data.stagingMonthNumber + 4 * batteriesUEL - 1
      ) {
        vintages[k].data.forecastDepreciationChargeByPeriod[j] =
          monthlyDepreciationAmount;
      } else vintages[k].data.forecastDepreciationChargeByPeriod[j] = 0;
      // calculation of ending balance of batteries.
      vintages[k].data.endBalance[j] =
        vintages[k].data.startBalance[j] +
        vintages[k].data.forecastAdditionsByMilestones[j] -
        vintages[k].data.forecastDepreciationChargeByPeriod[j];
      if (j < period - 1)
        vintages[k].data.startBalance[j + 1] = vintages[k].data.endBalance[j];
    }

    vintages[k].data.cumulativeDegradation = cumulativeDegradationValue;
    vintages[k].data.generationCapacityInPeriod = generationCapacity;
    totalGenerationCapacity = vintages[k].data.generationCapacityInPeriod.map(
      (d, index) => d + totalGenerationCapacity[index]
    );

    // vintages[k].data.additionsCost =
    //   capexForecast[vintages[k].data.stagingMonthNumber - 1] *
    //   vintages[k].data.capacityAddedAdjustedForEfficiency;
    vintages[k].data.paymentMilestones = paymentSchedule;

    if (
      vintages[k].data.stagingMonthNumber -
        vintages[0].data.stagingMonthNumber +
        operationStartQuarter >
      4 * (operationYears - batteryAugmentation.batteryAugmentationStopYear - 1)
    )
      break;
    if (k < 39) {
      vintages[k + 1].data.stagingMonthNumber =
        vintages[k].data.stagingMonthNumber + 4;
      vintages[k + 1].data.capacityPreAdjustmentForEfficiency = roundNumber(
        initialCapacity -
          totalGenerationCapacity[vintages[k + 1].data.stagingMonthNumber - 1],
        20
      );
      vintages[k + 1].data.capacityAddedAdjustedForEfficiency =
        realBatteryEfficiency[vintages[k + 1].data.stagingMonthNumber - 1] == 0
          ? 0
          : parseFloat(
              (
                (vintages[k + 1].data.capacityPreAdjustmentForEfficiency *
                  100) /
                realBatteryEfficiency[
                  vintages[k + 1].data.stagingMonthNumber - 1
                ]
              ).toFixed(20)
            );
      vintages[k + 1].data.additionsCost =
        capexForecast[vintages[k + 1].data.stagingMonthNumber - 1] *
        vintages[k + 1].data.capacityAddedAdjustedForEfficiency *
        (k ==
        (vintages[0].data.disposalMonthNumber -
          vintages[0].data.stagingMonthNumber -
          4) /
          4
          ? 1
          : 1 + bopCapexPercentage);
    }
  }

  const electricity_sold = multiplyNumber(
    multiplyArrays([totalGenerationCapacity, cyclesPerPeriod]),
    (batteryDuration * startingAssumptionsForBatteries.batteryAvailability) /
      100
  );

  const totalMWGenerated = multiplyNumber(electricity_sold, batteryDuration);
  return {
    electricitySold: electricity_sold,
    vintages: vintages,
    totalGenerationCapacity: totalGenerationCapacity,
    totalMWGenerated: totalMWGenerated,
  };
}

export function preProcessArray4Graph(arr: number[] | string[]) {
  return arr.map((a) =>
    Number.isNaN(a)
      ? 0
      : typeof a == "number"
      ? a.toFixed(2)
      : parseFloat(a).toFixed(2)
  );
}

export const getFilterData = (
  data: number[],
  modelStartDate: string,
  active: string,
  dateRange: { from: string; to: string }
) => {
  if (!Array.isArray(data)) return [];
  const _sIndex = Math.max(
    moment(dateRange.from).diff(moment(modelStartDate), "quarter"),
    0
  );
  const _lIndex = Math.min(
    data.length,
    moment(dateRange.to).diff(moment(modelStartDate), "quarter") + 1
  );
  if (active == "quarterly") {
    return roundArray(data.slice(_sIndex, _lIndex), 10);
  }
  if (active == "semi_annually") {
    const _mFrom = moment(dateRange.from).get("month");
    const _stIndex = Math.max(
      moment(dateRange.from)
        .set("quarter", _mFrom < 6 ? 2 : 4)
        .endOf("quarter")
        .diff(modelStartDate, "quarter"),
      _sIndex
    );
    const rlt = [];
    let tmp = 0;
    for (let i = _sIndex; i < _lIndex; i++) {
      tmp += data[i] * 1;
      if ((i - _stIndex) % 2 == 0 && i < _lIndex - 1) {
        rlt.push(tmp);
        tmp = 0;
      }
    }
    rlt.push(tmp);
    return roundArray(rlt, 10);
  }
  const _stIndex = Math.max(
    moment(dateRange.from)
      .set("quarter", 4)
      .endOf("quarter")
      .diff(modelStartDate, "month"),
    _sIndex
  );
  const rlt = [];
  let tmp = 0;
  for (let i = _sIndex; i < _lIndex; i++) {
    tmp += data[i] * 1;
    if ((i - _stIndex) % 4 == 0 && i < _lIndex - 1) {
      rlt.push(tmp);
      tmp = 0;
    }
  }
  rlt.push(tmp);
  return roundArray(rlt, 20);
};

export const getHeaders = (
  modelStartDate: string,
  active: string,
  dateRange: { from: string; to: string },
  hasTotal: string,
  formater = "DD-MMM-YY"
) => {
  const _sIndex = Math.max(
    moment(dateRange.from).diff(moment(modelStartDate), "quarter"),
    0
  );
  const _lIndex =
    moment(dateRange.to).diff(moment(modelStartDate), "quarter") + 1;
  const result = [];
  const _mFrom = moment(dateRange.from).month();
  const _mSYear = moment(dateRange.from).year();
  const _mLYear = moment(dateRange.to).year();
  const _mTo = moment(dateRange.to).month();
  if (active === "quarterly") {
    if (hasTotal == "true") result.push(["", "", ""]);

    result.push(["Period", "Start date", "End date"]);
    for (let i = _sIndex; i < _lIndex; i++) {
      result.push([
        i + 1,
        moment(modelStartDate)
          .add(i, "quarter")
          .startOf("month")
          .format(formater),
        moment(modelStartDate)
          .add(i, "quarter")
          .endOf("quarter")
          .format(formater),
      ]);
    }
  } else if (active === "semi_annually") {
    if (hasTotal == "true") result.push(["", "", ""]);

    result.push(["Period", "Start date", "End date"]);
    const _sIndex = Math.max(
      moment(dateRange.from).diff(moment(modelStartDate), "quarter"),
      0
    );
    let ii = (_sIndex - (_sIndex % 2)) / 2 + 1;

    if (_mSYear == _mLYear) {
      if (_mTo < 6) {
        result.push([
          ii++,
          moment(dateRange.from)
            .set("quarter", 1)
            .startOf("quarter")
            .format(formater),
          _mTo < 3
            ? moment(dateRange.from)
                .set("quarter", 1)
                .endOf("quarter")
                .format(formater)
            : moment(dateRange.from)
                .set("quarter", 2)
                .endOf("quarter")
                .format(formater),
        ]);
      } else if (_mFrom > 5) {
        {
          result.push([
            ii++,
            moment(dateRange.from)
              .set("quarter", 3)
              .startOf("quarter")
              .format(formater),
            _mTo > 8
              ? moment(dateRange.from)
                  .set("quarter", 4)
                  .endOf("quarter")
                  .format(formater)
              : moment(dateRange.from)
                  .set("quarter", 3)
                  .endOf("quarter")
                  .format(formater),
          ]);
          // if (_mTo > 8)
          //   result.push([
          //     ii++,
          //     moment(dateRange.from)
          //       .set("quarter", 3)
          //       .startOf("quarter")
          //       .format(formater),
          //     _mTo > 8
          //       ? moment(dateRange.from)
          //           .set("quarter", 4)
          //           .endOf("quarter")
          //           .format(formater)
          //       : moment(dateRange.from)
          //           .set("quarter", 3)
          //           .endOf("quarter")
          //           .format(formater),
          //   ]);
        }
      } else {
        result.push([
          ii++,
          _mFrom > 2
            ? moment(dateRange.from)
                .set("quarter", 2)
                .startOf("quarter")
                .format(formater)
            : moment(dateRange.from)
                .set("quarter", 1)
                .startOf("quarter")
                .format(formater),
          moment(dateRange.from)
            .set("quarter", 2)
            .endOf("quarter")
            .format(formater),
        ]);
        result.push([
          ii++,
          moment(dateRange.from)
            .set("quarter", 3)
            .startOf("quarter")
            .format(formater),
          _mTo > 8
            ? moment(dateRange.from)
                .set("quarter", 4)
                .endOf("quarter")
                .format(formater)
            : moment(dateRange.from)
                .set("quarter", 3)
                .endOf("quarter")
                .format(formater),
        ]);
      }
    } else if (_mSYear < _mLYear) {
      // first two quarters
      if (_mFrom < 6)
        result.push([
          ii++,
          moment(dateRange.from)
            .set("quarter", 1)
            .startOf("quarter")
            .format(formater),
          moment(dateRange.from)
            .set("quarter", 2)
            .endOf("quarter")
            .format(formater),
        ]);
      // second two quarters
      result.push([
        ii++,
        moment(dateRange.from)
          .set("quarter", 3)
          .startOf("quarter")
          .format(formater),
        moment(dateRange.from)
          .set("quarter", 4)
          .endOf("quarter")
          .format(formater),
      ]);
      for (let i = _mSYear + 1; i < _mLYear; i++) {
        result.push([
          ii++,
          moment(dateRange.from)
            .add(i - _mSYear, "year")
            .set("quarter", 1)
            .startOf("quarter")
            .format(formater),
          moment(dateRange.from)
            .add(i - _mSYear, "year")
            .set("quarter", 2)
            .endOf("quarter")
            .format(formater),
        ]);
        result.push([
          ii++,
          moment(dateRange.from)
            .add(i - _mSYear, "year")
            .set("quarter", 3)
            .startOf("quarter")
            .format(formater),
          moment(dateRange.from)
            .add(i - _mSYear, "year")
            .set("quarter", 4)
            .endOf("quarter")
            .format(formater),
        ]);
      }
      // last year first two quarters

      result.push([
        ii++,
        moment(dateRange.to)
          .set("quarter", 1)
          .startOf("quarter")
          .format(formater),
        moment(dateRange.to)
          .set("quarter", 2)
          .endOf("quarter")
          .format(formater),
      ]);
      if (_mTo > 5)
        result.push([
          ii++,
          moment(dateRange.to)
            .set("quarter", 3)
            .startOf("quarter")
            .format(formater),

          moment(dateRange.to)
            .set("quarter", 4)
            .endOf("quarter")
            .format(formater),
        ]);
    }
    // First half of the year
    // result.push([
    //   ii++,
    //   moment(dateRange.from).startOf("month").format(formater),
    //   moment(dateRange.from)
    //     .set("quarter", _mFrom < 6 ? 2 : 4)
    //     .endOf("quarter")
    //     .format(formater),
    // ]);

    // Second half of the year
    // if (_mFrom > 5 && _mSYear == _mLYear) {
    //   result.push([
    //     ii++,
    //     moment(dateRange.from)
    //       .set("quarter", 3)
    //       .startOf("quarter")
    //       .format(formater),
    //     moment(dateRange.to).endOf("month").format(formater),
    //   ]);
    // }
    // if (_mFrom < 6 && _mSYear < _mLYear) {
    //   result.push([
    //     ii++,
    //     moment(dateRange.from)
    //       .set("quarter", 3)
    //       .startOf("quarter")
    //       .format(formater),
    //     moment(dateRange.from)
    //       .set("quarter", _mFrom < 6 ? 4 : 2)
    //       .endOf("quarter")
    //       .format(formater),
    //   ]);
    // }

    // // Loop through the years
    // for (let i = _mSYear + 1; i < _mLYear; i++) {
    //   result.push([
    //     ii++,
    //     moment(dateRange.from)
    //       .add(i - _mSYear, "year")
    //       .set("quarter", 1)
    //       .startOf("quarter")
    //       .format(formater),
    //     moment(dateRange.from)
    //       .add(i - _mSYear, "year")
    //       .set("quarter", 2)
    //       .endOf("quarter")
    //       .format(formater),
    //   ]);
    //   result.push([
    //     ii++,
    //     moment(dateRange.from)
    //       .add(i - _mSYear, "year")
    //       .set("quarter", 3)
    //       .startOf("quarter")
    //       .format(formater),
    //     moment(dateRange.from)
    //       .add(i - _mSYear, "year")
    //       .set("quarter", 4)
    //       .endOf("quarter")
    //       .format(formater),
    //   ]);
    // }

    // // Last year handling
    // if (_mTo > 5 && _mSYear < _mLYear) {
    //   result.push([
    //     ii++,
    //     moment(dateRange.to)
    //       .set("quarter", 1)
    //       .startOf("quarter")
    //       .format(formater),
    //     moment(dateRange.to)
    //       .set("quarter", 2)
    //       .endOf("quarter")
    //       .format(formater),
    //   ]);
    // }
    // if (_mSYear < _mLYear)
    //   result.push([
    //     ii++,
    //     moment(dateRange.to)
    //       .set("quarter", _mTo > 5 ? 3 : 1)
    //       .startOf("quarter")
    //       .format(formater),
    //     moment(dateRange.to).endOf("month").format(formater),
    //   ]);
  } else if (active === "annualy") {
    if (hasTotal == "true") result.push(["", "", ""]);

    result.push(["Period", "Start date", "End date"]);
    const _sIndex = Math.max(
      moment(dateRange.from).diff(moment(modelStartDate), "quarter"),
      0
    );
    let ii = (_sIndex - (_sIndex % 4)) / 4 + 1;

    // if (_mSYear == _mLYear)
    //   result.push([
    //     ii,
    //     moment(dateRange.from)
    //       .set("quarter", 1)
    //       .startOf("quarter")
    //       .format(formater),

    //     moment(dateRange.from)
    //       .set("quarter", 4)
    //       .endOf("quarter")
    //       .format(formater),
    //   ]);
    // // result.push([
    // //   ii++,
    // //   moment(dateRange.from).startOf("month").format(formater),
    // //   moment(dateRange.from).endOf("year").format(formater),
    // // ]);
    if (_mSYear == _mLYear)
      result.push([
        ii++,
        _mFrom < 3
          ? moment(dateRange.from)
              .set("quarter", 1)
              .startOf("quarter")
              .format(formater)
          : _mFrom < 6
          ? moment(dateRange.from)
              .set("quarter", 2)
              .startOf("quarter")
              .format(formater)
          : _mFrom < 9
          ? moment(dateRange.from)
              .set("quarter", 3)
              .startOf("quarter")
              .format(formater)
          : moment(dateRange.from)
              .set("quarter", 4)
              .startOf("quarter")
              .format(formater),
        _mTo < 3
          ? moment(dateRange.to)
              .set("quarter", 1)
              .endOf("quarter")
              .format(formater)
          : _mTo < 6
          ? moment(dateRange.to)
              .set("quarter", 2)
              .endOf("quarter")
              .format(formater)
          : _mTo < 9
          ? moment(dateRange.to)
              .set("quarter", 3)
              .endOf("quarter")
              .format(formater)
          : moment(dateRange.to)
              .set("quarter", 4)
              .endOf("quarter")
              .format(formater),
      ]);
    else
      result.push([
        ii++,
        _mFrom < 3
          ? moment(dateRange.from)
              .set("quarter", 1)
              .startOf("quarter")
              .format(formater)
          : _mFrom < 6
          ? moment(dateRange.from)
              .set("quarter", 2)
              .startOf("quarter")
              .format(formater)
          : _mFrom < 9
          ? moment(dateRange.from)
              .set("quarter", 3)
              .startOf("quarter")
              .format(formater)
          : moment(dateRange.from)
              .set("quarter", 4)
              .startOf("quarter")
              .format(formater),
        moment(dateRange.from)
          .set("quarter", 4)
          .endOf("quarter")
          .format(formater),
      ]);
    for (let i = _mSYear + 1; i < _mLYear; i++) {
      result.push([
        ii++,
        moment(dateRange.from)
          .add(i - _mSYear, "year")
          .startOf("year")
          .format(formater),
        moment(dateRange.from)
          .add(i - _mSYear, "year")
          .endOf("year")
          .format(formater),
      ]);
    }
    if (_mSYear < _mLYear)
      result.push([
        ii++,
        moment(dateRange.to)
          .set("quarter", 1)
          .startOf("quarter")
          .format(formater),
        _mTo < 3
          ? moment(dateRange.to)
              .set("quarter", 1)
              .endOf("quarter")
              .format(formater)
          : _mTo < 6
          ? moment(dateRange.to)
              .set("quarter", 2)
              .endOf("quarter")
              .format(formater)
          : _mTo < 9
          ? moment(dateRange.to)
              .set("quarter", 3)
              .endOf("quarter")
              .format(formater)
          : moment(dateRange.to)
              .set("quarter", 4)
              .endOf("quarter")
              .format(formater),
      ]);
    // if (_mLYear > _mSYear)
    //   result.push([
    //     ii,
    //     moment(dateRange.to).startOf("year").format(formater),
    //     moment(dateRange.to).endOf("month").format(formater),
    //   ]);
  }
  return result;
};

export function localeStringArray(arr: number[]) {
  const len: number = arr.length;
  const newArr: string[] = [];
  for (let i = 0; i < len; i++) {
    if (arr[i] < 0) newArr.push("(" + (-arr[i]).toLocaleString() + ")");
    else newArr.push(arr[i].toLocaleString());
  }
  return newArr;
}
export function localeStringToNumber(num: number) {
  let result: string = "";
  result =
    num < 0
      ? `( ${Math.round(-num).toLocaleString()} )`
      : num == 0
      ? "0"
      : Math.round(num).toLocaleString();
  return result;
}
export function redNumber(num: number) {
  let tempNum = "";
  if (num >= 0) tempNum = num.toLocaleString();
  else tempNum = "(" + (-num).toLocaleString() + ")";
  return tempNum;
}

export function getAverageValue(arr: number[]) {
  const arrLength: number = arr?.length;
  let sumArr: number = 0;
  let calcNonZero: number = 0;
  for (let i = 0; i < arrLength; i++) {
    if (arr[i] != 0) {
      sumArr += arr[i] * 1;
      calcNonZero++;
    }
  }

  return calcNonZero == 0 ? 1 : sumArr / calcNonZero;
}

export function calcCumulativeMultiply(arr, baseYear) {
  const period = arr?.length;
  const startIndex = baseYear - 2021;
  let cumulValue = 1;
  let result: number[] = new Array(period).fill(0);
  for (let i = 0; i < startIndex; i++) {
    result[i] = 0;
  }
  result[startIndex] = 1;
  for (let i = startIndex + 1; i < period; i++) {
    cumulValue *= arr[i];
    result[i] = cumulValue;
  }

  return result;
}

export function arrayFillWithZeroAndOne(
  startIndex: number,
  endIndex: number,
  period: number
) {
  let result: number[] = new Array(period).fill(0);
  for (let i = startIndex - 1; i < endIndex - 1; i++) {
    result[i] = 1;
  }
  return result;
}
export function getEndDateOfQuarter(dateString: string): string {
  const date: Date = new Date(dateString); // Parse the date string
  const month: number = date.getMonth(); // Get the month (0-11)
  let endMonth: number;

  // Determine the end month of the quarter
  if (month < 3) {
    endMonth = 2; // Q1 ends in March
  } else if (month < 6) {
    endMonth = 5; // Q2 ends in June
  } else if (month < 9) {
    endMonth = 8; // Q3 ends in September
  } else {
    endMonth = 11; // Q4 ends in December
  }

  // Create a new date for the last day of the quarter
  const endDate: Date = new Date(date.getFullYear(), endMonth + 1, 0); // 0 gives the last day of the previous month

  // Format the date to 'YYYY-MM-DD'
  const year: number = endDate.getFullYear();
  const monthFormatted: string = String(endDate.getMonth() + 1).padStart(
    2,
    "0"
  ); // Months are 0-based
  const dayFormatted: string = String(endDate.getDate()).padStart(2, "0");

  return `${year}-${monthFormatted}-${dayFormatted}`;
}
export function getQuarterDates(dateString: string): {
  start: string;
  end: string;
} {
  const date: Date = new Date(dateString); // Parse the date string
  const month: number = date.getMonth(); // Get the month (0-11)
  let startMonth: number;
  let endMonth: number;

  // Determine the start and end months of the quarter
  if (month < 3) {
    startMonth = 0; // Q1 starts in January
    endMonth = 2; // Q1 ends in March
  } else if (month < 6) {
    startMonth = 3; // Q2 starts in April
    endMonth = 5; // Q2 ends in June
  } else if (month < 9) {
    startMonth = 6; // Q3 starts in July
    endMonth = 8; // Q3 ends in September
  } else {
    startMonth = 9; // Q4 starts in October
    endMonth = 11; // Q4 ends in December
  }

  // Create dates for the start and end of the quarter
  const startDate: Date = new Date(date.getFullYear(), startMonth, 1); // First day of the start month
  const endDate: Date = new Date(date.getFullYear(), endMonth + 1, 0); // Last day of the end month

  // Format the dates to 'YYYY-MM-DD'
  const formatDate = (d: Date): string => {
    const year: number = d.getFullYear();
    const monthFormatted: string = String(d.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const dayFormatted: string = String(d.getDate()).padStart(2, "0");
    return `${year}-${monthFormatted}-${dayFormatted}`;
  };

  return {
    start: formatDate(startDate),
    end: formatDate(endDate),
  };
}
export function getQuarterNumber(dateString: string): number {
  const date: Date = new Date(dateString + "T00:00:00Z"); // Append UTC time
  const month: number = date.getUTCMonth(); // Get the month in UTC

  // Determine the quarter based on the month
  if (month >= 0 && month <= 2) {
    return 1; // Q1: January to March
  } else if (month >= 3 && month <= 5) {
    return 2; // Q2: April to June
  } else if (month >= 6 && month <= 8) {
    return 3; // Q3: July to September
  } else {
    return 4; // Q4: October to December
  }
}

export function IRR(cashFlows: number[], guess: number = 0.1): number {
  const calculateNPV = (rate: number): number => {
    return cashFlows.reduce((acc, cashFlow, index) => {
      return acc + cashFlow / Math.pow(1 + rate, index / 4);
    }, 0);
  };

  let rate = guess;
  const tolerance = 0.00001; // Tolerance for convergence
  const maxIterations = 100000; // Maximum iterations to prevent infinite loop

  for (let i = 0; i < maxIterations; i++) {
    const npv = calculateNPV(rate);
    const npvDerivative = (calculateNPV(rate + tolerance) - npv) / tolerance; // Numerical derivative

    if (npvDerivative === 0) {
      break; // Prevent division by zero
    }

    const newRate = rate - npv / npvDerivative; // Newton-Raphson step

    // Check for convergence
    if (Math.abs(newRate - rate) < tolerance) {
      return newRate; // Return the found rate
    }

    rate = newRate;
  }

  // Return 0 if IRR did not converge
  return 0;
}
export function XIRR(
  cashFlows: number[],
  date: string,
  guess: number = 0.1
): number {
  const startDate = new Date(date);
  const endOfQuarter = new Date(
    startDate.getFullYear(),
    Math.ceil((startDate.getMonth() + 1) / 3) * 3,
    0
  ); // End of quarter

  // Calculate the number of days from the end of the quarter for each cash flow
  const days = cashFlows.map((_, index) => {
    const cashFlowDate = new Date(endOfQuarter);
    cashFlowDate.setMonth(cashFlowDate.getMonth() + index * 3);
    return (
      (cashFlowDate.getTime() - endOfQuarter.getTime()) / (1000 * 60 * 60 * 24)
    ); // Convert to days
  });
  const calculateNPV = (rate: number): number => {
    return cashFlows.reduce((acc, cashFlow, index) => {
      return acc + cashFlow / Math.pow(1 + rate, days[index] / 365); // Use days to calculate NPV
    }, 0);
  };

  let rate = guess;
  const tolerance = 0.00001; // Tolerance for convergence
  const maxIterations = 100000; // Maximum iterations to prevent infinite loop

  for (let i = 0; i < maxIterations; i++) {
    const npv = calculateNPV(rate);
    const npvDerivative = (calculateNPV(rate + tolerance) - npv) / tolerance; // Numerical derivative

    if (npvDerivative === 0) {
      break; // Prevent division by zero
    }

    const newRate = rate - npv / npvDerivative; // Newton-Raphson step

    // Check for convergence
    if (Math.abs(newRate - rate) < tolerance) {
      return newRate; // Return the found rate
    }

    rate = newRate;
  }

  // Return 0 if XIRR did not converge
  return 0;
}
export function XNPV(
  cashFlows: number[],
  date: string,
  discountRate: number
): number {
  const startDate = moment.utc(date);
  const endOfQuarter = moment(startDate).endOf("quarter").format(DATE_FORMAT);

  const days = cashFlows.map((_, index) => {
    return moment(endOfQuarter)
      .add(index, "quarters")
      .endOf("quarter")
      .diff(endOfQuarter, "day"); // Convert to days
  });
  // Calculate the present value of each cash flow based on quarterly intervals
  const npv = cashFlows.reduce((acc, cashFlow, index) => {
    return acc + cashFlow / Math.pow(1 + discountRate, days[index] / 365); // Discounted cash flow
  }, 0);

  return npv; // Return the calculated XNPV
}

export function getDynamicDataForEachPeriod(arr: number[], active: string) {
  const len = arr?.length;
  if (active == "quarterly") return arr;
  else if (active == "semi_annually") {
    const lenForSemiAnnual = len % 2 == 0 ? len / 2 : (len + 1) / 2;
    let result: number[] = new Array(lenForSemiAnnual).fill(0);
    for (let i = 0; i < lenForSemiAnnual - 1; i++) {
      result[i] = arr[i * 2 + 1];
    }
    result[lenForSemiAnnual - 1] = arr[len - 1];
    return result;
  } else {
    const lenForAnnual = len % 4 == 0 ? len / 4 : (len - (len % 4)) / 4 + 1;
    let result: number[] = new Array(lenForAnnual).fill(0);
    for (let i = 0; i < lenForAnnual - 1; i++) {
      result[i] = arr[i * 4 + 3];
    }
    // result[lenForAnnual - 1] = arr[len - 1];
    result[lenForAnnual - 1] = 0;

    return result;
  }
}
export function indexOfSecondLargest(arr: number[]): number | null {
  if (arr.length < 2) {
    return null; // Not enough elements
  }

  let largest = -Infinity;
  let secondLargest = -Infinity;
  let secondLargestIndex: number | null = null;

  for (let i = 0; i < arr.length; i++) {
    const num = arr[i];

    if (num > largest) {
      secondLargest = largest;
      secondLargestIndex = i - 1; // Update index of previous largest
      largest = num;
    } else if (num > secondLargest && num < largest) {
      secondLargest = num;
      secondLargestIndex = i; // Update index of second largest
    }
  }

  return secondLargestIndex;
}
export function toSnakeCase(input: string): string {
  // Step 1: Replace special characters with spaces
  let cleaned = input.replace(/[^a-zA-Z0-9]+/g, "_");

  // Step 2: Remove leading and trailing underscores
  cleaned = cleaned.replace(/^_+|_+$/g, "");

  // Step 3: Convert to lowercase
  cleaned = cleaned.toLowerCase();
  return cleaned;
}
export function objectSum(arr) {
  const len = arr.length;
  if (len == 0) return arr;
  else {
    let paramIndexArray = [];
    let resultArray = [];
    for (let i = 0; i < len; i++) {
      const paramIndex = arr[i].param_index;
      if (!paramIndexArray.includes(paramIndex)) {
        paramIndexArray.push(paramIndex);
        resultArray.push(arr[i]);
      } else {
        const alreadyExistingId = resultArray.findIndex(
          (param) => param.param_index == paramIndex
        );
        const alreadyExistingParamValue = resultArray[alreadyExistingId].value;
        const currentParamValue = arr[i].value;
        const newParamValue = {
          ...alreadyExistingParamValue,
          ...currentParamValue,
        };
        const newParamResult = {
          parameter_id: arr[i].parameter_id,
          param_index: paramIndex,
          value: newParamValue,
        };
        let newResultArray = [
          ...resultArray.slice(0, alreadyExistingId),
          ...resultArray.slice(alreadyExistingId + 1),
        ];
        newResultArray.push(newParamResult);
        resultArray = newResultArray;
      }
    }
    return resultArray;
  }
}

function removeNthElement(arr, n) {
  return arr.filter((_, index) => index !== n);
}
