import moment from "moment";
import { useMemo, useState } from "react";
import { selectResult } from "../../store/slices/resultSlice";
import { useAppSelector } from "../../hooks/hooks";
import { DATE_FORMAT } from "../../utils/usePrameter";
import {
  getFilterData,
  getQuarterNumberFromModelStartDate,
} from "../../calculation/calculates/utils";


export function useNetCashFlowSeries(active: string) {
  const { mCapexProvision, modelStartDate, decommissioningEndDate } =
    useAppSelector(selectResult);
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
    const net_cash_flow = mCapexProvision?.netCashflow;

    const resultForQuarter = [
      {
        name: "Net cashflow" as string,
        data: (net_cash_flow || new Array(100).fill(0))
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
        name: "Net cashflow" as string,
        data: getFilterData(
          net_cash_flow || new Array(100).fill(0),
          modelStartDate,
          active,
          dateRange
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
  }, [mCapexProvision, active]);

  return revenueData
}
