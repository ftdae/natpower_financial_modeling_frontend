import React from "react";
import projectValuationSVG from "../assets/ProjValue.svg";
import { redNumber, roundNumber } from "../calculation/calculates/utils";
import { useAppSelector } from "../hooks/hooks";
import { selectResult } from "../store/slices/resultSlice";
import { calcKPIs } from "../Valuation/KPIs";
import { IValuation, IValuationResult } from "../Valuation/type";
import { format, parseISO } from "date-fns";
import { selectParam } from "../store/slices/parameterSlice";
import { current } from "@reduxjs/toolkit";

interface OperationInfoTableProps {
  dashboardStyle?: boolean;
}

const ValuationDate = ({ valuationDate, dateString }) => {
  const dateToUse = valuationDate || "2023-01-01";
  const parsedDate = parseISO(dateToUse);
  const formattedDate = format(parsedDate, "dd MMM yyyy");
  return <div>{dateString} at {formattedDate}</div>;
};

const headers = [
  {
    rowTitle: "Entity",
    columns: [
      { text: "1st year revenue £'000", colSpan: 1 },
      { text: "1st year opex £'000", colSpan: 1 },
      { text: "1st year opex as % of revenue %", colSpan: 1 },
      { text: "Initial capex (excluding replacement/refurbishments) £'000", colSpan: 1 },
      { text: "1st year revenue as % of initial capex %", colSpan: 1 },
      { text: "1st year opex as % of initial capex %", colSpan: 1 },

    ],
  },
];

const EmarineFirstYearFinancialsTable = ({
  dashboardStyle = true,
}: OperationInfoTableProps) => {

  const { currentProjectType, emarineCalculationResults } =
    useAppSelector(selectParam);

  // let valuationArray = []

  const first_year_financials = emarineCalculationResults?.current_project?.first_year_financials
  let resultArray = [first_year_financials];

  // valuationArray = [
  //   {
  //     cost_of_equity: valuation_results?.cost_of_equity || 0,
  //     valuation_date: valuation_results?.valuation_date || "2025-01-01",
  //     date_string: 'Live returns as'
  //   },
  // ];


  return (
    <div className={`my-6 ${!dashboardStyle ? "mx-auto" : ""} `}>
      <h1 className="text-[2rem] mx-6 font-bold flex items-baseline gap-2">
        <img
          src={projectValuationSVG}
          className="h-[2rem]"
          style={{ filter: "contrast(0) brightness(0)" }}
        />
        Financials of the first operating year (12 months from operating start date)
      </h1>
      <div className="overflow-x-auto mt-8  text-gray-600 shadow-lg border border-gray-300 ">
        <table className="min-w-full border-collapse border border-gray-300 bg-white">
          <thead>
            <tr key={0}>
              <th className="border border-gray-300 text-center px-4 py-2 bg-gray-100 sticky left-0 w-auto">
                {headers[0].rowTitle}
              </th>
              {headers[0].columns.map((column, colIndex) => (
                <th
                  key={colIndex}
                  className="border border-gray-300 text-center px-4 py-2 bg-gray-100"
                  colSpan={column.colSpan || 1}
                >
                  {column.text}
                </th>
              ))}
            </tr>

          </thead>
          <tbody>
            {resultArray.map((dd, index) => (
              <tr key={index}>
                <td className="border border-gray-300 text-center px-4 py-2 sticky left-0 w-auto z-10 bg-white">
                  Live
                </td>
                {
                  <React.Fragment key={0}>
                    <td className="border border-gray-300 text-center px-4 py-2">
                      {redNumber(roundNumber(dd?.first_year_revenue || 0, 0))}
                    </td>
                    <td className="border border-gray-300 text-center px-4 py-2">
                      {redNumber(roundNumber(dd?.first_year_opex || 0, 2))}
                    </td>
                    <td className="border border-gray-300 text-center px-4 py-2">
                      {redNumber(roundNumber(dd?.opex_percentage_to_revenue * 100 || 0, 2))}
                    </td>
                    <td className="border border-gray-300 text-center px-4 py-2">
                      {redNumber(roundNumber(dd?.initial_capex || 0, 2))}
                    </td>
                    <td className="border border-gray-300 text-center px-4 py-2">
                      {redNumber(roundNumber(dd?.revenue_percentage_to_capex * 100 || 0, 2))}
                    </td>
                    <td className="border border-gray-300 text-center px-4 py-2">
                      {redNumber(roundNumber(dd?.opex_percentage_to_capex * 100 || 0, 2))}
                    </td>
                  </React.Fragment>
                }
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );


};

export default EmarineFirstYearFinancialsTable;
