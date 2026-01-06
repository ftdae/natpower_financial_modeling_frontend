import {
  DEFAULT_BALANCING_MECHANISM,
  DEFAULT_CAPACITY_MARKET,
  DEFAULT_FIXED_PPA_VALUE,
  DEFAULT_FLOATING_PPA_VALUE,
  DEFAULT_FREQUENCY_RESPONSE,
  DEFAULT_GAIN_ON_DISPOSAL,
  DEFAULT_UPSIDE_REVENUE,
  DEFAULT_WHOLESALE_DAY_AHEAD,
  DEFAULT_WHOLESALE_INTRADAY,
} from "../constant";
import { sumArray, sumArrays } from "../utils";
import { IGainOnDisposal, IUpsideRevenue } from "./type";

export function calcTotalRevenue({
  wholesaleDayAhead = DEFAULT_WHOLESALE_DAY_AHEAD,
  wholesaleDayIntraday = DEFAULT_WHOLESALE_INTRADAY,
  balancingMechanism = DEFAULT_BALANCING_MECHANISM,
  frequencyResponse = DEFAULT_FREQUENCY_RESPONSE,
  capacityMarket = DEFAULT_CAPACITY_MARKET,
  gainOnDisposal = DEFAULT_GAIN_ON_DISPOSAL,
  fixedPPAValue = DEFAULT_FIXED_PPA_VALUE,
  floatingPPAValue = DEFAULT_FLOATING_PPA_VALUE,
  residualRevenue = DEFAULT_FLOATING_PPA_VALUE,
  tollingRevenue = DEFAULT_FLOATING_PPA_VALUE,
  balancingReserve = DEFAULT_FLOATING_PPA_VALUE,
  totalTNUoSTriads = DEFAULT_FLOATING_PPA_VALUE,
  upsidePotentialRevenue = DEFAULT_UPSIDE_REVENUE,
  regoRevenue = DEFAULT_FLOATING_PPA_VALUE,
  solarRevenue = DEFAULT_FLOATING_PPA_VALUE,
  cfdRevenue = DEFAULT_FLOATING_PPA_VALUE,
  embeddedBenefits = DEFAULT_FLOATING_PPA_VALUE,
}: {
  wholesaleDayAhead?: number[];
  wholesaleDayIntraday?: number[];
  balancingMechanism?: number[];
  frequencyResponse?: number[];
  capacityMarket?: number[];
  gainOnDisposal?: IGainOnDisposal;
  fixedPPAValue?: number[];
  floatingPPAValue?: number[];
  residualRevenue?: number[];
  tollingRevenue?: number[];
  balancingReserve?: number[];
  totalTNUoSTriads?: number[];
  upsidePotentialRevenue?: IUpsideRevenue;
  regoRevenue?: number[];
  solarRevenue?: number[];
  cfdRevenue?: number[];
  embeddedBenefits?: number[];
}) {
  const totalRevenue: number[] = sumArrays(
    wholesaleDayAhead,
    wholesaleDayIntraday,
    capacityMarket,
    balancingMechanism,
    frequencyResponse,
    gainOnDisposal?.gainOnDisposalRevenue,
    fixedPPAValue,
    residualRevenue,
    tollingRevenue,
    balancingReserve,
    totalTNUoSTriads,
    upsidePotentialRevenue?.tradingFloorTopUp,
    upsidePotentialRevenue?.upsidePotential,
    solarRevenue,
    regoRevenue,
    cfdRevenue,
    embeddedBenefits
  );
  return totalRevenue;
}
