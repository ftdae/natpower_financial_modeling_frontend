import {
  getAsAPercentOfPeriod,
  getFlagOfPeriod,
  getQuarterNumberFromModelStartDate,
} from "../utils";

export function calcResidualRevenue({
  residualValue = 0,
  modelStartDate = "2023-01-01",
  decommissioningEndDate = "2068-06-30",
  developmentStartDate = "2023-07-01",
}: {
  residualValue?: number;
  modelStartDate?: string;
  decommissioningEndDate?: string;
  developmentStartDate?: string;
}) {
  const period =
    getQuarterNumberFromModelStartDate(modelStartDate, decommissioningEndDate) -
    1;
  const devToDecomEndFlag = getFlagOfPeriod(
    modelStartDate,
    developmentStartDate,
    decommissioningEndDate,
    decommissioningEndDate
  );
  let decomEndPeriodFlag = new Array(period).fill(0);
  decomEndPeriodFlag[period - 1] = 1;
  const residualRevenueResult = devToDecomEndFlag.map(
    (d, index) => d * decomEndPeriodFlag[index] * residualValue
  );
  return residualRevenueResult;
}
