import { InputSwitch } from "primereact/inputswitch";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { FaPlus } from "react-icons/fa6";
import { FiShare2 } from "react-icons/fi";
import {
  projectCreateAsync,
  paramSettingUpdateAsync,
  selectParam,
} from "../store/slices/parameterSlice";
import { IParameter } from "../utils/types";
import ProjectCountCard from "../components/ProjectCards/ProjectCountCard";
import ProjectList from "../components/ProjectCards/ProjectList";
interface AddProject {
  clone_id: number;
  title: string;
  description: string;
}
const ModelInputSetting = () => {
  const dispatch = useAppDispatch();
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [currentProject, setCurrentProject] = useState<any>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [titleError, setTitleError] = useState<string>("");
  const [descriptionError, setDescriptionError] = useState<string>("");

  const [addProject, setAddProject] = useState({
    title: "",
    description: "",
    clone_id: -1,
    project_type: ''
  });
  const modelOptions = ["BESS", "eMarine"];
  const modelIds = {
    BESS: "bess",
    eMarine: "emarine",
  };
  const [selectedModelOption, setSelectedModelOption] = useState<any>("BESS");
  const [selectedModel, setSelectedModel] = useState(null);

  const handleChange =
    (field: keyof AddProject) =>
      (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setAddProject({ ...addProject, [field]: e.target.value });

        // Reset title error when user starts typing
        if (field === "title") {
          setTitleError("");
        }
        if (field === "description") {
          setDescriptionError("");
        }
      };
  const { currentParameterId: activeParameter, parameters } =
    useAppSelector(selectParam);
  const currentParameterRef = useRef<IParameter>();
  useEffect(() => {
    const pp = parameters?.find((p) => p?.id == activeParameter) as IParameter;
    currentParameterRef.current = pp;

    setSelectedProject(pp);
    setCurrentProject(pp);
  }, [parameters, activeParameter]);
  // Function to handle adding a new project
  const handleSaveNewProject = useCallback(() => {
    if (!addProject.title) {
      setTitleError("Title is required.");
      return;
    }
    if (addProject.title.length > 150) {
      setTitleError("Title length should be less than 150 characters!");
      return;
    }
    if (addProject.description.length > 1000) {
      setDescriptionError(
        "Description length should be less than 1000 characters!"
      );
      return;
    }
    if (addProject.project_type == '') {
      setDescriptionError(
        "Project type should be specified!"
      );
      return;
    }
    // const newProject = {
    //   title: addProject.title,
    //   description: addProject.description,
    //   isActive: false,
    // };
    // setProjects([...projects, newProject]);
    dispatch(projectCreateAsync(addProject))
      .unwrap()
      .then(() => {
        setIsModalOpen(false);
        setTitleError("");
        setDescriptionError("");
        setAddProject({ title: "", description: "", clone_id: -1, project_type: '' });
        setSelectedModelOption('')
      })
      .catch((error) => { });
    // setTitleError("");
    // setDescriptionError("");
    // setAddProject({ title: "", description: "", clone_id: -1 });
    // setIsModalOpen(false);
  }, [addProject]);

  const activeProject = parameters.find(
    (project) => project.id === activeParameter
  );

  const defaultModels = [
    {
      title: "BESS Model",
      image: "../../src/assets/BESS.jpg",
      icon: "./renew.svg",
      count: parameters.filter(parameter => parameter.model_type === 'bess').length,
      disabled: false,
      modelID: 'bess'
    },
    {
      title: "Wind Model",
      image: "../../src/assets/Wind-turbine.jpeg",
      icon: "./wind.svg",
      count: 0,
      disabled: true,
      modelID: 'wind'

    },
    {
      title: "Solar Model",
      image: "../../public/Solar.jpg",
      icon: "./solar.svg",
      count: 0,
      disabled: true,
      modelID: 'solar'
    },
    {
      title: "eMarine Model",
      image: "../../public/Solar.jpg",
      icon: "./solar.svg",
      count: parameters.filter(parameter => parameter.model_type === 'emarine').length,
      disabled: false,
      modelID: 'emarine'
    },

  ];

  const onActiveProject = useCallback(
    (project) => {
      dispatch(
        paramSettingUpdateAsync({
          parameter_id: project.id as number,
        })
      )
        .unwrap()
        .then(() => {
          // handleCloseModal();
        })
        .catch((e) => {
          toast.error(e);
        });
    },
    [selectedProject]
  );

  const handleActiveProject = (project) => {
    setSelectedProject(project);
    onActiveProject(project);
  };

  return (
    <div className="flex h-full  max-w-full">
      {/* Sidebar */}
      <div className="w-1/5 h-full  border-gray-200 border-[2px] overflow-scroll px-4 py-10">
        <h2 className="text-3xl mb-10 font-jakarta">My Projects</h2>
        <button
          className="w-full mb-6 flex justify-center items-center gap-2 py-3 px-4 bg-[#1C2536] text-white rounded-lg "
          onClick={() => setIsModalOpen(true)}
        >
          <FaPlus /> Create New Project
        </button>
        <h3 className="mb-4 mt-4 text-gray-500">Active Projects </h3>
        {parameters.length > 0 ? (
          <ProjectList
            projects={[activeProject]}
            selectedProject={selectedProject}
            setSelectedProject={() => null}
            setCurrentProject={() => null}
          />
        ) : (
          <p>No Activated Project</p>
        )}
      </div>

      {/* Main Cotent */}
      <div className="w-3/4 px-8 py-16 h-full mb-10">
        <div className="flex justify-between flex-wrap items-center">
          <div className="text-3xl mb-6 flex items-center gap-3">
            <img src="./Plant.svg" className="h-9 w-9" alt="Tick" />
            <span className="font-jakarta">Green Synergy Power</span>
          </div>
          <div className="flex items-center  gap-3">
            <button
              disabled
              className="cursor-not-allowed mb-6 py-3 px-4 border-[1px] border-[#1C2536] text-[#1C2536] rounded-lg flex justify-center items-center gap-2"
              onClick={() => setIsModalOpen(true)}
            >
              <FiShare2 color="#1C2536" size={20} /> Share Project
            </button>
            <button
              disabled
              className="cursor-not-allowed mb-6 py-3 px-4 bg-[#1C2536] text-white rounded-lg flex justify-center items-center gap-2"
              onClick={() => setIsModalOpen(true)}
            >
              <FaPlus /> Add Modal
            </button>
          </div>
        </div>
        <p className="text-gray-500">
          The Green Synergy Power plan is a forward-thinking initiative designed
          to harness the strengths of wind, solar, and Battery Energy Storage
          Systems (BESS) to deliver a seamless, sustainable energy solution.
          This integrated approach aims to maximize energy production while
          minimizing environmental impact, creating a resilient power supply
          that adapts to changing weather conditions and demand patterns.
        </p>
        <hr className="my-5 border-gray-300" />
        <ProjectCountCard defaultModels={defaultModels} />
      </div>

      {/* Modal for Creating New Project */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black opacity-50"></div>

          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative z-10">
            <div className="flex justify-between items-center mb-4 rounded-3xl">
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-600 hover:text-gray-800"
              >
                Create Project
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-1">Title*:</label>
                <input
                  type="text"
                  value={addProject.title}
                  onChange={handleChange("title")}
                  className="w-full border-gray-300 rounded-md p-2"
                  placeholder="Enter project title"
                />
                {titleError && (
                  <p className="text-red-500 text-sm mt-1">{titleError}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 mb-1">
                  Project Description:
                </label>
                <textarea
                  value={addProject.description}
                  onChange={handleChange("description")}
                  className="w-full border-gray-300 rounded-md p-2"
                  placeholder="Enter project description"
                ></textarea>
                {descriptionError && (
                  <p className="text-red-500 text-sm mt-1">
                    {descriptionError}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Project Type:</label>
                <div className="flex items-center space-x-2">
                  <select
                    value={selectedModelOption}
                    onChange={(e) => {
                      setSelectedModelOption(e.target.value);
                      setAddProject({
                        ...addProject,
                        project_type: modelIds[e.target.value],
                      });
                      setSelectedModel(
                        e.target.value === "BESS"
                          ? { modelID: "bess" }
                          : { modelID: "emarine" }
                      );
                    }}
                    className="w-full border border-gray-300 rounded-md p-3"
                  >
                    {modelOptions.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex justify-end space-x-4 mt-4">
                <button
                  onClick={() => {
                    setIsModalOpen(false);
                    setAddProject({ title: "", description: "", clone_id: -1, project_type: '' });
                    setTitleError("");
                    setDescriptionError("");
                  }}
                  className="px-4 py-2 bg-gray-200 text-black rounded-md hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveNewProject}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModelInputSetting;
