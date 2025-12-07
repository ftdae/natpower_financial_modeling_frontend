const GROUP_DATA = [
  { id: "quarterly", label: "Quarterly" },
  { id: "semi_annually", label: "Semi Annually" },
  { id: "annualy", label: "Annualy" },
];

const GroupedTypeSelector = ({
  active,
  size,
  setActive,
}: {
  active: string;
  size?: string;
  setActive: (active: string) => void;
}) => {
  return (
    <div className="flex w-max border-[2px] border-[#1C2536] rounded-md overflow-hidden ">
      {GROUP_DATA.map((g, index) => (
        <button
          key={g.id}
          className={`flex grow text-center items-center py-[10px]  font-bold transition-colors duration-200 ease-in  ${
            active === g.id
              ? "bg-[#1C2536] text-white"
              : "bg-white text-gray-700 hover:bg-gray-100"
          } ${
            index !== GROUP_DATA.length - 1
              ? "border-r-[2px] border-[#1C2536]"
              : ""
          } ${size === "sm" ? "text-[13px] px-[12px] h-[50px]" : "px-[26px]"}`}
          onClick={() => setActive(g.id)}
        >
          {g.label}
        </button>
      ))}
    </div>
  );
};

export default GroupedTypeSelector;
