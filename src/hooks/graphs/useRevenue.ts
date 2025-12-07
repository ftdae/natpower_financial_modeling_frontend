import moment from "moment";
import { useEffect, useMemo, useState } from "react";
import {
  getFilterData,
  getQuarterNumberFromModelStartDate,
} from "../../calculation/calculates/utils";
import GroupedTypeSelectorForGraph from "../../components/FinStatements/GroupedTypeSelectorForGraph";
import { useAppSelector } from "../../hooks/hooks";
import { selectResult } from "../../store/slices/resultSlice";
import { DATE_FORMAT } from "../../utils/usePrameter";


const generateRevenueData = (
  data,
  modelStartDate,
  period,
  dateRange,
  active,
  isQuarterly
) => {
  const fillData = (sourceData) => {
    return (sourceData || new Array(period).fill(0))
      .concat(new Array(10).fill(0))
      .map((r, index) => [
        moment(modelStartDate)
          .add(index, isQuarterly ? "quarters" : "quarters")
          .startOf(isQuarterly ? "month" : "month")
          .valueOf(),
        Number(r),
      ]);
  };

  return {
    name: data.name,
    data: isQuarterly
      ? fillData(data.data)
      : fillData(getFilterData(data.data, modelStartDate, active, dateRange)),
  };
};

export function useRevenueSeries(active: string) {
  const {
    wholesaleDayAhead,
    wholesaleDayIntraday,
    balancingMechanism,
    frequencyResponse,
    capacityMarket,
    gainOnDisposal,
    fixedPPAValue,
    floatingPPAValue,
    totalTNUoSTriads,
    balancingReserve,
    residualRevenue,
    tollingRevenue,
    modelStartDate,
    decommissioningEndDate,
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

  const revenueData = useMemo(() => {
    const isQuarterly = active === "quarterly";

    // Revenue Data for Quarter
    const resultForQuarter = [
      generateRevenueData(
        { name: "Wholesale Day Ahead", data: wholesaleDayAhead },
        modelStartDate,
        period,
        dateRange,
        active,
        true
      ),
      generateRevenueData(
        { name: "Wholesale Intraday", data: wholesaleDayIntraday },
        modelStartDate,
        period,
        dateRange,
        active,
        true
      ),
      generateRevenueData(
        { name: "Capacity Market", data: capacityMarket },
        modelStartDate,
        period,
        dateRange,
        active,
        true
      ),
      generateRevenueData(
        { name: "Balancing Mechanism", data: balancingMechanism },
        modelStartDate,
        period,
        dateRange,
        active,
        true
      ),
      generateRevenueData(
        { name: "Frequency Response", data: frequencyResponse },
        modelStartDate,
        period,
        dateRange,
        active,
        true
      ),
      generateRevenueData(
        { name: "Reserve", data: balancingReserve },
        modelStartDate,
        period,
        dateRange,
        active,
        true
      ),
      generateRevenueData(
        { name: "TNUoS - triads", data: totalTNUoSTriads },
        modelStartDate,
        period,
        dateRange,
        active,
        true
      ),
      generateRevenueData(
        {
          name: "Gain/(loss) on disposal of batteries",
          data: gainOnDisposal?.gainOnDisposalRevenue,
        },
        modelStartDate,
        period,
        dateRange,
        active,
        true
      ),
      generateRevenueData(
        { name: "Residual value", data: residualRevenue },
        modelStartDate,
        period,
        dateRange,
        active,
        true
      ),
    ];

    // Revenue Data for Annual
    const resultForAnnual = [
      generateRevenueData(
        { name: "Wholesale Day Ahead", data: wholesaleDayAhead },
        modelStartDate,
        period,
        dateRange,
        active,
        false
      ),
      generateRevenueData(
        { name: "Wholesale Intraday", data: wholesaleDayIntraday },
        modelStartDate,
        period,
        dateRange,
        active,
        false
      ),
      generateRevenueData(
        { name: "Capacity Market", data: capacityMarket },
        modelStartDate,
        period,
        dateRange,
        active,
        false
      ),
      generateRevenueData(
        { name: "Balancing Mechanism", data: balancingMechanism },
        modelStartDate,
        period,
        dateRange,
        active,
        false
      ),
      generateRevenueData(
        { name: "Frequency Response", data: frequencyResponse },
        modelStartDate,
        period,
        dateRange,
        active,
        false
      ),
      generateRevenueData(
        { name: "Reserve", data: balancingReserve },
        modelStartDate,
        period,
        dateRange,
        active,
        false
      ),
      generateRevenueData(
        { name: "TNUoS - triads", data: totalTNUoSTriads },
        modelStartDate,
        period,
        dateRange,
        active,
        false
      ),
      generateRevenueData(
        {
          name: "Gain/(loss) on disposal of batteries",
          data: gainOnDisposal?.gainOnDisposalRevenue,
        },
        modelStartDate,
        period,
        dateRange,
        active,
        false
      ),
      generateRevenueData(
        { name: "Residual value", data: residualRevenue },
        modelStartDate,
        period,
        dateRange,
        active,
        false
      ),
    ];

    return isQuarterly ? resultForQuarter : resultForAnnual;
  }, [
    capacityMarket,
    frequencyResponse,
    wholesaleDayIntraday,
    wholesaleDayAhead,
    balancingMechanism,
    gainOnDisposal,
    fixedPPAValue,
    floatingPPAValue,
    active,
    dateRange,
  ]);

  return revenueData;
}
