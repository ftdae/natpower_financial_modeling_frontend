import moment from "moment";
import { useEffect, useMemo, useState } from "react";
import {
  getFilterData,
  getHeaders,
  getQuarterNumberFromModelStartDate,
  roundArray,
  sumArrays,
} from "../../calculation/calculates/utils";
import { useAppSelector } from "../../hooks/hooks";
import { selectParam } from "../../store/slices/parameterSlice";
import { selectResult } from "../../store/slices/resultSlice";
import { DATE_FORMAT } from "../../utils/usePrameter";

export function useAggregatedProfitLossData(active: string, hasTotal: string) {
  const { currentProjectType, emarineCalculationResults } =
    useAppSelector(selectParam);
  const {
    modelStartDate,
    operationStartDate,
    decommissioningEndDate,
    calculationPeriod,
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
  const {
    wholesaleDayAhead,
    wholesaleDayIntraday,
    balancingMechanism,
    capacityMarket,
    frequencyResponse,
    gainOnDisposal,
    fixedPPAValue,
    floatingPPAValue,
    totalRevenue,
    vintage,
    mCapexProvision,
    tollingRevenue,
    balancingReserve,
    residualRevenue,
    totalTNUoSTriads,
    arrangementFees,
    duosCost,
    upsidePotentialRevenue,
    solarRevenue,
    regoRevenue,
    embeddedBenefits,
    cfdRevenue,
  } = useAppSelector(selectResult);
  const {
    ppaFee,
    auxilliaryLoss,
    optimiserCost,
    tnuosCharge,
    meteringCost,
    totalCoGS,
  } = useAppSelector(selectResult);
  const {
    assetMExpense,
    businessRatesExpense,
    communityBenefitExpense,
    insuranceExpense,
    landRentExpense,
    legalExpense,
    oAndMExpense,
    otherAdminExpense,
    siteSecurityExpense,
    extendedWarrantyExpense,
    easementExpnese,
    intercompanyExp,
    decommissioningCosts,
    waterRatesExpense,
    nGSecurities,
    totalAdminCosts,
  } = useAppSelector(selectResult);
  const { totalDepreciation } = useAppSelector(selectResult);
  const { ebit } = useAppSelector(selectResult);
  const { corporationTaxValue } = useAppSelector(selectResult);

  const boldRows = [
    "Total Revenue £'000",
    "Total cost of sales £'000",
    "Gross profit/loss £'000",
    "Total administrative costs £'000",
    "EBITDA £'000",
    "EBIT £'000",
    "Profit/loss before tax £'000",
    "Profit/loss after tax £'000",
    "Retained earnings b/f £'000",
    "Interest expense £'000",
    "Retained earnings c/f £'000",
  ];

  const periodForDynamic =
    active == "quarterly"
      ? period
      : active == "semi_annually"
      ? period % 2 == 0
        ? period / 2
        : (period + 1) / 2
      : period % 4 == 0
      ? period / 4
      : (period - (period % 4)) / 4 + 1;
  const dividendsForDynamicTiming = getFilterData(
    roundArray(mCapexProvision?.dividends || new Array(period).fill(0), 20),
    modelStartDate,
    active,
    dateRange
  );

  const profitAfterTaxForDynamicTiming = getFilterData(
    roundArray(
      mCapexProvision?.profit_loss_after_tax || new Array(period).fill(0),
      20
    ),
    modelStartDate,
    active,
    dateRange
  );
  const newLen: number =
    profitAfterTaxForDynamicTiming?.length || periodForDynamic;
  const retainedEarningStartBalance: number[] = new Array(newLen).fill(0);
  const retainedEarningEndBalance: number[] = new Array(newLen).fill(0);
  for (let i = 0; i < newLen; i++) {
    retainedEarningEndBalance[i] =
      retainedEarningStartBalance[i] * 1 +
      profitAfterTaxForDynamicTiming[i] * 1 +
      dividendsForDynamicTiming[i] * 1;
    if (i < newLen - 1) {
      retainedEarningStartBalance[i + 1] = retainedEarningEndBalance[i];
    }
  }
  if (active != "quarterly" && newLen == periodForDynamic)
    retainedEarningStartBalance[newLen - 1] = 0;
  retainedEarningEndBalance[newLen - 1] =
    retainedEarningStartBalance[newLen - 1] * 1 +
    profitAfterTaxForDynamicTiming[newLen - 1] * 1 +
    dividendsForDynamicTiming[newLen - 1] * 1;

  const headers = useMemo(() => {
    return getHeaders(modelStartDate, active, dateRange, hasTotal);
  }, [modelStartDate, calculationPeriod, active, dateRange]);

  const tableData = useMemo(() => {
    const rlt = {
      id: "profit_and_loss",
      title: "Profit and Loss",
      data: [],
      children: [
        {
          id: "total_revenue",
          title: "Total Revenue £'000",
          data: getFilterData(
            roundArray(totalRevenue || new Array(period).fill(0), 20),
            modelStartDate,
            active,
            dateRange
          ),
          children: [
            {
              id: "wholesale_solar",
              title: "Wholesale Revenue - Solar £'000",
              data: getFilterData(
                roundArray(solarRevenue || new Array(period).fill(0), 20),
                modelStartDate,
                active,
                dateRange
              ),
            },
            {
              id: "wholesale_day_ahead",
              title: "Wholesale day ahead £'000",
              data: getFilterData(
                roundArray(wholesaleDayAhead || new Array(period).fill(0), 20),
                modelStartDate,
                active,
                dateRange
              ),
            },
            {
              id: "wholesale_day_intraday",
              title: "Wholesale day intraday £'000",
              data: getFilterData(
                roundArray(
                  wholesaleDayIntraday || new Array(period).fill(0),
                  20
                ),
                modelStartDate,
                active,
                dateRange
              ),
            },
            {
              id: "balancing_mechanism",
              title: "Balancing Mechanism £'000",
              data: getFilterData(
                roundArray(balancingMechanism || new Array(period).fill(0), 20),
                modelStartDate,
                active,
                dateRange
              ),
            },
            {
              id: "capacity_market",
              title: "Capacity Market £'000",
              data: getFilterData(
                roundArray(capacityMarket || new Array(period).fill(0), 20),
                modelStartDate,
                active,
                dateRange
              ),
            },
            {
              id: "frequency_response",
              title: "Frequency response £'000",
              data: getFilterData(
                roundArray(frequencyResponse || new Array(period).fill(0), 10),
                modelStartDate,
                active,
                dateRange
              ),
            },
            {
              id: "reserve",
              title: "Reserve £'000",
              data: getFilterData(
                roundArray(balancingReserve || new Array(period).fill(0), 10),
                modelStartDate,
                active,
                dateRange
              ),
            },
            {
              id: "tnuos_triads",
              title: "TNUoS - triads £'000",
              data: getFilterData(
                roundArray(totalTNUoSTriads || new Array(period).fill(0), 10),
                modelStartDate,
                active,
                dateRange
              ),
            },
            {
              id: "tolling_revenue",
              title: "Tolling revenue £'000",
              data: getFilterData(
                roundArray(tollingRevenue || new Array(period).fill(0), 10),
                modelStartDate,
                active,
                dateRange
              ),
            },

            {
              id: "fixed_ppa",
              title: "Fixed PPA £'000",
              data: getFilterData(
                roundArray(fixedPPAValue || new Array(period).fill(0), 10),
                modelStartDate,
                active,
                dateRange
              ),
            },
            {
              id: "floating_ppa",
              title: "Floating PPA £'000",
              data: getFilterData(
                roundArray(floatingPPAValue || new Array(period).fill(0), 10),
                modelStartDate,
                active,
                dateRange
              ),
            },
            {
              id: "upside_potential",
              title: "Upside potential £'000",
              data: getFilterData(
                roundArray(
                  upsidePotentialRevenue?.upsidePotential ||
                    new Array(period).fill(0),
                  10
                ),
                modelStartDate,
                active,
                dateRange
              ),
            },
            {
              id: "trading_floor_topup",
              title: `Trading floor "top-up" £'000`,
              data: getFilterData(
                roundArray(
                  upsidePotentialRevenue?.tradingFloorTopUp ||
                    new Array(period).fill(0),
                  10
                ),
                modelStartDate,
                active,
                dateRange
              ),
            },
            {
              id: "rego",
              title: `REGO £'000`,
              data: getFilterData(
                roundArray(regoRevenue || new Array(period).fill(0), 10),
                modelStartDate,
                active,
                dateRange
              ),
            },
            {
              id: "cfd",
              title: `CfD £'000`,
              data: getFilterData(
                roundArray(cfdRevenue || new Array(period).fill(0), 10),
                modelStartDate,
                active,
                dateRange
              ),
            },
            {
              id: "embedded_benefits",
              title: `Embedded benefits £'000`,
              data: getFilterData(
                roundArray(embeddedBenefits || new Array(period).fill(0), 10),
                modelStartDate,
                active,
                dateRange
              ),
            },
            {
              id: "gain_on_disposal_of_batteries",
              title: "Gain/(Loss) on disposal of batteries £'000",
              data: getFilterData(
                roundArray(
                  gainOnDisposal?.gainOnDisposalRevenue ||
                    new Array(period).fill(0),
                  10
                ),
                modelStartDate,
                active,
                dateRange
              ),
            },
            {
              id: "residual_value",
              title: "Residual value £'000",
              data: getFilterData(
                roundArray(residualRevenue || new Array(period).fill(0), 10),
                modelStartDate,
                active,
                dateRange
              ),
            },
          ],
        },
        {
          id: "total_cost_of_sales",
          title: "Total cost of sales £'000",
          data: getFilterData(
            roundArray(totalCoGS || new Array(period).fill(0), 10),
            modelStartDate,
            active,
            dateRange
          ),
          children: [
            {
              id: "ppa_fee",
              title: "PPA fee £'000",
              data: getFilterData(
                roundArray(ppaFee || new Array(period).fill(0), 10),
                modelStartDate,
                active,
                dateRange
              ),
            },
            {
              id: "optimiser_commission",
              title: "Optimiser commission £'000",
              data: getFilterData(
                roundArray(optimiserCost || new Array(period).fill(0), 10),
                modelStartDate,
                active,
                dateRange
              ),
            },
            {
              id: "auxilliary_lossees",
              title: "Auxilliary losses £'000",
              data: getFilterData(
                roundArray(auxilliaryLoss || new Array(period).fill(0), 10),
                modelStartDate,
                active,
                dateRange
              ),
            },
            {
              id: "metering",
              title: "Metering £'000",
              data: getFilterData(
                roundArray(meteringCost || new Array(period).fill(0), 10),
                modelStartDate,
                active,
                dateRange
              ),
            },
            {
              id: "duos_charges",
              title: "DUoS charges £'000",
              data: getFilterData(
                roundArray(duosCost || new Array(period).fill(0), 10),
                modelStartDate,
                active,
                dateRange
              ),
            },
            {
              id: "tnuos_triads",
              title: "TNUoS - triads £'000",
              data: getFilterData(
                roundArray(tnuosTriadCost || new Array(period).fill(0), 10),
                modelStartDate,
                active,
                dateRange
              ),
            },
            {
              id: "tnuos_demand_charges",
              title: "TNUoS demand charges £'000",
              data: getFilterData(
                roundArray(new Array(period).fill(0), 10),
                modelStartDate,
                active,
                dateRange
              ),
            },
            {
              id: "tnuos_export_charges",
              title: "TNUoS export charges £'000",
              data: getFilterData(
                roundArray(tnuosCharge || new Array(period).fill(0), 10),
                modelStartDate,
                active,
                dateRange
              ),
            },
          ],
        },
        {
          id: "gross_profit",
          title: "Gross profit/loss £'000",
          data: getFilterData(
            roundArray(
              sumArrays(
                totalRevenue || new Array(period).fill(0),
                totalCoGS || new Array(period).fill(0)
              ),
              10
            ),
            modelStartDate,
            active,
            dateRange
          ),
        },
        {
          id: "total_admin_costs",
          title: "Total administrative costs £'000",
          data: getFilterData(
            roundArray(totalAdminCosts || new Array(period).fill(0), 10),
            modelStartDate,
            active,
            dateRange
          ),
          children: [
            {
              id: "land_rent",
              title: "Land rent £'000",
              data: getFilterData(
                roundArray(
                  landRentExpense?.rentToProfit || new Array(period).fill(0),
                  10
                ),
                modelStartDate,
                active,
                dateRange
              ),
            },
            {
              id: "o_and_m",
              title: "O&M £'000",
              data: getFilterData(
                roundArray(oAndMExpense || new Array(period).fill(0), 10),
                modelStartDate,
                active,
                dateRange
              ),
            },
            {
              id: "asset_management",
              title: "Asset management £'000",
              data: getFilterData(
                roundArray(assetMExpense || new Array(period).fill(0), 10),
                modelStartDate,
                active,
                dateRange
              ),
            },
            {
              id: "insurance",
              title: "Insurance £'000",
              data: getFilterData(
                roundArray(insuranceExpense || new Array(period).fill(0), 10),
                modelStartDate,
                active,
                dateRange
              ),
            },
            {
              id: "community_benefit",
              title: "Community benefit £'000",
              data: getFilterData(
                roundArray(
                  communityBenefitExpense || new Array(period).fill(0),
                  10
                ),
                modelStartDate,
                active,
                dateRange
              ),
            },
            {
              id: "water_rates",
              title: "Water rates £'000",
              data: getFilterData(
                roundArray(waterRatesExpense || new Array(period).fill(0), 10),
                modelStartDate,
                active,
                dateRange
              ),
            },
            {
              id: "business_rates",
              title: "Business rates £'000",
              data: getFilterData(
                roundArray(
                  businessRatesExpense || new Array(period).fill(0),
                  10
                ),
                modelStartDate,
                active,
                dateRange
              ),
            },
            // {
            //   id: "ng_security_premium_fees",
            //   title: "NG security premium fees",
            //   data: (
            //     getFilterData(
            //       roundArray(nGSecurities?.securities_premium_fee || new Array(period).fill(0), 10),
            //       modelStartDate,
            //       active,
            //       dateRange
            //     )
            //   ),
            // },
            {
              id: "extended_warranty",
              title: "Extended warranty £'000",
              data: getFilterData(
                roundArray(
                  extendedWarrantyExpense || new Array(period).fill(0),
                  10
                ),
                modelStartDate,
                active,
                dateRange
              ),
            },
            {
              id: "site_security",
              title: "Site security £'000",
              data: getFilterData(
                roundArray(
                  siteSecurityExpense || new Array(period).fill(0),
                  10
                ),
                modelStartDate,
                active,
                dateRange
              ),
            },
            {
              id: "easement_costs",
              title: "Easement costs £'000",
              data: getFilterData(
                roundArray(easementExpnese || new Array(period).fill(0), 10),
                modelStartDate,
                active,
                dateRange
              ),
            },
            {
              id: "legal_costs",
              title: "Legal costs £'000",
              data: getFilterData(
                roundArray(legalExpense || new Array(period).fill(0), 10),
                modelStartDate,
                active,
                dateRange
              ),
            },
            {
              id: "other_admin_costs",
              title: "Other admin costs £'000",
              data: getFilterData(
                roundArray(otherAdminExpense || new Array(period).fill(0), 10),
                modelStartDate,
                active,
                dateRange
              ),
            },
            {
              id: "intercompany_expense",
              title: "Intercompany expense £'000",
              data: getFilterData(
                roundArray(intercompanyExp || new Array(period).fill(0), 10),
                modelStartDate,
                active,
                dateRange
              ),
            },
            {
              id: "decommissioing_costs",
              title: "Decommissioning costs £'000",
              data: getFilterData(
                roundArray(
                  decommissioningCosts?.decommissioning_cost ||
                    new Array(period).fill(0),
                  10
                ),
                modelStartDate,
                active,
                dateRange
              ),
            },
            {
              id: "arrangement_fees",
              title: "Arrangement fees £'000",
              data: getFilterData(
                roundArray(arrangementFees || new Array(period).fill(0), 10),
                modelStartDate,
                active,
                dateRange
              ),
            },
          ],
        },
        {
          id: "ebitda",
          title: "EBITDA £'000",
          data: getFilterData(
            roundArray(ebit?.ebitda || new Array(period).fill(0), 10),
            modelStartDate,
            active,
            dateRange
          ),
        },
        {
          id: "depreciation",
          title: "Depreciation £'000",
          data: getFilterData(
            roundArray(totalDepreciation || new Array(period).fill(0), 10),
            modelStartDate,
            active,
            dateRange
          ),
        },
        {
          id: "ebit",
          title: "EBIT £'000",
          data: getFilterData(
            roundArray(ebit?.ebit || new Array(period).fill(0), 10),
            modelStartDate,
            active,
            dateRange
          ),
        },
        {
          id: "interest_expense",
          title: "Interest expense £'000",
          data: getFilterData(
            roundArray(
              sumArrays(
                mCapexProvision?.senior_debt_interest ||
                  new Array(period).fill(0),
                mCapexProvision?.shareholder_loan_interest ||
                  new Array(period).fill(0)
              ),
              10
            ),
            modelStartDate,
            active,
            dateRange
          ),
          children: [
            {
              id: "senior_debt_interest",
              title: "Senior debt interest £'000",
              data: getFilterData(
                roundArray(
                  mCapexProvision?.senior_debt_interest ||
                    new Array(period).fill(0),
                  10
                ),
                modelStartDate,
                active,
                dateRange
              ),
            },
            {
              id: "shareholder_loan_interest",
              title: "Shareholder loan interest £'000",
              data: getFilterData(
                roundArray(
                  mCapexProvision?.shareholder_loan_interest ||
                    new Array(period).fill(0),
                  10
                ),
                modelStartDate,
                active,
                dateRange
              ),
            },
          ],
        },
        {
          id: "profit_before_tax",
          title: "Profit/loss before tax £'000",
          data: getFilterData(
            roundArray(
              mCapexProvision?.profit_loss_before_tax ||
                new Array(period).fill(0),
              10
            ),
            modelStartDate,
            active,
            dateRange
          ),
        },
        {
          id: "corporation_tax",
          title: "Corporation tax £'000",
          data: getFilterData(
            roundArray(
              corporationTaxValue?.forecastTaxCharge ||
                new Array(period).fill(0),
              10
            ),
            modelStartDate,
            active,
            dateRange
          ),
        },
        {
          id: "profit_after_tax",
          title: "Profit/loss after tax £'000",
          data: getFilterData(
            roundArray(
              mCapexProvision?.profit_loss_after_tax ||
                new Array(period).fill(0),
              20
            ),
            modelStartDate,
            active,
            dateRange
          ),
        },
        {
          id: "retained_earnings_start_balance",
          title: "Retained earnings b/f £'000",
          data: retainedEarningStartBalance,
        },
        {
          id: "profit_loss_after_tax",
          title: "Profit/loss after tax £'000",
          data: profitAfterTaxForDynamicTiming,
        },
        {
          id: "dividends",
          title: "Dividends £'000",
          data: dividendsForDynamicTiming,
        },
        {
          id: "retained_earnings_end_balance",
          title: "Retained earnings c/f £'000",
          data: retainedEarningEndBalance,
        },
      ],
    };
    return rlt;
  }, [
    vintage,
    mCapexProvision,
    active,
    operationStartDate,
    modelStartDate,
    dateRange,
  ]);

  const decomEndDateForEmarine = useMemo(() => {
    const endForEmarine =
      emarineCalculationResults?.decom_end_date_for_aggregation == 0 ||
      emarineCalculationResults?.decom_end_date_for_aggregation < modelStartDate
        ? decommissioningEndDate
        : emarineCalculationResults?.decom_end_date_for_aggregation;
    return endForEmarine;
  }, [emarineCalculationResults]);
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

  const periodForDynamicEmarine =
    active == "quarterly"
      ? periodEmarine
      : active == "semi_annually"
      ? periodEmarine % 2 == 0
        ? periodEmarine / 2
        : (periodEmarine + 1) / 2
      : periodEmarine % 4 == 0
      ? periodEmarine / 4
      : (periodEmarine - (periodEmarine % 4)) / 4 + 1;

  const emarineProfitAfterTax = getFilterData(
    roundArray(
      emarineCalculationResults?.quarterly_aggregated_pl?.profit_after_tax ||
        new Array(periodEmarine).fill(0),
      10
    ),
    modelStartDate,
    active,
    emarineDateRange
  );
  const newLenEmarine: number =
    emarineProfitAfterTax?.length || periodForDynamicEmarine;
  const retainedEarningStartBalanceEmarine: number[] = new Array(
    newLenEmarine
  ).fill(0);
  const retainedEarningEndBalanceEmarine: number[] = new Array(
    newLenEmarine
  ).fill(0);
  for (let i = 0; i < newLenEmarine; i++) {
    retainedEarningEndBalanceEmarine[i] =
      retainedEarningStartBalanceEmarine[i] * 1 + emarineProfitAfterTax[i] * 1;
    // dividendsForDynamicTiming[i] * 1;
    if (i < newLenEmarine - 1) {
      retainedEarningStartBalanceEmarine[i + 1] =
        retainedEarningEndBalanceEmarine[i];
    }
  }
  if (active != "quarterly" && newLenEmarine == periodForDynamic)
    retainedEarningStartBalanceEmarine[newLenEmarine - 1] = 0;
  retainedEarningEndBalanceEmarine[newLenEmarine - 1] =
    retainedEarningStartBalanceEmarine[newLenEmarine - 1] * 1 +
    emarineProfitAfterTax[newLenEmarine - 1] * 1;
  // dividendsForDynamicTiming[newLenEmarine - 1] * 1;

  const emarineTableData = useMemo(() => {
    const payload = {
      emarineCalculationResults,
    };
    let plResults = emarineCalculationResults?.quarterly_aggregated_pl;
    const rlt = {
      id: "profit_and_loss",
      title: "Profit and Loss",
      data: [],
      children: [
        {
          id: "total_revenue",
          title: "Total Revenue £'000",
          data: getFilterData(
            roundArray(
              plResults?.total_revenue || new Array(period).fill(0),
              10
            ),
            modelStartDate,
            active,
            emarineDateRange
          ),
          children: [
            {
              id: "cold_ironing_revenue",
              title: "Cold-ironing £'000",
              data: getFilterData(
                roundArray(
                  plResults?.cold_ironing_revenue || new Array(period).fill(0),
                  10
                ),
                modelStartDate,
                active,
                emarineDateRange
              ),
            },
            {
              id: "propulsion_revenue",
              title: "Propulsion £'000",
              data: getFilterData(
                roundArray(
                  plResults?.propulsion_revenue || new Array(period).fill(0),
                  10
                ),
                modelStartDate,
                active,
                emarineDateRange
              ),
            },
            {
              id: "arbitrage_revenue",
              title: "Arbitrage £'000",
              data: getFilterData(
                roundArray(
                  plResults?.arbitrage_revenue || new Array(period).fill(0),
                  10
                ),
                modelStartDate,
                active,
                emarineDateRange
              ),
            },
            // {
            //   id: "intercom_bess_revenue_1",
            //   title: "Intercompany revenue - BESS - Phase 1 onwards £'000",
            //   data: getFilterData(
            //     roundArray(
            //       plResults?.intercom_bess_revenue[0] ||
            //         new Array(period).fill(0),
            //       10
            //     ),
            //     modelStartDate,
            //     active,
            //     emarineDateRange
            //   ),
            // },
            // {
            //   id: "intercom_bess_revenue_2",
            //   title: "Intercompany revenue - BESS - Phase 2 onwards £'000",
            //   data: getFilterData(
            //     roundArray(
            //       plResults?.intercom_bess_revenue[1] ||
            //         new Array(period).fill(0),
            //       10
            //     ),
            //     modelStartDate,
            //     active,
            //     emarineDateRange
            //   ),
            // },
            // {
            //   id: "intercom_bess_revenue_3",
            //   title: "Intercompany revenue - BESS - Phase 3 onwards £'000",
            //   data: getFilterData(
            //     roundArray(
            //       plResults?.intercom_bess_revenue[2] ||
            //         new Array(period).fill(0),
            //       10
            //     ),
            //     modelStartDate,
            //     active,
            //     emarineDateRange
            //   ),
            // },
            // {
            //   id: "intercom_marine_revenue_1",
            //   title: "Intercompany revenue - Marine - Phase 1 onwards £'000",
            //   data: getFilterData(
            //     roundArray(
            //       plResults?.intercom_marine_revenue[0] ||
            //         new Array(period).fill(0),
            //       10
            //     ),
            //     modelStartDate,
            //     active,
            //     emarineDateRange
            //   ),
            // },
            // {
            //   id: "intercom_marine_revenue_2",
            //   title: "Intercompany revenue - Marine - Phase 2 onwards £'000",
            //   data: getFilterData(
            //     roundArray(
            //       plResults?.intercom_marine_revenue[1] ||
            //         new Array(period).fill(0),
            //       10
            //     ),
            //     modelStartDate,
            //     active,
            //     emarineDateRange
            //   ),
            // },
            // {
            //   id: "intercom_marine_revenue_3",
            //   title: "Intercompany revenue - Marine - Phase 3 onwards £'000",
            //   data: getFilterData(
            //     roundArray(
            //       plResults?.intercom_marine_revenue[2] ||
            //         new Array(period).fill(0),
            //       10
            //     ),
            //     modelStartDate,
            //     active,
            //     emarineDateRange
            //   ),
            // },
            // {
            //   id: "intercom_cpo_revenue_1",
            //   title: "Intercompany revenue - CPO - Phase 1 onwards £'000",
            //   data: getFilterData(
            //     roundArray(
            //       plResults?.intercom_cpo_revenue[0] ||
            //         new Array(period).fill(0),
            //       10
            //     ),
            //     modelStartDate,
            //     active,
            //     emarineDateRange
            //   ),
            // },
            // {
            //   id: "intercom_cpo_revenue_2",
            //   title: "Intercompany revenue - CPO - Phase 2 onwards £'000",
            //   data: getFilterData(
            //     roundArray(
            //       plResults?.intercom_cpo_revenue[1] ||
            //         new Array(period).fill(0),
            //       10
            //     ),
            //     modelStartDate,
            //     active,
            //     emarineDateRange
            //   ),
            // },
            // {
            //   id: "intercom_cpo_revenue_3",
            //   title: "Intercompany revenue - CPO - Phase 3 onwards £'000",
            //   data: getFilterData(
            //     roundArray(
            //       plResults?.intercom_cpo_revenue[2] ||
            //         new Array(period).fill(0),
            //       10
            //     ),
            //     modelStartDate,
            //     active,
            //     emarineDateRange
            //   ),
            // },
            {
              id: "gain_on_disposal_revenue",
              title: "Gains/(losses) on disposal of fixed assets £'000",
              data: getFilterData(
                roundArray(
                  plResults?.gain_on_disposal_revenue ||
                    new Array(period).fill(0),
                  10
                ),
                modelStartDate,
                active,
                emarineDateRange
              ),
            },
          ],
        },
        {
          id: "total_cogs",
          title: "Total cost of sales £'000",
          data: getFilterData(
            roundArray(plResults?.total_cogs || new Array(period).fill(0), 10),
            modelStartDate,
            active,
            emarineDateRange
          ),
          children: [
            {
              id: "purchase_of_electricity_cost",
              title: "Purchase of electricity £'000",
              data: getFilterData(
                roundArray(
                  plResults?.purchase_of_electricity_cost ||
                    new Array(period).fill(0),
                  10
                ),

                modelStartDate,
                active,
                emarineDateRange
              ),
            },
            {
              id: "electricity_standing_charge_cost",
              title: "Electricity standing charge (location specific) £'000",
              data: getFilterData(
                roundArray(
                  plResults?.electricity_standing_charge_cost ||
                    new Array(period).fill(0),
                  10
                ),

                modelStartDate,
                active,
                emarineDateRange
              ),
            },
            {
              id: "parasitic_load_cost",
              title: "Parasitic load £'000",
              data: getFilterData(
                roundArray(
                  plResults?.parasitic_load_cost || new Array(period).fill(0),
                  10
                ),

                modelStartDate,
                active,
                emarineDateRange
              ),
            },
            {
              id: "intercompany_cost",
              title: "Intercompany costs £'000",
              data: getFilterData(
                roundArray(
                  plResults?.intercompany_cost || new Array(period).fill(0),
                  10
                ),

                modelStartDate,
                active,
                emarineDateRange
              ),
            },
            {
              id: "stevedore_cost",
              title: "Stevedore £'000",
              data: getFilterData(
                roundArray(
                  plResults?.stevedore_cost || new Array(period).fill(0),
                  10
                ),

                modelStartDate,
                active,
                emarineDateRange
              ),
            },
          ],
        },
        {
          id: "gross_profit",
          title: "Gross profit/loss £'000",
          data: getFilterData(
            roundArray(
              plResults?.gross_profit || new Array(period).fill(0),
              10
            ),
            modelStartDate,
            active,
            emarineDateRange
          ),
        },
        {
          id: "total_admin_costs",
          title: "Total administrative costs £'000",
          data: getFilterData(
            plResults?.total_admin_expense || new Array(period).fill(0),
            modelStartDate,
            active,
            emarineDateRange
          ),
          children: [
            {
              id: "concession_fee_excl_fixed",
              title: "Concession fee (excl.fixed annual concession) £'000",
              data: getFilterData(
                roundArray(
                  plResults?.concession_fee_excl_fixed ||
                    new Array(period).fill(0),
                  10
                ),
                modelStartDate,
                active,
                emarineDateRange
              ),
            },
            {
              id: "concession_annual_fixed_fee",
              title: "Concession annual fee (fixed) £'000",
              data: getFilterData(
                roundArray(
                  plResults?.concession_annual_fixed_fee ||
                    new Array(period).fill(0),
                  10
                ),
                modelStartDate,
                active,
                emarineDateRange
              ),
            },
            {
              id: "metering_cost_result",
              title: "Metering £'000",
              data: getFilterData(
                roundArray(
                  plResults?.metering_cost_result || new Array(period).fill(0),
                  10
                ),
                modelStartDate,
                active,
                emarineDateRange
              ),
            },
            {
              id: "o_m_cost_result",
              title: "O&M cost £'000",
              data: getFilterData(
                roundArray(
                  plResults?.o_m_cost_result || new Array(period).fill(0),
                  10
                ),
                modelStartDate,
                active,
                emarineDateRange
              ),
            },
            {
              id: "asset_management_cost_result",
              title: "Asset management cost £'000",
              data: getFilterData(
                roundArray(
                  plResults?.asset_management_cost_result ||
                    new Array(period).fill(0),
                  10
                ),
                modelStartDate,
                active,
                emarineDateRange
              ),
            },
            {
              id: "insurance_cost_result",
              title: "Insurance £'000",
              data: getFilterData(
                roundArray(
                  plResults?.insurance_cost_result || new Array(period).fill(0),
                  10
                ),
                modelStartDate,
                active,
                emarineDateRange
              ),
            },
            {
              id: "extended_warranty_cost_result",
              title: "Extended warranty £'000",
              data: getFilterData(
                roundArray(
                  plResults?.extended_warranty_cost_result ||
                    new Array(period).fill(0),
                  10
                ),
                modelStartDate,
                active,
                emarineDateRange
              ),
            },
            {
              id: "easement_cost_result",
              title: "Easement costs £'000",
              data: getFilterData(
                roundArray(
                  plResults?.easement_cost_result || new Array(period).fill(0),
                  10
                ),
                modelStartDate,
                active,
                emarineDateRange
              ),
            },
            {
              id: "legal_cost_result",
              title: "Legal costs (not capitalised) £'000",
              data: getFilterData(
                roundArray(
                  plResults?.legal_cost_result || new Array(period).fill(0),
                  10
                ),
                modelStartDate,
                active,
                emarineDateRange
              ),
            },
            {
              id: "land_rent_cost_result",
              title: "Land rent £'000",
              data: getFilterData(
                roundArray(
                  plResults?.land_rent_cost_result || new Array(period).fill(0),
                  10
                ),
                modelStartDate,
                active,
                emarineDateRange
              ),
            },
            {
              id: "community_benefit_cost_result",
              title: "Community benefit £'000",
              data: getFilterData(
                roundArray(
                  plResults?.community_benefit_cost_result ||
                    new Array(period).fill(0),
                  10
                ),
                modelStartDate,
                active,
                emarineDateRange
              ),
            },
            {
              id: "water_rates_cost_result",
              title: "Water rates £'000",
              data: getFilterData(
                roundArray(
                  plResults?.water_rates_cost_result ||
                    new Array(period).fill(0),
                  10
                ),
                modelStartDate,
                active,
                emarineDateRange
              ),
            },
            {
              id: "business_rates_cost_result",
              title: "Business rates £'000",
              data: getFilterData(
                roundArray(
                  plResults?.business_rates_cost_result ||
                    new Array(period).fill(0),
                  10
                ),
                modelStartDate,
                active,
                emarineDateRange
              ),
            },
            {
              id: "site_security_cost_result",
              title: "Site security £'000",
              data: getFilterData(
                roundArray(
                  plResults?.site_security_cost_result ||
                    new Array(period).fill(0),
                  10
                ),
                modelStartDate,
                active,
                emarineDateRange
              ),
            },
            {
              id: "other_admin_cost_result",
              title: "Other administrative costs £'000",
              data: getFilterData(
                roundArray(
                  plResults?.other_admin_cost_result ||
                    new Array(period).fill(0),
                  10
                ),
                modelStartDate,
                active,
                emarineDateRange
              ),
            },
            {
              id: "service_charge_cost_result",
              title: "Service charge £'000",
              data: getFilterData(
                roundArray(
                  plResults?.service_charge_cost_result ||
                    new Array(period).fill(0),
                  10
                ),
                modelStartDate,
                active,
                emarineDateRange
              ),
            },
            {
              id: "uos_charge_to_port_cost_result",
              title: "UOS charge to port (if permanent) £'000",
              data: getFilterData(
                roundArray(
                  plResults?.uos_charge_to_port_cost_result ||
                    new Array(period).fill(0),
                  10
                ),
                modelStartDate,
                active,
                emarineDateRange
              ),
            },
            {
              id: "server_rent_cost_result",
              title: "Server rent £'000",
              data: getFilterData(
                roundArray(
                  plResults?.server_rent_cost_result ||
                    new Array(period).fill(0),
                  10
                ),
                modelStartDate,
                active,
                emarineDateRange
              ),
            },
          ],
        },
        {
          id: "ebitda",
          title: "EBITDA £'000",
          data: getFilterData(
            roundArray(plResults?.ebitda || new Array(period).fill(0), 10),
            modelStartDate,
            active,
            emarineDateRange
          ),
        },
        {
          id: "depreciation",
          title: "Depreciation £'000",
          data: getFilterData(
            roundArray(
              plResults?.total_depreciation || new Array(period).fill(0),
              10
            ),
            modelStartDate,
            active,
            emarineDateRange
          ),
        },
        {
          id: "ebit",
          title: "EBIT £'000",
          data: getFilterData(
            roundArray(plResults?.ebit || new Array(period).fill(0), 10),
            modelStartDate,
            active,
            emarineDateRange
          ),
        },
        {
          id: "interest_expense",
          title: "Interest expense £'000",
          data: getFilterData(
            roundArray(
              plResults?.total_interest_expense || new Array(period).fill(0),
              10
            ),

            modelStartDate,
            active,
            emarineDateRange
          ),
          children: [
            {
              id: "senior_debt_interest",
              title: "Senior debt interest £'000",
              data: getFilterData(
                roundArray(
                  plResults?.senior_debt_interest_cost ||
                    new Array(period).fill(0),
                  10
                ),
                modelStartDate,
                active,
                emarineDateRange
              ),
            },
            {
              id: "shareholder_loan_interest",
              title: "Shareholder loan interest £'000",
              data: getFilterData(
                roundArray(
                  plResults?.shareholder_loan_interest_cost ||
                    new Array(period).fill(0),
                  10
                ),
                modelStartDate,
                active,
                emarineDateRange
              ),
            },
            {
              id: "intercompany_loan_interest_cost",
              title: "Intercompany loan interest £'000",
              data: getFilterData(
                roundArray(
                  plResults?.intercompany_loan_interest_cost ||
                    new Array(period).fill(0),
                  10
                ),
                modelStartDate,
                active,
                emarineDateRange
              ),
            },
          ],
        },
        {
          id: "profit_before_tax",
          title: "Profit/loss before tax £'000",
          data: getFilterData(
            roundArray(
              plResults?.profit_before_tax || new Array(period).fill(0),
              10
            ),
            modelStartDate,
            active,
            emarineDateRange
          ),
        },
        {
          id: "corporation_tax",
          title: "Corporation tax £'000",
          data: getFilterData(
            roundArray(
              plResults?.corporation_tax_for_pl || new Array(period).fill(0),
              10
            ),
            modelStartDate,
            active,
            emarineDateRange
          ),
        },
        {
          id: "profit_after_tax",
          title: "Profit/loss after tax £'000",
          data: getFilterData(
            roundArray(
              plResults?.profit_after_tax || new Array(period).fill(0),
              10
            ),
            modelStartDate,
            active,
            emarineDateRange
          ),
        },
        {
          id: "retained_earnings_start_balance",
          title: "Retained earnings b/f £'000",
          data: retainedEarningStartBalanceEmarine,
        },
        {
          id: "profit_loss_after_tax",
          title: "Profit/loss after tax £'000",
          data: getFilterData(
            roundArray(
              plResults?.profit_after_tax || new Array(period).fill(0),
              10
            ),
            modelStartDate,
            active,
            emarineDateRange
          ),
        },
        {
          id: "dividends",
          title: "Dividends £'000",
          data: getFilterData(
            roundArray(
              plResults?.dividends_for_pl || new Array(period).fill(0),
              10
            ),
            modelStartDate,
            active,
            emarineDateRange
          ),
        },
        {
          id: "retained_earnings_end_balance",
          title: "Retained earnings c/f £'000",
          data: retainedEarningEndBalanceEmarine,
        },
      ],
    };
    return rlt;
  }, [
    active,
    operationStartDate,
    modelStartDate,
    decomEndDateForEmarine,
    emarineDateRange,
    emarineCalculationResults,
  ]);

  if (currentProjectType == "bess") {
    return {
      headers,
      tableData,
      boldRows,
      dateRange,
      modelStartDate,
      decommissioningEndDate,
      setDateRange,
      id: "profitLossTable",
      title: "Profit and loss account (£)",
    };
  } else {
    return {
      headers: emarineHeaders,
      tableData: emarineTableData,
      boldRows,
      dateRange: emarineDateRange,
      modelStartDate,
      decommissioningEndDate: decomEndDateForEmarine,
      setDateRange: setEmarineDateRange,
      id: "profitLossTable",
      title: "Profit and loss account (£)",
    };
  }
}
