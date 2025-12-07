import { useEffect, useMemo, useState } from "react";
import DateRangePicker from "../../components/FinStatements/DateRangePicker";
import ParamCollapsableTable from "../../components/FinStatements/StatementTable";
import TypeSelector from "../../components/FinStatements/TypeSelector";
import { selectResult } from "../../store/slices/resultSlice";
import moment from "moment";
import { DATE_FORMAT } from "../../utils/usePrameter";
import { useAppSelector } from "../../hooks/hooks";
import {
  getFilterData,
  getHeaders,
  getQuarterNumberFromModelStartDate,
  multiplyNumber,
  roundArray,
  sumArray,
  sumArrays,
} from "../../calculation/calculates/utils";
import GroupedTypeSelector from "../../components/FinStatements/GroupedTypeSelector";
import { selectParam } from "../../store/slices/parameterSlice";

export function useCashFlowData(active, hasTotal) {
  const { currentProjectType, emarineCalculationResults } =
    useAppSelector(selectParam);
  const {
    modelStartDate,
    operationStartDate,
    decommissioningEndDate,
    calculationPeriod,
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

  // useEffect(() => {
  //   if (active == 'quarterly') {
  //     setDateRange({
  //       from: dateRange.from,
  //       to: dateRange.to
  //     });
  //   } else if (active == 'semi_annually') {
  //     setDateRange({
  //       from: dateRange.from,
  //       to: dateRange.to
  //     });
  //   } else {
  //     setDateRange({
  //       from: dateRange.from,
  //       to: dateRange.to
  //     });
  //   }
  // }, [active, modelStartDate,dateRange]);

  const { gainOnDisposal, vintage, mCapexProvision } =
    useAppSelector(selectResult);

  const { decommissioningCosts, nGSecurities, ebit } =
    useAppSelector(selectResult);
  const {
    movementInTradeCreditor,
    movementInTradeDebtor,
    capexCreditor,
    movementInVATCreditor,
    movementInPrepayments,
  } = useAppSelector(selectResult);
  const { corporationTaxValue, capitalExpenditure, operatingCashFlowValue } =
    useAppSelector(selectResult);

  const boldRows = [
    "Forecast EBITDA £'000",
    "Cashflow from Operating £'000",
    "Operating cash flow £'000",
    "Net cashflow £'000",
    "Cash starting balance £'000",
    "Cash ending balance £'000",
    "Cashflow from investing and financing £'000",
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
  const netCashflowForDynamicTiming = getFilterData(
    roundArray(mCapexProvision?.netCashflow || new Array(period).fill(0), 1),
    modelStartDate,
    active,
    dateRange
  );
  // const profitAfterTaxForDynamicTiming = getFilterData(
  //             roundArray(mCapexProvision?.profit_loss_after_tax || new Array(period).fill(0), 1),
  //             modelStartDate,
  //             active,
  //             dateRange
  //           )
  const newLen: number =
    netCashflowForDynamicTiming?.length || periodForDynamic;
  const cashStartBalance: number[] = new Array(newLen).fill(0);
  const cashEndBalance: number[] = new Array(newLen).fill(0);
  for (let i = 0; i < newLen; i++) {
    cashEndBalance[i] =
      cashStartBalance[i] * 1 + netCashflowForDynamicTiming[i] * 1;
    if (i < newLen - 1) {
      cashStartBalance[i + 1] = cashEndBalance[i];
    }
  }
  if (active != "quarterly" && newLen == periodForDynamic)
    cashStartBalance[newLen - 1] = 0;
  cashEndBalance[newLen - 1] =
    cashStartBalance[newLen - 1] * 1 +
    netCashflowForDynamicTiming[newLen - 1] * 1;

  const tableData = useMemo(() => {
    const cash_starting_balance = roundArray(
      mCapexProvision.cashStartBalance,
      10
    );

    const rlt = {
      id: "cashflow",
      title: "Cashflow",
      data: [],
      children: [
        {
          id: "forecast_ebitda",
          title: "Forecast EBITDA £'000",
          data: getFilterData(
            roundArray(ebit?.ebitda || new Array(period).fill(0), 10),
            modelStartDate,
            active,
            dateRange
          ),
        },
        {
          id: "cashflow_from_operating",
          title: "Cashflow from Operating £'000",
          data: getFilterData(
            roundArray(
              sumArrays(
                multiplyNumber(
                  gainOnDisposal?.gainOnDisposalRevenue ||
                    new Array(period).fill(0),
                  -1
                ),
                movementInTradeDebtor?.movement_in_working_capital ||
                  new Array(period).fill(0),
                movementInPrepayments?.movement_in_working_capital ||
                  new Array(period).fill(0),

                movementInTradeCreditor?.movement_in_working_capital ||
                  new Array(period).fill(0),
                capexCreditor?.movement_in_working_capital ||
                  new Array(period).fill(0),
                movementInVATCreditor?.movement_in_working_capital ||
                  new Array(period).fill(0),
                nGSecurities?.national_grid_securities_for_cash_flow ||
                  new Array(period).fill(0),
                decommissioningCosts?.movement_in_working_capital ||
                  new Array(period).fill(0)
              ) || new Array(period).fill(0),
              10
            ),
            modelStartDate,
            active,
            dateRange
          ),
          children: [
            {
              id: "less_gain_on_disposal",
              title: `Less gain/(loss) on disposal £'000`,
              data: getFilterData(
                multiplyNumber(
                  gainOnDisposal?.gainOnDisposalRevenue ||
                    new Array(period).fill(0),
                  -1
                ),
                modelStartDate,
                active,
                dateRange
              ),
            },
            {
              id: "movement_in_trade_debtors",
              title: `Movement in trade debtors £'000`,
              data: getFilterData(
                movementInTradeDebtor?.movement_in_working_capital ||
                  new Array(period).fill(0),
                modelStartDate,
                active,
                dateRange
              ),
            },
            {
              id: "pmovement_in_repayments",
              title: `Movement in prepayments £'000`,
              data: getFilterData(
                movementInPrepayments?.movement_in_working_capital ||
                  new Array(period).fill(0),
                modelStartDate,
                active,
                dateRange
              ),
            },
            {
              id: "movement_in_trade_creditors",
              title: `Movement in trade creditors £'000`,
              data: getFilterData(
                movementInTradeCreditor?.movement_in_working_capital ||
                  new Array(period).fill(0),
                modelStartDate,
                active,
                dateRange
              ),
            },
            {
              id: "movement_in_capex_creditor",
              title: `Movement in capex creditor £'000`,
              data: getFilterData(
                capexCreditor?.movement_in_working_capital ||
                  new Array(period).fill(0),
                modelStartDate,
                active,
                dateRange
              ),
            },
            {
              id: "movement_in_vat_creditor",
              title: `Movement in VAT creditor £'000`,
              data: getFilterData(
                movementInVATCreditor?.movement_in_working_capital ||
                  new Array(period).fill(0),
                modelStartDate,
                active,
                dateRange
              ),
            },
            {
              id: "movement_in_escrow_account",
              title: `Movement in Escrow account £'000`,
              data: getFilterData(
                nGSecurities?.national_grid_securities_for_cash_flow ||
                  new Array(period).fill(0),
                modelStartDate,
                active,
                dateRange
              ),
            },
            {
              id: "movement_in_decommissioning_provision",
              title: `Movement in decommissioning provision £'000`,
              data: getFilterData(
                decommissioningCosts?.movement_in_working_capital ||
                  new Array(period).fill(0),
                modelStartDate,
                active,
                dateRange
              ),
            },
          ],
        },
        {
          id: "cashflow_from_investing",
          title: `Operating cash flow £'000`,
          data: getFilterData(
            roundArray(
              sumArrays(
                // capitalExpenditure?.capexExpenditureForCashflow ||
                //   new Array(period).fill(0),
                // gainOnDisposal?.forecastRecycleRevenue ||
                //   new Array(period).fill(0),
                // sumArrays(
                //   sumArrays(
                //     mCapexProvision?.seniorDebtDrawdown ||
                //       new Array(period).fill(0),
                //     mCapexProvision?.shareholderLoanDrawdown ||
                //       new Array(period).fill(0),
                //     mCapexProvision?.shareCapitalDrawdown ||
                //       new Array(period).fill(0)
                //   ),
                //   sumArrays(
                //     mCapexProvision?.seniorDebtRepayment ||
                //       new Array(period).fill(0),
                //     mCapexProvision?.shareholder_loan_repayment ||
                //       new Array(period).fill(0),
                //     mCapexProvision?.dividends || new Array(period).fill(0),
                //     mCapexProvision?.share_capital_repayment ||
                //       new Array(period).fill(0)
                //   )
                // )
                sumArrays(
                  ebit?.ebitda || new Array(period).fill(0),
                  sumArrays(
                    multiplyNumber(
                      gainOnDisposal?.gainOnDisposalRevenue ||
                        new Array(period).fill(0),
                      -1
                    ),
                    movementInTradeDebtor?.movement_in_working_capital ||
                      new Array(period).fill(0),
                    movementInPrepayments?.movement_in_working_capital ||
                      new Array(period).fill(0),

                    movementInTradeCreditor?.movement_in_working_capital ||
                      new Array(period).fill(0),
                    capexCreditor?.movement_in_working_capital ||
                      new Array(period).fill(0),
                    movementInVATCreditor?.movement_in_working_capital ||
                      new Array(period).fill(0),
                    nGSecurities?.national_grid_securities_for_cash_flow ||
                      new Array(period).fill(0),
                    decommissioningCosts?.movement_in_working_capital ||
                      new Array(period).fill(0)
                  ) || new Array(period).fill(0)
                )
              ),
              10
            ),
            modelStartDate,
            active,
            dateRange
          ),
          children: [
            {
              id: "capital_expenditure",
              title: "Capital expenditure £'000",
              data: getFilterData(
                roundArray(
                  capitalExpenditure?.capexExpenditureForCashflow ||
                    new Array(period).fill(0),
                  10
                ),
                modelStartDate,
                active,
                dateRange
              ),
            },
            {
              id: "sale_of_fixed_assets",
              title: "Sale of fixed assets £'000",
              data: getFilterData(
                roundArray(
                  gainOnDisposal?.forecastRecycleRevenue ||
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
              title: `Corporation tax £'000`,
              data: getFilterData(
                roundArray(
                  corporationTaxValue?.taxPayment || new Array(period).fill(0),
                  10
                ),
                modelStartDate,
                active,
                dateRange
              ),
            },
            {
              id: "senior_debawdrawdown",
              title: `Senior debt drawdown £'000`,
              data: getFilterData(
                roundArray(
                  mCapexProvision?.seniorDebtDrawdown ||
                    new Array(period).fill(0),
                  10
                ),
                modelStartDate,
                active,
                dateRange
              ),
            },
            {
              id: "shareholder_loan_drawdown",
              title: `Shareholder loan drawdown £'000`,
              data: getFilterData(
                roundArray(
                  mCapexProvision?.shareholderLoanDrawdown ||
                    new Array(period).fill(0),
                  10
                ),
                modelStartDate,
                active,
                dateRange
              ),
            },
            {
              id: "share_capital_drawdown",
              title: `Share capital drawdown £'000`,
              data: getFilterData(
                roundArray(
                  mCapexProvision?.shareCapitalDrawdown ||
                    new Array(period).fill(0),
                  10
                ),
                modelStartDate,
                active,
                dateRange
              ),
            },
            {
              id: "senior_debt_repayment",
              title: `Senior debt repayment £'000`,
              data: getFilterData(
                roundArray(
                  mCapexProvision?.seniorDebtRepayment ||
                    new Array(period).fill(0),
                  10
                ),
                modelStartDate,
                active,
                dateRange
              ),
            },
            {
              id: "shareholder_loan_repayment",
              title: `Shareholder loan repayment £'000`,
              data: getFilterData(
                roundArray(
                  mCapexProvision?.shareholder_loan_repayment ||
                    new Array(period).fill(0),
                  10
                ),
                modelStartDate,
                active,
                dateRange
              ),
            },
            {
              id: "dividends",
              title: `Dividends £'000`,
              data: roundArray(
                mCapexProvision?.dividends || new Array(period).fill(0),
                10
              ),
            },
            {
              id: "share_capital_repayment",
              title: `Share capital repayment £'000`,
              data: roundArray(
                mCapexProvision?.share_capital_repayment ||
                  new Array(period).fill(0),
                10
              ),
            },
          ],
        },
        {
          id: "net_cashflow",
          title: "Net cashflow £'000",
          data: netCashflowForDynamicTiming,
        },
        {
          id: "cash_starting_balance",
          title: "Cash starting balance £'000",
          data: cashStartBalance,
        },
        {
          id: "net_cashflow",
          title: "Cashflow £'000",
          data: netCashflowForDynamicTiming,
        },
        {
          id: "cash_ending_balance",
          title: `Cash ending balance £'000`,
          data: cashEndBalance,
        },
      ],
    };
    return rlt;
  }, [mCapexProvision, vintage, modelStartDate, active, dateRange]);

  const headers = useMemo(() => {
    const result = getHeaders(modelStartDate, active, dateRange, hasTotal);
    return result;
  }, [modelStartDate, calculationPeriod, active, dateRange]);

  const decomEndDateForEmarine =
    emarineCalculationResults?.current_project?.decom_end_date == 0 ||
    emarineCalculationResults?.current_project?.decom_end_date < modelStartDate
      ? decommissioningEndDate
      : emarineCalculationResults?.current_project?.decom_end_date;
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

  const emarineNetCashflow = getFilterData(
    roundArray(
      emarineCalculationResults?.current_project?.cf_results?.net_cashflow ||
        new Array(periodEmarine).fill(0),
      10
    ),
    modelStartDate,
    active,
    emarineDateRange
  );
  const newLenEmarine: number =
    emarineNetCashflow?.length || periodForDynamicEmarine;
  const emarineCfStartBal: number[] = new Array(newLenEmarine).fill(0);
  const emarineCfEndBal: number[] = new Array(newLenEmarine).fill(0);
  for (let i = 0; i < newLenEmarine; i++) {
    emarineCfEndBal[i] = emarineCfStartBal[i] * 1 + emarineNetCashflow[i] * 1;
    if (i < newLenEmarine - 1) {
      emarineCfStartBal[i + 1] = emarineCfEndBal[i];
    }
  }
  if (active != "quarterly" && newLenEmarine == periodForDynamicEmarine)
    emarineCfStartBal[newLenEmarine - 1] = 0;
  emarineCfEndBal[newLenEmarine - 1] =
    emarineCfStartBal[newLenEmarine - 1] * 1 +
    emarineNetCashflow[newLenEmarine - 1] * 1;

  const emarineTableData = useMemo(() => {
    const cash_starting_balance = roundArray(
      mCapexProvision.cashStartBalance,
      10
    );
    const cfResults = emarineCalculationResults?.current_project?.cf_results;

    const rlt = {
      id: "cashflow",
      title: "Cashflow",
      data: [],
      children: [
        {
          id: "forecast_ebitda",
          title: "Forecast EBITDA £'000",
          data: getFilterData(
            roundArray(
              cfResults?.ebitda || new Array(periodEmarine).fill(0),
              10
            ),
            modelStartDate,
            active,
            emarineDateRange
          ),
        },
        {
          id: "cashflow_from_operating",
          title: "Cashflow from Operating £'000",
          data: getFilterData(
            roundArray(
              cfResults?.operating_cashflow || new Array(periodEmarine).fill(0),
              10
            ),
            modelStartDate,
            active,
            emarineDateRange
          ),
          children: [
            {
              id: "add_back_disposal_of_fixed_asset_proceeds",
              title: `Add back disposal of fixed asset proceeds £'000`,
              data: getFilterData(
                roundArray(
                  cfResults?.add_back_disposal_of_fixed_asset_proceeds ||
                    new Array(periodEmarine).fill(0),
                  10
                ),
                modelStartDate,
                active,
                emarineDateRange
              ),
            },
            {
              id: "gross_revenue_from_trade_debtors",
              title: `Gross revenue from trade debtors £'000`,
              data: getFilterData(
                roundArray(
                  cfResults?.gross_revenue_from_trade_debtors ||
                    new Array(periodEmarine).fill(0),
                  10
                ),
                modelStartDate,
                active,
                emarineDateRange
              ),
            },
            {
              id: "cash_receipts_from_trade_debtors",
              title: `Cash receipts from trade debtors £'000`,
              data: getFilterData(
                roundArray(
                  cfResults?.cash_receipts_from_trade_debtors ||
                    new Array(periodEmarine).fill(0),
                  10
                ),
                modelStartDate,
                active,
                emarineDateRange
              ),
            },
            {
              id: "movement_in_trade_creditors",
              title: `Movement in trade creditors £'000`,
              data: getFilterData(
                roundArray(
                  cfResults?.movement_in_trade_creditors ||
                    new Array(periodEmarine).fill(0),
                  10
                ),
                modelStartDate,
                active,
                emarineDateRange
              ),
            },
            {
              id: "movement_in_vat_creditor",
              title: `Movement in VAT creditor £'000`,
              data: getFilterData(
                roundArray(
                  cfResults?.movement_in_vat_creditor ||
                    new Array(periodEmarine).fill(0),
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
          id: "cashflow_from_investing",
          title: `Cashflow from investing and financing £'000`,
          data: getFilterData(
            roundArray(
              sumArrays(
                cfResults?.net_cashflow || new Array(periodEmarine).fill(0),
                multiplyNumber(
                  cfResults?.operating_cashflow ||
                    new Array(periodEmarine).fill(0),
                  -1
                )
              ),
              10
            ),
            modelStartDate,
            active,
            emarineDateRange
          ),
          children: [
            {
              id: "capex_for_cf_statement",
              title: "Capex £'000",
              data: getFilterData(
                roundArray(
                  cfResults?.capex_for_cf_statement ||
                    new Array(periodEmarine).fill(0),
                  10
                ),
                modelStartDate,
                active,
                emarineDateRange
              ),
            },
            {
              id: "movement_in_capex_provision",
              title: "Movement in capex provision £'000",
              data: getFilterData(
                roundArray(
                  cfResults?.movement_in_capex_provision ||
                    new Array(periodEmarine).fill(0),
                  10
                ),
                modelStartDate,
                active,
                emarineDateRange
              ),
            },
            {
              id: "sale_of_fixed_asset_for_cf",
              title: "Sale of fixed asset £'000",
              data: getFilterData(
                roundArray(
                  cfResults?.sale_of_fixed_asset_for_cf ||
                    new Array(periodEmarine).fill(0),
                  10
                ),
                modelStartDate,
                active,
                emarineDateRange
              ),
            },
            {
              id: "devex_for_cf_statement",
              title: "Devex £'000",
              data: getFilterData(
                roundArray(
                  cfResults?.devex_for_cf_statement ||
                    new Array(periodEmarine).fill(0),
                  10
                ),
                modelStartDate,
                active,
                emarineDateRange
              ),
            },
            {
              id: "corporation_tax_for_cf",
              title: `Corporation tax £'000`,
              data: getFilterData(
                roundArray(
                  cfResults?.corporation_tax_for_cf ||
                    new Array(periodEmarine).fill(0),
                  10
                ),
                modelStartDate,
                active,
                emarineDateRange
              ),
            },
            {
              id: "senior_debt_drawdown",
              title: `Senior debt drawdown £'000`,
              data: getFilterData(
                roundArray(
                  cfResults?.senior_debt_drawdown ||
                    new Array(periodEmarine).fill(0),
                  10
                ),
                modelStartDate,
                active,
                emarineDateRange
              ),
            },
            {
              id: "shareholder_loan_drawdown",
              title: `Shareholder loan drawdown £'000`,
              data: getFilterData(
                roundArray(
                  cfResults?.shareholder_loan_drawdown ||
                    new Array(periodEmarine).fill(0),
                  10
                ),
                modelStartDate,
                active,
                emarineDateRange
              ),
            },
            {
              id: "share_capital_drawdown",
              title: `Share capital drawdown £'000`,
              data: getFilterData(
                roundArray(
                  cfResults?.share_capital_drawdown ||
                    new Array(periodEmarine).fill(0),
                  10
                ),
                modelStartDate,
                active,
                emarineDateRange
              ),
            },
            {
              id: "senior_debt_repayment",
              title: `Senior debt repayment £'000`,
              data: getFilterData(
                roundArray(
                  cfResults?.senior_debt_repayment ||
                    new Array(periodEmarine).fill(0),
                  10
                ),
                modelStartDate,
                active,
                emarineDateRange
              ),
            },
            {
              id: "shareholder_loan_repayment",
              title: `Shareholder loan repayment £'000`,
              data: getFilterData(
                roundArray(
                  cfResults?.shareholder_loan_repayment ||
                    new Array(periodEmarine).fill(0),
                  10
                ),
                modelStartDate,
                active,
                emarineDateRange
              ),
            },
            {
              id: "intercompany_loan_drawdown",
              title: `Intercompany loan drawdown £'000`,
              data: getFilterData(
                roundArray(
                  cfResults?.intercompany_loan_drawdown ||
                    new Array(periodEmarine).fill(0),
                  10
                ),
                modelStartDate,
                active,
                emarineDateRange
              ),
            },
            {
              id: "intercompany_loan_repayment",
              title: `Intercompany loan repayment £'000`,
              data: getFilterData(
                roundArray(
                  cfResults?.intercompany_loan_repayment ||
                    new Array(periodEmarine).fill(0),
                  10
                ),
                modelStartDate,
                active,
                emarineDateRange
              ),
            },
            {
              id: "dividends_for_cf",
              title: `Dividends £'000`,
              data: getFilterData(
                roundArray(
                  cfResults?.dividends_for_cf ||
                    new Array(periodEmarine).fill(0),
                  10
                ),
                modelStartDate,
                active,
                emarineDateRange
              ),
            },
            {
              id: "share_capital_equity_repayment",
              title: `Share capital equity repayment £'000`,
              data: getFilterData(
                roundArray(
                  cfResults?.share_capital_equity_repayment ||
                    new Array(periodEmarine).fill(0),
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
          id: "net_cashflow",
          title: "Net cashflow £'000",
          data: getFilterData(
            roundArray(
              cfResults?.net_cashflow || new Array(periodEmarine).fill(0),
              10
            ),
            modelStartDate,
            active,
            emarineDateRange
          ),
        },
        {
          id: "cash_starting_balance",
          title: "Cash starting balance £'000",
          data: emarineCfStartBal,
        },
        {
          id: "net_cashflow",
          title: "Cashflow £'000",
          data: getFilterData(
            roundArray(
              cfResults?.net_cashflow || new Array(periodEmarine).fill(0),
              10
            ),
            modelStartDate,
            active,
            emarineDateRange
          ),
        },
        {
          id: "cash_ending_balance",
          title: `Cash ending balance £'000`,
          data: emarineCfEndBal,
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
      id: "cashFlowTable",
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
      id: "cashFlowTable",
      title: "Cashflow statement (£)",
    };
  }
}
