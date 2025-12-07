// Hook: useCostOfSalesSeries.ts
import { useMemo, useState } from "react";
import moment from "moment";
import {
  getFilterData,
  getQuarterNumberFromModelStartDate,
  multiplyNumber,
  preProcessArray4Graph,
} from "../../calculation/calculates/utils";
import { useAppSelector } from "../../hooks/hooks";
import { selectResult } from "../../store/slices/resultSlice";
import { DATE_FORMAT } from "../../utils/usePrameter";

export const useCostOfSalesSeries = (active: string) => {
  const {
    modelStartDate,
    decommissioningEndDate,
    ppaFee,
    auxilliaryLoss,
    optimiserCost,
    meteringCost,
    tnuosCharge,
    totalCoGS,
    duosCost,
    tnuosTriadCost,
  } = useAppSelector(selectResult);
 

  const period =
    getQuarterNumberFromModelStartDate(modelStartDate, decommissioningEndDate) -
    1;

    const [dateRange, setDateRange] = useState({
        from: modelStartDate,
        to: moment(modelStartDate)
          .add(period, "quarters")
          .add(-1, "days")
          .format(DATE_FORMAT),
      });

  const generateSeriesData = (name: string, sourceData: number[] | null) => {
    const processedData = preProcessArray4Graph(
      active === "quarterly"
        ? multiplyNumber(sourceData, -1) || new Array(period).fill(0)
        : getFilterData(
            multiplyNumber(sourceData, -1) || new Array(period),
            modelStartDate,
            active,
            dateRange
          )
    ).concat(new Array(active === "quarterly" ? 20 : 5).fill(0));

    return processedData.map((r, index) => [
      moment(modelStartDate)
        .add(index * (active === "quarterly" ? 1 : 4), "quarters")
        .startOf("month")
        .valueOf(),
      Number(r),
    ]);
  };

  const series = useMemo(
    () => [
      { name: "PPA Fee", data: generateSeriesData("PPA Fee", ppaFee) },
      { name: "Optimiser commission", data: generateSeriesData("Optimiser commission", optimiserCost) },
      { name: "Auxilliary losses", data: generateSeriesData("Auxilliary losses", auxilliaryLoss) },
      { name: "Metering", data: generateSeriesData("Metering", meteringCost) },
      { name: "DUoS charges", data: generateSeriesData("DUoS charges", duosCost) },
      { name: "TNUoS triads", data: generateSeriesData("TNUoS triads", tnuosTriadCost) },
      { name: "TNUoS demand charges", data: generateSeriesData("TNUoS demand charges", []) },
      { name: "TNUoS export charges", data: generateSeriesData("TNUoS export charges", tnuosCharge) },
      { name: "Total cost of sales", data: generateSeriesData("Total cost of sales", totalCoGS) },
    ],
    [
      modelStartDate,
      ppaFee,
      auxilliaryLoss,
      optimiserCost,
      meteringCost,
      duosCost,
      tnuosCharge,
      totalCoGS,
      tnuosTriadCost,
      active,
      dateRange,
    ]
  );

  return series;
};