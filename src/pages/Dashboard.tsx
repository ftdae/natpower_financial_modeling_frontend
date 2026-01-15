// import { useState, useMemo, useEffect } from "react";
// import { MultiSelect } from "primereact/multiselect";
// import { DashboardCharts } from "../components/Dashboard/DashboardCharts";
// import { usePDF, Options, Margin } from "react-to-pdf";
// import natpowerBiancoPng from "../assets/NatPower-Dark.png";
// import { useAppSelector } from "../hooks/hooks";
// import { selectParam } from "../store/slices/parameterSlice";

// const Dashboard = () => {
//   const { currentProjectType, emarineCalculationResults } =
//     useAppSelector(selectParam);

//   const { toPDF, targetRef } = usePDF({
//     filename: "Financial-modeling.pdf",
//     page: { margin: Margin.MEDIUM },
//   });
//   const [isLoading, setIsLoading] = useState(false);

//   const handleDownloadPDF = () => {
//     setIsLoading(true);
//     setTimeout(async () => {
//       await toPDF();
//       setIsLoading(false);
//     }, 500);
//   };

//   const ChartOptions = useMemo(
//     () => {
//       if (currentProjectType == 'bess')
//         return [
//           { name: "Balance Sheet", code: "balanceSheet" },
//           { name: "Cost of Sales", code: "costOfSales" },
//           { name: "Average Battery Cycles", code: "averageBatteryCycles" },
//           { name: "Electricity Sold", code: "electricitySold" },
//           { name: "Net Cash Flow Series", code: "netCashFlowSeries" },
//           { name: "Revenue", code: "revenue" },
//           { name: "Administrative Expense", code: "administrativeExpense" },
//           { name: "Profit and Loss", code: "profitAndLoss" },
//           { name: "Balance Sheet Table", code: "balanceSheetTable" },
//           { name: "Cash Flow Table", code: "cashFlowTable" },
//           { name: "Profit and Loss Table", code: "profitLossTable" },
//           { name: "Project Valuation", code: "projectValuationTable" },
//           { name: "Basic Information Overview", code: "basicInfoTable" },
//           { name: "Operation Information Overview", code: "operInfoTable" },

//         ]
//       else return [
//         { name: "Operating Cash Flow Series", code: "operatingCashFlowSeries" },
//         { name: "Capex and Total Volume Sold Series", code: "capexAndVolumeSoldSeries" },
//         { name: "Electricity Sold Per Plug Series", code: "electricitySoldPerPlugSeries" },
//         { name: "Revenue Breakdown by Category Series", code: "revenueBreakdownSeries" },
//         { name: "Entity/Terminal revenue, opex and adoption curves (all phases)", code: "revenueOpexAdoptionCurves" },
//         { name: "Wholesale market price and sell-out price", code: "wholesaleMarketSelloutPrices" },
//         { name: "Cumulative capex of selected terminal/entity", code: "cumulativeCapexOfSelectedEntity" },
//         { name: "Throughput utilisation (all phases of selected entity/terminal)", code: "throughputUtilisation" },

//         { name: "Balance Sheet Table", code: "balanceSheetTable" },
//         { name: "Cash Flow Table", code: "cashFlowTable" },
//         { name: "Profit and Loss Table", code: "profitLossTable" },
//         { name: "First Year Financials", code: "emarineFirstYearFinancialsTable" },
//         { name: "Last Year Financials", code: "emarineLastYearFinancialsTable" },
//         { name: "First Year Financials for Aggregated", code: "aggregatedFirstYearFinancialsTable" },
//         { name: "Last Year Financials for Aggregated", code: "aggregatedLastYearFinancialsTable" },
//         { name: "Project Valuation", code: "projectValuationTable" },
//         { name: "Aggregated Valuation", code: "aggregatedValuationTable" },

//       ]
//     },
//     [currentProjectType]
//   );

//   const [selectedOptions, setSelectedOptions] = useState(() => {
//     const savedSelections = localStorage.getItem("selectedCharts");
//     if (savedSelections) {
//       return JSON.parse(savedSelections);
//     }
//     return ChartOptions.filter(
//       (option) => option.code !== "projectValuationTable"
//     ).filter((option) => option.code !== "aggregatedValuationTable");
//   });

//   useEffect(() => {
//     localStorage.setItem("selectedCharts", JSON.stringify(selectedOptions));
//   }, [selectedOptions]);

//   const selectionStatus = useMemo(() => {
//     return ChartOptions.reduce((acc, option) => {
//       acc[option.code] = selectedOptions.some(
//         (selected) => selected.code === option.code
//       );
//       return acc;
//     }, {});
//   }, [selectedOptions, ChartOptions]);

//   return (
//     <div className="py-10 w-full h-full flex justify-center bg-[#f3f3f3] ">
//       <div className="w-[70vw] 2xl:w-[80vw] 2xl:mx-auto mx-5">
//         <div className="w-full flex flex-wrap justify-between">
//           <div className="text-3xl flex items-center gap-3">
//             <img src="./BigDashboard.svg" className="h-5 w-5" alt="Tick" />
//             <span className="font-jakarta">Dashboard</span>
//           </div>
//           <div className="flex flex-wrap gap-2">
//             {/* Dropdown for Charts */}
//             <div className="relative flex justify-end w-[280px] shadow-lg m-[0.2rem]">
//               <MultiSelect
//                 value={ChartOptions.filter(
//                   (option) =>
//                     selectedOptions.some(
//                       (selected) => selected.code === option.code
//                     ) && !option.code.includes("Table")
//                 )}
//                 options={ChartOptions.filter(
//                   (option) => !option.code.includes("Table")
//                 )}
//                 onChange={(e) => {
//                   const newSelections = e.value.map((selection) => ({
//                     code: selection.code,
//                     name: selection.name,
//                   }));
//                   setSelectedOptions((prev) => {
//                     const existingTables = prev.filter((code) =>
//                       code.code.includes("Table")
//                     );
//                     return [...newSelections, ...existingTables];
//                   });
//                 }}
//                 optionLabel="name"
//                 placeholder="Select Charts"
//                 display="chip"
//                 className="w-full md:w-20rem"
//               />
//             </div>

//             {/* Dropdown for Tables */}
//             <div className="relative flex justify-end w-[280px] shadow-lg m-[0.2rem]">
//               <MultiSelect
//                 value={ChartOptions.filter(
//                   (option) =>
//                     selectedOptions.some(
//                       (selected) => selected.code === option.code
//                     ) && option.code.includes("Table")
//                 )}
//                 options={ChartOptions.filter((option) =>
//                   option.code.includes("Table")
//                 )}
//                 onChange={(e) => {
//                   const newSelections = e.value.map((selection) => ({
//                     code: selection.code,
//                     name: selection.name,
//                   }));
//                   setSelectedOptions((prev) => {
//                     const existingCharts = prev.filter(
//                       (code) => !code.code.includes("Table")
//                     );
//                     return [...newSelections, ...existingCharts];
//                   });
//                 }}
//                 optionLabel="name"
//                 placeholder="Select Tables"
//                 display="chip"
//                 className="w-full md:w-20rem"
//               />
//             </div>

//             {/* Download PDF Button */}
//             <button
//               onClick={handleDownloadPDF}
//               disabled={isLoading}
//               className={`px-4 py-2 font-semibold text-white rounded-lg ${!isLoading
//                 ? "bg-main hover:bg-gray-700"
//                 : "bg-gray-300 cursor-not-allowed"
//                 } `}
//             >
//               {isLoading ? "Generating PDF..." : "Download PDF"}
//             </button>
//           </div>
//         </div>

//         <div ref={targetRef}>
//           {isLoading && <img src={natpowerBiancoPng} alt="natpower" />}
//           <DashboardCharts selectedOptions={selectionStatus} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
