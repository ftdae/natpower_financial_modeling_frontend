import { useState } from "react";

import GroupedTypeSelectorForGraph from "../../components/FinStatements/GroupedTypeSelectorForGraph";
import { CustomHighchartsGraph } from "./CustomHighchartGraph";
import { useNetCashFlowSeries } from "../../hooks/graphs/useNetCashFlowSeries";

export function NetCashFlowGraphPage() {
  const [active, setActive] = useState("quarterly");

  const series = useNetCashFlowSeries(active);

  return (
    <div className="flex flex-col w-full  m-auto max-w-[60vw]  rounded-xl p-1 h-full">
      <div className="flex flex-col gap-4 w-full flex-1 justify-center items-center">
        <GroupedTypeSelectorForGraph active={active} setActive={setActive} />

        <div className={` shadow-xl w-full p-1 rounded-xl `}>
          <CustomHighchartsGraph
            title="Net CashFlow"
            series={series}
            yAxis="Net Cash Flow £'000"
          />
        </div>
      </div>
    </div>
  );
}
