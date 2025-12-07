import moment from "moment";
import { useMemo } from "react";
import { calcCashForBalanceSheet } from "../../calculation/calculates/Balance sheet/Current asset/cash";
import { fixedAssetsForBalanceSheet } from "../../calculation/calculates/Balance sheet/Non current asset/Fixed asset/total_fixed_asset";
import { calcSeniorDebtForBalanceSheet } from "../../calculation/calculates/Balance sheet/Non current liabilities/senior_debt";
import { shareholderLoanForBalanceSheet } from "../../calculation/calculates/Balance sheet/Non current liabilities/shareholder_loan";
import { getDynamicDataForEachPeriod, getQuarterNumberFromModelStartDate } from "../../calculation/calculates/utils";
import { useAppSelector } from "../../hooks/hooks";
import { selectResult } from "../../store/slices/resultSlice";

export function useBalanceSheetData(active: string) {
  const {
    gainOnDisposal,
    totalDepreciation,
    capitalExpenditure,
    modelStartDate,
    decommissioningEndDate,
    mCapexProvision,
    vintage,
    revenueSensitivity,
    assumptionsData,
    detailedRevenueData,
    batteryDisposals,
    batteryEfficiency,
    batteryAugmentation,
    capexForecastModel,
    capexPaymentsProfile,
    capexUEL,
    bessCapexForecast,
    lengthOfOperations,
    inflationInputs,
    batteryDuration,
    batteryCubes,
    batteryExCubes,
    initialCycleData,
    initialCapacity,
  } = useAppSelector(selectResult);

  const period = getQuarterNumberFromModelStartDate(modelStartDate, decommissioningEndDate) - 1;

  const series = useMemo(() => {
    const payload = {
      gainOnDisposal,
      totalDepreciation,
      capitalExpenditure,
      revenueSensitivity,
      assumptionsData,
      detailedRevenueData,
      batteryDisposals,
      batteryEfficiency,
      batteryAugmentation,
      model: capexForecastModel,
      batteryDuration,
      batteryCubes,
      batteryExCubes,
      capexPaymentsProfile,
      capexUEL,
      bessCapexForecast,
      inflationInputs,
      initialCycleData,
      initialCapacity,
      operationYears: lengthOfOperations / 12,
      modelStartDate,
      vintage,
      mCapexProvision,
    };

    const fixedAssets = fixedAssetsForBalanceSheet(payload) || new Array(period).fill(0);
    const cash = calcCashForBalanceSheet(payload) || new Array(period).fill(0);
    const seniorDebt = calcSeniorDebtForBalanceSheet(payload) || new Array(period).fill(0);
    const shareholderLoan = shareholderLoanForBalanceSheet(payload) || new Array(period).fill(0);
    const shareCapital = mCapexProvision?.share_capital_end_balance || new Array(period).fill(0);

    const buildSeries = (name: string, data: number[]) =>
      ({
        name,
        data: getDynamicDataForEachPeriod(data, active)
          .concat(new Array(active === "quarterly" ? 20 : 5).fill(0))
          .map((value, index) => {
            const date = moment(modelStartDate);
            return [
              active === "quarterly"
                ? date.add(index, "quarters").startOf("quarter").valueOf()
                : date.add(index, "years").startOf("year").valueOf(),
              Number(value),
            ];
          }),
      });

    return [
      buildSeries("Fixed Assets", fixedAssets),
      buildSeries("Cash", cash),
      buildSeries("Senior Debt", seniorDebt),
      buildSeries("Share Capital", shareCapital),
      buildSeries("Shareholder Loan", shareholderLoan),
    ];
  }, [
    active,
    gainOnDisposal,
    totalDepreciation,
    capitalExpenditure,
    mCapexProvision,
    vintage,
    revenueSensitivity,
    assumptionsData,
    detailedRevenueData,
    batteryDisposals,
    batteryEfficiency,
    batteryAugmentation,
    capexForecastModel,
    batteryCubes,
    batteryExCubes,
    inflationInputs,
    initialCycleData,
    initialCapacity,
  ]);

  return series;
}
