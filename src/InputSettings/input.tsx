// import { useEffect, useState } from "react";
// // import settingSvg from "../assets/settings.svg";
// import { TabPanel, TabView } from "primereact/tabview";
// import ParamContent from "../components/ParamContent";
// import ParamCollapsableList from "../components/ParamContent/CollapsableList";
// import { AdministrativeExpenseGraphPage } from "../pages/graph/administrative_expense";
// import { CapexGraphPage } from "../pages/graph/capex";
// import { CostOfSalesGraphPage } from "../pages/graph/cost_of_sales";
// import { RevenueGraphPage } from "../pages/graph/revenue";
// import { IInputParameter } from "../utils/types";
// import { AverageBatteryCyclesGraphPage } from "../pages/graph/average_battery_cycle";
// import { ElectricitySoldGraphPage } from "../pages/graph/electricity_sold";
// import { useSelector } from "react-redux";

// interface InputParameterProps {
//   param: IInputParameter;
// }

// export function InputParameter({ param }: InputParameterProps) {
//   const [loading, setLoading] = useState<boolean>(true);
//   const [selectedSubMenu, setSelectedSubMenu] = useState(param?.children?.[0]?.id)

//   useEffect(() => {
//     setTimeout(() => setLoading(false), 1500);
//   }, []);

//   const [selectedIndividualParam, setSelectedIndividualParam] =
//     useState<IInputParameter | null>(null);
//   const [parentId, setParentId] = useState("");
//   useEffect(() => {
//     if (Array.isArray(param.children) && param.children?.length > 0) {
//       setSelectedIndividualParam(param.children[0]);
//       setSelectedSubMenu(param.children[0].id)
//       setParentId(param.id);
//     } else {
//       setSelectedIndividualParam(param);
//       setParentId("");
//     }
//   }, [param]);
//   // useEffect(() => {
//   //   console.log("selectedIndividualParam", selectedIndividualParam, parentId);
//   // }, [selectedIndividualParam]);

//   const isOpen = useSelector((state: any) => state.sidebar.isOpen);
//   const BasicProjectInputPage = () => {
//     const [selectedGraphTitle, setSelectedGraphTitle] =
//       useState("batteryAssumption");
//     const [activeIndex, setActiveIndex] = useState(0);

//     const handleTabChange = (e) => {
//       setActiveIndex(e.index); // Update the active index when the tab changes

//       // Set selected graph title based on tab index
//       switch (e.index) {
//         case 0:
//           setSelectedGraphTitle("batteryAssumption");
//           break;
//         case 1:
//           setSelectedGraphTitle("capex");
//           break;
//         case 2:
//           setSelectedGraphTitle("revenue");
//           break;
//         case 3:
//           setSelectedGraphTitle("costOfSales");
//           break;
//         case 4:
//           setSelectedGraphTitle("adminCosts");
//           break;
//         default:
//           setSelectedGraphTitle("");
//           break;
//       }
//     };

//     return (
//       <div className={`w-full h-full  flex`}>
//         <div className="px-4 py-16 overflow-y-hidden sticky top-0 w-[25vw] 2xl:w-[16vw]">

//         </div>
//         {/* Left Section - Input Form */}
//         <div className="w-full flex justify-center  my-10">
//           <div className="grid min-w-[50vw] grid-cols-1">
//             <div className="">
//               {selectedIndividualParam &&
//                 Array.isArray(selectedIndividualParam?.datum) &&
//                 selectedIndividualParam?.datum?.length > 0 && (
//                   <ParamContent
//                     param={selectedIndividualParam}
//                     parentId={parentId}
//                   />
//                 )}
//             </div>
//           </div>
//         </div>

//         {/* Right Section - Tabs */}
     
//       </div>
//     );
//   };

//   return param?.id == "basic_project_inputs" ? (
//     <BasicProjectInputPage />
//   ) : (
//     <div className="w-full h-100vh">
//       <div className="flex from-blue-100 to-green-100">
//         {/* Side Panel */}
//         {param.children?.length || param.title === "Devex" ? (
//           <div className="min-h-screen">
//             <div
//               className={`px-4 py-16 h-screen overflow-y-hidden sticky top-0 w-[25vw] 2xl:w-[16vw] ${
//                 param.title !== "Devex" ? "bg-gray-100" : ""
//               } `}
//               style={{
//                 height: "100%",
//                 top: 0,
//                 overflowY: "hidden",
//                 scrollbarWidth: "none",
//                 msOverflowStyle: "none",
//               }}
//             >
//               {param.title !== "Devex" && (
//                 <>
//                   <h2 className="text-3xl font-jakarta mb-16 mt-4">
//                     {param.title}
//                   </h2>
//                   <div className="flex flex-col space-y-4">
//                     {param?.children?.map(
//                       (
//                         selectedIndividualParam: IInputParameter,
//                         index: any
//                       ) => {
//                         return (
//                           <div className="text-sm ">
//                             <ParamCollapsableList
//                               key={index}
//                               menuList={selectedIndividualParam}
//                               current={selectedSubMenu}
//                               // selected={selectedParam}
//                               onClick={(m: IInputParameter, parent: string) => {
//                                 if (parent)
//                                   setParentId(`${param.id}@${parent}`);
//                                 else setParentId(param.id);
//                                 setSelectedIndividualParam(m);
//                                 setSelectedSubMenu(m.id);
//                               }}
//                             />
//                           </div>
//                         );
//                       }
//                     )}
//                   </div>
//                 </>
//               )}
//             </div>
//           </div>
//         ) : (
//           ""
//         )}
//         {/* Side Panel End*/}
//         {/* Main Content */}
//         <div className="w-full flex justify-center h-full my-10">
//           <div className="grid min-w-[50vw] grid-cols-1">
//             {selectedIndividualParam &&
//               Array.isArray(selectedIndividualParam?.datum) &&
//               selectedIndividualParam?.datum?.length > 0 && (
//                 <ParamContent
//                   param={selectedIndividualParam}
//                   parentId={parentId}
//                 />
//               )}
//           </div>
//           {/* <div className="flex-1  p-6">
//             <div
//               className="m-2 rounded-lg flex flex-col justify-between min-h-[25vh]"
//               style={{ width: "max-content" }}
//             >
//               {parentId.includes("battery_assumption") &&
//               (!selectedIndividualParam?.children ||
//                 selectedIndividualParam?.datum) ? (
//                 <div>
//                   <div style={{ paddingBottom: "10px" }}>
//                     <AverageBatteryCyclesGraphPage />
//                   </div>
//                   <div>
//                     <ElectricitySoldGraphPage />
//                   </div>
//                 </div>
//               ) 
//               : parentId.includes("capex") &&
//                 (!selectedIndividualParam?.children ||
//                   selectedIndividualParam?.datum) ? (
//                 <CapexGraphPage />
//               )
//                : parentId.includes("revenue") &&
//                 (!selectedIndividualParam?.children ||
//                   selectedIndividualParam?.datum) ? (
//                 <RevenueGraphPage />
//               ) 
//               : parentId.includes("cost_of_sales") &&
//                 (!selectedIndividualParam?.children ||
//                   selectedIndividualParam?.datum) ? (
//                 <CostOfSalesGraphPage />
//               ) 
//               : parentId.includes("administrative_costs") &&
//                 (!selectedIndividualParam?.children ||
//                   selectedIndividualParam?.datum) ? (
//                 <AdministrativeExpenseGraphPage />
//               ) 
//               : (
//                 <div></div>
//               )}
//             </div>
//           </div> */}
//         </div>
//       </div>
//       {/* <div>Card content</div> */}
//     </div>
//   );
// }
