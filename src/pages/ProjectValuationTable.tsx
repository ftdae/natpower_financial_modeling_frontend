import { format, parseISO } from "date-fns";
import React from "react";
import projectValuationSVG from "../assets/ProjValue.svg";
import { redNumber, roundNumber } from "../calculation/calculates/utils";
import { useAppSelector } from "../hooks/hooks";
import { selectParam } from "../store/slices/parameterSlice";
import { selectResult } from "../store/slices/resultSlice";
import { calcKPIs } from "../Valuation/KPIs";

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
    rowTitle: "",
    columns: [
      { text: "Pre-tax Unlevered", colSpan: 4 },
      { text: "Post-tax Unlevered", colSpan: 4 },
      { text: "Post-tax Levered", colSpan: 4 },
    ],
  },
  // {
  //   rowTitle: "Discounted Rates",
  //   columns: [
  //     { text: "10%", colSpan: 3 },
  //     { text: "10%", colSpan: 3 },
  //     { text: "10%", colSpan: 3 },
  //   ],
  // },
  {
    rowTitle: "",
    columns: [
      { text: "NPV", unit: "£'000" },
      { text: "IRR", unit: "%" },
      { text: "Gross margin", unit: "%" },
      { text: "Payback Period", unit: "Years" },
      { text: "NPV", unit: "£'000" },
      { text: "IRR", unit: "%" },
      { text: "Gross margin", unit: "%" },
      { text: "Payback Period", unit: "Years" },
      { text: "NPV", unit: "£'000" },
      { text: "IRR", unit: "%" },
      { text: "Gross margin", unit: "%" },
      { text: "Payback Period", unit: "Years" },
    ],
  },
];

const ProjectValuationTable = ({
  dashboardStyle = true,
}: OperationInfoTableProps) => {

  const { currentProjectType, emarineCalculationResults } =
    useAppSelector(selectParam);

  let valuationArray = []
  let resultArray = [];
  if (currentProjectType == 'bess') {
    const {
      investorClosingDate,
      fullyConsentedDate,
      valuation,
      corporationTax,
      gearingByCapexType,
      seniorDebt,
      decommissioningEndDate,
      mCapexProvision,
      operatingCashFlowValue,
      capitalExpenditure,
      corporationTaxValue,
      gainOnDisposal,
      returnsSettings,
      evAdditions,
      operationStartDate = "2030-01-01",
    } = useAppSelector(selectResult);

    const costOfEquity =
      valuation?.cost_of_equity == 0 ? 10 / 100 : valuation?.cost_of_equity / 100;

    valuationArray = [

      {
        cost_of_equity: costOfEquity,
        valuation_date: fullyConsentedDate || "2025-01-01",
        date_string: 'Fully consented'
      },
    ];
    if (valuation && valuation?.date_string != 'Fully consented') {
      valuationArray.push({
        cost_of_equity: costOfEquity,
        valuation_date: valuation?.valuation_date || "2025-01-01",
        date_string: valuation?.date_string
      },)
    }

    valuationArray.map((dd) => {
      resultArray.push(
        calcKPIs({
          corporationTax,
          gearingByCapexType,
          seniorDebt,
          decommissioningEndDate,
          mCapexProvision,
          operatingCashFlowValue,
          capitalExpenditure,
          corporationTaxValue,
          gainOnDisposal,
          valuation: dd,
          returnsSettings,
          evAdditions,
          operationStartDate,
        })
      );
    });
    return (
      <div className={`my-6 ${!dashboardStyle ? "mx-auto" : ""} `}>
        <h1 className="text-[2rem] mx-6 font-bold flex items-baseline gap-2">
          <img
            src={projectValuationSVG}
            className="h-[2rem]"
            style={{ filter: "contrast(0) brightness(0)" }}
          />
          Project Valuation
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
              <tr key={1}>
                <th className="border border-gray-300 text-center px-4 py-2 bg-gray-100 sticky left-0 top-0 w-max">
                  Discount Rate
                </th>
                {resultArray[0].map((column, colIndex) => (
                  <th
                    key={colIndex}
                    className="border border-gray-300 text-center px-4 py-2 bg-gray-100"
                    colSpan={3}
                  >
                    {((column?.discountRate * 100).toFixed(2) || 0.1 * 100)}%
                  </th>
                ))}
              </tr>

              <tr key={2}>
                <th className="border border-gray-300 text-center px-4 py-2 bg-gray-100 sticky left-0 w-auto">
                  {headers[1].rowTitle}
                </th>
                {headers[1].columns.map((column, colIndex) => (
                  <th
                    key={colIndex}
                    className="border border-gray-300 text-center px-4 py-2 bg-gray-100"
                    colSpan={column.colSpan || 1}
                  >
                    <div>{column.text}</div>
                    <div className="mt-5">{column.unit}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {resultArray.map((dd, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 text-center px-4 py-2 sticky left-0 w-auto z-10 bg-white">
                    <ValuationDate
                      valuationDate={valuationArray[index]?.valuation_date}
                      dateString={valuationArray[index]?.date_string}
                    />
                  </td>
                  {[0, 1, 2].map((i, subIndex) => (
                    <React.Fragment key={subIndex}>
                      <td className="border border-gray-300 text-center px-4 py-2">
                        {redNumber(roundNumber(dd[i].value.npv || 0, 0))}
                      </td>
                      <td className="border border-gray-300 text-center px-4 py-2">
                        {roundNumber(dd[i].value.irr * 100 || 0, 2)}
                      </td>
                      <td className="border border-gray-300 text-center px-4 py-2">
                        {roundNumber(dd[i].value.irr * 100 || 0, 2)}
                      </td>
                      <td className="border border-gray-300 text-center px-4 py-2">
                        {roundNumber(dd[i].value.payback || 0, 2)}
                      </td>
                    </React.Fragment>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  else {
    const valuation_results = emarineCalculationResults?.current_project?.live_valuation_results
    const aggregated_valuation_results = emarineCalculationResults?.current_project?.half_yearly_valuation_results

    valuationArray = [
      {
        cost_of_equity: valuation_results?.cost_of_equity || 0,
        valuation_date: valuation_results?.valuation_date || "2025-01-01",
        date_string: 'Live returns as'
      },
      // {
      //   cost_of_equity: valuation_results?.cost_of_equity || 0,
      //   valuation_date: valuation_results?.valuation_date || "2025-01-01",
      //   date_string: 'Aggregated returns as at'
      // },
    ];

    resultArray = [
      [
        {
          discountRate: valuation_results?.unlevered_discount_rate,
          valuation_condition: "Pre-tax unlevered",
          value: {
            npv: valuation_results?.pre_unlevered_npv,
            irr: valuation_results?.pre_un_irr,
            payback: valuation_results?.pre_un_payback,
            grossMargin: valuation_results?.gross_margin,
          },
        },
        {
          discountRate: (valuation_results?.levered_discount_rate),
          valuation_condition: "Post-tax unlevered",
          value: {
            npv: valuation_results?.pre_levered_npv,
            irr: valuation_results?.pre_irr,
            payback: valuation_results?.pre_payback,
            grossMargin: valuation_results?.gross_margin,

          },
        },
        {
          discountRate: valuation_results?.levered_discount_rate,
          valuation_condition: "Post-tax levered",
          value: {
            npv: valuation_results?.post_levered_npv,
            irr: valuation_results?.post_irr,
            payback: valuation_results?.post_payback,
            grossMargin: valuation_results?.gross_margin,

          },
        },
      ],
      // [
      //   {
      //     discountRate: aggregated_valuation_results?.unlevered_discount_rate,
      //     valuation_condition: "Pre-tax unlevered",
      //     value: {
      //       npv: aggregated_valuation_results?.pre_unlevered_npv,
      //       irr: aggregated_valuation_results?.pre_un_irr,
      //       payback: aggregated_valuation_results?.pre_un_payback,
      //       grossMargin: aggregated_valuation_results?.gross_margin,
      //     },
      //   },
      //   {
      //     discountRate: (aggregated_valuation_results?.levered_discount_rate),
      //     valuation_condition: "Post-tax unlevered",
      //     value: {
      //       npv: aggregated_valuation_results?.pre_levered_npv,
      //       irr: aggregated_valuation_results?.pre_irr,
      //       payback: aggregated_valuation_results?.pre_payback,
      //       grossMargin: aggregated_valuation_results?.gross_margin,

      //     },
      //   },
      //   {
      //     discountRate: aggregated_valuation_results?.levered_discount_rate,
      //     valuation_condition: "Post-tax levered",
      //     value: {
      //       npv: aggregated_valuation_results?.post_levered_npv,
      //       irr: aggregated_valuation_results?.post_irr,
      //       payback: aggregated_valuation_results?.post_payback,
      //       grossMargin: aggregated_valuation_results?.gross_margin,

      //     },
      //   },
      // ]
    ]
  }
  return (
    <div className={`my-6 ${!dashboardStyle ? "mx-auto" : ""} `}>
      <h1 className="text-[2rem] mx-6 font-bold flex items-baseline gap-2">
        <img
          src={projectValuationSVG}
          className="h-[2rem]"
          style={{ filter: "contrast(0) brightness(0)" }}
        />
        Project Valuation
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
            <tr key={1}>
              <th className="border border-gray-300 text-center px-4 py-2 bg-gray-100 sticky left-0 top-0 w-max">
                Discount Rate
              </th>
              {resultArray[0].map((column, colIndex) => (
                <th
                  key={colIndex}
                  className="border border-gray-300 text-center px-4 py-2 bg-gray-100"
                  colSpan={4}
                >
                  {((column?.discountRate * 100).toFixed(2) || 0.1 * 100)}%
                </th>
              ))}
            </tr>

            <tr key={2}>
              <th className="border border-gray-300 text-center px-4 py-2 bg-gray-100 sticky left-0 w-auto">
                {headers[1].rowTitle}
              </th>
              {headers[1].columns.map((column, colIndex) => (
                <th
                  key={colIndex}
                  className="border border-gray-300 text-center px-4 py-2 bg-gray-100"
                  colSpan={column.colSpan || 1}
                >
                  <div>{column.text}</div>
                  <div className="mt-5">{column.unit}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {resultArray.map((dd, index) => (
              <tr key={index}>
                <td className="border border-gray-300 text-center px-4 py-2 sticky left-0 w-auto z-10 bg-white">
                  <ValuationDate
                    valuationDate={valuationArray[index]?.valuation_date}
                    dateString={valuationArray[index]?.date_string}
                  />
                </td>
                {[0, 1, 2].map((i, subIndex) => (
                  <React.Fragment key={subIndex}>
                    <td className="border border-gray-300 text-center px-4 py-2">
                      {redNumber(roundNumber(dd[i].value.npv || 0, 0))}
                    </td>
                    <td className="border border-gray-300 text-center px-4 py-2">
                      {roundNumber(dd[i].value.irr * 100 || 0, 2)}
                    </td>
                    <td className="border border-gray-300 text-center px-4 py-2">
                      {roundNumber(dd[i].value.grossMargin * 100 || 0, 2)}
                    </td>
                    <td className="border border-gray-300 text-center px-4 py-2">
                      {roundNumber(dd[i].value.payback || 0, 2)}
                    </td>
                  </React.Fragment>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );


  // return (
  //   <div className={`my-6 ${!dashboardStyle ? "mx-auto" : ""} `}>
  //     <h1 className="text-[2rem] mx-6 font-bold flex items-baseline gap-2">
  //       <img
  //         src={projectValuationSVG}
  //         className="h-[2rem]"
  //         style={{ filter: "contrast(0) brightness(0)" }}
  //       />
  //       Project Valuation
  //     </h1>
  //     <div className="overflow-x-auto mt-8  text-gray-600 shadow-lg border border-gray-300 ">
  //       <table className="min-w-full border-collapse border border-gray-300 bg-white">
  //         <thead>
  //           <tr key={0}>
  //             <th className="border border-gray-300 text-center px-4 py-2 bg-gray-100 sticky left-0 w-auto">
  //               {headers[0].rowTitle}
  //             </th>
  //             {headers[0].columns.map((column, colIndex) => (
  //               <th
  //                 key={colIndex}
  //                 className="border border-gray-300 text-center px-4 py-2 bg-gray-100"
  //                 colSpan={column.colSpan || 1}
  //               >
  //                 {column.text}
  //               </th>
  //             ))}
  //           </tr>
  //           <tr key={1}>
  //             <th className="border border-gray-300 text-center px-4 py-2 bg-gray-100 sticky left-0 top-0 w-max">
  //               Discount Rate
  //             </th>
  //             {resultArray[0].map((column, colIndex) => (
  //               <th
  //                 key={colIndex}
  //                 className="border border-gray-300 text-center px-4 py-2 bg-gray-100"
  //                 colSpan={3}
  //               >
  //                 {((column?.discountRate * 100).toFixed(2) || 0.1 * 100)}%
  //               </th>
  //             ))}
  //           </tr>

  //           <tr key={2}>
  //             <th className="border border-gray-300 text-center px-4 py-2 bg-gray-100 sticky left-0 w-auto">
  //               {headers[1].rowTitle}
  //             </th>
  //             {headers[1].columns.map((column, colIndex) => (
  //               <th
  //                 key={colIndex}
  //                 className="border border-gray-300 text-center px-4 py-2 bg-gray-100"
  //                 colSpan={column.colSpan || 1}
  //               >
  //                 <div>{column.text}</div>
  //                 <div className="mt-5">{column.unit}</div>
  //               </th>
  //             ))}
  //           </tr>
  //         </thead>
  //         <tbody>
  //           {resultArray.map((dd, index) => (
  //             <tr key={index}>
  //               <td className="border border-gray-300 text-center px-4 py-2 sticky left-0 w-auto z-10 bg-white">
  //                 <ValuationDate
  //                   valuationDate={valuationArray[index]?.valuation_date}
  //                   dateString={valuationArray[index]?.date_string}
  //                 />
  //               </td>
  //               {[0, 1, 2].map((i, subIndex) => (
  //                 <React.Fragment key={subIndex}>
  //                   <td className="border border-gray-300 text-center px-4 py-2">
  //                     {redNumber(roundNumber(dd[i].value.npv || 0, 0))}
  //                   </td>
  //                   <td className="border border-gray-300 text-center px-4 py-2">
  //                     {roundNumber(dd[i].value.irr * 100 || 0, 2)}
  //                   </td>
  //                   <td className="border border-gray-300 text-center px-4 py-2">
  //                     {roundNumber(dd[i].value.payback || 0, 2)}
  //                   </td>
  //                 </React.Fragment>
  //               ))}
  //             </tr>
  //           ))}
  //         </tbody>
  //       </table>
  //     </div>
  //   </div>
  // );
};

export default ProjectValuationTable;
