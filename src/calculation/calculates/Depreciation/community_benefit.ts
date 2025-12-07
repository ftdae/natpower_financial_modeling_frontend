import moment from "moment";
import {
  INFLATION_START_YEAR,
  MODEL_START_YEAR,
} from "../../../utils/constant";
import { DEFAULT_COMMUNITY_BENEFIT } from "../Administrative costs/constant";
import { ICommunityBenefit } from "../Administrative costs/type";
import { DEFAULT_AVERAGE_WHOLESALE_DAY_AHEAD_PRICE } from "../CoGS/constant";
import { IInflationForm } from "../Revenue/type";
import { DEFAULT_INFLATION_INPUTS } from "../constant";
import {
  addZeros,
  annualIndexToMonths,
  getAsAPercentOfPeriod,
  getFlagOfPeriod,
  getQuarterNumberFromModelStartDate,
  inflationIndex,
  multiplyNumber,
  normalizeArray,
  normalizeArrayBySeasonality,
  roundArray,
  sumArray,
} from "../utils";
import { DATE_FORMAT } from "../../../utils/usePrameter";
export function capitalizedCommunityBenefit({
  communityBenefit = DEFAULT_COMMUNITY_BENEFIT,
  inflationInputs = DEFAULT_INFLATION_INPUTS,
  averageWholeSaleDayAheadPrice = DEFAULT_AVERAGE_WHOLESALE_DAY_AHEAD_PRICE,
  opexSensitivity = 0,
  operationStartDate = "2028-01-01",
  modelStartDate = "2023-01-01",
  operationEndDate = "2067-12-31",
  decommissioningEndDate = "2068-06-30",
  constructionStartDate = "2027-01-01",
  developmentStartDate = "2023-07-01",
}: {
  communityBenefit?: ICommunityBenefit;
  inflationInputs?: IInflationForm[];
  averageWholeSaleDayAheadPrice?: number[];
  initialCapacity?: number;
  opexSensitivity?: number;
  operationStartDate?: string;
  modelStartDate?: string;
  operationEndDate?: string;
  decommissioningEndDate?: string;
  constructionStartDate?: string;
  developmentStartDate?: string;
}) {
  const period =
    getQuarterNumberFromModelStartDate(modelStartDate, decommissioningEndDate) -
    1;

  const developmentFlag = getFlagOfPeriod(
    modelStartDate,
    developmentStartDate,
    moment(constructionStartDate).add(-1, "days").format(DATE_FORMAT),
    decommissioningEndDate
  );

  const constructionFlag = getFlagOfPeriod(
    modelStartDate,
    constructionStartDate,
    moment(operationStartDate).add(-1, "days").format(DATE_FORMAT),
    decommissioningEndDate
  );
  const operationAsAPercentOfPeriod = getAsAPercentOfPeriod(
    modelStartDate,
    operationStartDate,
    operationEndDate,
    decommissioningEndDate
  );

  const indexValue = normalizeArray(
    annualIndexToMonths(
      inflationIndex({
        inflationInputs,
        baseYear: communityBenefit.baseYear,
        profile: communityBenefit.inflationProfile,
      }).slice(MODEL_START_YEAR - INFLATION_START_YEAR)
    ),
    period
  );
  const constructionAsAPercentOfPeriod = getAsAPercentOfPeriod(
    modelStartDate,
    constructionStartDate,
    moment(operationStartDate).add(-1, "days").format(DATE_FORMAT),
    decommissioningEndDate
  );
  const fixedFund = operationAsAPercentOfPeriod.map(
    (d, index) =>
      ((d + constructionAsAPercentOfPeriod[index]) *
        indexValue[index] *
        communityBenefit.annualFixedFundToCommunityBenefit *
        (1 + opexSensitivity)) /
      -4
  );
  let freeElectricityFund: number[] = [];
  // communityBenefitCost = freeElectricityFund + fixedFund
  let communityBenefitCost = freeElectricityFund.map(
    (d, index) => d + fixedFund[index]
  );
  const monthlyMWhToCommunityBenefit =
    (communityBenefit?.annualMWhToCommunityBenefit ||
      0 * (1 + opexSensitivity)) / 4;
  freeElectricityFund = operationAsAPercentOfPeriod.map(
    (d, index) =>
      d *
      monthlyMWhToCommunityBenefit *
      normalizeArrayBySeasonality(
        multiplyNumber(averageWholeSaleDayAheadPrice, 1),
        period
      )[index]
  );

  communityBenefitCost = roundArray(
    freeElectricityFund.map((d, index) => d + fixedFund[index]),
    10
  );
  const forecastCostToCapex: number[] = communityBenefitCost.map(
    (d, index) => d * Math.max(developmentFlag[index], constructionFlag[index])
  );
  // capitalizedCommunityBenefitInConstructionPerQuarter calcs ~~~ K4115
  const capitalizedCommunityBenefitInConstructionPerQuarter: number =
    communityBenefit.uelYears == 0
      ? 0
      : sumArray(forecastCostToCapex) / (communityBenefit.uelYears * 4);
  // capitalizedCommunityBenefitResult calcs row 4571
  const capitalizedCommunityBenefitResult =
    communityBenefit.capitalisationSwitch == 0
      ? new Array(period).fill(0)
      : multiplyNumber(
          operationAsAPercentOfPeriod,
          capitalizedCommunityBenefitInConstructionPerQuarter
        );
  return {
    capitalizedCommunityBenefitResult: capitalizedCommunityBenefitResult,
    forecastCostToCapex: forecastCostToCapex,
  };
}
