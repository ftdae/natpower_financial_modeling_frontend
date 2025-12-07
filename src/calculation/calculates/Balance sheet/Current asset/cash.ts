import { DEFAULT_MCAPEX_PROVISION } from "../../constant";
import { IMCapexProvision } from "../../Revenue/type";
import { roundArray } from "../../utils";

export function calcCashForBalanceSheet({
  mCapexProvision = DEFAULT_MCAPEX_PROVISION,
}: {
  mCapexProvision?: IMCapexProvision;
}) {
  const cash = mCapexProvision.cashEndBalance;
  return roundArray(cash, 20);
}
