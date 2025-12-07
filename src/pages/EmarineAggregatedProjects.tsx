import projectValuationSVG from "../assets/ProjValue.svg";
import { useAppSelector } from "../hooks/hooks";
import { selectParam } from "../store/slices/parameterSlice";

interface OperationInfoTableProps {
  dashboardStyle?: boolean;
}
const EmarineProjectsAggregationStatusTable = ({
  dashboardStyle = true,
}: OperationInfoTableProps) => {
  const { emarineCalculationResults } =
    useAppSelector(selectParam);
  const aggregationStatusResults = emarineCalculationResults?.emarine_aggregation_switches

  // const rows = aggregationStatusResults.length;
  // let value: any[] = new Array(rows).fill("-");

  return (
    <div className={`my-6 ${!dashboardStyle ? "mx-auto" : ""} `}>
      <h1 className="text-[2rem] mx-6 font-bold flex items-baseline gap-2">
        <img
          src={projectValuationSVG}
          className="h-[2rem]"
          style={{ filter: "contrast(0) brightness(0)" }}
        />
        Emarine Projects Aggregation Status
      </h1>
      <div className={`overflow-x-auto mt-8 text-gray-600 shadow-lg border border-gray-300 ${!dashboardStyle ? "w-[40vw]" : ""}`}>
        <table className="min-w-full border-collapse border border-gray-300 bg-white">
          <thead>
            <tr>
              <th className="border border-gray-300 text-left px-4 py-2 bg-gray-100 sticky left-0 w-auto">
                Project Name
              </th>
              <th className="border border-gray-300 text-center px-4 py-2 bg-gray-100 sticky left-0 w-auto">
                Aggregation Status
              </th>
              {/* <th className="border border-gray-300 text-center px-4 py-2 bg-gray-100">
                Value
              </th> */}
            </tr>
          </thead>
          <tbody>
            {aggregationStatusResults?.map((item, index) => (
              <tr key={index}>
                <td className="border border-gray-300 text-left px-4 py-2">
                  {item?.project_name}
                </td>
                <td className="border border-gray-300 text-center px-4 py-2">
                  {item?.aggregation_switch_value == 0 ? "Not Included" : 'Included'}
                </td>
                {/* {Array.isArray(value[index]) ? (
                  <td
                    colSpan={3}
                    className="border border-gray-300 text-center px-4 py-2"
                  >
                    <table className="w-full">
                      <tbody>
                        {value[index].map((assumption, subIndex) => (
                          <tr key={subIndex}>
                            <td className="text-center py-2">{assumption}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </td>
                ) : (
                  <td className="border border-gray-300 text-center px-4 py-2">
                    {value[index]}
                  </td>
                )} */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default EmarineProjectsAggregationStatusTable;
