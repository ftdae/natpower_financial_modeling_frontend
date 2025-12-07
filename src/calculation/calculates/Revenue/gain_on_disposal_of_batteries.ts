import {
  DEFAULT_BATTERY_CUBES,
  DEFAULT_BATTERY_DISPOSAL,
  DEFAULT_BATTERY_EXCUBES,
  DEFAULT_BESS_CAPEX_FORECAST,
  DEFAULT_CAPEX_FORECAST_SCENARIO_DATA,
  DEFAULT_INFLATION_INPUTS,
  DEFAULT_VINTAGE,
} from "../constant";
import {
  annualIndexToMonths,
  calcCapexForecast,
  getQuarterNumberFromModelStartDate,
  multiplyNumber,
  normalizeArray,
  roundArray,
  sumArray,
} from "../utils";
import {
  IBatteryCubes,
  IBatteryDisposal,
  IBatteryExcubes,
  IBessCapexForecast,
  ICapexForecastData,
  IInflationForm,
  IVintage,
} from "./type";

export function calcGainOnDisposal({
  gainOnDisposalSwitch = 1,
  model = "Conservative",
  batteryDuration = 4,
  batteryCubes = DEFAULT_BATTERY_CUBES,
  batteryExCubes = DEFAULT_BATTERY_EXCUBES,
  inflationInputs = DEFAULT_INFLATION_INPUTS,
  bessCapexForecast = DEFAULT_BESS_CAPEX_FORECAST,
  batterySensitivity = 0,
  operationYears = 40,
  modelStartDate = "2023-01-01",
  // decommissioningStartDate = '2068-01-01',
  decommissioningEndDate = "2068-06-30",
  vintage = DEFAULT_VINTAGE,
  capexForecastScenarioData = DEFAULT_CAPEX_FORECAST_SCENARIO_DATA,
  batteryDisposals = DEFAULT_BATTERY_DISPOSAL,
}: {
  gainOnDisposalSwitch?: number;
  model?: string;
  batteryDuration?: number;
  batteryCubes?: IBatteryCubes;
  batteryExCubes?: IBatteryExcubes;
  inflationInputs?: IInflationForm[];
  bessCapexForecast?: IBessCapexForecast;
  batterySensitivity?: number;
  operationYears?: number;
  modelStartDate?: string;
  operationStartDate?: string;
  decommissioningStartDate?: string;
  decommissioningEndDate?: string;
  vintage?: IVintage;
  capexForecastScenarioData?: ICapexForecastData[];
  batteryDisposals?: IBatteryDisposal;
}) {
  const decommissioningEndMonthNumber =
    getQuarterNumberFromModelStartDate(modelStartDate, decommissioningEndDate) -
    1;

  const forecastCapexCost = normalizeArray(
    annualIndexToMonths(
      calcCapexForecast({
        capexForecastScenarioData,
        model,
        batteryDuration,
        batteryCubes,
        batteryExCubes,
        inflationInputs,
        bessCapexForecast,
        batterySensitivity,
        operationYears,
      })[2]
    ),
    decommissioningEndMonthNumber
  );

  const vintages = vintage.vintages;
  const numberOfVintages = vintages.length;

  let forecastRecycleRevenue: number[] = new Array(
    decommissioningEndMonthNumber
  ).fill(0);
  // for (let i = 0; i < decommissioningEndMonthNumber; i++) {
  //   forecastRecycleRevenue.push(0);
  // }

  for (let i = 0; i < numberOfVintages; i++) {
    if (vintages[i].data.disposalMonthNumber != 0)
      forecastRecycleRevenue[vintages[i].data.disposalMonthNumber - 1] =
        forecastRecycleRevenue[vintages[i].data.disposalMonthNumber - 1] +
        (forecastCapexCost[vintages[i].data.disposalMonthNumber - 1] *
          vintages[i].data.capacityAddedAdjustedForEfficiency *
          batteryDisposals.recyclePricePercent) /
          100;
  }

  // calculation of closing bookvalue of vintages.
  let bookValueAtPointOfDisposal: number[] = new Array(
    decommissioningEndMonthNumber
  ).fill(0);

  for (let i = 0; i < numberOfVintages; i++) {
    if (vintages[i].data.disposalMonthNumber != 0) {
      bookValueAtPointOfDisposal[vintages[i].data.disposalMonthNumber - 1] =
        bookValueAtPointOfDisposal[vintages[i].data.disposalMonthNumber - 1] +
        vintages[i].data.endBalance[vintages[i].data.disposalMonthNumber - 1];
    }
  }
  const gainOnDisposalRevenue = roundArray(
    forecastRecycleRevenue.map(
      (d, index) =>
        (d - bookValueAtPointOfDisposal[index]) * gainOnDisposalSwitch
    ),
    20
  );
  return {
    bookValueAtPointOfDisposal: bookValueAtPointOfDisposal,
    forecastRecycleRevenue: forecastRecycleRevenue,
    gainOnDisposalRevenue: gainOnDisposalRevenue,
  };
}
