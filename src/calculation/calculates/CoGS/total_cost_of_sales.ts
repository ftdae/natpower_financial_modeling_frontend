import {
  DEFAULT_AUXILLIARY_LOSS,
  DEFAULT_METERING_COST,
  DEFAULT_OPTIMISER_COST,
  DEFAULT_PPA_FEE,
  DEFAULT_TNUOS_CHARGE,
} from "./constant";

import { sumArray, sumArrays } from "../utils";

export function calcTotalCostOfSales({
  meteringCost = DEFAULT_METERING_COST,
  auxilliaryLoss = DEFAULT_AUXILLIARY_LOSS,
  optimiserCost = DEFAULT_OPTIMISER_COST,
  tnuosCharge = DEFAULT_TNUOS_CHARGE,
  ppaFee = DEFAULT_PPA_FEE,
  duosCost = DEFAULT_PPA_FEE,
  tnuosTriadCost = DEFAULT_PPA_FEE,
}: {
  meteringCost?: number[];
  auxilliaryLoss?: number[];
  optimiserCost?: number[];
  tnuosCharge?: number[];
  ppaFee?: number[];
  duosCost?: number[];
  tnuosTriadCost?: number[];
}) {
  const totalCoGS: number[] = sumArrays(
    optimiserCost,
    tnuosCharge,
    meteringCost,
    auxilliaryLoss,
    ppaFee,
    duosCost,
    tnuosTriadCost
  );
  return totalCoGS;
  // return roundArray(
  //   auxilliaryLosses.map(
  //     (d, index) =>
  //       d + metering[index] + optimiserCommission[index] + TNUoSCharges[index]
  //   ),
  //   2
  // );
}
