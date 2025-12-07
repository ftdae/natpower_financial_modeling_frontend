// FS_M 1 Cash Flow
import {
  DEFAULT_DECOMMSSIONING_COSTS,
  DEFAULT_NG_SECURITIES,
} from "../../calculates/Administrative costs/constant";
import {
  IDecommissioningCosts,
  INGSecurities,
} from "../../calculates/Administrative costs/type";
import { DEFAULT_EBIT } from "../../calculates/Cash flow/constant";
import { Iebit } from "../../calculates/Cash flow/type";
import { IGainOnDisposal } from "../../calculates/Revenue/type";
import { DEFAULT_GAIN_ON_DISPOSAL } from "../../calculates/constant";
import { multiplyNumber, sumArray, sumArrays } from "../../calculates/utils";
import {
  DEFAULT_CAPEX_CREDITOR,
  DEFAULT_MOVEMENT_IN_PREPAYMENTS,
  DEFAULT_MOVEMENT_IN_TRADE_CREDITOR,
  DEFAULT_MOVEMENT_IN_TRADE_DEBTOR,
  DEFAULT_MOVEMENT_IN_VAT_CREDITOR,
} from "../constant";
import {
  ICapexCreditor,
  IMovementInPrepayments,
  IMovementInTradeCreditor,
  IMovementInTradeDebtor,
  IMovementInVatCreditor,
} from "../type";

export function calcOperatingCashFlow({
  ebit = DEFAULT_EBIT,
  movementInTradeCreditor = DEFAULT_MOVEMENT_IN_TRADE_CREDITOR,
  movementInTradeDebtor = DEFAULT_MOVEMENT_IN_TRADE_DEBTOR,
  gainOnDisposal = DEFAULT_GAIN_ON_DISPOSAL,
  decommissioningCosts = DEFAULT_DECOMMSSIONING_COSTS,
  nGSecurities = DEFAULT_NG_SECURITIES,
  movementInPrepayments = DEFAULT_MOVEMENT_IN_PREPAYMENTS,
  movementInVATCreditor = DEFAULT_MOVEMENT_IN_VAT_CREDITOR,
  capexCreditor = DEFAULT_CAPEX_CREDITOR,
}: {
  ebit?: Iebit;
  movementInTradeCreditor?: IMovementInTradeCreditor;
  movementInTradeDebtor?: IMovementInTradeDebtor;
  gainOnDisposal?: IGainOnDisposal;
  decommissioningCosts?: IDecommissioningCosts;
  nGSecurities?: INGSecurities;
  movementInPrepayments?: IMovementInPrepayments;
  movementInVATCreditor?: IMovementInVatCreditor;
  capexCreditor?: ICapexCreditor;
}) {
  const forecast_ebitda = ebit.ebitda;
  const less_gain_loss_on_disposal = multiplyNumber(
    gainOnDisposal.gainOnDisposalRevenue,
    -1
  );
  const movement_in_trade_debtors =
    movementInTradeDebtor.movement_in_working_capital;
  const movement_in_prepayments =
    movementInPrepayments.movement_in_working_capital;
  const movement_in_trade_creditors =
    movementInTradeCreditor.movement_in_working_capital;
  const movement_in_capex_creditors = capexCreditor.movement_in_working_capital;
  const movement_in_vat_creditor =
    movementInVATCreditor.movement_in_working_capital;
  const movement_in_escrow_account =
    nGSecurities.national_grid_securities_for_cash_flow;
  const movement_in_decommissioning_provision =
    decommissioningCosts.movement_in_working_capital;
  const operating_cash_flow = sumArrays(
    forecast_ebitda,
    less_gain_loss_on_disposal,
    movement_in_capex_creditors,
    movement_in_trade_creditors,
    movement_in_trade_debtors,
    movement_in_prepayments,
    movement_in_vat_creditor,
    movement_in_escrow_account,
    movement_in_decommissioning_provision
  );
  return operating_cash_flow;
}
