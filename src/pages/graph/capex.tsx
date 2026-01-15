// import moment from "moment";
// import { useMemo, useState } from "react";
// import { selectResult } from "../../store/slices/resultSlice";
// import { useAppSelector } from "../../hooks/hooks";
// import {
//   getFilterData,
//   getQuarterNumberFromModelStartDate,
//   multiplyNumber,
//   preProcessArray4Graph,
// } from "../../calculation/calculates/utils";
// import CustomGraph from "./CustomGraph";
// import GroupedTypeSelectorForGraph from "../../components/FinStatements/GroupedTypeSelectorForGraph";
// import { DATE_FORMAT } from "../../utils/usePrameter";
// import { CustomHighchartsGraph } from "./CustomHighchartGraph";

// export function CapexGraphPage() {
//   const {
//     modelStartDate,
//     operationStartDate,
//     capitalExpenditure,
//     decommissioningEndDate,
//   } = useAppSelector(selectResult);
//   const period =
//     getQuarterNumberFromModelStartDate(modelStartDate, decommissioningEndDate) -
//     1;
//   const [active, setActive] = useState("quarterly");
//   const [dateRange, setDateRange] = useState({
//     from: modelStartDate,
//     to: moment(modelStartDate)
//       .add(period, "quarters")
//       .add(-1, "days")
//       .format(DATE_FORMAT),
//   });
//   const graphData = useMemo(() => {
//     // const result: ApexAxisChartSeries = [
//     //   {
//     //     name: "Capital Expenditure",
//     //     data: preProcessArray4Graph(
//     //       multiplyNumber(capitalExpenditure?.capexExpenditureForCashflow, -1) ||
//     //         new Array(0).fill(100)
//     //     ).map((r, index) => ({
//     //       x: moment()
//     //         .add(index, "months")
//     //         .startOf("month")
//     //         .format("YYYY-MM-DD"),
//     //       y: r,
//     //     })),
//     //   },
//     // ];
//     const resultForQuarter = [
//       {
//         name: "Electricity sold",
//         data: preProcessArray4Graph(
//           multiplyNumber(capitalExpenditure?.capexExpenditureForCashflow, -1) ||
//             new Array(period).fill(0)
//         )
//           .concat(new Array(20).fill(0))
//           .map((r, index) => [
//             moment(modelStartDate)
//               .add(index, "quarters")
//               .startOf("month")
//               .valueOf(),
//             Number(r),
//           ]),
//       },
//     ];
//     const resultForAnnual = [
//       {
//         name: "Electricity sold",
//         data: preProcessArray4Graph(
//           getFilterData(
//             multiplyNumber(
//               capitalExpenditure?.capexExpenditureForCashflow,
//               -1
//             ) || new Array(period).fill(0),
//             modelStartDate,
//             active,
//             dateRange
//           )
//         )
//           .concat(new Array(5).fill(0))
//           .map((r, index) => [
//             moment(modelStartDate)
//               .add(-1, "day")
//               .add((index + 1) * 4, "quarters")
//               .endOf("month")
//               .valueOf(),
//             Number(r),
//           ]),
//       },
//     ];
//     return active == "quarterly" ? resultForQuarter : resultForAnnual;
//   }, [modelStartDate, active, capitalExpenditure, dateRange]);

//   return (
//     <div className="flex flex-col w-full  m-auto max-w-[60vw]  rounded-xl p-1 h-full">
//       <div className="flex flex-col gap-4 w-full flex-1 justify-center items-center">
//         <GroupedTypeSelectorForGraph active={active} setActive={setActive} />

//         <div className={` shadow-xl w-full p-1 rounded-xl`}>
        
//           <CustomHighchartsGraph
//             title="Capital Expenditure"
//             series={graphData}
//             yAxis="£'000"
//           />
        
//         </div>
//       </div>
//     </div>
//   );
// }
