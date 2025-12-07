import { roundArray, sumArray, sumArrays } from "../calculates/utils";
import { DEFAULT_TOTAL_REVENUE } from "./Administrative costs/constant";
import {
  DEFAULT_TOTAL_ADMIN_COSTS,
  DEFAULT_TOTAL_COGS,
  DEFAULT_TOTAL_DEPRECIATION,
} from "./constant";

export function calcEBIT({
  totalRevenue = DEFAULT_TOTAL_REVENUE,
  totalCoGS = DEFAULT_TOTAL_COGS,
  totalAdminCosts = DEFAULT_TOTAL_ADMIN_COSTS,
  totalDepreciation = DEFAULT_TOTAL_DEPRECIATION,
}: {
  totalRevenue?: number[];
  totalCoGS?: number[];
  totalAdminCosts?: number[];
  totalDepreciation?: number[];
}) {
  return {
    ebit: roundArray(
      sumArrays(totalRevenue, totalCoGS, totalAdminCosts, totalDepreciation),
      20
    ),
    ebitda: roundArray(sumArrays(totalRevenue, totalCoGS, totalAdminCosts), 20),
  };
}
