import { DEFAULT_MCAPEX_PROVISION } from "../../constant";
import { IMCapexProvision } from "../../Revenue/type";
import { roundArray } from "../../utils";

export function calcRetainedEarningsForBalanceSheet({
  mCapexProvision = DEFAULT_MCAPEX_PROVISION,
}: {
  mCapexProvision?: IMCapexProvision;
}) {
  const retained_earnings = mCapexProvision.retained_earnings_end_balance;
  return roundArray(retained_earnings, 10);
}
