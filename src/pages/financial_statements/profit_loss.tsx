import { useEffect, useState } from "react";
import DateRangePicker from "../../components/FinStatements/DateRangePicker";
import GroupedTypeSelector from "../../components/FinStatements/GroupedTypeSelector";
import ParamCollapsableTable from "../../components/FinStatements/StatementTable";
import { useProfitLossData } from "../../hooks/tables/useProfitAndLossData";
import StatementTypeSelector from "../../components/FinStatements/StatementTypeSelector";

export function ProfitLoss() {
  const [active, setActive] = useState("quarterly");

  const [hasTotal, setHasTotal] = useState("true");

  const {
    headers,
    tableData,
    boldRows,
    dateRange,
    modelStartDate,
    decommissioningEndDate,
    setDateRange,
  } = useProfitLossData(active, hasTotal);

  return (
    <div className="w-full  flex justify-center items-center rounded-lg mb-10">
      <div
        style={{ flex: 1 }}
        className=" max-w-[80vw] overflow-hidden mt-16 ml-4 mr-4 shadow-lg rounded-lg"
      >
        <img
          src="/CashFlow.png"
          alt="Description of the image"
          className="w-full h-auto rounded-t-lg"
        />
        <div className="px-5 pb-10">
          <div
            className="font-jakarta text-[#111927] font-medium"
            style={{
              fontSize: 33.3,
              marginLeft: "50px",
              marginTop: "40px",
              paddingBottom: 10,
            }}
          >
            Profit and Loss Account (£)
          </div>

          <div
            className=" flex grow flex-wrap gap-4"
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 10,
            }}
          >
            <GroupedTypeSelector active={active} setActive={setActive} />

            <div className="ml-0 mt-5  lg:mt-0">
              <DateRangePicker
                value={dateRange}
                minDate={modelStartDate}
                maxDate={decommissioningEndDate}
                onChange={(v) => {
                  setDateRange(v);
                }}
                onClearDates={() => {
                  // Handle clearing the date range
                  setDateRange({
                    from: modelStartDate,
                    to: decommissioningEndDate,
                  });
                }}
              />
            </div>
          </div>
          <div className="shadow-md mt-5 rounded-lg">
            <h1 className="font-jakarta text-[20px] font-normal py-5 pl-[15px]">
              Profit and Loss Table
            </h1>

            <div className="overflow-auto max-h-[700px] h-[700px] ">
              <ParamCollapsableTable
                headers={headers}
                itemList={tableData}
                hasTotal={hasTotal}
                boldRows={boldRows}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
