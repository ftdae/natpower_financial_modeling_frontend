

const ProjectList = ({
  projects,
  selectedProject,
  setSelectedProject,
  setCurrentProject,
}) => {
  return (
    <div>
      <ul className="space-y-2 mb-8 w-full">
        {projects?.map((project: any, index: any) => (
          <li
            key={index}
            className={`p-3 flex gap-2 items-center rounded-md cursor-pointer transition-all duration-300 ease-in-out text-[15px]
        ${
          selectedProject?.title === project?.title
            ? " bg-gray-200 shadow-lg text-gray-700 font-bold  tracking-wide uppercase"
            : "  text-gray-500 font-semibold  tracking-wide hover:bg-gray-100 hover:shadow-md"
        }`}
            onClick={() => {
              setSelectedProject(project);
              setCurrentProject(project);
            }}
          >
            {selectedProject?.title === project?.title ? (
              <img src="./Plant.svg" className="w-6 h-6" />
            ) : (
              <img src="./Plant-fade.svg" className="w-6 h-6" />
            )}
            {project?.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectList;
