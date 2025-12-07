import { useState } from "react";
import GroupedTypeSelectorForGraph from "../../components/FinStatements/GroupedTypeSelectorForGraph";
import { useBatteryCyclesSeries } from "../../hooks/graphs/useBatteryCycleSeries";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { selectParam } from "../../store/slices/parameterSlice";
import { CustomHighchartsGraph } from "./CustomHighchartGraph";

export function AverageBatteryCyclesGraphPage() {
  const dispatch = useAppDispatch();
  const { currentParameterId, balanceSheetData } = useAppSelector(selectParam);

  const [active, setActive] = useState("quarterly");

  const series = useBatteryCyclesSeries(active);

  return (
    <div className="flex flex-col w-full  m-auto max-w-[60vw]  rounded-xl p-1 h-full">
      <div className="flex flex-col gap-4 w-full flex-1 justify-center items-center">
        <GroupedTypeSelectorForGraph active={active} setActive={setActive} />
        <button
          className={`grow flex text-center items-center py-[10px]  font-bold transition-colors duration-200 ease-in`}
        // onClick={getData}
        >
          Simulate
        </button>
        <div className={` shadow-xl w-full p-1 rounded-xl`}>
          <CustomHighchartsGraph
            title="Battery Cycles Per Month"
            series={series}
          />
        </div>
      </div>
    </div>
  );
}
