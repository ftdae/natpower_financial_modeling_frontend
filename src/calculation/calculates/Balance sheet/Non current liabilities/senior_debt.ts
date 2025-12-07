import { DEFAULT_MCAPEX_PROVISION } from "../../constant";
import { IMCapexProvision } from "../../Revenue/type";
import { roundArray } from "../../utils";

export function calcSeniorDebtForBalanceSheet({
  mCapexProvision = DEFAULT_MCAPEX_PROVISION,
}: {
  mCapexProvision?: IMCapexProvision;
}) {
  const senior_debt = mCapexProvision.senior_debt_for_balance_sheet;
  return roundArray(senior_debt, 20);
}
