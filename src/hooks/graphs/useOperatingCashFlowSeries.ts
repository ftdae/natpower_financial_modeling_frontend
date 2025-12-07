import moment from "moment";
import { useMemo, useState } from "react";
import { selectResult } from "../../store/slices/resultSlice";
import { useAppSelector } from "../../hooks/hooks";
import { DATE_FORMAT } from "../../utils/usePrameter";
import {
  getFilterData,
  getQuarterNumberFromModelStartDate,
} from "../../calculation/calculates/utils";
import { selectParam } from "../../store/slices/parameterSlice";

export function useOperatingCashFlowSeries(active: string) {
  const { currentProjectType, emarineCalculationResults } =
    useAppSelector(selectParam);

  const { modelStartDate, decommissioningEndDate } =
    useAppSelector(selectResult);

  const decomEndDateForEmarine = useMemo(() => {
    const endForEmarine =
      emarineCalculationResults?.current_project?.decom_end_date == 0 ||
      emarineCalculationResults?.current_project?.decom_end_date <
        modelStartDate
        ? decommissioningEndDate
        : emarineCalculationResults?.current_project?.decom_end_date;
    return endForEmarine;
  }, [emarineCalculationResults]);

  const period =
    getQuarterNumberFromModelStartDate(modelStartDate, decomEndDateForEmarine) -
    1;

  const [dateRange, setDateRange] = useState({
    from: modelStartDate,
    to: moment(modelStartDate)
      .add(period, "quarters")
      .add(-1, "days")
      .format(DATE_FORMAT),
  });

  const operatingCFData = useMemo(() => {
    const operatingCF =
      emarineCalculationResults?.current_project?.cf_results
        ?.operating_cashflow;

    const resultForQuarter = [
      {
        name: "Operating cashflow" as string,
        data: (operatingCF || new Array(100).fill(0))
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
        name: "Operating cashflow" as string,
        data: getFilterData(
          operatingCF || new Array(100).fill(0),
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
  }, [emarineCalculationResults, active]);

  return operatingCFData;
}
