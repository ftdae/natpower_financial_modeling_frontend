import { useState } from "react";
import GroupedTypeSelectorForGraph from "../../components/FinStatements/GroupedTypeSelectorForGraph";
import { useElectricitySoldSeries } from "../../hooks/graphs/useElectricitySoldSeries";
import { CustomHighchartsGraph } from "./CustomHighchartGraph";

export function ElectricitySoldGraphPage() {

  const [active, setActive] = useState("quarterly");

  const series = useElectricitySoldSeries(active);




  return (
    <div className="flex flex-col w-full  m-auto max-w-[60vw]  rounded-xl p-1 h-full">
      <div className="flex flex-col gap-4 w-full flex-1 justify-center items-center">
        <GroupedTypeSelectorForGraph active={active} setActive={setActive} />

        <div className={` shadow-xl w-full p-1 rounded-xl `}>
          <CustomHighchartsGraph
            yAxis="MWh"
            title="Electricity Sold"
            series={series}
          />
        </div>
      </div>
    </div>
  );
}
