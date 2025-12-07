import { addYears } from "date-fns";
import {
  getAsAPercentOfPeriod,
  getQuarterNumberFromModelStartDate,
  multiplyNumber,
  sumArray,
} from "../../../utils";
import { DEFAULT_DEVEX_SETTING } from "../../constant";
import { IDevexSetting } from "../../type";
import moment from "moment";
import { DATE_FORMAT } from "../../../../../utils/usePrameter";

export function calcDevexAdditions({
  modelStartDate = "2023-01-01",
  decommissioningEndDate = "2068-06-30",
  devexSetting = DEFAULT_DEVEX_SETTING,
  developmentStartDate = "2023-07-01",
  operationStartDate = "2028-01-01",
}: {
  operationStartDate?: string;
  modelStartDate?: string;
  decommissioningEndDate?: string;
  devexSetting?: IDevexSetting;
  developmentStartDate?: string;
}) {
  const depreciationEndDate = addYears(
    operationStartDate,
    devexSetting.usefulEL
  );
  // devexFlag calcs row 4469
  const devexFlag = getAsAPercentOfPeriod(
    modelStartDate,
    operationStartDate,
    moment(depreciationEndDate).add(-1, "days").format(DATE_FORMAT),
    decommissioningEndDate
  );
  const period =
    getQuarterNumberFromModelStartDate(modelStartDate, decommissioningEndDate) -
    1;
  const devexProfileStartQuarterNumber =
    getQuarterNumberFromModelStartDate(modelStartDate, developmentStartDate) -
    1;
  const profileLength = devexSetting.devexProfile.length;
  const devStartDateMonthNumber =
    new Date(developmentStartDate).getUTCMonth() + 1;
  let quarterlyProfile: number[] = [];
  // profileDataByQuarter calcs row 3746
  const profileDataByQuarter = new Array(period).fill(0);
  let tempSum: number = 0;

  for (let i = 0; i < profileLength; i++) {
    tempSum += devexSetting.devexProfile[i] * 1;
    if ((i - devStartDateMonthNumber - 1) % 3 == 0) {
      quarterlyProfile.push(tempSum);
      tempSum = 0;
    }
  }
  for (
    let i = devexProfileStartQuarterNumber;
    i < devexProfileStartQuarterNumber + quarterlyProfile.length;
    i++
  ) {
    profileDataByQuarter[i] =
      quarterlyProfile[i - devexProfileStartQuarterNumber];
  }

  // totalDevexCost calcs F3755
  const totalDevexCost: number = sumArray(quarterlyProfile);
  // quarterlyDepreciationAmount calcs K4113
  const quarterlyDepreciationAmount: number =
    devexSetting.usefulEL == 0
      ? 0
      : -totalDevexCost / (devexSetting.usefulEL * 4);

  // depreciationForecastCharge calcs row 4569
  const depreciationForecastCharge: number[] = multiplyNumber(
    devexFlag,
    quarterlyDepreciationAmount
  );
  const devexSwitch: number = devexSetting.devexSwitch;

  const devexAdditions = [];
  return {
    depreciationForecastCharge:
      devexSwitch == 1 ? depreciationForecastCharge : new Array(period).fill(0),
    devexAdditions:
      devexSwitch == 1 ? profileDataByQuarter : new Array(period).fill(0),
  };
}
