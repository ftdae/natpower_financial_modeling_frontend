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

export function useEmarineCumulativeCapexSeries(active: string) {
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
        const directData = emarineCalculationResults?.current_project?.cumulative_capex_graph_data

        const oneOff = directData?.one_off
        const phaseOneInitial = directData?.phase_1_initial
        const phaseTwoInitial = directData?.phase_2_initial
        const phaseThreeInitial = directData?.phase_3_initial
        const phaseOneReplacement = directData?.phase_1_replacement
        const phaseTwoReplacement = directData?.phase_2_replacement
        const phaseThreeReplacement = directData?.phase_3_replacement
        const resultForQuarter = [
            {
                name: "One-off" as string,
                data: (oneOff || new Array(100).fill(0))
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
                name: "Phase 1 initial" as string,
                data: (phaseOneInitial || new Array(100).fill(0))
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
                name: "Phase 2 initial" as string,
                data: (phaseTwoInitial || new Array(100).fill(0))
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
                name: "Phase 3 initial" as string,
                data: (phaseThreeInitial || new Array(100).fill(0))
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
                name: "Phase 1 replacement" as string,
                data: (phaseOneReplacement || new Array(100).fill(0))
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
                name: "Phase 2 replacement" as string,
                data: (phaseTwoReplacement || new Array(100).fill(0))
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
                name: "Phase 3 replacement" as string,
                data: (phaseThreeReplacement || new Array(100).fill(0))
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
                name: "One-off" as string,
                data: getFilterData(
                    oneOff || new Array(100).fill(0),
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
                name: "Phase 1 initial" as string,
                data: getFilterData(
                    phaseOneInitial || new Array(100).fill(0),
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
                name: "Phase 2 initial" as string,
                data: getFilterData(
                    phaseTwoInitial || new Array(100).fill(0),
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
                name: "Phase 3 initial" as string,
                data: getFilterData(
                    phaseThreeInitial || new Array(100).fill(0),
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
                name: "Phase 1 replacement" as string,
                data: getFilterData(
                    phaseOneReplacement || new Array(100).fill(0),
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
                name: "Phase 2 replacement" as string,
                data: getFilterData(
                    phaseTwoReplacement
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
            {
                name: "Phase 3 replacement" as string,
                data: getFilterData(
                    phaseThreeReplacement || new Array(100).fill(0),
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
