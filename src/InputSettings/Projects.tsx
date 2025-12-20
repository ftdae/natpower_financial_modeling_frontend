// import { useCallback, useEffect, useMemo, useState } from "react";
// import ProjectCard from "../components/ProjectCards";
// import { cloneObject } from "../utils/funtions";
// import { Parameter } from "../store/types/types";
// import { useAppDispatch, useAppSelector } from "../hooks/hooks";
// import {
//   projectCreateAsync,
//   paramSettingUpdateAsync,
//   selectParam,
// } from "../store/slices/parameterSlice";
// import { IParameterAdd } from "../utils/types";
// import { toast } from "react-toastify";

// interface AddParameter {
//   clone_id: number;
//   title: string;
//   description: string;
//   project_type: string;
// }

// const Projects = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedModel, setSelectedModel] = useState(null);
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [cloneID, setCloneID] = useState(-1);
//   const [models, setModels] = useState<any>([]);
//   const [selectedModelOption, setSelectedModelOption] = useState<any>("");
//   const modelOptions = ["BESS", "eMarine"];
//   const [titleError, setTitleError] = useState<string>("");
//   const [descriptionError, setDescriptionError] = useState<string>("");

//   const modelIds = {
//     BESS: "bess",
//     eMarine: "emarine",
//   };
//   const defaultModels = [
//     {
//       title: "BESS Model",
//       image: "../../src/assets/BESS.jpg",
//       features: [
//         "Reliable and Continuous power supply",
//         "Maximize efficiency and cost-effectiveness",
//         "The latest innovations and best practices",
//         "Sustainability and a cleaner future",
//       ],
//       buttonText: "Start Project with BESS Model",
//       disabled: false,
//       modelName: "BESS",
//       modelID: "bess",
//     },
//     {
//       title: "Wind Model",
//       image: "../../src/assets/Wind-turbine.jpeg",
//       features: [
//         "Utilizing GIS software and tools",
//         "The most appropriate turbine technology",
//         "Reactive power management",
//         "Comprehensive financial analyzes",
//       ],
//       buttonText: "Start Project with Wind Model",
//       disabled: true,
//       modelName: "Wind",
//       modelID: "wind",
//     },
//     {
//       title: "Solar Model",
//       image: "../../public/Solar.jpg",
//       features: [
//         "Suitable project sites with optimal condition",
//         "Efficient and cost-effective PV systems",
//         "The latest innovations and best practices",
//         "Tax credits and renewable energy certificate",
//       ],
//       buttonText: "Start Project with Solar Model",
//       disabled: true,
//       modelName: "Solar",
//       modelID: "solar",
//     },
//     {
//       title: "eMarine Model",
//       image: "../../public/Solar.jpg",
//       features: [
//         "Suitable project sites with optimal condition",
//         "Efficient and cost-effective PV systems",
//         "The latest innovations and best practices",
//         "Tax credits and renewable energy certificate",
//       ],
//       buttonText: "Start Project with eMarine Model",
//       disabled: false,
//       modelName: "eMarine",
//       modelID: "emarine",
//     },
//   ];

//   const handleButtonClick = (model: any) => {
//     setSelectedModel(model);
//     setIsModalOpen(true);
//     setAddParameter({ ...addParameter, project_type: model.modelID });
//   };

//   const handleChange =
//     (field: keyof AddParameter) =>
//       (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//         setAddParameter({ ...addParameter, [field]: e.target.value });

//         // Reset title error when user starts typing
//         if (field === "title") {
//           setTitleError("");
//         }
//         if (field === "description") {
//           setDescriptionError("");
//         }
//         console.log("e.target.value", e.target.value);
//       };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setSelectedModel(null);
//   };

//   const [addParameter, setAddParameter] = useState<IParameterAdd>({
//     clone_id: -1,
//     title: "",
//     description: "",
//     project_type: "",
//   });

//   const { currentParameterId: activeParameter, parameters } =
//     useAppSelector(selectParam);

//   const [selectedProject, setSelectedProject] = useState<any>(
//     parameters.filter((project) => project.id === activeParameter)
//   );

//   useEffect(() => {
//     setSelectedProject([
//       parameters.find((project) => project.id === activeParameter),
//     ]);
//   }, [activeParameter, parameters]);

//   const activeProject = parameters.find(
//     (project) => project.id === activeParameter
//   );

//   const latestProjects = [
//     activeProject,
//     ...parameters
//       .filter((project) => project.id !== activeParameter)
//       .sort(
//         (a, b) =>
//           new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
//       )
//       .slice(0, 3),
//   ];

//   const handleActiveProject = (modal) => {
//     setSelectedProject([modal]);
//     onActiveProject(modal);
//   };

//   const onActiveProject = useCallback(
//     (modal) => {
//       dispatch(
//         paramSettingUpdateAsync({
//           parameter_id: modal.id as number,
//         })
//       )
//         .unwrap()
//         .then(() => { })
//         .catch((e) => {
//           toast.error(e);
//         });
//     },
//     [selectedProject]
//   );

//   const sortedParameters = useMemo(() => {
//     const p = cloneObject(parameters) as [Parameter];
//     return p?.sort((a, b) => a.title.localeCompare(b.title));
//   }, [parameters]);

//   const dispatch = useAppDispatch();

//   const onAddParameter = useCallback(() => {
//     if (!addParameter.title) {
//       setTitleError("Title is required.");
//       return;
//     }
//     if (addParameter.title.length > 150) {
//       setTitleError("Title length should be less than 150 characters!");
//       return;
//     }
//     if (addParameter.description.length > 1000) {
//       setDescriptionError(
//         "Description length should be less than 1000 characters!"
//       );
//       return;
//     }
//     dispatch(projectCreateAsync(addParameter))
//       .unwrap()
//       .then(() => {
//         setIsModalOpen(false);
//       })
//       .catch(() => { });
//     setTitleError("");
//     setDescriptionError("");
//     setAddParameter({
//       title: "",
//       description: "",
//       clone_id: -1,
//       project_type: "",
//     });
//     setSelectedModelOption("BESS");
//   }, [addParameter]);

//   return (
//     <div className="flex justify-center" style={{ width: "100%" }}>
//       <div className="mt-[26px] max-w-full flex-col">
//         <div className="flex justify-start">
//           <div className="text-3xl  flex items-center gap-3">
//             <img src="./BigDashboard.svg" className="h-7 w-7" alt="Tick" />
//             <span className="font-jakarta">Projects</span>
//           </div>
//         </div>
//         <div className="flex justify-center ">
//           <section className="mb-4">
//             <h3 className="text-xl font-normal mb-4 mt-10">Default Models</h3>
//             <div className="flex gap-5">
//               {defaultModels.map((model, index) => (
//                 <ProjectCard
//                   key={index}
//                   title={model.title}
//                   image={model.image}
//                   features={model.features}
//                   buttonText={model.buttonText}
//                   disabled={model.disabled}
//                   onButtonClick={() => handleButtonClick(model)}
//                 />
//               ))}
//             </div>
//           </section>
//         </div>
//         {parameters.length > 0 && (
//           <div className="flex justify-start ">
//             <section className="mb-4">
//               <h3 className="text-xl font-normal mb-4 mt-5">My Projects</h3>
//               <div className="flex gap-5">
//                 {selectedProject &&
//                   latestProjects.map((modal, index) => (
//                     <ProjectCard
//                       key={index}
//                       title={modal?.title}
//                       image={"../../src/assets/BESS.jpg"}
//                       features={[
//                         "Reliable and Continuous power supply",
//                         "Maximize efficiency and cost-effectiveness",
//                         "The latest innovations and best practices",
//                         "Sustainability and a cleaner future",
//                       ]}
//                       buttonText={
//                         modal?.id !== selectedProject[0]?.id
//                           ? "Set as Activate"
//                           : "Activated"
//                       }
//                       disabled={modal?.id === selectedProject[0]?.id}
//                       onButtonClick={() => handleActiveProject(modal)}
//                     />
//                   ))}
//               </div>
//             </section>
//           </div>
//         )}
//       </div>

//       {isModalOpen && (
//         <div className="fixed inset-0 flex items-center justify-center z-50">
//           {/* Background overlay */}
//           <div className="fixed inset-0 bg-black opacity-50"></div>

//           {/* Modal content */}
//           <div
//             className="bg-white rounded-lg shadow-lg max-w-lg w-full p-8 relative z-10"
//             onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
//           >
//             <div className="flex justify-between items-center mb-6">
//               <h2 className="text-2xl font-semibold">
//                 Create {selectedModel?.modelName} Project
//               </h2>
//               {/* <button
//                 onClick={closeModal}
//                 className="text-gray-600 hover:text-gray-800"
//               >
//                 &times;
//               </button> */}
//             </div>

//             <div className="space-y-6">
//               {/* Clone From */}
//               <div>
//                 <label className="block text-gray-700 mb-2">Clone from:</label>
//                 <select
//                   className="w-full border border-gray-300 rounded-md p-3"
//                   value={addParameter?.clone_id}
//                   onChange={(v) => {
//                     setAddParameter({
//                       ...addParameter,
//                       clone_id: Number(v.target.value),
//                       project_type: selectedModel.modelID,
//                     });
//                   }}
//                 >
//                   <option value={-1}>No Clone</option>
//                   {sortedParameters?.map((parameter: any, index: number) => {
//                     if (parameter?.model_type == selectedModel.modelID)
//                       return (
//                         <option key={index} value={parameter.id}>
//                           {parameter.title}
//                         </option>
//                       );
//                   })}
//                 </select>
//               </div>

//               {/* Title */}
//               <div>
//                 <label className="block text-gray-700 mb-2">Title*:</label>
//                 <input
//                   type="text"
//                   value={addParameter.title}
//                   onChange={handleChange("title")}
//                   className="w-full border border-gray-300 rounded-md p-3"
//                   placeholder="Enter project title"
//                 />
//                 {titleError && (
//                   <p className="text-red-500 text-sm mt-1">{titleError}</p>
//                 )}
//               </div>

//               {/* Project Description */}
//               <div>
//                 <label className="block text-gray-700 mb-2">
//                   Project Description:
//                 </label>
//                 <textarea
//                   value={addParameter.description}
//                   onChange={handleChange("description")}
//                   className="w-full border border-gray-300 rounded-md p-3"
//                   placeholder="Enter project description"
//                 ></textarea>
//                 {descriptionError && (
//                   <p className="text-red-500 text-sm mt-1">
//                     {descriptionError}
//                   </p>
//                 )}
//               </div>

//               {/* Add Models */}
//               {/* <div>
//                 <label className="block text-gray-700 mb-2">Add Models:</label>
//                 <div className="flex items-center space-x-2">
//                   <select
//                     value={selectedModelOption}
//                     onChange={(e) => {
//                       setSelectedModelOption(e.target.value);
//                       setAddParameter({
//                         ...addParameter,
//                         project_type: modelIds[e.target.value],
//                       });
//                       setSelectedModel(
//                         e.target.value === "BESS"
//                           ? { modelID: "bess" }
//                           : { modelID: "emarine" }
//                       );
//                     }}
//                     className="w-full border border-gray-300 rounded-md p-3"
//                   >
//                     {modelOptions.map((option, index) => (
//                       <option key={index} value={option}>
//                         {option}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               </div> */}

//               {/* Models List */}
//               {models?.length > 0 && (
//                 <div className="space-y-2">
//                   {models?.map((model: any, index: any) => (
//                     <div
//                       key={index}
//                       className="flex items-center justify-between"
//                     >
//                       <span>{model}</span>
//                     </div>
//                   ))}
//                 </div>
//               )}

//               {/* Modal Footer */}
//               <div className="flex justify-end space-x-4 mt-6">
//                 <button
//                   onClick={() => {
//                     setIsModalOpen(false);
//                     setAddParameter({
//                       title: "",
//                       description: "",
//                       clone_id: -1,
//                       project_type: "",
//                     });
//                     setTitleError("");
//                     setDescriptionError("");
//                     setSelectedModelOption("BESS");
//                   }}
//                   className="px-6 py-2 bg-gray-200 text-black rounded-md hover:bg-gray-300"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={onAddParameter}
//                   className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
//                 >
//                   Create
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Projects;
