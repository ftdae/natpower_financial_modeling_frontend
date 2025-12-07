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

export function useEmarineThroughputUtilisationSeries(active: string) {
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

    const chartData = useMemo(() => {
        const directData = emarineCalculationResults?.current_project?.throughput_utilisation_graph_data

        const coldIroningCliOne = directData?.ci_cli_1
        const coldIroningCliTwo = directData?.ci_cli_2
        const coldIroningCliThree = directData?.ci_cli_3
        const propulsionCliOne = directData?.propul_cli_1
        const propulsionCliTwo = directData?.propul_cli_2
        const propulsionCliThree = directData?.propul_cli_3
        const resultForQuarter = [
            {
                name: "Client 1 - cold-ironing %" as string,
                data: (coldIroningCliOne || new Array(100).fill(0))
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
                name: "Client 2 - cold-ironing %" as string,
                data: (coldIroningCliTwo || new Array(100).fill(0))
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
                name: "Client 3 - cold-ironing %" as string,
                data: (coldIroningCliThree || new Array(100).fill(0))
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
                name: "Client 1 - propulsion %" as string,
                data: (propulsionCliOne || new Array(100).fill(0))
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
                name: "Client 2 - propulsion %" as string,
                data: (propulsionCliTwo || new Array(100).fill(0))
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
                name: "Client 3 - propulsion %" as string,
                data: (propulsionCliThree || new Array(100).fill(0))
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
                name: "Client 1 - cold-ironing %" as string,
                data: getFilterData(
                    coldIroningCliOne || new Array(100).fill(0),
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
                name: "Client 2 - cold-ironing %" as string,
                data: getFilterData(
                    coldIroningCliTwo || new Array(100).fill(0),
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
                name: "Client 3 - cold-ironing %" as string,
                data: getFilterData(
                    coldIroningCliThree || new Array(100).fill(0),
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
                name: "Client 1 - propulsion %" as string,
                data: getFilterData(
                    propulsionCliOne || new Array(100).fill(0),
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
                name: "Client 2 - propulsion %" as string,
                data: getFilterData(
                    propulsionCliTwo || new Array(100).fill(0),
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
                name: "Client 3 - propulsion %" as string,
                data: getFilterData(
                    propulsionCliThree
                    || new Array(100).fill(0),
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

    return chartData;
}
