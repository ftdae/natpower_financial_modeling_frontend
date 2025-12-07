import { DEFAULT_VINTAGE } from "../constant";
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
  multiplyNumber,
  roundArray,
  sumArray,
} from "../utils";

export function calcVintagesDepreciation({
  modelStartDate = "2023-01-01",
  decommissioningEndDate = "2068-06-30",
  vintage = DEFAULT_VINTAGE,
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
  vintage?: IVintage;
}) {
  const period =
    getQuarterNumberFromModelStartDate(modelStartDate, decommissioningEndDate) -
    1;
  const vintages = vintage.vintages;
  const numberOfVintages = vintages.length;

  let depreciationOfAllVintages: number[] = multiplyNumber(
    vintages[0].data.forecastDepreciationChargeByPeriod,
    1
  );
  for (let i = 1; i < numberOfVintages; i++) {
    if (vintages[i].data.stagingMonthNumber != 0) {
      depreciationOfAllVintages = depreciationOfAllVintages.map(
        (d, index) =>
          d + 1 * vintages[i].data.forecastDepreciationChargeByPeriod[index]
      );
    } else break;
  }
  return addZeros(roundArray(depreciationOfAllVintages, 20), period);
}
