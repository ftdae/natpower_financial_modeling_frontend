import { useState } from "react";

const BasicProjectInput = () => {
  const [formData, setFormData] = useState({
    technology: "BESS",
    region: "Eastern",
    gridConnectionCapacity: "",
    landSize: "",
    gridConnectionDate: "",
    developmentStartDate: "",
    gridSecuredDate: "",
    landSecuredDate: "",
    investorClosingDate: "",
    closingDebtDate: "",
    planningPermissionTime: "",
    rbTime: "",
    constructionLength: "",
    operationsLength: "",
    decommissioningLength: "",
  });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form Data:", formData);
  };

  return (
    <>
      <h2 className="text-3xl font-jakarta mb-8 mt-20 ml-10">Basic Project Inputs</h2>
      <div className=" 2xl:mt-52">
        <div className="p-8 max-w-6xl mx-auto bg-white rounded-lg shadow-md">
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {/* Left Column */}
            <div className="space-y-4">
              {/* Technology */}
              <div>
                <label className="block text-gray-700 mb-1">Technology</label>
                <select
                  name="technology"
                  value={formData.technology}
                  onChange={handleChange}
                  className="w-full border-gray-300 rounded-md p-2 border"
                >
                  <option value="BESS">BESS</option>
                  <option value="Wind">Wind</option>
                  <option value="Solar">Solar</option>
                </select>
              </div>

              {/* Grid Connection Capacity */}
              <div>
                <label className="block text-gray-700 mb-1">
                  Grid connection capacity *
                </label>
                <div className="flex items-center">
                  <input
                    type="text"
                    name="gridConnectionCapacity"
                    value={formData.gridConnectionCapacity}
                    onChange={handleChange}
                    className="w-full border-gray-300 rounded-md p-2 border"
                  />
                  <span className="ml-2">MW</span>
                </div>
              </div>

              {/* Grid Connection Date */}
              <div>
                <label className="block text-gray-700 mb-1">
                  Grid connection date *
                </label>
                <input
                  type="date"
                  name="gridConnectionDate"
                  value={formData.gridConnectionDate}
                  onChange={handleChange}
                  className="w-full border-gray-300 rounded-md p-2 border"
                />
              </div>

              {/* Development Start Date */}
              <div>
                <label className="block text-gray-700 mb-1">
                  Development start date *
                </label>
                <input
                  type="date"
                  name="developmentStartDate"
                  value={formData.developmentStartDate}
                  onChange={handleChange}
                  className="w-full border-gray-300 rounded-md p-2 border"
                />
              </div>

              {/* Grid Secured Date */}
              <div>
                <label className="block text-gray-700 mb-1">
                  Grid secured date (offer accepted) *
                </label>
                <input
                  type="date"
                  name="gridSecuredDate"
                  value={formData.gridSecuredDate}
                  onChange={handleChange}
                  className="w-full border-gray-300 rounded-md p-2 border"
                />
              </div>

              {/* Land Secured Date */}
              <div>
                <label className="block text-gray-700 mb-1">
                  Land secured date *
                </label>
                <input
                  type="date"
                  name="landSecuredDate"
                  value={formData.landSecuredDate}
                  onChange={handleChange}
                  className="w-full border-gray-300 rounded-md p-2 border"
                />
              </div>

              {/* Investor Closing Date */}
              <div>
                <label className="block text-gray-700 mb-1">
                  Investor closing date *
                </label>
                <input
                  type="date"
                  name="investorClosingDate"
                  value={formData.investorClosingDate}
                  onChange={handleChange}
                  className="w-full border-gray-300 rounded-md p-2 border"
                />
              </div>

              {/* Closing of Debt Agreement Date */}
              <div>
                <label className="block text-gray-700 mb-1">
                  Closing of debt agreement date *
                </label>
                <input
                  type="date"
                  name="closingDebtDate"
                  value={formData.closingDebtDate}
                  onChange={handleChange}
                  className="w-full border-gray-300 rounded-md p-2 border"
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              {/* Region */}
              <div>
                <label className="block text-gray-700 mb-1">Region</label>
                <select
                  name="region"
                  value={formData.region}
                  onChange={handleChange}
                  className="w-full border-gray-300 rounded-md p-2 border"
                >
                  <option value="Eastern">Eastern</option>
                  <option value="Western">Western</option>
                  <option value="Northern">Northern</option>
                  <option value="Southern">Southern</option>
                </select>
              </div>

              {/* Land Size */}
              <div>
                <label className="block text-gray-700 mb-1">Land size *</label>
                <div className="flex items-center">
                  <input
                    type="text"
                    name="landSize"
                    value={formData.landSize}
                    onChange={handleChange}
                    className="w-full border-gray-300 rounded-md p-2 border"
                  />
                  <span className="ml-2">Acres</span>
                </div>
              </div>

              {/* Time Between Development Start and Planning Permission Granted */}
              <div>
                <label className="block text-gray-700 mb-1">
                  Time between development start date and planning permission
                  granted *
                </label>
                <input
                  type="text"
                  name="planningPermissionTime"
                  value={formData.planningPermissionTime}
                  onChange={handleChange}
                  className="w-full border-gray-300 rounded-md p-2 border"
                />
              </div>

              {/* Time Between Planning Permission Granted and RB */}
              <div>
                <label className="block text-gray-700 mb-1">
                  Time between planning permission granted and RB *
                </label>
                <input
                  type="text"
                  name="rbTime"
                  value={formData.rbTime}
                  onChange={handleChange}
                  className="w-full border-gray-300 rounded-md p-2 border"
                />
              </div>

              {/* Length of Construction */}
              <div>
                <label className="block text-gray-700 mb-1">
                  Length of construction *
                </label>
                <input
                  type="text"
                  name="constructionLength"
                  value={formData.constructionLength}
                  onChange={handleChange}
                  className="w-full border-gray-300 rounded-md p-2 border"
                />
              </div>

              {/* Length of Operations */}
              <div>
                <label className="block text-gray-700 mb-1">
                  Length of operations *
                </label>
                <input
                  type="text"
                  name="operationsLength"
                  value={formData.operationsLength}
                  onChange={handleChange}
                  className="w-full border-gray-300 rounded-md p-2 border"
                />
              </div>

              {/* Length of Decommissioning */}
              <div>
                <label className="block text-gray-700 mb-1">
                  Length of decommissioning *
                </label>
                <input
                  type="text"
                  name="decommissioningLength"
                  value={formData.decommissioningLength}
                  onChange={handleChange}
                  className="w-full border-gray-300 rounded-md p-2 border"
                />
              </div>
            </div>

            {/* Save Button */}
            <div className="col-span-1 md:col-span-2 flex justify-center mt-6">
              <button
                type="submit"
                className="px-6 py-3 bg-black text-white rounded-2xl hover:bg-gray-800"
              >
                Save Properties
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default BasicProjectInput;
