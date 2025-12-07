
import { DEFAULT_MCAPEX_PROVISION } from '../../constant';
import { IMCapexProvision } from '../../Revenue/type';
import { sumArrays } from '../../utils';
import { calcRetainedEarningsForBalanceSheet } from './retained_earnings';

export function calcShareholdersFunds({
  mCapexProvision = DEFAULT_MCAPEX_PROVISION
}: {
  mCapexProvision?: IMCapexProvision;
}) {
  const retained_earnings: number[] = calcRetainedEarningsForBalanceSheet({
    mCapexProvision
  });

  const shareholders_funds: number[] = sumArrays(
    retained_earnings
    // share_capital
  );
  return shareholders_funds;
}
