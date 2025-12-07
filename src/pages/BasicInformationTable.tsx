import moment from "moment";
import projectValuationSVG from "../assets/ProjValue.svg";
import { getAsAPercentOfPeriod, sumArray } from "../calculation/calculates/utils";
import { INFLATION_START_YEAR } from "../eMarine/emarine front constant";
import { useAppSelector } from "../hooks/hooks";
import { selectResult } from "../store/slices/resultSlice";
import { DATE_FORMAT } from "../utils/usePrameter";


interface OperationInfoTableProps {
  dashboardStyle?: boolean;
}

const BasicInfoTable = ({
  dashboardStyle = true,
}: OperationInfoTableProps) => {
  const {
    assetName,
    modoRegion,
    initialCapacity,
    batteryDuration,
    gridConnectionDate,
    batteryEfficiency,
    startingAssumptionsForBatteries,
    batteryDisposals,
    revenueSetup,
    modelStartDate,
    cyclesData,
    operationYears,
    inflationInputs,
    landSize,
    landRent,
    valuation,
    fullyConsentedDate,
    developmentStartDate,
    developmentFeePaymentPercentageProfile,
    decommissioningStartDate,
    decommissioningEndDate,
    operationStartDate = "2030-01-01",
  } = useAppSelector(selectResult);
  const itemList: string[] = [
    'Project Name',
    'Region',
    'Capacity',
    'Grid connection date',
    'Round trip efficiency',
    'Battery availability',
    'Batteries replaced when energy retention reaches',
    'Revenue assumption provider',
    'Average cycling profile',
    'Inflation',
    'Acres',
    'Annual base land rent',
    'Development premium payment milestones',
    'Unlevered discount rate for NPV',
    'Levered discount rate for NPV',
    'Milestone date for NVP and IRR'
  ];
  const rows = itemList.length

  let underlyingAssnumptions: any[] = new Array(rows).fill('-');
  underlyingAssnumptions[0] = assetName
  underlyingAssnumptions[1] = modoRegion ? `${modoRegion}, Great Britain` : '-'
  underlyingAssnumptions[2] = initialCapacity ? (initialCapacity > 1000 ? `${initialCapacity / 1000}GW/${initialCapacity * batteryDuration / 1000}GWh` : `${initialCapacity}MW/${initialCapacity * batteryDuration}MWh`) : '-'
  underlyingAssnumptions[3] = gridConnectionDate != '-' ? moment(gridConnectionDate).format('DD MMM yyyy') : '-'
  underlyingAssnumptions[4] = batteryEfficiency?.fixedEfficiency ? `${batteryEfficiency?.fixedEfficiency}%` : '-'
  underlyingAssnumptions[5] = startingAssumptionsForBatteries?.batteryAvailability ? `${startingAssumptionsForBatteries?.batteryAvailability}%` : '-'
  underlyingAssnumptions[6] = batteryDisposals?.disposedRetentionRate ? `${batteryDisposals?.disposedRetentionRate}%` : '-'
  underlyingAssnumptions[7] = revenueSetup?.forecastProviderChoice ? `${revenueSetup?.forecastProviderChoice}` : '-'
  const operationPercentage = getAsAPercentOfPeriod(
    modelStartDate,
    operationStartDate,
    moment(decommissioningStartDate).add(-1, "days").format(DATE_FORMAT),
    decommissioningEndDate
  );
  underlyingAssnumptions[8] = cyclesData ? `${(sumArray(operationPercentage.map((d, index) => d * cyclesData[index])) / (operationYears * 4)).toFixed(2)}/cycles per day` : '-';
  let inflationRatios = new Array(4).fill('-')
  inflationRatios[0] = inflationInputs.find((inflation, index) => (inflation?.profile == revenueSetup?.inflation))?.rate[2025 - INFLATION_START_YEAR] || '-';
  inflationRatios[1] = inflationInputs.find((inflation, index) => (inflation?.profile == revenueSetup?.inflation))?.rate[2026 - INFLATION_START_YEAR] || '-';
  inflationRatios[2] = inflationInputs.find((inflation, index) => (inflation?.profile == revenueSetup?.inflation))?.rate[2027 - INFLATION_START_YEAR] || '-';
  inflationRatios[3] = inflationInputs.find((inflation, index) => (inflation?.profile == revenueSetup?.inflation))?.rate[2028 - INFLATION_START_YEAR + 1] || '-';
  underlyingAssnumptions[9] = revenueSetup?.inflation ? [
    revenueSetup?.inflation,
    `- 2025 : ${inflationRatios[0]}%`,
    `- 2026 : ${inflationRatios[1]}%`,
    `- 2027 : ${inflationRatios[2]}%`,
    `- 2028 Onwards : ${inflationRatios[3]}%`,
  ] : '-'
  underlyingAssnumptions[10] = landSize ? `${landSize}` : '-'
  const rentBasis = landRent?.annualLandRent?.landRentBasis
  underlyingAssnumptions[11] = rentBasis == '' ? '-' : (rentBasis == 'per acre' ? `£${landRent?.annualLandRent?.annualLandRentPerAcreCharge}k ${rentBasis}` : `£${landRent?.annualLandRent?.annualLandRentPerMWCharge}k ${rentBasis}`)
  const devMilestones = developmentFeePaymentPercentageProfile
  const sumOfDevMilestones = devMilestones.paymentPercentageAtClosingOfDebtAgreementDate * 1 + devMilestones.paymentPercentageAtFullyConsented * 1 + devMilestones.paymentPercentageAtGridSecuredDate * 1 + devMilestones.paymentPercentageAtLandSecuredDate * 1 + devMilestones.paymentPercentageAtcOD * 1 + devMilestones.paymentPercentageAtrTB * 1
  underlyingAssnumptions[12] = sumOfDevMilestones == 0 ? '-' : [
    `-${devMilestones.paymentPercentageAtFullyConsented}% at FCO`,
    `-${devMilestones.paymentPercentageAtrTB}% at RtB`,
    `-${devMilestones.paymentPercentageAtcOD}% at COD`,

  ]
  underlyingAssnumptions[13] = valuation?.cost_of_equity == 0 ? '-' : `${valuation?.cost_of_equity}%`
  underlyingAssnumptions[14] = valuation?.cost_of_equity == 0 ? '-' : `${valuation?.cost_of_equity}%`
  underlyingAssnumptions[15] = developmentStartDate ? `Fully consented at ${moment(fullyConsentedDate).format('DD MMM yyyy')}` : '-'

  return (
    <div className={`my-6 ${!dashboardStyle ? "mx-auto" : ""} `}>
      <h1 className="text-[2rem] mx-6 font-bold flex items-baseline gap-2">
        <img
          src={projectValuationSVG}
          className="h-[2rem]"
          style={{ filter: "contrast(0) brightness(0)" }}
        />
        Project Information
      </h1>
      <div className={`overflow-x-auto mt-8 text-gray-600 shadow-lg border border-gray-300 ${!dashboardStyle ? "w-[40vw]" : ""}`}>
        <table className="min-w-full border-collapse border border-gray-300 bg-white">
          <thead>
            <tr>

              <th className="border border-gray-300 text-left px-4 py-2 bg-gray-100 sticky left-0 w-auto">
                Item
              </th>
              <th className="border border-gray-300 text-left px-4 py-2 bg-gray-100">
                Underlying Assumption
              </th>
            </tr>
          </thead>
          <tbody>
            {itemList.map((item, index) => (
              <tr key={index}>
                <td className="border border-gray-300 text-left px-4 py-2">
                  {item}
                </td>
                {Array.isArray(underlyingAssnumptions[index]) ? (
                  <td colSpan={3} className="border border-gray-300 text-left px-4 py-2">
                    <table className="w-full">
                      <tbody>
                        {underlyingAssnumptions[index].map((assumption, subIndex) => (
                          <tr key={subIndex}>
                            <td className="text-left py-2">
                              {assumption}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </td>
                ) : (
                  <td className="border border-gray-300 text-left px-4 py-2">
                    {underlyingAssnumptions[index]}
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
export default BasicInfoTable