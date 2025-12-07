import { useAppSelector } from "../../hooks/hooks";
import { selectResult } from "../../store/slices/resultSlice";
import { multiplyNumber, sumArrays } from "../calculates/utils";

export function calcFCFE() {
  const {
    mCapexProvision,
    totalDepreciation,
    operatingCashFlowValue,
    ebit,
    capitalExpenditure
  } = useAppSelector(selectResult);

  const fcfe: number[] = sumArrays(
    mCapexProvision.profit_loss_after_tax,
    multiplyNumber(totalDepreciation, -1),
    multiplyNumber(operatingCashFlowValue, -1),
    ebit.ebitda,
    capitalExpenditure.capexExpenditureForCashflow,
    sumArrays(
      mCapexProvision.seniorDebtDrawdown,
      mCapexProvision.shareholderLoanDrawdown,
      mCapexProvision.seniorDebtRepayment,
      mCapexProvision.shareholder_loan_repayment
    ),
    multiplyNumber(mCapexProvision.shareholder_loan_interest, -1)
  );
  return fcfe;
}
