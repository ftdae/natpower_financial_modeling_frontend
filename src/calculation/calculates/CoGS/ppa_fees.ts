import {
  DEFAULT_FIXED_PPA_VALUE,
  DEFAULT_FLOATING_PPA_VALUE,
} from "../constant";
import { IVintage } from "../Revenue/type";
import { multiplyNumber, roundArray, sumArrays } from "../utils";

export function calcPPAFees({
  fixedPPAValue = DEFAULT_FIXED_PPA_VALUE,
  floatingPPAValue = DEFAULT_FLOATING_PPA_VALUE,
  ppaFeesPercentage = 20,
}: {
  fixedPPAValue?: number[];
  floatingPPAValue?: number[];
  ppaFeesPercentage?: number;
  modelStartDate?: string;
  operationStartDate?: string;
  decommissioningEndDate?: string;
  vintage?: IVintage;
}) {
  const ppaRevenueFee = multiplyNumber(
    sumArrays(fixedPPAValue, floatingPPAValue),
    -ppaFeesPercentage / 100
  );
  return roundArray(ppaRevenueFee, 20);
}
