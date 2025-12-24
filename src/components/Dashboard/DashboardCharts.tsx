// import { DndContext, closestCenter } from "@dnd-kit/core";
// import { arrayMove, SortableContext } from "@dnd-kit/sortable";
// import { useState, useEffect } from "react";
// import { useCostOfSalesSeries } from "../../hooks/graphs/useCostOfSales";
// import { useBalanceSheetData } from "../../hooks/graphs/useBalanceSheet";
// import { useBatteryCyclesSeries } from "../../hooks/graphs/useBatteryCycleSeries";
// import { useElectricitySoldSeries } from "../../hooks/graphs/useElectricitySoldSeries";
// import { useNetCashFlowSeries } from "../../hooks/graphs/useNetCashFlowSeries";
// import { useRevenueSeries } from "../../hooks/graphs/useRevenue";
// import { useAdministrativeExpenseSeries } from "../../hooks/graphs/useAdministrativeExpenseSeries";
// import { useProfitAcrossTimeSeries } from "../../hooks/graphs/useProfitAndLossSeries";
// import { useCashFlowData } from "../../hooks/tables/useCashFlowData";
// import { useBalanceSheetData as BalanceSheetTableData } from "../../hooks/tables/useBalanceSheetData";
// import { useProfitLossData } from "../../hooks/tables/useProfitAndLossData";
// import { DashboardGrid } from "./DashboardGrid";
// import { useOperatingCashFlowSeries } from "../../hooks/graphs/useOperatingCashFlowSeries";
// import { useEmarineCapexAndVolumeSoldSeries } from "../../hooks/graphs/useEmarineCapexAndVolumeSold";
// import { useEmarineElectricityVolumeSoldPerPlugSeries } from "../../hooks/graphs/useEmarineElectricityVolumeSoldPerPlug";
// import { useEmarineRevenueBreakdownSeries } from "../../hooks/graphs/useEmarineRevenueBreakdown";
// import { useEmarineEntityTerminalRevOpexAdoptionCurve } from "../../hooks/graphs/useEmarineEntityTerminalRevOpexAdoptionCurve";
// import { useEmarineWholesaleSelloutPurchasePriceSeries } from "../../hooks/graphs/useEmarineWholesaleSelloutPurchasePrices";
// import { useEmarineCumulativeCapexSeries } from "../../hooks/graphs/useEmarineCumulativeCapexSeries";
// import { useEmarineThroughputUtilisationSeries } from "../../hooks/graphs/useEmarineThroughputUtilisationSeries";

// export function DashboardCharts({ selectedOptions }) {
//   const [active, setActive] = useState({
//     balanceSheet: "quarterly",
//     costOfSales: "quarterly",
//     averageBatteryCycles: "quarterly",
//     electricitySold: "quarterly",
//     netCashFlowSeries: "quarterly",
//     operatingCashFlowSeries: "quarterly",
//     capexAndVolumeSoldSeries: "quarterly",
//     electricitySoldPerPlugSeries: "quarterly",
//     revenueBreakdownSeries: "quarterly",
//     revenue: "quarterly",
//     administrativeExpense: "quarterly",
//     profitAndLoss: "quarterly",
//     balanceSheetTable: "quarterly",
//     cashFlowTable: "quarterly",
//     profitLossTable: "quarterly",
//     revenueOpexAdoptionCurves: "quarterly",
//     wholesaleMarketSelloutPrices: "quarterly",
//     cumulativeCapexOfSelectedEntity: "quarterly",
//     throughputUtilisation: "quarterly",



//   });

//   const [hasTotal, setHasTotal] = useState("true");

//   const balanceSheetSeries = useBalanceSheetData(active.balanceSheet);
//   const costOfSalesSeries = useCostOfSalesSeries(active.costOfSales);
//   const averageBatteryCycles = useBatteryCyclesSeries(
//     active.averageBatteryCycles
//   );
//   const eletricitySeries = useElectricitySoldSeries(active.electricitySold);
//   const netCashFlowSeries = useNetCashFlowSeries(active.netCashFlowSeries);
//   const operatingCashFlowSeries = useOperatingCashFlowSeries(active.operatingCashFlowSeries);
//   const capexAndVolumeSoldSeries = useEmarineCapexAndVolumeSoldSeries(active.capexAndVolumeSoldSeries);
//   const electricitySoldPerPlugSeries = useEmarineElectricityVolumeSoldPerPlugSeries(active.electricitySoldPerPlugSeries);
//   const revenueBreakdownSeries = useEmarineRevenueBreakdownSeries(active.revenueBreakdownSeries);
//   const revenueOpexAdoptionCurves = useEmarineEntityTerminalRevOpexAdoptionCurve(active.revenueOpexAdoptionCurves);
//   const wholesaleMarketSelloutPrices = useEmarineWholesaleSelloutPurchasePriceSeries(active.wholesaleMarketSelloutPrices);
//   const cumulativeCapexOfSelectedEntity = useEmarineCumulativeCapexSeries(active.cumulativeCapexOfSelectedEntity);
//   const throughputUtilisation = useEmarineThroughputUtilisationSeries(active.throughputUtilisation);



//   const revenueSeries = useRevenueSeries(active.revenue);
//   const administrativeExpense = useAdministrativeExpenseSeries(
//     active.administrativeExpense
//   );
//   const profitAndLossSeries = useProfitAcrossTimeSeries(active.profitAndLoss);

//   const {
//     headers: balanceSheetHeaders,
//     tableData: balanceSheetData,
//     boldRows: balanceSheetBoldRows,
//     dateRange: balanceSheetDateRange,
//     modelStartDate: balanceSheetModelStartDate,
//     decommissioningEndDate: balanceSheetDecommissioningEndDate,
//     setDateRange: balanceSheetSetDateRange,
//   } = BalanceSheetTableData(active.balanceSheetTable, hasTotal);
//   const {
//     headers: cashFlowHeaders,
//     tableData: cashFlowData,
//     boldRows: cashFlowBoldRows,
//     dateRange: cashFlowDateRange,
//     modelStartDate: cashFlowModelStartDate,
//     decommissioningEndDate: cashFlowDecommissioningEndDate,
//     setDateRange: cashFlowSetDateRange,
//   } = useCashFlowData(active.cashFlowTable, hasTotal);

//   const {
//     headers: profitLossHeaders,
//     tableData: profitLossData,
//     boldRows: profitLossBoldRows,
//     dateRange: profitLossDateRange,
//     modelStartDate: profitLossModelStartDate,
//     decommissioningEndDate: profitLossDecommissioningEndDate,
//     setDateRange: profitLossSetDateRange,
//   } = useProfitLossData(active.profitLossTable, hasTotal);

//   const [seriesData, setSeriesData] = useState([]);


//   useEffect(() => {
//     if (seriesData.length > 0) {
//       localStorage.setItem(
//         "dashboardSequence",
//         JSON.stringify(seriesData.map((item) => item.id))
//       );
//     }
//     if (Object.values(selectedOptions).every(value => !value)) {
//       localStorage.setItem("dashboardSequence", JSON.stringify([]));
//     }
//   }, [seriesData, selectedOptions]);

//   useEffect(() => {
//     const seriesLookup = {
//       balanceSheet: balanceSheetSeries,
//       costOfSales: costOfSalesSeries,
//       averageBatteryCycles: averageBatteryCycles,
//       electricitySold: eletricitySeries,
//       netCashFlowSeries: netCashFlowSeries,
//       operatingCashFlowSeries: operatingCashFlowSeries,
//       capexAndVolumeSoldSeries: capexAndVolumeSoldSeries,
//       electricitySoldPerPlugSeries: electricitySoldPerPlugSeries,
//       revenueBreakdownSeries: revenueBreakdownSeries,
//       revenueOpexAdoptionCurves: revenueOpexAdoptionCurves,
//       wholesaleMarketSelloutPrices: wholesaleMarketSelloutPrices,
//       revenue: revenueSeries,
//       administrativeExpense: administrativeExpense,
//       profitAndLoss: profitAndLossSeries,
//       cumulativeCapexOfSelectedEntity: cumulativeCapexOfSelectedEntity,
//       throughputUtilisation: throughputUtilisation,
//       balanceSheetTable: {
//         type: "table",
//         headers: balanceSheetHeaders,
//         tableData: balanceSheetData,
//         boldRows: balanceSheetBoldRows,
//         title: "Balance Sheet (£)",
//         dateRange: balanceSheetDateRange,
//         modelStartDate: balanceSheetModelStartDate,
//         decommissioningEndDate: balanceSheetDecommissioningEndDate,
//         setDateRange: balanceSheetSetDateRange,
//       },
//       cashFlowTable: {
//         type: "table",
//         headers: cashFlowHeaders,
//         tableData: cashFlowData,
//         boldRows: cashFlowBoldRows,
//         title: "Cash Flow (£)",
//         dateRange: cashFlowDateRange,
//         modelStartDate: cashFlowModelStartDate,
//         decommissioningEndDate: cashFlowDecommissioningEndDate,
//         setDateRange: cashFlowSetDateRange,
//       },
//       profitLossTable: {
//         type: "table",
//         headers: profitLossHeaders,
//         tableData: profitLossData,
//         boldRows: profitLossBoldRows,
//         title: "Profit and Loss (£)",
//         dateRange: profitLossDateRange,
//         modelStartDate: profitLossModelStartDate,
//         decommissioningEndDate: profitLossDecommissioningEndDate,
//         setDateRange: profitLossSetDateRange,
//       },
//       projectValuationTable: {
//         type: "table",
//         title: "Project Valuation",
//       },
//       aggregatedValuationTable: {
//         type: "table",
//         title: "Aggregated Valuation",
//       },
//       emarineFirstYearFinancialsTable: {
//         type: "table",
//         title: "First Year Financials",
//       },
//       emarineLastYearFinancialsTable: {
//         type: "table",
//         title: "Last Year Financials",
//       },
//       aggregatedFirstYearFinancialsTable: {
//         type: "table",
//         title: "First Year Financials for Aggregated",
//       },
//       aggregatedLastYearFinancialsTable: {
//         type: "table",
//         title: "Last Year Financials for Aggregated",
//       },
//       basicInfoTable: {
//         type: "table",
//         title: "Basic Information Overview",
//       },
//       operInfoTable: {
//         type: "table",
//         title: "Operation Information Overview",
//       },
//     };

//     setSeriesData((prevSeriesData) => {
//       const filteredSeriesData = prevSeriesData.filter(
//         (chart) => selectedOptions[chart.id]
//       );

//       const updatedSeriesData = filteredSeriesData.map((chart) => {
//         const newSeries = seriesLookup[chart.id];

//         // Update existing charts or tables based on their type
//         if (newSeries) {
//           if (newSeries?.type === "table") {
//             return { ...chart, tableProps: newSeries };
//           } else {
//             return { ...chart, series: newSeries };
//           }
//         }

//         return chart;
//       });

//       // Add new entries for selected options
//       Object.keys(selectedOptions).forEach((key) => {
//         if (
//           selectedOptions[key] &&
//           seriesLookup[key] &&
//           !updatedSeriesData.some((chart) => chart.id === key)
//         ) {
//           const newEntry = seriesLookup[key];
//           if (!newEntry?.type) {
//             updatedSeriesData.push({
//               id: key,
//               title: key
//                 .replace(/([A-Z])/g, " $1")
//                 .replace(/^./, (str) => str.toUpperCase()),
//               series: newEntry,
//             });
//           } else if (newEntry.type === "table") {
//             if (key === "projectValuationTable" || key === "aggregatedValuationTable") {
//               updatedSeriesData.push({
//                 id: key,
//                 title: newEntry.title,
//                 type: "Table",
//               });
//             } else {
//               updatedSeriesData.push({
//                 id: key,
//                 title: newEntry.title,
//                 type: "Table",
//                 dateRange: newEntry.dateRange,
//                 modelStartDate: newEntry.modelStartDate,
//                 decommissioningEndDate: newEntry.decommissioningEndDate,
//                 setDateRange: newEntry.setDateRange,
//                 tableProps: {
//                   headers: newEntry.headers,
//                   tableData: newEntry.tableData,
//                   boldRows: newEntry.boldRows,
//                 },
//               });
//             }
//           }
//         }
//       });

//       const dataInLocalStorage = JSON.parse(
//         localStorage.getItem("dashboardSequence")
//       );

//       if (seriesData.length === 0 && dataInLocalStorage?.length > 0) {
//         const updatedSequence = [];
//         dataInLocalStorage.forEach((series) => {
//           const matchingSeries = updatedSeriesData.find(
//             (data) => data.id === series
//           );
//           if (matchingSeries) {
//             updatedSequence.push(matchingSeries);
//           }
//         });

//         return updatedSequence;
//       }

//       return updatedSeriesData;
//     });
//   }, [
//     selectedOptions,
//     balanceSheetSeries,
//     costOfSalesSeries,
//     revenueSeries,
//     netCashFlowSeries,
//     operatingCashFlowSeries,
//     capexAndVolumeSoldSeries,
//     administrativeExpense,
//     averageBatteryCycles,
//     eletricitySeries,
//     profitAndLossSeries,
//     balanceSheetHeaders,
//     cashFlowHeaders,
//     profitLossHeaders,
//     revenueBreakdownSeries,
//     electricitySoldPerPlugSeries,
//     revenueOpexAdoptionCurves,
//     wholesaleMarketSelloutPrices,
//     cumulativeCapexOfSelectedEntity,
//     throughputUtilisation,
//   ]);

//   const handleDragEnd = (event: any) => {
//     const { active, over } = event;

//     if (active.id !== over?.id) {
//       setSeriesData((items) => {
//         const oldIndex = items.findIndex((item) => item.id === active.id);
//         const newIndex = items.findIndex((item) => item.id === over?.id);
//         return arrayMove(items, oldIndex, newIndex);
//       });
//     }
//   };

//   return (
//     <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
//       <div className="mt-10 flex flex-col w-full rounded-xl p-1">
//         <div className="flex flex-col gap-4 w-full flex-1 justify-start items-between">
//           <SortableContext items={seriesData.map((item) => item.id)}>
//             <div className="flex flex-wrap w-full gap-4 justify-center 2xl:justify-between">
//               {seriesData.length > 0 ? (
//                 seriesData.map((data) => (
//                   <DashboardGrid
//                     key={data.id}
//                     {...data}
//                     active={active}
//                     setActive={setActive}
//                     type={data?.type ?? "Chart"}
//                     hasTotal={hasTotal}
//                   />
//                 ))
//               ) : (
//                 <p>
//                   Please select a chart or table from the dropdown to display data on the
//                   dashboard
//                 </p>
//               )}
//             </div>
//           </SortableContext>
//         </div>
//       </div>
//     </DndContext>
//   );
// }
