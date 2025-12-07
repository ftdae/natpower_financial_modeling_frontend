import { useState } from "react";

import GroupedTypeSelectorForGraph from "../../components/FinStatements/GroupedTypeSelectorForGraph";
import { CustomHighchartsGraph } from "./CustomHighchartGraph";
import { useEmarineCapexAndVolumeSoldSeries } from "../../hooks/graphs/useEmarineCapexAndVolumeSold";

export function EmarineCapexAndVolumeSold() {
    const [active, setActive] = useState("quarterly");

    const series = useEmarineCapexAndVolumeSoldSeries(active);

    return (
        <div className="flex flex-col w-full  m-auto max-w-[60vw]  rounded-xl p-1 h-full">
            <div className="flex flex-col gap-4 w-full flex-1 justify-center items-center">
                <GroupedTypeSelectorForGraph active={active} setActive={setActive} />

                <div className={` shadow-xl w-full p-1 rounded-xl `}>
                    <CustomHighchartsGraph
                        title="Capex and Total Volume Sold"
                        series={series}
                        yAxis="Capex and Total Volume Sold £'000"
                    />
                </div>
            </div>
        </div>
    );
}
