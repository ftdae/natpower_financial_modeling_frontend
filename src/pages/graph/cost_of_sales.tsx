import moment from "moment";
import { useMemo, useState } from "react";

import GroupedTypeSelectorForGraph from "../../components/FinStatements/GroupedTypeSelectorForGraph";

import { CustomHighchartsGraph } from "./CustomHighchartGraph";

import { useCostOfSalesSeries } from "../../hooks/graphs/useCostOfSales";

export function CostOfSalesGraphPage() {
  const [active, setActive] = useState("quarterly");

  const series = useCostOfSalesSeries(active);

  return (
    <div className="flex flex-col w-full  m-auto max-w-[60vw]  rounded-xl p-1 h-full">
      <div className="flex flex-col gap-4 w-full flex-1 justify-center items-center">
        <GroupedTypeSelectorForGraph active={active} setActive={setActive} />

        <div className={` shadow-xl w-full p-1 rounded-xl `}>
          <CustomHighchartsGraph
            yAxis="£'000"
            title="Cost of sales"
            series={series}
          />
        </div>
      </div>
    </div>
  );
}
