import { InputSwitch } from "primereact/inputswitch";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { toast } from "react-toastify";
import bessJPG from "../../assets/BESS.jpg";
import DeleteModal from "../DeleteModal";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";

import {
  projectCreateAsync,
  projectDeleteAsync,
  paramSettingUpdateAsync,
  projectInfoUpdateAsync,
  selectParam,
} from "../../store/slices/parameterSlice";
import { IParameter } from "../../utils/types";
import ProjectList from "./ProjectList";

interface AddProject {
  clone_id: number;
  title: string;
  description: string;
}
const ProjectInfo = ({ selectedModel }) => {
  const dispatch = useAppDispatch();
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [currentProject, setCurrentProject] = useState<any>(null);

  const { currentParameterId: activeParameter, parameters } =
    useAppSelector(selectParam);
  const currentParameterRef = useRef<IParameter>();
  useEffect(() => {
    const pp = parameters?.find((p) => p?.id == activeParameter) as IParameter;
    currentParameterRef.current = pp;

    setSelectedProject(pp);
    setCurrentProject(pp);
  }, [parameters, activeParameter]);

  const handleDeleteParameter = useCallback(() => {
    if (selectedProject) {
      dispatch(projectDeleteAsync({ id: selectedProject.id as number })).then(
        () => null
      );
    }
  }, [selectedProject]);

  const onActiveProject = useCallback(() => {
    dispatch(
      paramSettingUpdateAsync({
        parameter_id: selectedProject.id as number,
      })
    )
      .unwrap()
      .then(() => {
        // handleCloseModal();
      })
      .catch((e) => {
        toast.error(e);
      });
  }, [selectedProject]);

  const onUpdateParameter = useCallback(() => {
    if (selectedProject.title == "") {
      toast.error("Project title must be filled!");
      return;
    }
    if (selectedProject.title.length > 150) {
      toast.error("Title length should be less than 150 characters!");
      return;
    }
    if (selectedProject.description.length > 1000) {
      toast.error("Description length should be less than 1000 characters!");
      return;
    }

    dispatch(projectInfoUpdateAsync(selectedProject))
      .unwrap()
      .then(() => { })
      .catch(() => { });
  }, [selectedProject]);

  return (
    <div className="flex h-[80vh]">
      <div className="w-1/3">
        <ProjectList
          projects={parameters.filter((parameter) => parameter.model_type === selectedModel)}
          selectedProject={selectedProject}
          setSelectedProject={setSelectedProject}
          setCurrentProject={setCurrentProject}
        />
      </div>
      {/* Main Content */}
      <div className="w-3/4 flex-grow overflow-scroll">
        {selectedProject ? (
          <div className="bg-white rounded-lg shadow-md p-6">
            <img
              src={bessJPG}
              alt="Project"
              className="w-full  object-cover rounded-md mb-4"
            />

            {/* Toggle and Title */}
            <div className="flex justify-between items-center mb-6">
              <button className="inline-flex rounded-full bg-blue-300 py-1 px-3 text-sm font-medium text-white hover:bg-opacity-90">
                Project
              </button>
              <div className="flex items-center">
                <span className="mr-2" onClick={onActiveProject}>
                  Set Active
                </span>

                <InputSwitch
                  checked={selectedProject?.id == activeParameter}
                  onChange={() => {
                    onActiveProject();
                  }}
                />
              </div>
            </div>

            {/* Form Section */}
            <div className="space-y-6">
              {/* Project Title */}
              <div>
                <label className="block text-gray-700 mb-2">
                  Project Title *
                </label>
                <input
                  type="text"
                  value={selectedProject.title}
                  onChange={(e) =>
                    setSelectedProject({
                      ...selectedProject,
                      title: e.target.value,
                    })
                  }
                  className="w-full border-gray-300 rounded-md p-3"
                />
              </div>

              {/* Project Description */}
              <div>
                <label className="block text-gray-700 mb-2">
                  Project Description
                </label>
                <textarea
                  value={selectedProject.description}
                  onChange={(e) =>
                    setSelectedProject({
                      ...selectedProject,
                      description: e.target.value,
                    })
                  }
                  className="w-full border-gray-300 rounded-md p-3"
                ></textarea>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4 mt-6">
              <DeleteModal
                title={"Project deletion confirmation"}
                content={"Are you sure to delete this project?"}
                onClickOk={handleDeleteParameter}
              ></DeleteModal>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                // disabled={!hasChange}
                autoFocus
                onClick={onUpdateParameter}
              >
                Save Setting
              </button>
              <button
                className="px-4 py-2 bg-gray-200 text-black rounded-md hover:bg-gray-300"
                onClick={() => {
                  setSelectedProject({
                    ...selectedProject,
                    title: currentProject.title,
                    description: currentProject.description,
                  });
                }}
              >
                Reset
              </button>
            </div>
          </div>
        ) : (
          <p>Select a project to view details.</p>
        )}
      </div>
    </div>
  );
};

export default ProjectInfo;
