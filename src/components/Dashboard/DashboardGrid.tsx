import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { memo, useMemo } from "react";
import GroupedTypeSelectorForGraph from "../FinStatements/GroupedTypeSelectorForGraph";
import { CustomHighchartsGraph } from "../../pages/graph/CustomHighchartGraph";
import ParamCollapsableTable from "../FinStatements/StatementTable";
import ProjectValuationTable from "../../pages/ProjectValuationTable";
import React from "react";
import GroupedTypeSelector from "../FinStatements/GroupedTypeSelector";
import DateRangePicker from "../FinStatements/DateRangePicker";
import FirstICKPIsTable from "../../pages/BasicInformationTable";
import OperationInfoTable from "../../pages/OperationInfoTable";
import BasicInfoTable from "../../pages/BasicInformationTable";
import { useAppSelector } from "../../hooks/hooks";
import { selectParam } from "../../store/slices/parameterSlice";
import EmarineFirstYearFinancialsTable from "../../pages/EmarineFirstYearFinancialsTable";
import EmarineLastYearFinancialsTable from "../../pages/EmarineLastYearFinancialsTable";
import AggregatedProjectValuationTable from "../../pages/AggregatedProjectValuationTable";
import AggregatedFirstYearFinancialsTable from "../../pages/AggregatedFirstYearFinancialsTable";
import AggregatedLastYearFinancialsTable from "../../pages/AggregatedLastYearFinancialsTable";

interface DateRange {
  to: string;
  from: string;
}

interface DashboardGridProps {
  id: string;
  title: string;
  series: any;
  active: boolean;
  setActive: (active: any) => void;
  hasTotal?: boolean;
  tableProps?: any;
  type?: string;
  dateRange?: DateRange;
  modelStartDate?: string;
  decommissioningEndDate?: string;
  setDateRange?: (item: DateRange) => void;
}
export const DashboardGrid = memo(
  ({
    id,
    title,
    series,
    active,
    setActive,
    hasTotal,
    tableProps,
    type,
    dateRange,
    modelStartDate,
    decommissioningEndDate,
    setDateRange,
  }: DashboardGridProps) => {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging,
    } = useSortable({ id });
    const { currentProjectType, emarineCalculationResults } =
      useAppSelector(selectParam);
    const style = {
      transform: CSS.Transform.toString(transform),
      transition: !isDragging ? null : "transform 200ms ease",
      opacity: isDragging ? 0.8 : 1,
    };

    const memoizedChart = useMemo(
      () =>
        type === "Chart" ? (
          <div className="h-[540px]">
            <CustomHighchartsGraph
              title={title}
              series={series}
              height="540px"
              yAxis="£'000"
            />
          </div>
        ) : null,
      [title, series]
    );

    const memoizedTable = useMemo(() => {
      if ((title !== "Project Valuation" && title !== "Aggregated Valuation") && type === "Table") {
        const { headers, tableData, boldRows } = tableProps;
        return (
          <div className="overflow-auto h-[500px] shadow-lg">
            <ParamCollapsableTable
              headers={headers}
              itemList={tableData}
              hasTotal={hasTotal}
              boldRows={boldRows}
              size="sm"
            />
          </div>
        );
      }
      // if (title !== "Aggregated Valuation" && type === "Table") {
      //   const { headers, tableData, boldRows } = tableProps;
      //   return (
      //     <div className="overflow-auto h-[500px] shadow-lg">
      //       <ParamCollapsableTable
      //         headers={headers}
      //         itemList={tableData}
      //         hasTotal={hasTotal}
      //         boldRows={boldRows}
      //         size="sm"
      //       />
      //     </div>
      //   );
      // }
      return;
    }, [tableProps, active, dateRange]);

    const ProjectValuationTableMemoized = useMemo(() => {
      return React.memo(() => <ProjectValuationTable />);
    }, [emarineCalculationResults]);
    const AggregatedValuationTableMemoized = useMemo(() => {
      return React.memo(() => <AggregatedProjectValuationTable />);
    }, [emarineCalculationResults]);
    const BasicInfoTableMemoized = useMemo(() => {
      return React.memo(() => <BasicInfoTable />);
    }, []);
    const OperationInfoTableMemoized = useMemo(() => {
      return React.memo(() => <OperationInfoTable />);
    }, []);
    const EmarineFirstYearFinancialTableMemorized = useMemo(() => {
      return React.memo(() => <EmarineFirstYearFinancialsTable />);
    }, []);
    const EmarineLastYearFinancialTableMemorized = useMemo(() => {
      return React.memo(() => <EmarineLastYearFinancialsTable />);
    }, []);
    const AggregatedFirstYearFinancialTableMemorized = useMemo(() => {
      return React.memo(() => <AggregatedFirstYearFinancialsTable />);
    }, []);
    const AggregatedLastYearFinancialTableMemorized = useMemo(() => {
      return React.memo(() => <AggregatedLastYearFinancialsTable />);
    }, []);
    const selectPeriod = (val: string) => {
      setActive((prevState) => ({
        ...prevState,
        [id]: val,
      }));
    };
    return (
      <div
        ref={setNodeRef}
        style={style}
        className={`flex flex-col shadow-lg rounded-lg bg-white w-full ${(title === "Project Valuation" || title === "Aggregated Valuation") ? "pb-10" : "2xl:w-[49%]"
          }  `}
      >
        <div
          {...attributes}
          {...listeners}
          className="handle cursor-move p-2 bg-[#1C2536] text-white rounded-t-lg"
        >
          {title}
        </div>
        {type === "Chart" && (
          <>
            <div className="px-5 py-3 w-full flex justify-center">
              <GroupedTypeSelectorForGraph
                active={active[id]}
                setActive={selectPeriod}
                size="sm"
              />
            </div>
            {memoizedChart}
          </>
        )}
        {type === "Table" && (
          <>
            {title === "Project Valuation" ? (
              <ProjectValuationTableMemoized />
            ) : title === "Aggregated Valuation" ? (
              <AggregatedValuationTableMemoized />
            ) :
              title == 'First Year Financials' ? (<EmarineFirstYearFinancialTableMemorized />) :
                title == 'Last Year Financials' ? (<EmarineLastYearFinancialTableMemorized />) :
                  title == 'Last Year Financials for Aggregated' ? (<AggregatedLastYearFinancialTableMemorized />) :
                    title == 'First Year Financials for Aggregated' ? (<AggregatedFirstYearFinancialTableMemorized />) :

                      title === "Basic Information Overview" ? (
                        <BasicInfoTableMemoized />
                      ) : title === "Operation Information Overview" ? (
                        <OperationInfoTableMemoized />
                      )
                        : (
                          <>
                            <div className="px-5 py-3 flex w-full gap-3 flex-wrap justify-between rounded-b-lg">
                              <GroupedTypeSelector
                                active={active[id]}
                                setActive={selectPeriod}
                                size="sm"
                              />
                              <DateRangePicker
                                value={dateRange}
                                size="sm"
                                minDate={modelStartDate}
                                maxDate={decommissioningEndDate}
                                onChange={(v) => {
                                  setDateRange(v);
                                }}
                                onClearDates={() => {
                                  setDateRange({
                                    from: modelStartDate,
                                    to: decommissioningEndDate,
                                  });
                                }}
                              />
                            </div>

                            {memoizedTable}
                          </>
                        )}
          </>
        )}
      </div>
    );
  }
);
