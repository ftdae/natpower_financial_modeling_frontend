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
  arrayFillWithZeroAndOne,
  getAsAPercentOfPeriod,
  getFlagOfPeriod,
  getQuarterNumberFromModelStartDate,
  inflationIndex,
  multiplyNumber,
  normalizeArray,
  roundArray,
  sumArray,
  sumArrays,
} from "../utils";
import { DEFAULT_EXTENDED_WARRANTY, DEFAULT_O_AND_M } from "./constant";
import { IExtendedWarranty, IOAndM } from "./type";

export function calcOperationAndManagementCost({
  batteryDuration = 4,
  inflationInputs = DEFAULT_INFLATION_INPUTS,
  operationAndManagementSettings = DEFAULT_O_AND_M,
  operationStartDate = "2028-01-01",
  modelStartDate = "2023-01-01",
  operationEndDate = "2067-12-31",
  decommissioningEndDate = "2068-06-30",
  opexSensitivity = 0,
  vintage = DEFAULT_VINTAGE,
  extended_warranty = DEFAULT_EXTENDED_WARRANTY,
  constraintFactor = 100,
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
  extended_warranty?: IExtendedWarranty;
}) {
  const period =
    getQuarterNumberFromModelStartDate(modelStartDate, decommissioningEndDate) -
    1;
  // const fixedCost = [];

  const operationsAsAPercentOfPeriod = getAsAPercentOfPeriod(
    modelStartDate,
    operationStartDate,
    operationEndDate,
    decommissioningEndDate
  );
  const operationFlag = getFlagOfPeriod(
    modelStartDate,
    operationStartDate,
    operationEndDate,
    decommissioningEndDate
  );

  const fixedData = operationAndManagementSettings.find(
    (d) => d.type == "Fixed"
  );

  const variableData = operationAndManagementSettings.find(
    (d) => d.type == "Variable"
  );

  const fixedIndexValue = normalizeArray(
    annualIndexToMonths(
      inflationIndex({
        inflationInputs,
        baseYear: fixedData?.baseYear,
        profile: fixedData?.inflationProfile,
      }).slice(2)
    ),
    period
  );

  const quarterlyFixedCost =
    (fixedData.cost.find((d) => d.duration == batteryDuration).value *
      (1 + opexSensitivity)) /
    -4;

  const fixedCost =
    operationsAsAPercentOfPeriod.map(
      (d, index) => d * fixedIndexValue[index] * quarterlyFixedCost
    ) || new Array(period).fill(0);

  // variableCost = quarterlyVariableCost*variableIndexValue*averageBatteryCapacity*constraintFactor.

  const variableIndexValue = normalizeArray(
    annualIndexToMonths(
      inflationIndex({
        inflationInputs,
        baseYear: variableData?.baseYear,
        profile: variableData?.inflationProfile,
      }).slice(MODEL_START_YEAR - INFLATION_START_YEAR)
    ),
    period
  );

  const quarterlyVariableCost =
    (variableData?.cost.find((d) => d.duration == batteryDuration)?.value ||
      0 * (1 + opexSensitivity)) / -4;

  // calcs 18 Administrative costs ~~~ 18.03 O&M ~~~ Capacity of batteries outside of warranty
  // totalBessCapacity row 3272
  let totalBessCapacity: number[] = new Array(period).fill(0);

  // bessCapacityUnderWarranty row 3273
  let bessCapacityUnderWarranty: number[] = new Array(period).fill(0);

  // bessCapacityOutsideOfWarranty row 3274
  let bessCapacityOutsideOfWarranty: number[] = new Array(period).fill(0);

  const vintageCounter = vintage?.vintages?.length || 40;
  let capacityByVintage = new Array(vintageCounter);

  for (let i = 0; i < vintageCounter; i++) {
    capacityByVintage[i] = multiplyNumber(
      arrayFillWithZeroAndOne(
        vintage.vintages[i].data.stagingMonthNumber || period,
        vintage.vintages[i].data.disposalMonthNumber || period,
        period || 190
      ),
      vintage.vintages[i].data.capacityAddedAdjustedForEfficiency
    );
  }

  for (let i = 0; i < period; i++) {
    totalBessCapacity[i] = 0;
    for (let j = 0; j < vintageCounter; j++) {
      totalBessCapacity[i] += capacityByVintage[j][i];
    }
  }

  // calcs ~~~ row 3352 - row 3391
  let warrantyFlagByVintage = new Array(vintageCounter);

  // calcs ~~~ row 3393 - row 3432
  let warrantyFlagByVintageByIncrement = new Array(vintageCounter);

  // calcs ~~~ row 3434 - row 3473
  let capacityWithWarrantyConsideration = new Array(vintageCounter);

  const warrantyPeriod: number =
    (extended_warranty?.length_of_warranty || 15) * 4;

  for (let i = 0; i < vintageCounter; i++) {
    warrantyFlagByVintage[i] = new Array(period).fill(0);
    warrantyFlagByVintageByIncrement[i] = new Array(period).fill(0);
    capacityWithWarrantyConsideration[i] = new Array(period).fill(0);
    let mw_for_warrantny_consideration = new Array(period).fill(0);
    if (vintage.vintages[i].data.stagingMonthNumber != "")
      mw_for_warrantny_consideration[
        vintage.vintages[i].data.stagingMonthNumber - 1
      ] = vintage.vintages[i].data.capacityAddedAdjustedForEfficiency;

    for (let j = 1; j < period; j++) {
      warrantyFlagByVintage[i][j] =
        (warrantyFlagByVintage[i][j - 1] +
          (mw_for_warrantny_consideration[j] == 0 ? 0 : 1) *
            (warrantyFlagByVintage[i][j - 1] == 0 ? 1 : 0)) *
        (warrantyFlagByVintageByIncrement[i][j - 1] < warrantyPeriod ? 1 : 0) *
        operationFlag[j];
      warrantyFlagByVintageByIncrement[i][j] =
        warrantyFlagByVintage[i][j] +
        warrantyFlagByVintageByIncrement[i][j - 1] *
          warrantyFlagByVintage[i][j];
      capacityWithWarrantyConsideration[i][j] =
        vintage.vintages[i].data.capacityAddedAdjustedForEfficiency *
        warrantyFlagByVintage[i][j];
    }
  }

  for (let i = 0; i < period; i++) {
    bessCapacityUnderWarranty[i] = 0;
    for (let j = 0; j < vintageCounter; j++) {
      bessCapacityUnderWarranty[i] += capacityWithWarrantyConsideration[j][i];
      bessCapacityOutsideOfWarranty[i] = Math.max(
        totalBessCapacity[i] - bessCapacityUnderWarranty[i],
        0
      );
    }
  }

  const variableCost =
    roundArray(
      bessCapacityOutsideOfWarranty.map(
        (d, index) =>
          (d *
            quarterlyVariableCost *
            operationsAsAPercentOfPeriod[index] *
            variableIndexValue[index] *
            constraintFactor) /
          100
      ),
      10
    ) || new Array(period).fill(0);

  return addZeros(sumArrays(variableCost, fixedCost), period);
}
