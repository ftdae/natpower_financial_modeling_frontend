import moment from "moment";
import { useMemo, useState } from "react";
import {
  getCyclesPerMonth,
  getFilterData,
  getQuarterNumberFromModelStartDate,
  preProcessArray4Graph,
} from "../../calculation/calculates/utils";
import { useAppSelector } from "../../hooks/hooks";
import { selectResult } from "../../store/slices/resultSlice";

import { DATE_FORMAT } from "../../utils/usePrameter";
import GroupedTypeSelectorForGraph from "../../components/FinStatements/GroupedTypeSelectorForGraph";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";


export function useBatteryCyclesSeries(active: string) {
  const {
    modelStartDate,
    operationStartDate,
    decommissioningStartDate,
    decommissioningEndDate,
    revenueSetup,
    assumptionsData,
    startingAssumptionsForBatteries,
    batteryDisposals,
    batteryEfficiency,
    batteryAugmentation,
    capexForecastModel,
    capexPaymentsProfile,
    capexUEL,
    revenueSensitivity,
    batterySensitivity: sensitivity,
    detailedRevenueData,
    batteryDuration,
    batteryCubes,
    inflationInputs,
    batteryExCubes,
    capexPaymentMilestones,
    bessCapexForecast,
    lengthOfOperations,
    initialCycleData,
    initialCapacity,
    gainOnDisposal,
    wholesaleDayAhead,
    insuranceExpense,
    ebit,
    afryRevenueData,
  } = useAppSelector(selectResult);
  const period =
    getQuarterNumberFromModelStartDate(modelStartDate, decommissioningEndDate) -
    1;

  const [dateRange, setDateRange] = useState({
    from: modelStartDate,
    to: moment(modelStartDate)
      .add(period, "quarters")
      .add(-1, "days")
      .format(DATE_FORMAT),
  });
  const graphData = useMemo(() => {
    const payload = {
      revenueSensitivity,
      revenueSetup,
      assumptionsData,
      detailedRevenueData,
      startingAssumptionsForBatteries,
      inflationInputs,
      initialCycleData,
      initialCapacity,
      batteryDisposals,
      batteryEfficiency,
      batteryAugmentation,
      model: capexForecastModel,
      batteryDuration,
      batteryCubes,
      batteryExCubes,
      capexPaymentsProfile,
      capexPaymentMilestones,
      capexUEL,
      bessCapexForecast,
      sensitivity,
      operationYears: lengthOfOperations / 12,
      modelStartDate,
      operationStartDate,
      decommissioningStartDate,
      decommissioningEndDate,
      afryRevenueData,
    };

    const batteryCyclesPerQuarter = getCyclesPerMonth(payload);
    const result = [
        {
          name: "Battery cycles",
          data: preProcessArray4Graph(
            (active === "quarterly"
              ? batteryCyclesPerQuarter
              : getFilterData(batteryCyclesPerQuarter, modelStartDate, active, dateRange)) || new Array(0).fill(100)
          )
            .concat(active === "quarterly" ? new Array(20).fill(0) : new Array(5).fill(0))
            .map((r, index) => [
              moment(modelStartDate)
                .add(active === "quarterly" ? index : (index + 1) * 4, "quarters")
                .startOf(active === "quarterly" ? "month" : "month")
                .valueOf(),
              Number(r),
            ]),
        },
      ];
      
      return result;
  }, [
    active,
    revenueSensitivity,
    revenueSetup,
    assumptionsData,
    detailedRevenueData,
    startingAssumptionsForBatteries,
    inflationInputs,
    initialCycleData,
    initialCapacity,
    batteryDisposals,
    batteryEfficiency,
    batteryAugmentation,
    capexForecastModel,
    batteryDuration,
    batteryCubes,
    batteryExCubes,
    capexPaymentsProfile,
    capexPaymentMilestones,
    capexUEL,
    bessCapexForecast,
    sensitivity,
    lengthOfOperations,
    modelStartDate,
    operationStartDate,
    decommissioningStartDate,
    decommissioningEndDate,
  ]);

  return graphData
}
