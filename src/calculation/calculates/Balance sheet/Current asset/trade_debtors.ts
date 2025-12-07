import { DEFAULT_MOVEMENT_IN_TRADE_DEBTOR } from "../../../Cash flow/constant";
import { IMovementInTradeDebtor } from "../../../Cash flow/type";
import { roundArray } from "../../utils";

export function calcTradeDebtorsForBalanceSheet({
  movementInTradeDebtor = DEFAULT_MOVEMENT_IN_TRADE_DEBTOR,
}: {
  movementInTradeDebtor?: IMovementInTradeDebtor;
}) {
  const trade_debtors = movementInTradeDebtor.trade_debtors_for_balance_sheet;

  return roundArray(trade_debtors, 20);
}
