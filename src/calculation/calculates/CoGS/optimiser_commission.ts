import {
  DEFAULT_BALANCING_MECHANISM,
  DEFAULT_CAPACITY_MARKET,
  DEFAULT_FREQUENCY_RESPONSE,
  DEFAULT_VINTAGE,
  DEFAULT_WHOLESALE_DAY_AHEAD,
  DEFAULT_WHOLESALE_INTRADAY,
} from "../constant";
import {
  IAssumptionData,
  IBatteryAugmentation,
  IBatteryCubes,
  IBatteryDisposal,
  IBatteryEfficiency,
  IBatteryExcubes,
  IBessCapexForecast,
  ICapexPaymentForm,
  ICapexPaymentMilestoneForm,
  ICapexUELForm,
  ICycleData,
  IDetailedRevenueData,
  IInflationForm,
  IRevenueSetup,
  IStartingBatteryAssumptions,
  IVintage,
} from "../Revenue/type";
import {
  addZeros,
  getQuarterNumberFromModelStartDate,
  roundArray,
  sumArray,
} from "../utils";
import { DEFAULT_OPTIMISER } from "./constant";
import { IOptimiser } from "./type";

export function calcOptimiserCommission({
  modelStartDate = "2023-01-01",
  decommissioningEndDate = "2068-06-30",
  optimiser = DEFAULT_OPTIMISER,
  vintage = DEFAULT_VINTAGE,
  wholesaleDayAhead = DEFAULT_WHOLESALE_DAY_AHEAD,
  wholesaleDayIntraday = DEFAULT_WHOLESALE_INTRADAY,
  balancingMechanism = DEFAULT_BALANCING_MECHANISM,
  frequencyResponse = DEFAULT_FREQUENCY_RESPONSE,
  capacityMarket = DEFAULT_CAPACITY_MARKET,
  balancingReserve = DEFAULT_BALANCING_MECHANISM,
}: {
  revenueSensitivity?: number;
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
  decommissioningStartDate?: string;
  decommissioningEndDate?: string;
  optimiser?: IOptimiser;
  vintage?: IVintage;
  wholesaleDayAhead?: number[];
  wholesaleDayIntraday?: number[];
  balancingMechanism?: number[];
  frequencyResponse?: number[];
  capacityMarket?: number[];
  balancingReserve?: number[];
}) {
  const period =
    getQuarterNumberFromModelStartDate(modelStartDate, decommissioningEndDate) -
    1;
  // const balancingMechanismRevenue = calcBalancingMechanismRevenue({
  //   revenueSensitivity,
  //   revenueSetup,
  //   assumptionsData,
  //   detailedRevenueData,
  //   startingAssumptionsForBatteries,
  //   inflationInputs,
  //   modelStartDate,
  //   operationStartDate,
  //   decommissioningStartDate,
  //   decommissioningEndDate,
  //   vintage
  // });
  // const capacityMarketRevenue = calcCapacityMarket({
  //   revenueSensitivity,
  //   revenueSetup,
  //   assumptionsData,
  //   detailedRevenueData,
  //   startingAssumptionsForBatteries,
  //   inflationInputs,
  //   modelStartDate,
  //   operationStartDate,
  //   decommissioningStartDate,
  //   decommissioningEndDate,
  //   vintage
  // });
  // const frequencyResponseRevenue = calcFrequencyResponse({
  //   revenueSensitivity,
  //   revenueSetup,
  //   assumptionsData,
  //   detailedRevenueData,
  //   startingAssumptionsForBatteries,
  //   inflationInputs,
  //   modelStartDate,
  //   operationStartDate,
  //   decommissioningStartDate,
  //   decommissioningEndDate,
  //   vintage
  // });
  // const wholeSaleDayAheadRevenue = calcWholeSaleDayAheadRevenue({
  //   revenueSensitivity,
  //   revenueSetup,
  //   assumptionsData,
  //   detailedRevenueData,
  //   startingAssumptionsForBatteries,
  //   inflationInputs,
  //   modelStartDate,
  //   operationStartDate,
  //   decommissioningStartDate,
  //   decommissioningEndDate,
  //   vintage
  // });
  // const wholeSaleIntradayRevenue = calcWholesaleIntraday({
  //   revenueSensitivity,
  //   revenueSetup,
  //   assumptionsData,
  //   detailedRevenueData,
  //   startingAssumptionsForBatteries,
  //   inflationInputs,
  //   modelStartDate,
  //   operationStartDate,
  //   decommissioningStartDate,
  //   decommissioningEndDate,
  //   vintage
  // });
  let upsidePotential: number[] = [];
  let tradingFloorTopUp: number[] = [];
  const tradingFloor = optimiser.floor.floorPrice;
  const averageBatteryCapacityInperiod = vintage.totalGenerationCapacity;
  const tradingFloorAsAPercentOfPeriod = 0;
  const tradingFloorValue = averageBatteryCapacityInperiod.map(
    (d: any) => d * tradingFloorAsAPercentOfPeriod * tradingFloor
  );
  upsidePotential = wholesaleDayAhead.map(
    (d, index) =>
      ((d +
        wholesaleDayIntraday[index] +
        balancingMechanism[index] +
        frequencyResponse[index] +
        balancingReserve[index] +
        capacityMarket[index]) *
        optimiser.switch *
        optimiser.upsideValue) /
      100
  );

  tradingFloorTopUp = tradingFloorValue.map((d: any, index: number) =>
    Math.max(
      d -
        upsidePotential[index] -
        (wholesaleDayIntraday[index] +
          balancingMechanism[index] +
          frequencyResponse[index] +
          balancingReserve[index] +
          capacityMarket[index]),
      0
    )
  );
  const optimiserCommission = frequencyResponse.map(
    (d, index) =>
      -(
        optimiser.commission *
        (d +
          wholesaleDayIntraday[index] +
          balancingMechanism[index] +
          wholesaleDayAhead[index] +
          capacityMarket[index] +
          upsidePotential[index] +
          balancingReserve[index] +
          tradingFloorTopUp[index])
      ) / 100
  );

  return addZeros(optimiserCommission, period);
}
