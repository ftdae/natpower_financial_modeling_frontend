// import { useEffect, useState } from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import bottomArrowSVG from "../assets/BottomArrow.svg";
// import dashboardSVG from "../assets/Dashboard.svg";
// import frameSVG from "../assets/Frame.svg";
// import graphsSVG from "../assets/Graph.svg";
// import modelInputsSVG from "../assets/ModelInput.svg";
// import natPowerLogoSVG from "../assets/NatPower-N.png";
// import natpowerBiancoPng from "../assets/NatPower_Payoff_Bianco.png";
// import projectValuationSVG from "../assets/ProjValue.svg";
// import { useAppDispatch, useAppSelector } from "../hooks/hooks";
// import { logoutAsync } from "../store/slices/authSlice";
// import {
//   paramGetAsync,
//   allInputsGetAsync,
//   selectParam,
// } from "../store/slices/parameterSlice";
// import { INPUT_PARAMS } from "../utils/constant";
// import useParameter from "../utils/usePrameter";
// import { useSelector } from "react-redux";
// import { openSidebar } from "../store/slices/sidebarSlice";
// import { FaChartArea } from "react-icons/fa";

// export const SidebarContent = () => {
//   const navigate = useNavigate();
//   const [isModelInputsOpen, setIsModelInputsOpen] = useState(false);
//   const [isStatementOpen, setIsStatementOpen] = useState(false);
//   const [isForecastOpen, setIsForecastOpen] = useState(false);
//   const [isGraphOpen, setIsGraphOpen] = useState(false);

//   const [activeInput, setActiveInput] = useState<string | null>(null);
//   const dispatch = useAppDispatch();
//   const { currentParameterId } = useAppSelector(selectParam);

//   const isOpen = useSelector((state: any) => state.sidebar.isOpen);
//   const currentProjectType: string = "eMarine";

//   useParameter();

//   const toggleModelInputs = () => {
//     setIsModelInputsOpen(!isModelInputsOpen);
//   };

//   const toggleFinStatements = () => {
//     setIsStatementOpen(!isStatementOpen);
//   };
//   const toggleGraphs = () => {
//     setIsGraphOpen(!isGraphOpen);
//   };

//   const handleInputChange = (input: string) => {
//     setActiveInput(input);
//   };

//   useEffect(() => {
//     dispatch(paramGetAsync(currentProjectType.toLowerCase()));
//     console.log("loading sidebar layout");
//   }, [dispatch]);

//   useEffect(() => {
//     if (currentParameterId) {
//       dispatch(allInputsGetAsync(currentParameterId));
//     }
//   }, [currentParameterId, dispatch]);

//   const logout = () => {
//     dispatch(logoutAsync())
//       .then(() => {
//         console.log("User logged out successfully");
//         navigate("/login");
//         localStorage.removeItem("X-Access-Token");
//       })
//       .catch((error) => {
//         console.error("Logout error:", error);
//       });
//   };

//   return (
//     <div
//       className={`bg-main text-white relative top-0 bottom-0 min-h-screen h-full transition-width duration-150 bg-primary ${isOpen ? "w-[280px]" : "w-[90px]"
//         }`}
//     >
//       <div className="flex-grow">
//         <div className="mb-8 mx-2">
//           <div className="flex items-center space-x-4 px-4 rounded-lg h-20">
//             <NavLink
//               to="/my_projects"
//               onClick={() => {
//                 handleInputChange("My Projects");
//                 window.location.assign("/my_projects");
//               }}
//             >
//               <div className="flex justify-center items-center h-10 w-10 rounded-lg border border-gray-500">
//                 <img
//                   src={natPowerLogoSVG}
//                   alt="NatPower Logo Icon"
//                   className="h-4 w-4 "
//                 />
//               </div>
//             </NavLink>
//             {isOpen && (
//               <div>
//                 <NavLink
//                   to="/my_projects"
//                   onClick={() => {
//                     handleInputChange("My Projects");
//                     window.location.assign("/my_projects");
//                   }}
//                 >
//                   <img
//                     src={natpowerBiancoPng}
//                     alt="Natpower Marine Logo"
//                     className="h-28 w-28 object-contain"
//                   />
//                 </NavLink>
//               </div>
//             )}
//           </div>
//         </div>
//         <nav className="space-y-4 mx-2 font-inter text-[#9DA4AE] px-5">
//           {/* My Projects */}
//           {isOpen ? (
//             <div className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-700">
//               <img src={frameSVG} className="h-5 w-5" />
//               <NavLink
//                 to="/my_projects"
//                 onClick={() => handleInputChange("My Projects")}
//               >
//                 <span>My Projects</span>
//               </NavLink>
//             </div>
//           ) : (
//             <div
//               className="flex items-center space-x-2 p-2 rounded-lg cursor-pointer hover:bg-gray-700"
//               onClick={() => dispatch(openSidebar())}
//             >
//               <img src={frameSVG} className="h-5 w-5" />
//             </div>
//           )}

//           {/* Dashboard */}
//           {isOpen ? (
//             <div className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-700">
//               <img src={dashboardSVG} className="h-5 w-5" />
//               <NavLink
//                 to="/dashboard"
//                 onClick={() => handleInputChange("Dashboard")}
//               >
//                 <span>Dashboard</span>
//               </NavLink>
//             </div>
//           ) : (
//             <div
//               className="flex items-center space-x-2 p-2 rounded-lg cursor-pointer hover:bg-gray-700"
//               onClick={() => dispatch(openSidebar())}
//             >
//               <img src={dashboardSVG} className="h-5 w-5" />
//             </div>
//           )}

//           {/* Model Inputs */}
//           <div>
//             {isOpen ? (
//               <>
//                 <div
//                   className="flex items-center justify-between space-x-2 p-2 rounded-lg hover:bg-gray-700 cursor-pointer"
//                   onClick={toggleModelInputs}
//                   aria-expanded={isModelInputsOpen}
//                   aria-controls="model-inputs"
//                 >
//                   <div className="flex items-center space-x-2">
//                     <img src={modelInputsSVG} className="h-5 w-5" />
//                     <span>Model Inputs</span>
//                   </div>
//                   <img
//                     src={bottomArrowSVG}
//                     className="h-5 w-5 transform transition-transform duration-300"
//                     style={{
//                       transform: isModelInputsOpen
//                         ? "rotate(180deg)"
//                         : "rotate(0deg)",
//                     }}
//                   />
//                 </div>
//                 {isModelInputsOpen && (
//                   <ul className="ml-8 mt-2 space-y-4 text-gray-400">
//                     <li>
//                       <NavLink
//                         to="/input"
//                         className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${activeInput === "Setting" ? "!text-white" : ""
//                           }`}
//                         onClick={() => handleInputChange("Setting")}
//                       >
//                         Setting
//                       </NavLink>
//                     </li>
//                     {INPUT_PARAMS.map((param) => (
//                       <li key={param.id}>
//                         <NavLink
//                           to={`/input/${param.id}`}
//                           className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${activeInput === param.title ? "!text-white" : ""
//                             }`}
//                           onClick={() => handleInputChange(param.title)}
//                         >
//                           {param.title}
//                         </NavLink>
//                       </li>
//                     ))}
//                   </ul>
//                 )}
//               </>
//             ) : (
//               <>
//                 <div
//                   className="flex items-center space-x-2 p-2 cursor-pointer rounded-lg hover:bg-gray-700"
//                   onClick={() => dispatch(openSidebar())}
//                 >
//                   <img src={modelInputsSVG} className="h-5 w-5" />
//                 </div>
//               </>
//             )}
//           </div>

//           {/* Graphs */}
//           <div>
//             {isOpen ? (
//               <>
//                 <div
//                   className="flex items-center justify-between space-x-2 p-2 rounded-lg hover:bg-gray-700 cursor-pointer"
//                   onClick={toggleGraphs}
//                   aria-expanded={isGraphOpen}
//                   aria-controls="financial-statements"
//                 >
//                   <div className="flex items-center space-x-2">
//                     <img src={graphsSVG} className="h-5 w-5" />
//                     <span>Graphs</span>
//                   </div>
//                   <img
//                     src={bottomArrowSVG}
//                     className="h-5 w-5 transform transition-transform duration-300"
//                     style={{
//                       transform: isGraphOpen
//                         ? "rotate(180deg)"
//                         : "rotate(0deg)",
//                     }}
//                   />
//                 </div>
//                 {isGraphOpen && (
//                   <ul className="ml-8 mt-2 space-y-4 text-gray-400">
//                     <li>
//                       <NavLink
//                         to="/graphs/battery_cycles"
//                         className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${activeInput === "graphs_battery_cycles"
//                           ? "!text-white"
//                           : ""
//                           }`}
//                         onClick={() =>
//                           handleInputChange("graphs_battery_cycles")
//                         }
//                       >
//                         Average Battery Cycles
//                       </NavLink>
//                     </li>
//                     <li>
//                       <NavLink
//                         to="/graphs/electricity_sold"
//                         className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${activeInput === "graphs_electricity_sold"
//                           ? "!text-white"
//                           : ""
//                           }`}
//                         onClick={() =>
//                           handleInputChange("graphs_electricity_sold")
//                         }
//                       >
//                         Electricity Sold
//                       </NavLink>
//                     </li>
//                     <li>
//                       <NavLink
//                         to="/graphs/net_cashflow"
//                         className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${activeInput === "graphs_net_cashflow"
//                           ? "!text-white"
//                           : ""
//                           }`}
//                         onClick={() => handleInputChange("graphs_net_cashflow")}
//                       >
//                         Net Cashflow
//                       </NavLink>
//                     </li>
//                     <li>
//                       <NavLink
//                         to="/graphs/revenue"
//                         className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${activeInput === "graphs_revenue" ? "!text-white" : ""
//                           }`}
//                         onClick={() => handleInputChange("graphs_revenue")}
//                       >
//                         Revenue
//                       </NavLink>
//                     </li>
//                     <li>
//                       <NavLink
//                         to="/graphs/cost_of_sales"
//                         className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${activeInput === "cost_of_sales" ? "!text-white" : ""
//                           }`}
//                         onClick={() => handleInputChange("cost_of_sales")}
//                       >
//                         Cost of Sales
//                       </NavLink>
//                     </li>
//                     <li>
//                       <NavLink
//                         to="/graphs/admin_expenses"
//                         className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${activeInput === "admin_expenses" ? "!text-white" : ""
//                           }`}
//                         onClick={() => handleInputChange("admin_expenses")}
//                       >
//                         Admininstrative Expenses
//                       </NavLink>
//                     </li>
//                     <li>
//                       <NavLink
//                         to="/graphs/profit_and_loss_across_time"
//                         className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${activeInput === "profit_and_loss" ? "!text-white" : ""
//                           }`}
//                         onClick={() => handleInputChange("profit_and_loss")}
//                       >
//                         Profit and Loss
//                       </NavLink>
//                     </li>
//                     <li>
//                       <NavLink
//                         to="/graphs/balance_sheet"
//                         className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${activeInput === "balance_sheet" ? "!text-white" : ""
//                           }`}
//                         onClick={() => handleInputChange("balance_sheet")}
//                       >
//                         Balance Sheet
//                       </NavLink>
//                     </li>
//                   </ul>
//                 )}
//               </>
//             ) : (
//               <>
//                 <div
//                   className="flex items-center space-x-2 p-2 rounded-lg cursor-pointer hover:bg-gray-700"
//                   onClick={() => {
//                     dispatch(openSidebar());
//                     toggleGraphs();
//                   }}
//                 >
//                   <img src={graphsSVG} className="h-5 w-5" />
//                 </div>
//               </>
//             )}
//           </div>

//           {/* Financial Statements */}
//           <div>
//             {isOpen ? (
//               <>
//                 <div
//                   className="flex items-center justify-between space-x-2 p-2 rounded-lg hover:bg-gray-700 cursor-pointer"
//                   onClick={toggleFinStatements}
//                   aria-expanded={isStatementOpen}
//                   aria-controls="financial-statements"
//                 >
//                   <div className="flex items-center space-x-2">
//                     <img src={modelInputsSVG} className="h-5 w-5" />
//                     <span>Financial Statements</span>
//                   </div>
//                   <img
//                     src={bottomArrowSVG}
//                     className="h-5 w-5 transform transition-transform duration-300"
//                     style={{
//                       transform: isStatementOpen
//                         ? "rotate(180deg)"
//                         : "rotate(0deg)",
//                     }}
//                   />
//                 </div>
//                 {isStatementOpen && (
//                   <ul className="ml-8 mt-2 space-y-4 text-gray-400">
//                     <li>
//                       <NavLink
//                         to="/financial_statements/profit_and_loss_account"
//                         className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${activeInput === "profit_and_loss_account"
//                           ? "!text-white"
//                           : ""
//                           }`}
//                         onClick={() =>
//                           handleInputChange("profit_and_loss_account")
//                         }
//                       >
//                         Profit and Loss Account
//                       </NavLink>
//                     </li>
//                     <li>
//                       <NavLink
//                         to="/financial_statements/cashflow_statement"
//                         className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${activeInput === "cashflow_statement"
//                           ? "!text-white"
//                           : ""
//                           }`}
//                         onClick={() => handleInputChange("cashflow_statement")}
//                       >
//                         Cashflow Statement
//                       </NavLink>
//                     </li>
//                     <li>
//                       <NavLink
//                         to="/financial_statements/balance_sheet"
//                         className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${activeInput === "balance_sheet" ? "!text-white" : ""
//                           }`}
//                         onClick={() => handleInputChange("balance_sheet")}
//                       >
//                         Balance Sheet
//                       </NavLink>
//                     </li>
//                   </ul>
//                 )}
//               </>
//             ) : (
//               <>
//                 <div
//                   className="flex items-center space-x-2 p-2 rounded-lg cursor-pointer hover:bg-gray-700"
//                   onClick={() => dispatch(openSidebar())}
//                 >
//                   <img src={modelInputsSVG} className="h-5 w-5 " />
//                 </div>
//               </>
//             )}
//           </div>

//           {/* Forecast */}
//           <div>
//             {isOpen ? (
//               <>
//                 <div
//                   className="flex items-center justify-between space-x-2 p-2 rounded-lg hover:bg-gray-700 cursor-pointer"
//                   onClick={() => setIsForecastOpen(!isForecastOpen)}
//                   aria-expanded={isForecastOpen}
//                   aria-controls="forecast"
//                 >
//                   <div className="flex items-center space-x-2">
//                     <FaChartArea className="h-5 w-5 " />
//                     <span>Forecast</span>
//                   </div>
//                   <img
//                     src={bottomArrowSVG}
//                     className="h-5 w-5 transform transition-transform duration-300"
//                     style={{
//                       transform: isStatementOpen
//                         ? "rotate(180deg)"
//                         : "rotate(0deg)",
//                     }}
//                   />
//                 </div>
//                 {isForecastOpen && (
//                   <ul className="ml-8 mt-2 space-y-4 text-gray-400">
//                     <li>
//                       <NavLink
//                         to="/forecast/afry"
//                         className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${activeInput === "forecast-afry" ? "!text-white" : ""
//                           }`}
//                         onClick={() => handleInputChange("forecast-afry")}
//                       >
//                         Forecast Afry
//                       </NavLink>
//                     </li>
//                     <li>
//                       <NavLink
//                         to="/forecast/baringa"
//                         className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${activeInput === "forecast_baringa"
//                           ? "!text-white"
//                           : ""
//                           }`}
//                         onClick={() => handleInputChange("forecast_baringa")}
//                       >
//                         Forecast Baringa
//                       </NavLink>
//                     </li>
//                     <li>
//                       <NavLink
//                         to="/forecast/modo"
//                         className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${activeInput === "forecast_modo"
//                           ? "!text-white"
//                           : ""
//                           }`}
//                         onClick={() => handleInputChange("forecast_modo")}
//                       >
//                         Forecast Modo
//                       </NavLink>
//                     </li>
//                   </ul>
//                 )}
//               </>
//             ) : (
//               <>
//                 <div
//                   className="flex items-center space-x-2 p-2 rounded-lg cursor-pointer hover:bg-gray-700"
//                   onClick={() => dispatch(openSidebar())}
//                 >
//                   <FaChartArea className="h-5 w-5 " />
//                 </div>
//               </>
//             )}
//           </div>
//         </nav>

//         {/* Logout Button */}
//         {/* <div className="flex justify-center mt-5">
//           <button
//             onClick={logout}
//             className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
//           >
//             Logout
//           </button>
//         </div> */}
//       </div>
//     </div>
//   );
// };

// export default SidebarContent;
