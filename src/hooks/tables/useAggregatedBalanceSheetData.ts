import moment from "moment";
import { useEffect, useMemo, useState } from "react";
import { fixedAssetsForBalanceSheet } from "../../calculation/calculates/Balance sheet/Non current asset/Fixed asset/total_fixed_asset";
import {
  getDynamicDataForEachPeriod,
  getFilterData,
  getHeaders,
  getQuarterNumberFromModelStartDate,
  roundArray,
  sumArray,
  sumArrays,
} from "../../calculation/calculates/utils";
import { useAppSelector } from "../../hooks/hooks";
import { selectResult } from "../../store/slices/resultSlice";
import { DATE_FORMAT } from "../../utils/usePrameter";
import { selectParam } from "../../store/slices/parameterSlice";

export function useAggregatedBalanceSheetData(
  active: string,
  hasTotal: string
) {
  const { currentProjectType, emarineCalculationResults } =
    useAppSelector(selectParam);
  const {
    modelStartDate,
    // basic project inputs
    initialCapacity,
    landSize,
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
    nationalGridSecurities,
    variableProfileForAttributableCosts,
    calculationPeriod,
    fullyConsentedDate,
  } = useAppSelector(selectResult);

  const period =
    getQuarterNumberFromModelStartDate(modelStartDate, decommissioningEndDate) -
    1;
  const { gainOnDisposal, vintage, mCapexProvision } =
    useAppSelector(selectResult);
  const { decommissioningCosts, nGSecurities } = useAppSelector(selectResult);
  const { totalDepreciation } = useAppSelector(selectResult);
  const {
    movementInTradeCreditor,
    movementInTradeDebtor,
    capexCreditor,
    movementInVATCreditor,
    movementInPrepayments,
  } = useAppSelector(selectResult);
  const { corporationTaxValue, capitalExpenditure } =
    useAppSelector(selectResult);

  const [dateRange, setDateRange] = useState({
    from: modelStartDate,
    to: moment(modelStartDate)
      .add(period, "quarters")
      .add(-1, "days")
      .format(DATE_FORMAT),
  });

  const newLen =
    getFilterData(
      mCapexProvision?.senior_debt_for_balance_sheet ||
        new Array(period).fill(0),
      modelStartDate,
      active,
      dateRange
    )?.length || period;

  const boldRows = [
    "Non-current assets £'000",
    "Total liabilities £'000",
    "Total assets £'000",
    "Current assets £'000",
    "Current liabilities £'000",
    "Non-current liabilities £'000",
    "Net assets £'000",
    "Capital and reserves £'000",
    "Shareholders' funds £'000",
  ];

  const headers = useMemo(() => {
    return getHeaders(modelStartDate, active, dateRange, hasTotal);
  }, [modelStartDate, active, dateRange]);
  const tableData = useMemo(() => {
    const payload = {
      gainOnDisposal,
      capitalExpenditure,
      totalDepreciation,
      movementInTradeDebtor,
      vintage,
      mCapexProvision,
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
      working_capital: workingCapital,
      vat,
      bessCapexForecast,
      operationYears,
      capexSensitivity,
      constraintFactor,
      opexSensitivity,
      national_grid_securities: nationalGridSecurities,
      variable_profile_for_attributable_costs:
        variableProfileForAttributableCosts,
      fullyConsentedDate,
    };
    const rlt = {
      id: "balance_sheet",
      title: "Balance Sheet",
      data: [],
      children: [
        {
          id: "total_assets",
          title: "Total assets £'000",
          data: getDynamicDataForEachPeriod(
            roundArray(
              sumArrays(
                fixedAssetsForBalanceSheet(payload),
                nGSecurities?.national_grid_securities_for_balance_sheet ||
                  new Array(calculationPeriod).fill(0),
                sumArrays(
                  movementInTradeDebtor?.trade_debtors_for_balance_sheet ||
                    new Array(calculationPeriod).fill(0),
                  movementInPrepayments?.prepayments_for_balance_sheet ||
                    new Array(calculationPeriod).fill(0),
                  mCapexProvision?.cashEndBalance ||
                    new Array(calculationPeriod).fill(0)
                )
              ),
              10
            ),
            active
          ).slice(0, newLen),
          children: [
            {
              id: "non_current_assets",
              title: "Non-current assets £'000",
              data: getDynamicDataForEachPeriod(
                roundArray(
                  sumArrays(
                    fixedAssetsForBalanceSheet(payload),
                    nGSecurities?.national_grid_securities_for_balance_sheet ||
                      new Array(calculationPeriod).fill(0)
                  ),
                  10
                ),
                active
              ).slice(0, newLen),
              children: [
                {
                  id: "fixed_assets",
                  title: "Fixed assets £'000",
                  data: getDynamicDataForEachPeriod(
                    roundArray(fixedAssetsForBalanceSheet(payload), 10),
                    active
                  ).slice(0, newLen),
                },
                {
                  id: "escrow_account",
                  title: "Escrow account £'000",
                  data: getDynamicDataForEachPeriod(
                    roundArray(
                      nGSecurities?.national_grid_securities_for_balance_sheet ||
                        [],
                      10
                    ),
                    active
                  ).slice(0, newLen),
                },
              ],
            },
            {
              id: "current_assets",
              title: "Current assets £'000",
              data: getDynamicDataForEachPeriod(
                roundArray(
                  sumArrays(
                    movementInTradeDebtor?.trade_debtors_for_balance_sheet ||
                      new Array(calculationPeriod).fill(0),
                    movementInPrepayments?.prepayments_for_balance_sheet ||
                      new Array(calculationPeriod).fill(0),
                    mCapexProvision?.cashEndBalance ||
                      new Array(calculationPeriod).fill(0)
                  ),
                  10
                ),
                active
              ).slice(0, newLen),
              children: [
                {
                  id: "trade_debtors",
                  title: "Trade debtors £'000",
                  data: getDynamicDataForEachPeriod(
                    roundArray(
                      movementInTradeDebtor?.trade_debtors_for_balance_sheet ||
                        [],
                      10
                    ),
                    active
                  ).slice(0, newLen),
                },
                {
                  id: "prepayments",
                  title: "Prepayments £'000",
                  data: getDynamicDataForEachPeriod(
                    roundArray(
                      movementInPrepayments?.prepayments_for_balance_sheet ||
                        [],
                      10
                    ),
                    active
                  ).slice(0, newLen),
                },
                {
                  id: "cash",
                  title: "Cash £'000",
                  data: getDynamicDataForEachPeriod(
                    roundArray(mCapexProvision?.cashEndBalance || [], 10),
                    active
                  ).slice(0, newLen),
                },
              ],
            },
          ],
        },
        {
          id: "total_liabilities",
          title: "Total liabilities £'000",
          data: getDynamicDataForEachPeriod(
            roundArray(
              sumArrays(
                movementInTradeCreditor?.trade_creditors_for_balance_sheet ||
                  new Array(calculationPeriod).fill(0),
                capexCreditor?.capex_creditor_for_balance_sheet ||
                  new Array(calculationPeriod).fill(0),
                movementInVATCreditor?.vat_creditor_for_balance_sheet ||
                  new Array(calculationPeriod).fill(0),
                sumArrays(
                  mCapexProvision?.senior_debt_for_balance_sheet ||
                    new Array(calculationPeriod).fill(0),
                  mCapexProvision?.shareholder_loan_for_balance_sheet ||
                    new Array(calculationPeriod).fill(0),
                  decommissioningCosts?.decommissioning_provision_for_balance_sheet ||
                    new Array(calculationPeriod).fill(0)
                ),
                corporationTaxValue?.corporate_tax_creditor_for_balance_sheet ||
                  new Array(calculationPeriod).fill(0)
              ),
              10
            ),
            active
          ).slice(0, newLen),
          children: [
            {
              id: "current_liabilities",
              title: "Current liabilities £'000",
              data: getDynamicDataForEachPeriod(
                roundArray(
                  sumArrays(
                    movementInTradeCreditor?.trade_creditors_for_balance_sheet ||
                      new Array(calculationPeriod).fill(0),
                    capexCreditor?.capex_creditor_for_balance_sheet ||
                      new Array(calculationPeriod).fill(0),
                    movementInVATCreditor?.vat_creditor_for_balance_sheet ||
                      new Array(calculationPeriod).fill(0),
                    corporationTaxValue?.corporate_tax_creditor_for_balance_sheet ||
                      new Array(calculationPeriod).fill(0)
                  ),
                  10
                ),
                active
              ).slice(0, newLen),
              children: [
                {
                  id: "trade_creditors",
                  title: "Trade creditors £'000",
                  data: getDynamicDataForEachPeriod(
                    roundArray(
                      movementInTradeCreditor?.trade_creditors_for_balance_sheet ||
                        [],
                      10
                    ),
                    active
                  ).slice(0, newLen),
                },
                {
                  id: "capex_creditor",
                  title: "Capex creditor £'000",
                  data: getDynamicDataForEachPeriod(
                    roundArray(
                      capexCreditor?.capex_creditor_for_balance_sheet || [],
                      10
                    ),
                    active
                  ).slice(0, newLen),
                },
                {
                  id: "vat_creditor",
                  title: "VAT creditor £'000",
                  data: getDynamicDataForEachPeriod(
                    roundArray(
                      movementInVATCreditor?.vat_creditor_for_balance_sheet ||
                        [],
                      10
                    ),
                    active
                  ).slice(0, newLen),
                },
                {
                  id: "corporate_tax_creditor",
                  title: "Corporate tax creditor £'000",
                  data: getDynamicDataForEachPeriod(
                    roundArray(
                      corporationTaxValue?.corporate_tax_creditor_for_balance_sheet ||
                        [],
                      10
                    ),
                    active
                  ).slice(0, newLen),
                },
              ],
            },
            {
              id: "non_current_liabilities",
              title: "Non-current liabilities £'000",
              data: getDynamicDataForEachPeriod(
                roundArray(
                  sumArrays(
                    mCapexProvision?.senior_debt_for_balance_sheet ||
                      new Array(calculationPeriod).fill(0),
                    mCapexProvision?.shareholder_loan_for_balance_sheet ||
                      new Array(calculationPeriod).fill(0),
                    decommissioningCosts?.decommissioning_provision_for_balance_sheet ||
                      new Array(calculationPeriod).fill(0)
                  ),
                  10
                ),
                active
              ).slice(0, newLen),
              children: [
                {
                  id: "senior_debt",
                  title: "Senior debt £'000",
                  data: getDynamicDataForEachPeriod(
                    roundArray(
                      mCapexProvision?.senior_debt_for_balance_sheet || [],
                      10
                    ),
                    active
                  ).slice(0, newLen),
                },
                {
                  id: "shareholder_loan",
                  title: "Shareholder loan £'000",
                  data: getDynamicDataForEachPeriod(
                    roundArray(
                      mCapexProvision?.shareholder_loan_for_balance_sheet || [],
                      10
                    ),
                    active
                  ).slice(0, newLen),
                },
                {
                  id: "decommissioning_provision",
                  title: "Decommissioning provision £'000",
                  data: getDynamicDataForEachPeriod(
                    roundArray(
                      decommissioningCosts?.decommissioning_provision_for_balance_sheet ||
                        [],
                      10
                    ),
                    active
                  ).slice(0, newLen),
                },
              ],
            },
          ],
        },
        {
          id: "net_assets",
          title: "Net assets £'000",
          data: getDynamicDataForEachPeriod(
            roundArray(
              sumArrays(
                fixedAssetsForBalanceSheet(payload),
                nGSecurities?.national_grid_securities_for_balance_sheet ||
                  new Array(calculationPeriod).fill(0),
                sumArrays(
                  movementInTradeDebtor?.trade_debtors_for_balance_sheet ||
                    new Array(calculationPeriod).fill(0),
                  movementInPrepayments?.prepayments_for_balance_sheet ||
                    new Array(calculationPeriod).fill(0),
                  mCapexProvision?.cashEndBalance ||
                    new Array(calculationPeriod).fill(0),
                  movementInTradeCreditor?.trade_creditors_for_balance_sheet ||
                    new Array(calculationPeriod).fill(0),
                  capexCreditor?.capex_creditor_for_balance_sheet ||
                    new Array(calculationPeriod).fill(0),
                  movementInVATCreditor?.vat_creditor_for_balance_sheet ||
                    new Array(calculationPeriod).fill(0),
                  sumArrays(
                    mCapexProvision?.senior_debt_for_balance_sheet ||
                      new Array(calculationPeriod).fill(0),
                    mCapexProvision?.shareholder_loan_for_balance_sheet ||
                      new Array(calculationPeriod).fill(0),
                    decommissioningCosts?.decommissioning_provision_for_balance_sheet ||
                      new Array(calculationPeriod).fill(0)
                  ),
                  corporationTaxValue?.corporate_tax_creditor_for_balance_sheet ||
                    new Array(calculationPeriod).fill(0)
                )
              ) || [],
              10
            ),
            active
          ).slice(0, newLen),
        },
        {
          id: "capital_reserves",
          title: "Capital and reserves £'000",
          data: getDynamicDataForEachPeriod(
            roundArray(
              sumArrays(
                mCapexProvision.share_capital_end_balance,
                mCapexProvision.retained_earnings_end_balance
              ),
              10
            ),
            active
          ).slice(0, newLen),
          children: [
            {
              id: "share_capital",
              title: "Share capital £'000",
              data: roundArray(
                getDynamicDataForEachPeriod(
                  mCapexProvision.share_capital_end_balance,
                  active
                )?.slice(0, newLen),
                10
              ),
            },
            {
              id: "retained_earnings",
              title: "Retained earnings £'000",
              data: roundArray(
                getDynamicDataForEachPeriod(
                  roundArray(mCapexProvision.retained_earnings_end_balance, 1),
                  active
                ).slice(0, newLen),
                10
              ),
            },
            {
              id: "shareholder_funds",
              title: "Shareholders' funds £'000",
              data: getDynamicDataForEachPeriod(
                roundArray(
                  sumArrays(
                    mCapexProvision.share_capital_end_balance,
                    mCapexProvision.retained_earnings_end_balance
                  ),
                  10
                ),
                active
              ).slice(0, newLen),
            },
          ],
        },
      ],
    };
    return rlt;
  }, [
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
    nationalGridSecurities,
    variableProfileForAttributableCosts,
    fullyConsentedDate,
    active,
    modelStartDate,
    dateRange,
  ]);
  // const emarineBoldRows = [
  //   "Non-current assets £'000",
  //   "Total liabilities £'000",
  //   "Total assets £'000",
  //   "Current assets £'000",
  //   "Current liabilities £'000",
  //   "Non-current liabilities £'000",
  //   "Net assets £'000",
  //   "Capital and reserves £'000",
  //   "Shareholders' funds £'000",
  // ];
  const decomEndDateForEmarine =
    emarineCalculationResults?.decom_end_date_for_aggregation == 0 ||
    emarineCalculationResults?.decom_end_date_for_aggregation < modelStartDate
      ? decommissioningEndDate
      : emarineCalculationResults?.decom_end_date_for_aggregation;
  const periodEmarine =
    getQuarterNumberFromModelStartDate(modelStartDate, decomEndDateForEmarine) -
    1;
  const [emarineDateRange, setEmarineDateRange] = useState({
    from: modelStartDate,
    to: moment(modelStartDate)
      .add(periodEmarine, "quarters")
      .add(-1, "days")
      .format(DATE_FORMAT),
  });
  useEffect(() => {
    setEmarineDateRange({
      from: modelStartDate,
      to: moment(modelStartDate)
        .add(periodEmarine, "quarters")
        .add(-1, "days")
        .format(DATE_FORMAT),
    });
  }, [modelStartDate, periodEmarine]);

  const emarineHeaders = useMemo(() => {
    return getHeaders(modelStartDate, active, emarineDateRange, hasTotal);
  }, [
    modelStartDate,
    calculationPeriod,
    active,
    emarineDateRange,
    emarineCalculationResults,
    periodEmarine,
    decomEndDateForEmarine,
  ]);

  const emarineTotalRevenue =
    emarineCalculationResults?.current_project?.pl_results?.total_revenue;

  const newEmarineLen =
    getFilterData(
      emarineTotalRevenue || new Array(periodEmarine).fill(0),
      modelStartDate,
      active,
      emarineDateRange
    )?.length || periodEmarine;

  const emarineTableData = useMemo(() => {
    const payload = {
      emarineCalculationResults,
    };
    const balancesheetResult =
      emarineCalculationResults?.quarterly_aggregated_bs;
    const rlt = {
      id: "balance_sheet",
      title: "Balance Sheet",
      data: [],
      children: [
        {
          id: "total_assets",
          title: "Total assets £'000",
          data: getDynamicDataForEachPeriod(
            roundArray(
              balancesheetResult?.total_assets ||
                new Array(periodEmarine).fill(0),
              10
            ),
            active
          ).slice(0, newEmarineLen),
          children: [
            {
              id: "non_current_assets",
              title: "Non-current assets £'000",
              data: getDynamicDataForEachPeriod(
                roundArray(
                  balancesheetResult?.total_non_current_assets ||
                    new Array(periodEmarine).fill(0),
                  10
                ),
                active
              ).slice(0, newEmarineLen),
              children: [
                {
                  id: "phase_1",
                  title: "Phase 1 £'000",
                  data: getDynamicDataForEachPeriod(
                    roundArray(
                      balancesheetResult?.non_ca_of_phase_1 ||
                        new Array(periodEmarine).fill(0),
                      10
                    ),
                    active
                  ).slice(0, newEmarineLen),
                },
                {
                  id: "phase_2",
                  title: "Phase 2 £'000",
                  data: getDynamicDataForEachPeriod(
                    roundArray(
                      balancesheetResult?.non_ca_of_phase_2 ||
                        new Array(periodEmarine).fill(0),
                      10
                    ),
                    active
                  ).slice(0, newEmarineLen),
                },
                {
                  id: "phase_3",
                  title: "Phase 3 £'000",
                  data: getDynamicDataForEachPeriod(
                    roundArray(
                      balancesheetResult?.non_ca_of_phase_3 ||
                        new Array(periodEmarine).fill(0),
                      10
                    ),
                    active
                  ).slice(0, newEmarineLen),
                },
                {
                  id: "bess",
                  title: "BESS £'000",
                  data: getDynamicDataForEachPeriod(
                    roundArray(
                      balancesheetResult?.non_ca_bess ||
                        new Array(periodEmarine).fill(0),
                      10
                    ),
                    active
                  ).slice(0, newEmarineLen),
                },
              ],
            },
            {
              id: "current_assets",
              title: "Current assets £'000",
              data: getDynamicDataForEachPeriod(
                roundArray(
                  balancesheetResult?.total_current_assets ||
                    new Array(periodEmarine).fill(0),
                  10
                ),
                active
              ).slice(0, newEmarineLen),
              children: [
                {
                  id: "cash",
                  title: "Cash £'000",
                  data: getDynamicDataForEachPeriod(
                    roundArray(
                      balancesheetResult?.ca_of_cash ||
                        new Array(periodEmarine).fill(0),
                      10
                    ),
                    active
                  ).slice(0, newEmarineLen),
                },
                {
                  id: "capex_reserve_account",
                  title: "Capex reserver account £'000",
                  data: getDynamicDataForEachPeriod(
                    roundArray(
                      balancesheetResult?.ca_of_capex_reserve_account ||
                        new Array(periodEmarine).fill(0),
                      10
                    ),

                    active
                  ).slice(0, newEmarineLen),
                },
                {
                  id: "ca_of_trade_debtors",
                  title: "Trade debtors £'000",
                  data: getDynamicDataForEachPeriod(
                    roundArray(
                      balancesheetResult?.ca_of_trade_debtors ||
                        new Array(periodEmarine).fill(0),
                      10
                    ),

                    active
                  ).slice(0, newEmarineLen),
                },
              ],
            },
          ],
        },
        {
          id: "total_liabilities",
          title: "Total liabilities £'000",
          data: getDynamicDataForEachPeriod(
            roundArray(
              balancesheetResult?.total_liabilities ||
                new Array(periodEmarine).fill(0),
              10
            ),
            active
          ).slice(0, newEmarineLen),
          children: [
            {
              id: "current_liabilities",
              title: "Current liabilities £'000",
              data: getDynamicDataForEachPeriod(
                roundArray(
                  roundArray(
                    balancesheetResult?.total_current_liabilities ||
                      new Array(periodEmarine).fill(0),
                    10
                  ),
                  10
                ),
                active
              ).slice(0, newEmarineLen),
              children: [
                {
                  id: "trade_creditors",
                  title: "Trade creditors £'000",
                  data: getDynamicDataForEachPeriod(
                    roundArray(
                      balancesheetResult?.cl_of_trade_creditors ||
                        new Array(periodEmarine).fill(0),
                      10
                    ),
                    active
                  ).slice(0, newEmarineLen),
                },
                {
                  id: "vat_creditors",
                  title: "VAT creditor £'000",
                  data: getDynamicDataForEachPeriod(
                    roundArray(
                      balancesheetResult?.cl_of_vat_creditor ||
                        new Array(periodEmarine).fill(0),
                      10
                    ),

                    active
                  ).slice(0, newEmarineLen),
                },
                {
                  id: "corporate_tax_creditor",
                  title: "Corporate tax creditor £'000",
                  data: getDynamicDataForEachPeriod(
                    roundArray(
                      balancesheetResult?.cl_of_corporate_tax_creditor ||
                        new Array(periodEmarine).fill(0),
                      10
                    ),
                    active
                  ).slice(0, newEmarineLen),
                },
              ],
            },
            {
              id: "non_current_liabilities",
              title: "Non-current liabilities £'000",
              data: getDynamicDataForEachPeriod(
                roundArray(
                  balancesheetResult?.total_non_current_liabilities ||
                    new Array(periodEmarine).fill(0),
                  10
                ),

                active
              ).slice(0, newEmarineLen),
              children: [
                {
                  id: "senior_debt",
                  title: "Senior debt £'000",
                  data: getDynamicDataForEachPeriod(
                    roundArray(
                      balancesheetResult?.non_cl_of_senior_debt ||
                        new Array(periodEmarine).fill(0),
                      10
                    ),

                    active
                  ).slice(0, newEmarineLen),
                },
                {
                  id: "shareholder_loan",
                  title: "Shareholder loan £'000",
                  data: getDynamicDataForEachPeriod(
                    roundArray(
                      balancesheetResult?.non_cl_of_shareholder_loan ||
                        new Array(periodEmarine).fill(0),
                      10
                    ),
                    active
                  ).slice(0, newEmarineLen),
                },
                {
                  id: "intercompany_loan",
                  title: "Intercompany loan £'000",
                  data: getDynamicDataForEachPeriod(
                    roundArray(
                      balancesheetResult?.non_cl_of_intercompany_loan ||
                        new Array(periodEmarine).fill(0),
                      10
                    ),
                    active
                  ).slice(0, newEmarineLen),
                },
              ],
            },
          ],
        },
        {
          id: "net_assets",
          title: "Net assets £'000",
          data: getDynamicDataForEachPeriod(
            roundArray(
              balancesheetResult?.net_assets ||
                new Array(periodEmarine).fill(0),
              10
            ),
            active
          ).slice(0, newEmarineLen),
        },
        {
          id: "capital_reserves",
          title: "Capital and reserves £'000",
          data: getDynamicDataForEachPeriod(
            roundArray(
              balancesheetResult?.shareholders_funds ||
                new Array(periodEmarine).fill(0),
              10
            ),
            active
          ).slice(0, newEmarineLen),
          children: [
            {
              id: "share_capital",
              title: "Share capital £'000",
              data: getDynamicDataForEachPeriod(
                roundArray(
                  balancesheetResult?.share_capital_for_bs ||
                    new Array(periodEmarine).fill(0),
                  10
                ),
                active
              ).slice(0, newEmarineLen),
            },
            {
              id: "retained_earnings",
              title: "Retained earnings £'000",
              data: getDynamicDataForEachPeriod(
                roundArray(
                  balancesheetResult?.retained_earnings_for_bs ||
                    new Array(periodEmarine).fill(0),
                  10
                ),
                active
              ).slice(0, newEmarineLen),
            },
            {
              id: "shareholder_funds",
              title: "Shareholders' funds £'000",
              data: getDynamicDataForEachPeriod(
                roundArray(
                  balancesheetResult?.shareholders_funds ||
                    new Array(periodEmarine).fill(0),
                  10
                ),
                active
              ).slice(0, newEmarineLen),
            },
          ],
        },
      ],
    };
    return rlt;
  }, [emarineCalculationResults, active, modelStartDate, emarineDateRange]);
  // useEffect(() => {
  //   console.log("currentProjectType", currentProjectType);
  // }, [currentProjectType]);
  if (currentProjectType == "bess")
    return {
      headers,
      tableData,
      boldRows,
      dateRange,
      modelStartDate,
      decommissioningEndDate,
      setDateRange,
      id: "balanceSheetTable",
      title: "Balance Sheet (£)",
    };
  else {
    return {
      headers: emarineHeaders,
      tableData: emarineTableData,
      boldRows,
      dateRange: emarineDateRange,
      modelStartDate,
      decommissioningEndDate: decomEndDateForEmarine,
      setDateRange: setEmarineDateRange,
      id: "balanceSheetTable",
      title: "Balance Sheet (£)",
    };
  }
}
