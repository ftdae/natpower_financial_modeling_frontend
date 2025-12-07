import projectValuationSVG from "../assets/ProjValue.svg";
import {
  arraySum,
  getQuarterNumberFromModelStartDate,
  indexOfSecondLargest,
  multiplyNumber,
  sumArray,
  sumArrays,
} from "../calculation/calculates/utils";
import { useAppSelector } from "../hooks/hooks";
import { selectResult } from "../store/slices/resultSlice";
import { calcKPIs } from "../Valuation/KPIs";
import { IValuation, IValuationResult } from "../Valuation/type";

interface OperationInfoTableProps {
  dashboardStyle?: boolean;
}
const OperationInfoTable = ({
  dashboardStyle = true,
}: OperationInfoTableProps) => {
  const {
    initialCapacity,
    operationYears,
    valuation,
    wholesaleDayAhead,
    wholesaleDayIntraday,
    capacityMarket,
    balancingMechanism,
    frequencyResponse,
    balancingReserve,
    solarRevenue,
    totalTNUoSTriads,
    totalCoGS,
    totalAdminCosts,
    tnuosCharge,
    duosCost,
    tnuosTriadCost,
    ebit,
    landAdditions,
    poolingSubstationAdditions,
    substationBuildDevAdditions,
    devexAdditions,
    transformersAdditions,
    balanceOfPlantAdditions,
    evAdditions,
    communityBenefitToCapex,
    nGSecurities,
    landRentExpense,
    modelStartDate,
    vintage,
    corporationTax,
    gearingByCapexType,
    seniorDebt,
    mCapexProvision,
    operatingCashFlowValue,
    capitalExpenditure,
    corporationTaxValue,
    gainOnDisposal,
    returnsSettings,
    fullyConsentedDate,
    decommissioningEndDate,
    operationStartDate = "2030-01-01",
  } = useAppSelector(selectResult);
  const itemList: string[] = [
    "Average annual revenue",
    "Average annual opex (incl. DUoS/TNUoS)",
    "Average annual TNUoS/DUoS",
    "Average annual EBITDA",
    "Initial capex",
    "Augmentation capex",
    "Debt",
    "Leverage - initial capex",
    "Interest rate",
    "Pre-tax unlevered IRR",
    "Post-tax levered IRR",
    "Post-tax unlevered NPV",
    "Post-tax levered NPV",
    "Total development premium",
  ];
  const unitList: string[] = [
    "£m",
    "£m",
    "£m",
    "£m",
    "£m",
    "£m",
    "£m",
    "%",
    "%",
    "%",
    "%",
    "£m",
    "£m",
    "£m",
  ];
  const rows = itemList.length;
  let value: any[] = new Array(rows).fill("-");
  const operationRevenueSum = sumArray(
    sumArrays(
      wholesaleDayAhead,
      wholesaleDayIntraday,
      capacityMarket,
      balancingMechanism,
      frequencyResponse,
      balancingReserve,
      solarRevenue,
      totalTNUoSTriads
    )
  );
  value[0] =
    operationRevenueSum == 0
      ? "-"
      : (operationRevenueSum / operationYears / 1000).toFixed(2);
  const toatlOpex = sumArray(totalAdminCosts) * 1 + sumArray(totalCoGS) * 1;
  value[1] =
    toatlOpex != 0
      ? `(${Math.abs(toatlOpex / operationYears / 1000).toFixed(2)})`
      : "-";

  const tnuosAndDuos = sumArray(
    sumArrays(tnuosCharge, tnuosTriadCost, duosCost)
  );
  value[2] =
    tnuosAndDuos != 0
      ? `${Math.abs(tnuosAndDuos / operationYears / 1000).toFixed(2)}`
      : "-";

  const period =
    getQuarterNumberFromModelStartDate(modelStartDate, decommissioningEndDate) -
    1;
  const totalEbitda = sumArray(ebit.ebitda);
  value[3] =
    totalEbitda != 0 ? (totalEbitda / operationYears / 1000).toFixed(2) : "-";
  const enterpriseValueAdditions = evAdditions;
  const forecastAdditionsForCapitalizedCommunityBenefit = multiplyNumber(
    communityBenefitToCapex?.forecastCostToCapex,
    -1
  );
  const forecastAdditionsForNGSecurityPremiumFees =
    nGSecurities?.additionsForCapex || new Array(period).fill(0);
  const capitalisedRent = multiplyNumber(landRentExpense?.rentToFixedAssets || new Array(period).fill(0), -1);
  const vintagesData = vintage.vintages;
  let vintagesAdditionsCost =
    vintagesData[0].data.forecastAdditionsByMilestones ||
    new Array(period).fill(0);
  const capexExcludingBatteries = sumArrays(
    landAdditions,
    poolingSubstationAdditions,
    substationBuildDevAdditions,
    capitalisedRent,
    devexAdditions?.devexAdditions || new Array(period).fill(0),
    transformersAdditions,
    balanceOfPlantAdditions,
    enterpriseValueAdditions,
    forecastAdditionsForCapitalizedCommunityBenefit,
    forecastAdditionsForNGSecurityPremiumFees,
    vintagesAdditionsCost
  );
  value[4] =
    sumArray(capexExcludingBatteries) != 0 && initialCapacity != 0
      ? (sumArray(capexExcludingBatteries) / 1000).toFixed(2)
      : "-";

  const numberOfVintages = vintagesData.length;
  const capacityPreAdjustmentForEfficiency = [];
  let vintageAdditionExceptForOne = new Array(period).fill(0);
  for (let i = 0; i < numberOfVintages; i++) {
    if (vintagesData[i].data.stagingMonthNumber == 0) break;
    else
      capacityPreAdjustmentForEfficiency[i] =
        vintagesData[i].data.capacityPreAdjustmentForEfficiency;
  }
  const drawdownedBatteryNumber =
    indexOfSecondLargest(capacityPreAdjustmentForEfficiency) + 1 || 1;
  for (let i = 1; i < numberOfVintages; i++) {
    if (vintagesData[i]?.data?.stagingMonthNumber == 0) break;
    else if (i != drawdownedBatteryNumber - 1)
      vintageAdditionExceptForOne = arraySum(
        vintageAdditionExceptForOne,
        vintagesData[i]?.data?.forecastAdditionsByMilestones
      );
  }
  value[5] =
    sumArray(vintageAdditionExceptForOne) != 0
      ? (sumArray(vintageAdditionExceptForOne) / 1000).toFixed(2)
      : "-";
  value[6] = "-";
  value[7] = "n.a.";
  value[8] = "n.a.";

  const costOfEquity =
    valuation?.cost_of_equity == 0 ? 10 / 100 : valuation?.cost_of_equity / 100;
  let valuationArray: IValuation[] = [
    {
      cost_of_equity: costOfEquity,
      valuation_date: fullyConsentedDate || "2025-01-01",
      date_string: valuation?.date_string || 'Fully consented'
    },
  ];
  const resultArray: IValuationResult[][] = [];
  valuationArray.map((dd) => {
    resultArray.push(
      calcKPIs({
        corporationTax,
        gearingByCapexType,
        seniorDebt,
        decommissioningEndDate,
        mCapexProvision,
        operatingCashFlowValue,
        capitalExpenditure,
        corporationTaxValue,
        gainOnDisposal,
        valuation: dd,
        returnsSettings,
        evAdditions,
        operationStartDate,
      })
    );
  });
  value[9] =
    resultArray[0][0].value.irr != 0
      ? `${(resultArray[0][0].value.irr * 100).toFixed(2)}%`
      : "-";
  value[10] =
    resultArray[0][2].value.irr != 0
      ? `${(resultArray[0][2].value.irr * 100).toFixed(2)}%`
      : "-";
  value[11] =
    resultArray[0][1].value.npv != 0
      ? `${(resultArray[0][1].value.npv / 1000).toFixed(2)}`
      : "-";
  value[12] =
    resultArray[0][2].value.npv != 0
      ? `${(resultArray[0][2].value.npv / 1000).toFixed(2)}`
      : "-";
  value[13] =
    sumArray(evAdditions || new Array(period).fill(0)) != 0
      ? (sumArray(evAdditions) / 1000).toFixed(2)
      : "-";

  return (
    <div className={`my-6 ${!dashboardStyle ? "mx-auto" : ""} `}>
      <h1 className="text-[2rem] mx-6 font-bold flex items-baseline gap-2">
        <img
          src={projectValuationSVG}
          className="h-[2rem]"
          style={{ filter: "contrast(0) brightness(0)" }}
        />
        Operation Result Overview
      </h1>
      <div className={`overflow-x-auto mt-8 text-gray-600 shadow-lg border border-gray-300 ${!dashboardStyle ? "w-[40vw]" : ""}`}>
        <table className="min-w-full border-collapse border border-gray-300 bg-white">
          <thead>
            <tr>
              <th className="border border-gray-300 text-left px-4 py-2 bg-gray-100 sticky left-0 w-auto">
                Item
              </th>
              <th className="border border-gray-300 text-center px-4 py-2 bg-gray-100 sticky left-0 w-auto">
                Unit
              </th>
              <th className="border border-gray-300 text-center px-4 py-2 bg-gray-100">
                Value
              </th>
            </tr>
          </thead>
          <tbody>
            {itemList.map((item, index) => (
              <tr key={index}>
                <td className="border border-gray-300 text-left px-4 py-2">
                  {item}
                </td>
                <td className="border border-gray-300 text-center px-4 py-2">
                  {unitList[index]}
                </td>
                {Array.isArray(value[index]) ? (
                  <td
                    colSpan={3}
                    className="border border-gray-300 text-center px-4 py-2"
                  >
                    <table className="w-full">
                      <tbody>
                        {value[index].map((assumption, subIndex) => (
                          <tr key={subIndex}>
                            <td className="text-center py-2">{assumption}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </td>
                ) : (
                  <td className="border border-gray-300 text-center px-4 py-2">
                    {value[index]}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default OperationInfoTable;
