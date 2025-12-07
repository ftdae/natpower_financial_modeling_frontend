import moment from "moment";
import { DATE_FORMAT } from "../../../utils/usePrameter";
import { DEFAULT_LAND_RENT } from "../Administrative costs/constant";
import { calcLandRentToPL } from "../Administrative costs/land_rent";
import { IDSAFeeSetting, ILandRent } from "../Administrative costs/type";
import { ICapexUELForm, IInflationForm } from "../Revenue/type";
import { DEFAULT_CAPEX_UEL, DEFAULT_INFLATION_INPUTS } from "../constant";
import dayjs from "dayjs";

import {
  addYears,
  annualIndexToMonths,
  getAsAPercentOfPeriod,
  getQuarterNumberFromModelStartDate,
  inflationIndex,
  multiplyArrays,
  normalizeArray,
  roundArray,
} from "../utils";
import { DEFAULT_DSA_FEE_SETTING } from "./constant";
import {
  INFLATION_START_YEAR,
  MODEL_START_YEAR,
} from "../../../utils/constant";

export function calcDSAFee({
  dsaFeeSetting = DEFAULT_DSA_FEE_SETTING,
  initialCapacity = 1000,
  inflationInputs = DEFAULT_INFLATION_INPUTS,
  operationEndDate = "2067-12-31",
  decommissioningStartDate = "2068-01-01",
  decommissioningEndDate = "2068-06-30",
  constructionStartDate = "2027-01-01",
  developmentStartDate = "2023-07-01",
  modelStartDate = "2023-01-01",
}: {
  dsaFeeSetting: IDSAFeeSetting;
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
  const period =
    getQuarterNumberFromModelStartDate(modelStartDate, decommissioningEndDate) -
    1;
  let flag = [];
  const pdaPeriodNum = dayjs(dsaFeeSetting.pdaDate).isBefore(modelStartDate)
    ? -1
    : getQuarterNumberFromModelStartDate(
        modelStartDate,
        dsaFeeSetting.pdaDate
      ) - 1;
  flag.push({
    dateIndex: pdaPeriodNum,
    mile: dsaFeeSetting.pdaMile,
  });
  const hotsDateNum = dayjs(dsaFeeSetting.hotsDate).isBefore(modelStartDate)
    ? -1
    : getQuarterNumberFromModelStartDate(
        modelStartDate,
        dsaFeeSetting.hotsDate
      ) - 1;

  flag.push({
    dateIndex: hotsDateNum,
    mile: dsaFeeSetting.hotsMile,
  });
  const landSecuredNum = dayjs(dsaFeeSetting.landSecuredDate).isBefore(
    modelStartDate
  )
    ? -1
    : getQuarterNumberFromModelStartDate(
        modelStartDate,
        dsaFeeSetting.landSecuredDate
      ) - 1;
  flag.push({
    dateIndex: landSecuredNum,
    mile: dsaFeeSetting.landSecuredMile,
  });
  const gridAppNum = dayjs(dsaFeeSetting.gridAppDate).isBefore(modelStartDate)
    ? -1
    : getQuarterNumberFromModelStartDate(
        modelStartDate,
        dsaFeeSetting.gridAppDate
      ) - 1;
  flag.push({
    dateIndex: gridAppNum,
    mile: dsaFeeSetting.gridAppMile,
  });
  const gridFirstNum = dayjs(dsaFeeSetting.gridFirstOfferDate).isBefore(
    modelStartDate
  )
    ? -1
    : getQuarterNumberFromModelStartDate(
        modelStartDate,
        dsaFeeSetting.gridFirstOfferDate
      ) - 1;
  flag.push({
    dateIndex: gridFirstNum,
    mile: dsaFeeSetting.gridFirstOfferMile,
  });
  const gridSecuredNum = dayjs(dsaFeeSetting.gridSecuredDate).isBefore(
    modelStartDate
  )
    ? -1
    : getQuarterNumberFromModelStartDate(
        modelStartDate,
        dsaFeeSetting.gridSecuredDate
      ) - 1;
  flag.push({
    dateIndex: gridSecuredNum,
    mile: dsaFeeSetting.gridSecuredMile,
  });
  const preplanNum = dayjs(dsaFeeSetting.prePlanDate).isBefore(modelStartDate)
    ? -1
    : getQuarterNumberFromModelStartDate(
        modelStartDate,
        dsaFeeSetting.prePlanDate
      ) - 1;
  flag.push({
    dateIndex: preplanNum,
    mile: dsaFeeSetting.prePlanMile,
  });
  const consultationNum = dayjs(dsaFeeSetting.consultDate).isBefore(
    modelStartDate
  )
    ? -1
    : getQuarterNumberFromModelStartDate(
        modelStartDate,
        dsaFeeSetting.consultDate
      ) - 1;
  flag.push({
    dateIndex: consultationNum,
    mile: dsaFeeSetting.consultMile,
  });
  const planConsenNum = dayjs(dsaFeeSetting.planConsentDate).isBefore(
    modelStartDate
  )
    ? -1
    : getQuarterNumberFromModelStartDate(
        modelStartDate,
        dsaFeeSetting.planConsentDate
      ) - 1;
  flag.push({
    dateIndex: planConsenNum,
    mile: dsaFeeSetting.planConsentMile,
  });
  const preConDischargeNum = dayjs(dsaFeeSetting.preConDischargeDate).isBefore(
    modelStartDate
  )
    ? -1
    : getQuarterNumberFromModelStartDate(
        modelStartDate,
        dsaFeeSetting.preConDischargeDate
      ) - 1;
  flag.push({
    dateIndex: preConDischargeNum,
    mile: dsaFeeSetting.preConDischargeMile,
  });
  let totalFlag = new Array(period).fill(0);
  const dataLen = flag.length;
  for (let i = 0; i < dataLen; i++) {
    if (flag[i].dataIndex != -1)
      totalFlag[flag[i].dataIndex - 1] += flag[i].mile / 100;
  }
  // totalDSAFeePreIndexation Calcs F6185
  const totalDSAFeePreIndexation =
    initialCapacity * dsaFeeSetting.baseTotalDSAFee;
  const indexation = normalizeArray(
    annualIndexToMonths(
      inflationIndex({
        inflationInputs,
        baseYear: dsaFeeSetting.baseYear,
        profile: dsaFeeSetting?.inflationProfile,
      }).slice(MODEL_START_YEAR - INFLATION_START_YEAR)
    ),
    period
  );
  // totalIndexedDSSFees Calcs row 6198
  const totalIndexedDSAFees = totalFlag.map(
    (d, index) => d * indexation[index] * totalDSAFeePreIndexation
  );
  return roundArray(totalIndexedDSAFees, 20);
}
