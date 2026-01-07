import moment from "moment";
import {
  DEFAULT_FIXED_PPA,
  DEFAULT_INFLATION_INPUTS,
  DEFAULT_VINTAGE,
} from "../constant";
import {
  annualIndexToMonths,
  getAsAPercentOfPeriod,
  getQuarterNumberFromModelStartDate,
  inflationIndex,
  multiplyArrays,
  multiplyNumber,
  normalizeArray,
  sumArrays,
} from "../utils";
import { IFixedPPA, IInflationForm, IVintage } from "./type";
import {
  INFLATION_START_YEAR,
  MODEL_START_YEAR,
} from "../../../utils/constant";

export function calcFixedPPA({
  fixedPPARevenue = DEFAULT_FIXED_PPA,
  modelStartDate = "2023-01-01",
  decommissioningEndDate = "2068-06-30",
  vintage = DEFAULT_VINTAGE,
  inflationInputs = DEFAULT_INFLATION_INPUTS,
}: {
  fixedPPARevenue: IFixedPPA;
  modelStartDate?: string;
  decommissioningEndDate?: string;
  vintage?: IVintage;
  inflationInputs?: IInflationForm[];
}) {
  const period =
    getQuarterNumberFromModelStartDate(modelStartDate, decommissioningEndDate) -
    1;
  let fixedPPARevenueArray: number[] = [];
  let firstFixedPPA = [];
  let secondFixedPPA = [];

  const totalGeneration = vintage.electricitySold;
  if (fixedPPARevenue.switch == 0) {
    return new Array(period).fill(0);
  } else {
    const fixedPPAPercentage = fixedPPARevenue?.assignedPercentage || 0;
    const firstFixedPrice =
      fixedPPARevenue.data.find((d) => d.contract == "firstFixed")?.data
        ?.price || 0;
    const secondFixedPrice =
      fixedPPARevenue.data.find((d) => d.contract == "secondFixed")?.data
        ?.price || 0;

    if (
      !moment(fixedPPARevenue.data[0].data.startDate).isValid() ||
      !moment(fixedPPARevenue.data[0].data.endDate).isValid()
    ) {
      firstFixedPPA = new Array(period).fill(0);
    } else {
      const firstPPAAsAPercentOfPeriod: number[] = getAsAPercentOfPeriod(
        modelStartDate,
        fixedPPARevenue.data[0].data?.startDate,
        fixedPPARevenue.data[0].data?.endDate,
        decommissioningEndDate
      );
      const fixedPPAGeneration: number[] = multiplyNumber(
        totalGeneration,
        fixedPPAPercentage / 100
      );
      const indexation = normalizeArray(
        annualIndexToMonths(
          inflationIndex({
            inflationInputs,
            baseYear: fixedPPARevenue?.data[0].data.baseYear || 2023,
            profile: fixedPPARevenue?.data[0].data.inflationProfile,
          }).slice(MODEL_START_YEAR - INFLATION_START_YEAR)
        ),
        period
      );
      firstFixedPPA = multiplyNumber(
        multiplyArrays([
          fixedPPAGeneration,
          firstPPAAsAPercentOfPeriod,
          indexation,
        ]),
        firstFixedPrice / 1000
      );
    }
    if (
      !moment(fixedPPARevenue.data[1].data.startDate).isValid() ||
      !moment(fixedPPARevenue.data[1].data.endDate).isValid()
    ) {
      secondFixedPPA = new Array(period).fill(0);
    } else {
      const secondPPAAsAPercentOfPeriod: number[] = getAsAPercentOfPeriod(
        modelStartDate,
        fixedPPARevenue.data[1].data?.startDate,
        fixedPPARevenue.data[1].data?.endDate,
        decommissioningEndDate
      );
      const fixedPPAGeneration: number[] = multiplyNumber(
        totalGeneration,
        fixedPPAPercentage / 100
      );
      const indexation = normalizeArray(
        annualIndexToMonths(
          inflationIndex({
            inflationInputs,
            baseYear: fixedPPARevenue?.data[1].data.baseYear || 2023,
            profile: fixedPPARevenue?.data[1].data.inflationProfile,
          }).slice(MODEL_START_YEAR - INFLATION_START_YEAR)
        ),
        period
      );
      secondFixedPPA = multiplyNumber(
        multiplyArrays([
          fixedPPAGeneration,
          secondPPAAsAPercentOfPeriod,
          indexation,
        ]),
        secondFixedPrice / 1000
      );
    }

    fixedPPARevenueArray = sumArrays(firstFixedPPA, secondFixedPPA);

    return fixedPPARevenueArray;
  }
}
