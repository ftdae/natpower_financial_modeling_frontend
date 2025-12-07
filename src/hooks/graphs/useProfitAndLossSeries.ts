import moment from "moment";
import { useMemo, useState } from "react";
import { selectResult } from "../../store/slices/resultSlice";
import { useAppSelector } from "../../hooks/hooks";
import { calcGrossProfitAndLoss } from "../../calculation/calculates/gross_profit_and_loss";
import {
  getFilterData,
  getQuarterNumberFromModelStartDate,
  preProcessArray4Graph,
} from "../../calculation/calculates/utils";
import { DATE_FORMAT } from "../../utils/usePrameter";


export function useProfitAcrossTimeSeries(active: string) {
  const {
    // revenue inputs
    revenueSetup,
    assumptionsData,
    averageWholeSaleDayAheadPrice,
    fixedPPARevenue,
    floatingPPARevenue,
    detailedRevenueData,
    revenueSensitivity,
    // basic project inputs
    initialCapacity,
    landSize,
    modelStartDate,
    constructionStartDate,
    operationStartDate,
    operationEndDate,
    decommissioningStartDate,
    decommissioningEndDate,

    // battery assumption
    batterySensitivity,
    batteryDuration,
    initialCycleData,
    startingAssumptionsForBatteries,
    batteryEfficiency,
    batteryDisposals,
    batteryAugmentation,
    // admin costs inputs
    landRent,
    operationAndManagementSettings,
    assetManagement,
    insurance,
    communityBenefit,
    businessRates,
    extended_warranty,
    siteSecurity,
    legalCosts,
    otherAdministrativeCosts,
    // CoGS
    ppaFeesPercentage,
    optimiser,
    auxilliaryLossesSettings,
    meteringSettings,
    exportChargesOfTNUoS,
    localCircuitsData,
    localSubstationTariff,
    localSubstationSwitch,
    ajdustmentTariffData,
    systemPeakTariffData,
    sharedYearRoundTariffData,
    notSharedYearRoundTariffData,
    // Capex inputs
    model,
    costOfAdditions,
    capexUEL,
    batteryCubes,
    batteryExCubes,
    capexPaymentsProfile,
    capexPaymentMilestones,
    // capexPaymentProfileData,
    // other inputs
    inflationInputs,
    bessCapexForecast,
    operationYears,
    capexSensitivity,
    corporationTax,
    capexProvision,
    cashRequirements,
    gearingByCapexType,
    equity,
    seniorDebt,
    dividends,
    developmentFeePaymentPercentageProfile,
    developmentFeePaymentDateProfile,
    developmentStartDate,
    workingCapital,
    vat,
    // sensitivities,
    constraintFactor,
    opexSensitivity,
  } = useAppSelector(selectResult);
  const {
    wholesaleDayAhead,
    wholesaleDayIntraday,
    balancingMechanism,
    capacityMarket,
    frequencyResponse,
    gainOnDisposal,
    totalRevenue,
  } = useAppSelector(selectResult);
  const {
    auxilliaryLoss,
    optimiserCost,
    tnuosCharge,
    meteringCost,
    totalCoGS,
  } = useAppSelector(selectResult);
  const { ebit } = useAppSelector(selectResult);
  const period =
    getQuarterNumberFromModelStartDate(modelStartDate, decommissioningEndDate) -
    1;
  const { vintage, mCapexProvision } = useAppSelector(selectResult);

  const [dateRange, setDateRange] = useState({
    from: modelStartDate,
    to: moment(modelStartDate)
      .add(period, "quarters")
      .add(-1, "days")
      .format(DATE_FORMAT),
  });

  const graphData = useMemo(() => {
    const payload = {
      // revenue
      wholesaleDayAhead,
      wholesaleDayIntraday,
      balancingMechanism,
      capacityMarket,
      frequencyResponse,
      gainOnDisposal,
      totalRevenue,
      // Cost of goods sold
      auxilliaryLoss,
      optimiserCost,
      tnuosCharge,
      meteringCost,
      totalCoGS,
      // basic project inputs
      initialCapacity,
      landSize,
      modelStartDate,
      constructionStartDate,
      operationStartDate,
      operationEndDate,
      decommissioningStartDate,
      decommissioningEndDate,
      // battery assumption inputs

      batterySensitivity,
      batteryDuration,
      initialCycleData,
      startingAssumptionsForBatteries,
      batteryEfficiency,
      batteryDisposals,
      batteryAugmentation,
      // revenue inputs
      revenueSensitivity,
      revenueSetup,
      assumptionsData,
      fixedPPARevenue,
      floatingPPARevenue,
      averageWholeSaleDayAheadPrice,
      detailedRevenueData,
      //admin costs inputs
      landRent,
      operationAndManagementSettings,
      assetManagement,
      insurance,
      communityBenefit,
      businessRates,
      extended_warranty,
      siteSecurity,
      legalCosts,
      otherAdministrativeCosts,
      // CoGS inputs
      ppaFeesPercentage,
      optimiser,
      auxilliaryLossesSettings,
      meteringSettings,
      exportChargesOfTNUoS,
      localCircuitsData,
      localSubstationTariff,
      localSubstationSwitch,
      ajdustmentTariffData,
      systemPeakTariffData,
      sharedYearRoundTariffData,
      notSharedYearRoundTariffData,
      // Capex inputs
      model,
      costOfAdditions,
      capexUEL,
      batteryCubes,
      batteryExCubes,
      capexPaymentsProfile,
      capexPaymentMilestones,
      // other inputs
      inflationInputs,
      corporationTax,
      capexProvision,
      cashRequirements,
      gearingByCapexType,
      equity,
      seniorDebt,
      dividends,
      developmentFeePaymentPercentageProfile,
      developmentFeePaymentDateProfile,
      developmentStartDate,
      workingCapital,
      vat,

      // // costOfAdditions comes from fixed~~ 7 Capex~~~7.03~7.10
      bessCapexForecast,
      operationYears,
      capexSensitivity,
      // sensitivities,
      constraintFactor,
      opexSensitivity,
      vintage,
      mCapexProvision,
    };

    // const gross_profit = sumArrays(
    //   calcTotalRevenue(payload),
    //   calcTotalCostOfSales(payload)
    // );
    const gross_profit = calcGrossProfitAndLoss(payload);
    const ebitda = ebit?.ebitda;
    const profitAfterTax = mCapexProvision?.profit_loss_after_tax;
    const period =
      getQuarterNumberFromModelStartDate(
        modelStartDate,
        decommissioningEndDate
      ) - 1;
    const resultForAnnual = [
      {
        name: "Gross Profit",
        data: preProcessArray4Graph(
          getFilterData(
            gross_profit || new Array(period).fill(0),
            modelStartDate,
            active,
            dateRange
          )
        )
          .concat(new Array(5).fill(0))
          .map((r, index) => [
            moment(modelStartDate)
              .add(-1, "day")
              .add((index + 1) * 4, "quarters")
              .endOf("month")
              .valueOf(),
            Number(r),
          ]),
      },
      {
        name: "EBITDA",
        data: preProcessArray4Graph(
          getFilterData(
            ebitda || new Array(period).fill(0),
            modelStartDate,
            active,
            dateRange
          )
        )
          .concat(new Array(5).fill(0))
          .map((r, index) => [
            moment(modelStartDate)
              .add(-1, "day")
              .add((index + 1) * 4, "quarters")
              .endOf("month")
              .valueOf(), 
            Number(r), 
          ]),
      },
      {
        name: "Profit After Tax",
        data: preProcessArray4Graph(
          getFilterData(
            profitAfterTax || new Array(period).fill(0),
            modelStartDate,
            active,
            dateRange
          )
        )
          .concat(new Array(5).fill(0))
          .map((r, index) => [
            moment(modelStartDate)
              .add((index + 1) * 4, "quarters")
              .add(-1, "day")
              .endOf("month")
              .valueOf(),
            Number(r), 
          ]),
      },
    ];

    const resultForQuarter = [
      {
        name: "Gross Profit",
        data: preProcessArray4Graph(gross_profit || new Array(period).fill(0))
          .concat(new Array(20).fill(0))
          .map((r, index) => [
            moment(modelStartDate)
              .add(index, "quarters")
              .startOf("month")
              .valueOf(), 
            Number(r), 
          ]),
      },
      {
        name: "EBITDA",
        data: preProcessArray4Graph(ebitda || new Array(period).fill(0))
          .concat(new Array(20).fill(0))
          .map((r, index) => [
            moment(modelStartDate)
              .add(index, "quarters")
              .startOf("month")
              .valueOf(), 
            Number(r), 
          ]),
      },
      {
        name: "Profit After Tax",
        data: preProcessArray4Graph(profitAfterTax || new Array(period).fill(0))
          .concat(new Array(20).fill(0))
          .map((r, index) => [
            moment(modelStartDate)
              .add(index, "quarters")
              .startOf("month")
              .valueOf(), 
            Number(r), 
          ]),
      },
    ];

    return active === "quarterly" ? resultForQuarter : resultForAnnual;
  }, [vintage, mCapexProvision, active]);

  return graphData
}
