// import { useState } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import AuthLayout from "./layout/Auth";
// import LoginRegister from "./views/Auth/LoginRegister/index.tsx";
// import EmailVerification from "./views/Auth/EmailVerification/index.tsx";
// import VerificationLink from "./views/Auth/VerificationLink/index.tsx";
// import ForgotPassword from "./views/Auth/ForgotPassword/index.tsx";
// import VerificationCode from "./views/Auth/VerificationCode/index.tsx";
// import CreateNewPassword from "./views/Auth/CreateNewPassword/index.tsx";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import LoadingComponent from "./components/Loader/LoadingComponent.tsx";
import PrivateRoute from "./components/privateRoute.tsx";
import Home from "./home.tsx";
import { store } from "./hooks/store.ts";
import "./index.css";
import Projects from "./InputSettings/Projects.tsx";
import InputSettings from "./InputSettings/index.tsx";
import { InputParameter } from "./InputSettings/input.tsx";
import MainLayout from "./layout/Main";
import WholeContent from "./layout/Main/WholeContent.tsx";
import { Login } from "./pages/auth/login.tsx";
import { BalanceSheet } from "./pages/financial_statements/balancesheet.tsx";
import { CashFlow } from "./pages/financial_statements/cash_flow.tsx";
import { ProfitLoss } from "./pages/financial_statements/profit_loss.tsx";
import { BalanceSheetGraphPage } from "./pages/graph/balance_sheet.tsx";
import { ProfitAcrossTimeGraphPage } from "./pages/graph/profit_across_time.tsx";
import { RevenueGraphPage } from "./pages/graph/revenue.tsx";
import { INPUT_PARAMS } from "./utils/constant.ts";
import { NetCashFlowGraphPage } from "./pages/graph/net_cash_flow.tsx";
import { CostOfSalesGraphPage } from "./pages/graph/cost_of_sales.tsx";
import { ElectricitySoldGraphPage } from "./pages/graph/electricity_sold.tsx";
import { AdministrativeExpenseGraphPage } from "./pages/graph/administrative_expense.tsx";
import { AverageBatteryCyclesGraphPage } from "./pages/graph/average_battery_cycle.tsx";
import ProjectValuationTable from "./pages/ProjectValuationTable.tsx";
import { ToastContainer } from "react-toastify";
import Dashboard from "./pages/Dashboard.tsx";
import "react-toastify/dist/ReactToastify.css";
import AfrayForecast from "./pages/forecast/AfrayForecast.tsx";
import BaringaForecast from "./pages/forecast/BaringaForecast.tsx";
import NotFound from "./pages/error/NotFound.tsx";
import ModoForecast from "./pages/forecast/ModoForecast.tsx";
import { MARINE_INPUT_PARAMS } from "./eMarine/emarine front constant.ts";
import BasicInfoTable from "./pages/BasicInformationTable.tsx";
import OperationInfoTable from "./pages/OperationInfoTable.tsx";
import { useAppSelector } from "./hooks/hooks.ts";
import { selectParam } from "./store/slices/parameterSlice.ts";
import { OperatingCashFlowGraphPage } from "./pages/graph/operating_cashflow.tsx";
import { EmarineCapexAndVolumeSold } from "./pages/graph/emarine_capex_volume_sold.tsx";
import { EmarineElectricityVolumeSoldPerPlug } from "./pages/graph/emarine_electricity_volume_sold_per_plug.tsx";
import { EmarineRevenueBreakdown } from "./pages/graph/emarine_revenue_breakdown.tsx";
import EmarineFirstYearFinancialsTable from "./pages/EmarineFirstYearFinancialsTable.tsx";
import EmarineLastYearFinancialsTable from "./pages/EmarineLastYearFinancialsTable.tsx";
import { EmarineRevOpexAdoptionCurve } from "./pages/graph/emarine_rev_opex_adoption_curve.tsx";
import { EmarineWholesaleSelloutPurchasePrice } from "./pages/graph/emarine_wholesale_sell_out_purchase_price.tsx";
import { EmarineCumulativeCapexOfSelectedTerminal } from "./pages/graph/emarine_cumulative_capex.tsx";
import { EmarineThroughputUtilisation } from "./pages/graph/emarine_throughput_utilisation.tsx";
import { AggregatedProfitLoss } from "./pages/financial_statements/aggregated_profit_loss.tsx";
import { AggregatedCashFlow } from "./pages/financial_statements/aggregated_cash_flow.tsx";
import { AggregatedBalanceSheet } from "./pages/financial_statements/aggregatedbalancesheet.tsx";
import AggregatedProjectValuationTable from "./pages/AggregatedProjectValuationTable.tsx";
import AggregatedFirstYearFinancialsTable from "./pages/AggregatedFirstYearFinancialsTable.tsx";
import AggregatedLastYearFinancialsTable from "./pages/AggregatedLastYearFinancialsTable.tsx";
import EmarineProjectsAggregationStatusTable from "./pages/EmarineAggregatedProjects.tsx";

function ExtendedApp() {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);
  return loading ? (
    <LoadingComponent
      isLoading={loading}
      loadingText="Please wait for a while..."
    />
  ) : (
    <>
      <ToastContainer />

      <BrowserRouter>
        <Provider store={store}>
          <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="home" element={<Home />} />
            </Route>

            <Route path="login" element={<Login />} />
            <Route path="register" element={<InputSettings />} />

            <Route
              path="/"
              element={
                <PrivateRoute>
                  <WholeContent />
                </PrivateRoute>
              }
            >
              <Route
                path="dashboard"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="my_projects"
                element={
                  <PrivateRoute>
                    <Projects />
                  </PrivateRoute>
                }
              />

              <Route
                path="kpis/project_valuation"
                element={
                  <PrivateRoute>
                    <ProjectValuationTable dashboardStyle={false} />
                  </PrivateRoute>
                }
              />
              <Route
                path="aggregated_kpis/project_valuation"
                element={
                  <PrivateRoute>
                    <AggregatedProjectValuationTable dashboardStyle={false} />
                  </PrivateRoute>
                }
              />

              <Route
                path="bess/kpis/basic_info"
                element={
                  <PrivateRoute>
                    <BasicInfoTable dashboardStyle={false} />
                  </PrivateRoute>
                }
              />

              <Route
                path="bess/kpis/operation_info"
                element={
                  <PrivateRoute>
                    <OperationInfoTable dashboardStyle={false} />
                  </PrivateRoute>
                }
              />

              <Route
                path="forecast/afry"
                element={
                  <PrivateRoute>
                    <AfrayForecast />
                  </PrivateRoute>
                }
              />
              <Route
                path="forecast/baringa"
                element={
                  <PrivateRoute>
                    <BaringaForecast />
                  </PrivateRoute>
                }
              />
              <Route
                path="forecast/modo"
                element={
                  <PrivateRoute>
                    <ModoForecast />
                  </PrivateRoute>
                }
              />

              <Route
                path="input"
                element={
                  <PrivateRoute>
                    <InputSettings />
                  </PrivateRoute>
                }
              />
              {INPUT_PARAMS.map((param, index) => (
                <Route
                  key={index}
                  path={`bess/input/${param.id}`}
                  element={
                    <PrivateRoute>
                      <InputParameter param={param} />
                    </PrivateRoute>
                  }
                />
              ))}
              {MARINE_INPUT_PARAMS.map((param, index) => (
                <Route
                  key={index}
                  path={`emarine/input/${param.id}`}
                  element={
                    <PrivateRoute>
                      <InputParameter param={param} />
                    </PrivateRoute>
                  }
                />
              ))}
              <Route
                path="aggregated_kpis/projects_aggregation"
                element={
                  <PrivateRoute>
                    <EmarineProjectsAggregationStatusTable dashboardStyle={false} />
                  </PrivateRoute>
                }
              />
              <Route
                path="emarine/kpis/first_year_financials"
                element={
                  <PrivateRoute>
                    <EmarineFirstYearFinancialsTable dashboardStyle={false} />
                  </PrivateRoute>
                }
              />
              <Route
                path="emarine/kpis/last_year_financials"
                element={
                  <PrivateRoute>
                    <EmarineLastYearFinancialsTable dashboardStyle={false} />
                  </PrivateRoute>
                }
              />
              <Route
                path="emarine/kpis/aggregated_first_year_financials"
                element={
                  <PrivateRoute>
                    <AggregatedFirstYearFinancialsTable dashboardStyle={false} />
                  </PrivateRoute>
                }
              />
              <Route
                path="emarine/kpis/aggregated_last_year_financials"
                element={
                  <PrivateRoute>
                    <AggregatedLastYearFinancialsTable dashboardStyle={false} />
                  </PrivateRoute>
                }
              />
              <Route
                path="/financial_statements/balance_sheet"
                element={
                  <PrivateRoute>
                    <BalanceSheet />
                  </PrivateRoute>
                }
              />
              <Route
                path="/financial_statements/profit_and_loss_account"
                element={
                  <PrivateRoute>
                    <ProfitLoss />
                  </PrivateRoute>
                }
              />
              <Route
                path="/financial_statements/cashflow_statement"
                element={
                  <PrivateRoute>
                    <CashFlow />
                  </PrivateRoute>
                }
              />
              <Route
                path="/aggregated_financial_statements/balance_sheet"
                element={
                  <PrivateRoute>
                    <AggregatedBalanceSheet />
                  </PrivateRoute>
                }
              />
              <Route
                path="/aggregated_financial_statements/profit_and_loss_account"
                element={
                  <PrivateRoute>
                    <AggregatedProfitLoss />
                  </PrivateRoute>
                }
              />
              <Route
                path="/aggregated_financial_statements/cashflow_statement"
                element={
                  <PrivateRoute>
                    <AggregatedCashFlow />
                  </PrivateRoute>
                }
              />
              <Route
                path="/graphs/electricity_sold"
                element={
                  <PrivateRoute>
                    <ElectricitySoldGraphPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/graphs/revenue"
                element={
                  <PrivateRoute>
                    <RevenueGraphPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/graphs/battery_cycles"
                element={
                  <PrivateRoute>
                    <AverageBatteryCyclesGraphPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/graphs/balance_sheet"
                element={
                  <PrivateRoute>
                    <BalanceSheetGraphPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/graphs/operating_cashflow"
                element={
                  <PrivateRoute>
                    <OperatingCashFlowGraphPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="emarine/graphs/capex_and_volume_sold"
                element={
                  <PrivateRoute>
                    <EmarineCapexAndVolumeSold />
                  </PrivateRoute>
                }
              />
              <Route
                path="emarine/graphs/revenue_breakdown"
                element={
                  <PrivateRoute>
                    <EmarineRevenueBreakdown />
                  </PrivateRoute>
                }
              />
              <Route
                path="emarine/graphs/electricity_sold_per_plug"
                element={
                  <PrivateRoute>
                    <EmarineElectricityVolumeSoldPerPlug />
                  </PrivateRoute>
                }
              />
              <Route
                path="emarine/graphs/ws_so_purchase_prices"
                element={
                  <PrivateRoute>
                    <EmarineWholesaleSelloutPurchasePrice />
                  </PrivateRoute>
                }
              />
              <Route
                path="emarine/graphs/cumulative_capex"
                element={
                  <PrivateRoute>
                    <EmarineCumulativeCapexOfSelectedTerminal />
                  </PrivateRoute>
                }
              />
              <Route
                path="emarine/graphs/throughput_utilisation"
                element={
                  <PrivateRoute>
                    <EmarineThroughputUtilisation />
                  </PrivateRoute>
                }
              />
              <Route
                path="emarine/graphs/rev_opex_adoption_curves"
                element={
                  <PrivateRoute>
                    <EmarineRevOpexAdoptionCurve />
                  </PrivateRoute>
                }
              />
              <Route
                path="/graphs/net_cashflow"
                element={
                  <PrivateRoute>
                    <NetCashFlowGraphPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/graphs/cost_of_sales"
                element={
                  <PrivateRoute>
                    <CostOfSalesGraphPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/graphs/admin_expenses"
                element={
                  <PrivateRoute>
                    <AdministrativeExpenseGraphPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/graphs/profit_and_loss_across_time"
                element={
                  <PrivateRoute>
                    <ProfitAcrossTimeGraphPage />
                  </PrivateRoute>
                }
              />
            </Route>

            <Route
              path="input"
              element={
                <PrivateRoute>
                  <InputSettings />
                </PrivateRoute>
              }
            />

            {/* <Route path="auth" element={<AuthLayout />}>
						<Route index element={<LoginRegister />} />
						<Route path="email-verification" element={<EmailVerification />} />
						<Route path="activate" element={<VerificationLink />} />
						<Route path="forgot-password" element={<ForgotPassword />} />
						<Route path="verify-code" element={<VerificationCode />} />
						<Route path="create-new-password" element={<CreateNewPassword />} />
					</Route> */}
          </Routes>
        </Provider>
      </BrowserRouter>
    </>
  );
}

export default ExtendedApp;
