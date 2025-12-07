
const GROUP_DATA = [
  { id: "quarterly", label: "Quarterly" },
  // { id: "semi_annually", label: "Semi Annually" },
  { id: "annualy", label: "Annualy" },
];

const GroupedTypeSelectorForGraph = ({
  active,
  setActive,
  size
}: {
  active: string;
  setActive: (active: string) => void;
  size?: string
}) => {
  return (
    <div className={` flex border-[2px] border-[#1C2536] rounded-md overflow-hidden ${size === "sm" ? "w-max" : "min-w-[420px]"} `}>
      {GROUP_DATA.map((g, index) => (
        <button
          key={g.id}
          className={`grow flex text-center items-center py-[10px]  font-bold transition-colors duration-200 ease-in ${size === "sm" ? "px-[12px] text-[13px]" : "px-[26px]"} ${
            active === g.id
              ? "bg-[#1C2536] text-white"
              : "bg-white text-gray-700 hover:bg-gray-100"
          } ${index !== GROUP_DATA.length - 1 ? "border-r-[2px] border-[#1C2536]" : ""}`}
          onClick={() => setActive(g.id)}
        >
          {g.label}
        </button>
      ))}
    </div>
  );
};

export default GroupedTypeSelectorForGraph;
