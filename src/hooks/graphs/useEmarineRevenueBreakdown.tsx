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

export function useEmarineRevenueBreakdownSeries(active: string) {
    const { currentProjectType, emarineCalculationResults } =
        useAppSelector(selectParam);

    const { modelStartDate, decommissioningEndDate } =
        useAppSelector(selectResult);

    const decomEndDateForEmarine = useMemo(() => {
        const endForEmarine =
            emarineCalculationResults?.current_project?.decom_end_date == 0 ||
                emarineCalculationResults?.current_project?.decom_end_date < modelStartDate
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

    const revenueBreakdownData = useMemo(() => {
        const arbitrageRev =
            emarineCalculationResults?.current_project?.revenue_breakdown_by_category_graph_data?.arbitrage_revenue;
        const ciRev =
            emarineCalculationResults?.current_project?.revenue_breakdown_by_category_graph_data?.cold_ironing_revenue;

        const propulRev =
            emarineCalculationResults?.current_project?.revenue_breakdown_by_category_graph_data?.propulsion_revenue;

        const resultForQuarter = [
            {
                name: "Arbitrage revenue" as string,
                data: (arbitrageRev || new Array(100).fill(0))
                    .concat(new Array(20).fill(0))
                    .map((r, index) => [
                        moment(modelStartDate)
                            .add(index, "quarters")
                            .startOf("month")
                            .valueOf(),
                        Number(r),
                    ]),
            },
            {
                name: "Cold-ironing revenue" as string,
                data: (ciRev || new Array(100).fill(0))
                    .concat(new Array(20).fill(0))
                    .map((r, index) => [
                        moment(modelStartDate)
                            .add(index, "quarters")
                            .startOf("month")
                            .valueOf(),
                        Number(r),
                    ]),
            },
            {
                name: "Propulsion revenue" as string,
                data: (propulRev || new Array(100).fill(0))
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
                name: "Arbitrage revenue" as string,
                data: getFilterData(
                    arbitrageRev || new Array(100).fill(0),
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
            {
                name: "Cold-ironing revenue" as string,
                data: getFilterData(
                    ciRev || new Array(100).fill(0),
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
            {
                name: "Propulsion revenue" as string,
                data: getFilterData(
                    propulRev || new Array(100).fill(0),
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

    return revenueBreakdownData;
}
