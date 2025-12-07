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

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const currentProjectType: string = "BESS";

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
              {currentProjectType == 'BESS' ? INPUT_PARAMS.map((param, index) => (
                <Route
                  key={index}
                  path={`/bess/input/${param.id}`}
                  element={
                    <PrivateRoute>
                      <InputParameter param={param} />
                    </PrivateRoute>
                  }
                />
              )) : MARINE_INPUT_PARAMS.map((param, index) => (
                <Route
                  key={index}
                  path={`/emarine/input/${param.id}`}
                  element={
                    <PrivateRoute>
                      <InputParameter param={param} />
                    </PrivateRoute>
                  }
                />
              ))}
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

export default App;
