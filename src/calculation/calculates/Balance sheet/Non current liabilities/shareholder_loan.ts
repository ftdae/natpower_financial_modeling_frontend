import { DEFAULT_MCAPEX_PROVISION } from "../../constant";
import { IMCapexProvision } from "../../Revenue/type";
import { roundArray } from "../../utils";

export function shareholderLoanForBalanceSheet({
  mCapexProvision = DEFAULT_MCAPEX_PROVISION,
}: {
  mCapexProvision?: IMCapexProvision;
}) {
  const shareholder_loan = mCapexProvision.shareholder_loan_for_balance_sheet;
  return roundArray(shareholder_loan, 10);
}
