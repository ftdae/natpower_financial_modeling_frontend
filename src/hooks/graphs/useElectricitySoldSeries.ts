import moment from "moment";
import { useMemo, useState } from "react";
import { selectResult } from "../../store/slices/resultSlice";
import { useAppSelector } from "../../hooks/hooks";
import {
  getFilterData,
  getQuarterNumberFromModelStartDate,
  preProcessArray4Graph,
} from "../../calculation/calculates/utils";
import { DATE_FORMAT } from "../../utils/usePrameter";

export function useElectricitySoldSeries(active: string) {
  const {
    modelStartDate,
    operationStartDate,
    vintage,
    decommissioningEndDate,
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

  const revenueData = useMemo(() => {
    const electricity_sold = vintage?.electricitySold;

    const resultForQuarter = [
      {
        name: "Electricity sold",
        data: preProcessArray4Graph(electricity_sold || new Array(0).fill(100))
          .concat(new Array(20).fill(0))
          .map((r, index) => [
            moment(modelStartDate)
              .add(index, "quarters")
              .startOf("month")
              .valueOf(),
            Number(r),
          ]),
      },
    ];
    const resultForAnnual = [
      {
        name: "Electricity sold",
        data: preProcessArray4Graph(
          getFilterData(
            electricity_sold || new Array(0).fill(100),
            modelStartDate,
            active,
            dateRange
          )
        )
          .concat(new Array(5).fill(0))
          .map((r, index) => [
            moment(modelStartDate)
              .add(-1, "day")
              .add((index + 1) * 4, "quarters")
              .endOf("month")
              .valueOf(),
            Number(r),
          ]),
      },
    ];
    return active == "quarterly" ? resultForQuarter : resultForAnnual;
  }, [modelStartDate, operationStartDate, vintage, active]);

  return revenueData
}
