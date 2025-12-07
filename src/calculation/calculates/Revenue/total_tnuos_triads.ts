import { DEFAULT_WHOLESALE_DAY_AHEAD } from "../constant";
import { sumArrays } from "../utils";

export function calcTotalTNUosTriads({
  tnuosRevenues = DEFAULT_WHOLESALE_DAY_AHEAD,
  triadsIncome = DEFAULT_WHOLESALE_DAY_AHEAD,
}: {
  tnuosRevenues?: number[];
  triadsIncome?: number[];
}) {
  return sumArrays(tnuosRevenues, triadsIncome);
}
