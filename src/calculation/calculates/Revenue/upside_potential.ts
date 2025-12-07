import {
  INFLATION_START_YEAR,
  MODEL_START_YEAR,
} from "../../../utils/constant";
import { DEFAULT_OPTIMISER } from "../CoGS/constant";
import { IOptimiser } from "../CoGS/type";
import {
  DEFAULT_BALANCING_MECHANISM,
  DEFAULT_CAPACITY_MARKET,
  DEFAULT_FLOATING_PPA_VALUE,
  DEFAULT_FREQUENCY_RESPONSE,
  DEFAULT_INFLATION_INPUTS,
  DEFAULT_REVENUE_SETUP,
  DEFAULT_VINTAGE,
  DEFAULT_WHOLESALE_DAY_AHEAD,
  DEFAULT_WHOLESALE_INTRADAY,
} from "../constant";
import {
  annualIndexToMonths,
  getAsAPercentOfPeriod,
  inflationIndex,
  multiplyNumber,
  normalizeArray,
  sumArray,
  sumArrays,
} from "../utils";
import { IInflationForm, IRevenueSetup, IVintage } from "./type";

export function calcUpsidePotentialRevenue({
  wholesaleDayAhead = DEFAULT_WHOLESALE_DAY_AHEAD,
  wholesaleDayIntraday = DEFAULT_WHOLESALE_INTRADAY,
  balancingMechanism = DEFAULT_BALANCING_MECHANISM,
  frequencyResponse = DEFAULT_FREQUENCY_RESPONSE,
  capacityMarket = DEFAULT_CAPACITY_MARKET,
  balancingReserve = DEFAULT_FLOATING_PPA_VALUE,
  optimiser = DEFAULT_OPTIMISER,
  modelStartDate = "2023-01-01",
  decommissioningEndDate = "2068-06-30",
  vintage = DEFAULT_VINTAGE,
  inflationInputs = DEFAULT_INFLATION_INPUTS,
  revenueSetup = DEFAULT_REVENUE_SETUP,
  operationYears = 40,
}: {
  wholesaleDayAhead?: number[];
  wholesaleDayIntraday?: number[];
  balancingMechanism?: number[];
  frequencyResponse?: number[];
  capacityMarket?: number[];
  balancingReserve?: number[];
  optimiser?: IOptimiser;
  modelStartDate?: string;
  decommissioningEndDate?: string;
  vintage?: IVintage;
  inflationInputs?: IInflationForm[];
  revenueSetup?: IRevenueSetup;
  operationYears?: number;
}) {
  // const period =
  //   getQuarterNumberFromModelStartDate(modelStartDate, decommissioningEndDate) -
  //   1;
  // let floatingPPARevenueArray: number[] = [];
  // let firstFloatingPPA = [];
  // let secondFloatingPPA = [];
  // const totalGeneration = vintage.electricitySold;
  // if (floatingPPARevenue.switch == 0) {
  //   return new Array(period).fill(0);
  // } else {
  //   const floatingPPAPercentage = floatingPPARevenue?.assignedPercentage || 0;
  //   if (
  //     !moment(floatingPPARevenue.data[0].data.startDate).isValid() ||
  //     !moment(floatingPPARevenue.data[0].data.endDate).isValid()
  //   ) {
  //     firstFloatingPPA = new Array(period).fill(0);
  //   } else {
  //     const firstPPAAsAPercentOfPeriod: number[] = getAsAPercentOfPeriod(
  //       modelStartDate,
  //       floatingPPARevenue.data[0].data?.startDate,
  //       floatingPPARevenue.data[0].data?.endDate,
  //       decommissioningEndDate
  //     );
  //     const floatingPPAGeneration: number[] = multiplyNumber(
  //       totalGeneration,
  //       floatingPPAPercentage / 100
  //     );
  //     firstFloatingPPA = multiplyArrays([
  //       floatingPPAGeneration,
  //       firstPPAAsAPercentOfPeriod,
  //       averageWholeSaleDayAheadPrice || new Array(period).fill(0)
  //     ]);
  //   }
  //   if (
  //     !moment(floatingPPARevenue.data[1].data.startDate).isValid() ||
  //     !moment(floatingPPARevenue.data[1].data.endDate).isValid()
  //   ) {
  //     secondFloatingPPA = new Array(period).fill(0);
  //   } else {
  //     const secondPPAAsAPercentOfPeriod: number[] = getAsAPercentOfPeriod(
  //       modelStartDate,
  //       floatingPPARevenue.data[1].data?.startDate,
  //       floatingPPARevenue.data[1].data?.endDate,
  //       decommissioningEndDate
  //     );
  //     const floatingPPAGeneration: number[] = multiplyNumber(
  //       totalGeneration,
  //       floatingPPAPercentage / 100
  //     );
  //     secondFloatingPPA = multiplyArrays([
  //       floatingPPAGeneration,
  //       secondPPAAsAPercentOfPeriod,
  //       averageWholeSaleDayAheadPrice || new Array(period).fill(0)
  //     ]);
  //   }

  //   floatingPPARevenueArray = multiplyNumber(
  //     sumArrays(firstFloatingPPA, secondFloatingPPA),
  //     (100 - floatingPPARevenue.discountToWholesalePriceForMarginPercentage) /
  //     1000 /
  //     100
  //   );
  //   return floatingPPARevenueArray;
  // }

  // upsidePotential calcs row 2546
  const upsidePotential = multiplyNumber(
    sumArrays(
      wholesaleDayAhead,
      wholesaleDayIntraday,
      balancingMechanism,
      capacityMarket,
      frequencyResponse,
      balancingReserve
    ),
    (optimiser.switch * (optimiser.upsideValue || 0)) / 100
  );
  // tradingFloorFlag calcs row 2530
  const tradingFloorFlag = getAsAPercentOfPeriod(
    modelStartDate,
    optimiser?.floor?.startDate || modelStartDate,
    optimiser?.floor?.endDate || decommissioningEndDate,
    decommissioningEndDate
  );
  const indexValue = annualIndexToMonths(
    normalizeArray(
      inflationIndex({
        inflationInputs,
        baseYear: revenueSetup.baseYear,
        profile: revenueSetup.inflation,
      }).slice(MODEL_START_YEAR - INFLATION_START_YEAR),
      70
    )
  );

  // tradingFloorPrice calcs row 2534
  const tradingFloorPrice = multiplyNumber(
    indexValue,
    optimiser.floor.floorPrice
  );

  // tradingFloor calcs row 2536
  const tradingFloor = tradingFloorFlag.map(
    (d, index) =>
      d * vintage.totalGenerationCapacity[index] * tradingFloorPrice[index]
  );

  // tradingFloorTopUp calcs row 2547
  const tradingFloorTopUp = tradingFloor.map((d, index) =>
    Math.max(
      0,
      d -
        (wholesaleDayAhead[index] +
          wholesaleDayIntraday[index] +
          balancingMechanism[index] +
          capacityMarket[index] +
          frequencyResponse[index] +
          balancingReserve[index] +
          upsidePotential[index])
    )
  );
  return {
    upsidePotential: upsidePotential,
    tradingFloorTopUp: tradingFloorTopUp,
  };
}
