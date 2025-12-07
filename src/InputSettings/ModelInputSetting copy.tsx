// import { InputSwitch } from "primereact/inputswitch";
// import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
// import { toast } from "react-toastify";
// import bessJPG from "../assets/BESS.jpg";
// import DeleteModal from "../components/DeleteModal";
// import { useAppDispatch, useAppSelector } from "../hooks/hooks";
// import { projectCreateAsync, projectDeleteAsync, paramSettingUpdateAsync, projectInfoUpdateAsync, selectParam } from "../store/slices/parameterSlice";
// import { IParameter } from "../utils/types";
// interface AddProject {
//   clone_id: number;
//   title: string;
//   description: string;
// }
// const ModelInputSetting = () => {
//   const dispatch = useAppDispatch();
//   const [selectedProject, setSelectedProject] = useState<any>(null);
//   // const [currentParameter, setCurrentParameter] =
//   //   useState<IParameter>({
//   //     id: null,
//   //     user_id: null,
//   //     title: "",
//   //     description: "",
//   //   });

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [titleError, setTitleError] = useState<string>('');
//   const [descriptionError, setDescriptionError] = useState<string>('');

//   // State for projects and selected project
//   // const [projects, setProjects] = useState<any>([]);
//   const [checked, setChecked] = useState(false);

//   // State for new project form
//   // const [newTitle, setNewTitle] = useState("");
//   // const [newDescription, setNewDescription] = useState("");
//   const [addProject, setAddProject] = useState({ title: '', description: '', clone_id: -1, project_type: '' })
//   const handleChange = (field: keyof AddProject) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     setAddProject({ ...addProject, [field]: e.target.value });

//     // Reset title error when user starts typing
//     if (field === 'title') {
//       setTitleError('');
//     }
//     if (field === 'description') {
//       setDescriptionError('');
//     }
//   };
//   const { currentParameterId: activeParameter, parameters } =
//     useAppSelector(selectParam);
//   const currentParameterRef = useRef<IParameter>();
//   useEffect(() => {
//     const pp = parameters?.find(
//       (p) => p?.id == activeParameter
//     ) as IParameter;
//     currentParameterRef.current = pp;
//     setSelectedProject(pp);
//   }, [parameters, activeParameter]);
//   // Function to handle adding a new project
//   const handleSaveNewProject = useCallback(() => {
//     if (!addProject.title) {
//       setTitleError('Title is required.');
//       return;
//     }
//     if (addProject.title.length > 150) {
//       setTitleError("Title length should be less than 150 characters!");
//       return;
//     }
//     if (addProject.description.length > 1000) {
//       setDescriptionError(
//         "Description length should be less than 1000 characters!"
//       );
//       return;
//     }
//     // const newProject = {
//     //   title: addProject.title,
//     //   description: addProject.description,
//     //   isActive: false,
//     // };
//     // setProjects([...projects, newProject]);
//     dispatch(projectCreateAsync(addProject))
//       .unwrap()
//       .then(() => {
//         setIsModalOpen(false);
//       })
//       .catch(() => {
//       });
//     setTitleError('');
//     setDescriptionError('');
//     setAddProject({ title: '', description: '', clone_id: -1, project_type: '' })
//     setIsModalOpen(false);

//   }, [addProject]);
//   const handleDeleteParameter = useCallback(() => {
//     if (selectedProject) {
//       dispatch(projectDeleteAsync({ id: selectedProject.id as number })).then(() => {
//         toast.success("Parameter deleted successfully!");
//       });
//     }
//   }, [selectedProject]);
//   const onActiveProject = useCallback(() => {
//     dispatch(
//       paramSettingUpdateAsync({
//         parameter_id: selectedProject.id as number,
//       })
//     )
//       .unwrap()
//       .then(() => {
//         // handleCloseModal();
//       })
//       .catch((e) => {
//         toast.error(e);
//       });
//   }, [selectedProject]);
//   const onUpdateParameter = useCallback(() => {
//     if (selectedProject.title == "") {
//       return;
//     }
//     //TODO title length check, description check, duplicate check.

//     dispatch(projectInfoUpdateAsync(selectedProject))
//       .unwrap()
//       .then(() => {
//       })
//       .catch((e) => {
//         console.log(e?.error)
//       });
//   }, [selectedProject]);
//   // Function to handle selecting a project
//   // const handleSelectProject = (project: any) => {
//   //   setSelectedProject(project);
//   // };
//   const hasChange = useMemo(() => {
//     return (
//       (selectedProject?.title != "" &&
//         currentParameterRef.current?.title !=
//         selectedProject?.title) ||
//       currentParameterRef.current?.description !=
//       selectedProject?.description
//     );
//   }, [selectedProject]);

//   const sortedProjects = useMemo(() => {
//     return [...parameters].sort((a, b) => a.title.localeCompare(b.title));
//   }, [parameters]);


//   return (
//     <div className="flex h-screen  max-w-full">
//       {/* Sidebar */}
//       <div className="w-1/5 bg-gray-100 px-4 py-16">
//         <h2 className="text-3xl mb-16 font-jakarta">Settings</h2>
//         <button
//           className="w-full mb-6 py-2 px-4 bg-[#1C2536] text-white rounded-md"
//           onClick={() => setIsModalOpen(true)}
//         >
//           + Create New Project
//         </button>
//         <h3 className="mb-4 mt-4 text-gray-600">MY PROJECTS</h3>
//         <ul className="space-y-2 mb-8">
//           {sortedProjects?.map((project: any, index: any) => (
//             <li
//               key={index}
//               className={`p-3 rounded-md cursor-pointer transition-all duration-300 ease-in-out
//         ${selectedProject?.title === project.title ?
//                   'bg-blue-50 border border-blue-300 shadow-lg text-blue-700 font-bold text-lg tracking-wide uppercase' :
//                   'bg-yellow-50 border border-yellow-300 text-gray-800 font-semibold text-lg tracking-wide hover:bg-yellow-100 hover:shadow-md'
//                 }`}
//               onClick={() => {
//                 setSelectedProject(project)
//               }}
//             >
//               {project?.title}
//             </li>
//           ))}
//         </ul>
//       </div>
//       {/* Main Content */}
//       <div className="w-3/4 px-8 py-16">
//         {selectedProject ? (
//           <div className="bg-white rounded-lg shadow-md p-6">
//             <img
//               src={bessJPG}
//               alt="Project"
//               className="w-full h-64 2xl:h-[30rem] object-cover rounded-md mb-4"
//             />

//             {/* Toggle and Title */}
//             <div className="flex justify-between items-center mb-6">
//               <button className="inline-flex rounded-full bg-blue-300 py-1 px-3 text-sm font-medium text-white hover:bg-opacity-90">
//                 Project
//               </button>
//               <div className="flex items-center">
//                 <span className="mr-2" onClick={onActiveProject}>Set Active</span>

//                 <InputSwitch checked={checked} onChange={(e) => setChecked(e.value)} />
//               </div>
//             </div>

//             {/* Form Section */}
//             <div className="space-y-6">
//               {/* Project Title */}
//               <div>
//                 <label className="block text-gray-700 mb-2">
//                   Project Title *
//                 </label>
//                 <input
//                   type="text"
//                   value={selectedProject.title}
//                   onChange={(e) =>
//                     setSelectedProject({
//                       ...selectedProject,
//                       title: e.target.value,
//                     })
//                   }
//                   className="w-full border-gray-300 rounded-md p-3"
//                 />
//               </div>

//               {/* Project Description */}
//               <div>
//                 <label className="block text-gray-700 mb-2">
//                   Project Description
//                 </label>
//                 <textarea
//                   value={selectedProject.description}
//                   onChange={(e) =>
//                     setSelectedProject({
//                       ...selectedProject,
//                       description: e.target.value,
//                     })
//                   }
//                   className="w-full border-gray-300 rounded-md p-3"
//                 ></textarea>
//               </div>
//             </div>

//             {/* Action Buttons */}
//             <div className="flex justify-end space-x-4 mt-6">
//               {/* <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
//                 Delete Project
//               </button> */}
//               <DeleteModal
//                 title={"Parameter deletion confirmation"}
//                 content={"Are you sure to delete this parameter?"}
//                 onClickOk={handleDeleteParameter}
//               ></DeleteModal>
//               <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
//                 disabled={!hasChange}
//                 autoFocus
//                 onClick={onUpdateParameter}>
//                 Save Setting
//               </button>
//               <button className="px-4 py-2 bg-gray-200 text-black rounded-md hover:bg-gray-300">
//                 Cancel
//               </button>
//             </div>
//           </div>
//         ) : (
//           <p>Select a project to view details.</p>
//         )}
//       </div>

//       {/* Modal for Creating New Project */}
//       {isModalOpen && (
//         <div className="fixed inset-0 flex items-center justify-center z-50">
//           {/* Background overlay */}
//           <div className="fixed inset-0 bg-black opacity-50"></div>

//           {/* Modal content */}
//           <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative z-10">
//             <div className="flex justify-between items-center mb-4 rounded-3xl">
//               <button
//                 onClick={() => setIsModalOpen(false)}
//                 className="text-gray-600 hover:text-gray-800"
//               >
//                 Create Project
//               </button>
//             </div>

//             {/* Form for New Project */}
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-gray-700 mb-1">Title*:</label>
//                 <input
//                   type="text"
//                   value={addProject.title}
//                   onChange={handleChange('title')}
//                   className="w-full border-gray-300 rounded-md p-2"
//                   placeholder="Enter project title"
//                 />
//                 {titleError && <p className="text-red-500 text-sm mt-1">{titleError}</p>}
//               </div>

//               <div>
//                 <label className="block text-gray-700 mb-1">Project Description:</label>
//                 <textarea
//                   value={addProject.description}
//                   onChange={handleChange('description')}
//                   className="w-full border-gray-300 rounded-md p-2"
//                   placeholder="Enter project description"
//                 ></textarea>
//                 {descriptionError && <p className="text-red-500 text-sm mt-1">{descriptionError}</p>}
//               </div>

//               <div className="flex justify-end space-x-4 mt-4">
//                 <button
//                   onClick={() => {
//                     setIsModalOpen(false);
//                     setAddProject({ title: "", description: "", clone_id: -1, project_type: '' });
//                     setTitleError('');
//                     setDescriptionError('');
//                   }}
//                   className="px-4 py-2 bg-gray-200 text-black rounded-md hover:bg-gray-300"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleSaveNewProject}
//                   className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
//                 >
//                   Save
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//     </div>
//   );
// };

// export default ModelInputSetting;
