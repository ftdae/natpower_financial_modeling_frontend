import {
  INFLATION_START_YEAR,
  MODEL_START_YEAR,
} from "../../../utils/constant";
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
import { DEFAULT_INFLATION_INPUTS, DEFAULT_VINTAGE } from "../constant";
import {
  addZeros,
  annualIndexToMonths,
  getAsAPercentOfPeriod,
  getQuarterNumberFromModelStartDate,
  inflationIndex,
  normalizeArray,
  roundArray,
} from "../utils";
import { DEFAULT_ASSET_MANAGEMENT, DEFAULT_TOTAL_REVENUE } from "./constant";
import { IAssetManagement, IOAndM } from "./type";

export function calcAssetManagementCosts({
  assetManagement = DEFAULT_ASSET_MANAGEMENT,
  decommissioningEndDate = "2068-06-30",
  modelStartDate = "2023-01-01",
  constraintFactor = 100,
  inflationInputs = DEFAULT_INFLATION_INPUTS,
  opexSensitivity = 0,
  vintage = DEFAULT_VINTAGE,
  totalRevenue = DEFAULT_TOTAL_REVENUE,
}: {
  assetManagement?: IAssetManagement;
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
  batteryCubes?: IBatteryCubes;
  batteryExCubes?: IBatteryExcubes;
  capexPaymentsProfile?: ICapexPaymentForm[];
  capexPaymentMilestones?: ICapexPaymentMilestoneForm[];
  capexUEL?: ICapexUELForm[];
  bessCapexForecast?: IBessCapexForecast;
  batterySensitivity?: number;
  operationYears?: number;
  operationAndManagementSettings?: IOAndM[];
  constraintFactor?: number;
  inflationInputs?: IInflationForm[];
  batteryDuration?: number;
  operationStartDate?: string;
  modelStartDate?: string;
  operationEndDate?: string;
  decommissioningStartDate?: string;
  decommissioningEndDate?: string;
  constructionStartDate?: string;
  opexSensitivity?: number;
  vintage?: IVintage;
  totalRevenue?: number[];
}) {
  const period =
    getQuarterNumberFromModelStartDate(modelStartDate, decommissioningEndDate) -
    1;
  const assetManagementAsAPercentOfPeriod_1 = getAsAPercentOfPeriod(
    modelStartDate,
    assetManagement.firstPeriod.startDate,
    assetManagement.firstPeriod.endDate,
    decommissioningEndDate
  );
  const costBasedOnRevenue_1 = assetManagementAsAPercentOfPeriod_1.map(
    (d, index) =>
      (((1 + opexSensitivity) *
        -d *
        (assetManagement.firstPeriod.feesAsAPercentOfRevenue
          .realTimeManagement +
          assetManagement.firstPeriod.feesAsAPercentOfRevenue.maintenance)) /
        100) *
      totalRevenue[index]
  );

  const indexValue_1 = normalizeArray(
    annualIndexToMonths(
      inflationIndex({
        inflationInputs,
        baseYear: assetManagement.firstPeriod.baseYear,
        profile: assetManagement.firstPeriod.inflationProfile,
      }).slice(MODEL_START_YEAR - INFLATION_START_YEAR)
    ),
    period
  );

  const averageBatteryCapacityInPeriod = vintage.totalGenerationCapacity;

  const costBasedOnMW_1 = averageBatteryCapacityInPeriod.map(
    (d, index) =>
      ((((1 + opexSensitivity) * -d) / 4) *
        (assetManagement.firstPeriod.feesPerMW.realTimeManagement * 1 +
          assetManagement.firstPeriod.feesPerMW.maintenance * 1) *
        indexValue_1[index] *
        assetManagementAsAPercentOfPeriod_1[index] *
        constraintFactor) /
      100
  );

  const costOfPeriod_1 = costBasedOnMW_1.map(
    (d, index) => d + costBasedOnRevenue_1[index]
  );
  // const assetManagementAsAPercentOfPeriod_2 = getAsAPercentOfPeriod(
  //   modelStartDate,
  //   assetManagement.secondPeriod.startDate,
  //   assetManagement.secondPeriod.endDate,
  //   decommissioningEndDate
  // );
  return addZeros(costOfPeriod_1, period);
}
