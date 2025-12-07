
const index = ({ title, image, features, buttonText, onButtonClick, disabled }: any) => {
  return (
    <div>
      <div className="bg-white rounded-lg shadow-md p-4 max-w-sm h-full flex flex-col">
        {/* Image */}
        <img
          src={image}
          alt={title}
          className="w-full h-40 rounded-lg object-cover mb-4"
        />

        {/* Title */}
        <h3 className="text-xl font-semibold mb-2 flex items-center">
          <img src="./renew.svg" className="h-5 w-5 mr-2" />
          {title}
        </h3>

        {/* Features */}
        <ul className="text-gray-600 mb-4 space-y-3 flex-grow">
          {features.map((feature: any, index: any) => (
            <li key={index} className="flex items-center gap-3">
              <img src="./tick.svg" className="h-5 w-5" alt="Tick" />
              <p>{feature}</p>
            </li>
          ))}
        </ul>

        {/* Action Button */}
        <button
          className={`w-full py-2 text-white rounded-md mt-auto ${
            disabled
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-black hover:bg-gray-800"
          }`}
          onClick={!disabled ? onButtonClick : undefined}
          disabled={disabled}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default index;
