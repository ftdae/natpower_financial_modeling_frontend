import moment from "moment";
import { useMemo, useState } from "react";
import { selectResult } from "../../store/slices/resultSlice";
import { useAppSelector } from "../../hooks/hooks";
import {
  getFilterData,
  getQuarterNumberFromModelStartDate,
  multiplyNumber,
  preProcessArray4Graph,
} from "../../calculation/calculates/utils";
import CustomGraph from "./CustomGraph";
import GroupedTypeSelectorForGraph from "../../components/FinStatements/GroupedTypeSelectorForGraph";
import { DATE_FORMAT } from "../../utils/usePrameter";
import { CustomHighchartsGraph } from "./CustomHighchartGraph";
import { useAdministrativeExpenseSeries } from "../../hooks/graphs/useAdministrativeExpenseSeries";

export function AdministrativeExpenseGraphPage() {

  const [active, setActive] = useState("quarterly");
  const series = useAdministrativeExpenseSeries(active)
  

 

  return (
    <div className="flex flex-col w-full  m-auto max-w-[60vw]  rounded-xl p-1 h-full">
      <div className="flex flex-col gap-4 w-full flex-1 justify-center items-center">
        <GroupedTypeSelectorForGraph active={active} setActive={setActive} />

        <div className={` shadow-xl w-full p-1 rounded-xl`}>
          <CustomHighchartsGraph
          yAxis="£'000"
            title="Administrative Costs Stack Across Time"
            series={series}
          />
        </div>
      </div>
    </div>
  );
}
