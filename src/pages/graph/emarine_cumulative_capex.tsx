import { useState } from "react";

import GroupedTypeSelectorForGraph from "../../components/FinStatements/GroupedTypeSelectorForGraph";
import { useEmarineCumulativeCapexSeries } from "../../hooks/graphs/useEmarineCumulativeCapexSeries";
import { CustomHighchartsGraph } from "./CustomHighchartGraph";

export function EmarineCumulativeCapexOfSelectedTerminal() {
    const [active, setActive] = useState("quarterly");

    const series = useEmarineCumulativeCapexSeries(active);

    return (
        <div className="flex flex-col w-full  m-auto max-w-[60vw]  rounded-xl p-1 h-full">
            <div className="flex flex-col gap-4 w-full flex-1 justify-center items-center">
                <GroupedTypeSelectorForGraph active={active} setActive={setActive} />

                <div className={` shadow-xl w-full p-1 rounded-xl `}>
                    <CustomHighchartsGraph
                        title="Cumulative capex of selected terminal/entity"
                        series={series}
                    // yAxis="Electricity sold per plug £'000"
                    />
                </div>
            </div>
        </div>
    );
}
