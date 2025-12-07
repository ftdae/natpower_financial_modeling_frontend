import { useState } from "react";
import Modal from "../Modals";
import ProjectInfo from "./ProjectInfo";

const ProjectCountCard = ({ defaultModels }) => {
  const [viewProjects, setViewProjects] = useState(false);
  const [selectedModel, setSelectedModel] = useState('');

  return (
    <div className="flex flex-wrap xl:flex-nowrap justify-start gap-5">
      {viewProjects && (
        <Modal isOpen={viewProjects} onClose={() => setViewProjects(false)}>
          <ProjectInfo selectedModel={selectedModel} />
        </Modal>
      )}
      {defaultModels.map((model, index) => (
        <div key={index} className="bg-white rounded-t-lg shadow-md xl:max-w-sm w-full xl:w-1/3 h-full flex flex-col pb-3 space-y-3 flex-grow">
          <img
            src={model.image}
            alt={model.title}
            className="w-full h-60 rounded-t-lg object-cover mb-4"
          />

          <div className="mx-5">
            <h3 className="text-xl font-semibold mb-7 flex items-center">
              <img src={model.icon} className="h-5 w-5 mr-2" />
              {model.title} {`( ${model.count} )`}
            </h3>

            <button
              className={`w-full py-2 text-white rounded-md mt-auto ${model.disabled || model.count === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-black hover:bg-gray-800"
                }`}
              onClick={() => {
                setViewProjects(true);
                setSelectedModel(model.modelID)
              }}
              disabled={model.disabled || model.count === 0}
            >
              View projects
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectCountCard;
