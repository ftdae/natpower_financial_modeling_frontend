const GROUP_DATA = [
  { id: "live", label: "Live" },
  { id: "aggregated", label: "Aggregated" },
];

const StatementTypeSelector = ({
  live,
  size,
  setLive,
}: {
  live: string;
  size?: string;
  setLive: (live: string) => void;
}) => {
  return (
    <div className="flex w-max border-[2px] border-[#1C2536] rounded-md overflow-hidden ">
      {GROUP_DATA.map((g, index) => (
        <button
          key={g.id}
          className={`flex grow text-center items-center py-[10px]  font-bold transition-colors duration-200 ease-in  ${live === g.id
            ? "bg-[#1C2536] text-white"
            : "bg-white text-gray-700 hover:bg-gray-100"
            } ${index !== GROUP_DATA.length - 1
              ? "border-r-[2px] border-[#1C2536]"
              : ""
            } ${size === "sm" ? "text-[13px] px-[12px] h-[50px]" : "px-[26px]"}`}
          onClick={() => setLive(g.id)}
        >
          {g.label}
        </button>
      ))}
    </div>
  );
};

export default StatementTypeSelector;
