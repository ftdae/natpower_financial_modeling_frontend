const GROUP_DATA = [
  { id: 'quarterly', label: 'Quarterly' },
  { id: 'semi_annually', label: 'Semi annually' },
  { id: 'annualy', label: 'Annualy' }
];

const TypeSelector = ({
  active,
  setActive
}: {
  active: string;
  setActive: (active: string) => void;
}) => {
  return (
    <div className="flex space-x-2">
      {GROUP_DATA.map((g) => {
        return (
          <button
            key={g.id}
            className={`px-4 py-2 border rounded-lg transition duration-200 ease-in-out 
              ${active === g.id ? 'bg-blue-500 text-white' : 'bg-transparent text-gray-700 border-gray-300 hover:bg-gray-100'}`}
            onClick={() => {
              setActive(g.id);
            }}
          >
            {g.label}
          </button>
        );
      })}
    </div>
  );
};

export default TypeSelector;
