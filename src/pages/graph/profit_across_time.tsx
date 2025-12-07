import moment from "moment";
import { useMemo, useState } from "react";
import { selectResult } from "../../store/slices/resultSlice";
import { useAppSelector } from "../../hooks/hooks";
import { calcGrossProfitAndLoss } from "../../calculation/calculates/gross_profit_and_loss";
import {
  getFilterData,
  getQuarterNumberFromModelStartDate,
  preProcessArray4Graph,
} from "../../calculation/calculates/utils";
import CustomGraph from "./CustomGraph";
import { DATE_FORMAT } from "../../utils/usePrameter";
import GroupedTypeSelectorForGraph from "../../components/FinStatements/GroupedTypeSelectorForGraph";
import { CustomHighchartsGraph } from "./CustomHighchartGraph";
import { useProfitAcrossTimeSeries } from "../../hooks/graphs/useProfitAndLossSeries";

export function ProfitAcrossTimeGraphPage() {

  const [active, setActive] = useState("quarterly");
  const series = useProfitAcrossTimeSeries(active)

  return (
    <div className="flex flex-col w-full  m-auto max-w-[60vw]  rounded-xl p-1 h-full">
      <div className="flex flex-col gap-4 w-full flex-1 justify-center items-center">
        <GroupedTypeSelectorForGraph active={active} setActive={setActive} />

        <div className={` shadow-xl w-full p-1 rounded-xl  `}>
          <CustomHighchartsGraph
            title="Profit Across Time"
            yAxis="£'000"
            series={series}
          />
        </div>
      </div>
    </div>
  );
}
