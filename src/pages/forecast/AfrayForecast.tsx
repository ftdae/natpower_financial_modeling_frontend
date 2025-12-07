import { useCallback, useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { Dropdown } from "primereact/dropdown";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { Dialog } from "primereact/dialog";
import {
  setAfryDropdown,
  setAfryProcessedRows,
  setAfryHeaderKeys,
} from "../../store/slices/forecastSlice";
import { useDispatch, useSelector } from "react-redux";
import { normalizeArray, normalizeArrayBySeasonality } from "../../calculation/calculates/utils";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { inputsCreateAsync, inputsUpdateAsync, selectParam } from "../../store/slices/parameterSlice";
import { CreateParamInfo, UpdateParamInfo } from "../../store/types/types";

type ApiDataItem = {
  category: string;
  arfy_year: number;
  arfy_value: number;
  year_quarter: string;
  metric: string;
};

type ProcessedData = {
  [category: string]: {
    metric: string;
    values: {
      [yearQuarter: string]: number;
    };
  };
};

const AfrayForecast = () => {
  const { afryDropdown, afryProcessedTableRows, afryHeaderKeysData } =
    useSelector((state: any) => state.app);
  const dispatch = useAppDispatch();
  const [processedData, setProcessedData] = useState<any>(
    afryProcessedTableRows ?? {}
  );
  const [headerKeys, setHeaderKeys] = useState<string[]>(
    afryHeaderKeysData ?? []
  );
  const [dialogMessage, setDialogMessage] = useState("");
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [conditions, setConditions] = useState({});
  const [isSearchDisabled, setIsSearchDisabled] = useState(true);
  const [dropdownFields, setDropdownFields] = useState<any>([]);
  const [dropdownData, setDropdownData] = useState<any>({});
  const [selectedDropdowns, setSelectedDropdowns] = useState<any>(
    afryDropdown ?? {}
  );
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Check if all dropdown values are selected
    const allSelected = Object.values(selectedDropdowns).every(
      (value) => value !== null && value !== undefined
    );
    setIsSearchDisabled(!allSelected);
  }, [selectedDropdowns, isSearchDisabled, dropdownData]);

  useEffect(() => {
    // Fetch dropdown fields from the API
    const fetchDropdownFields = async () => {
      try {
        const response = await fetch(
          "https://financialmodellingapi.azurewebsites.net/data_serve/get-afry-params"
        );
        const data = await response.json();
        if (data) {
          setDropdownFields(data);

          // Initialize dropdown data and selected values based on the fetched fields
          const initialDropdownData = data.reduce(
            (acc: any, field: any) => ({ ...acc, [field]: [] }),
            {}
          );
          const initialSelectedDropdowns = data.reduce(
            (acc: any, field: any) => ({ ...acc, [field]: null }),
            {}
          );

          // Check if the values are not stored then assigned null values
          const StoredValues = Object.values(afryDropdown).length === 0;
          if (StoredValues) {
            dispatch(setAfryDropdown(initialSelectedDropdowns));
          }

          // Check if few values are selected and not all, then reset them after route change
          if (
            Object.values(afryDropdown).filter(
              (value) => value !== null || undefined
            ).length !== Object.keys(initialSelectedDropdowns).length
          ) {
            dispatch(setAfryDropdown(initialSelectedDropdowns));
            setDropdownData(initialDropdownData);
            setSelectedDropdowns(initialSelectedDropdowns);
          }
        }
      } catch (error) {
        console.error("Error fetching dropdown fields:", error);
      }
    };

    fetchDropdownFields();
  }, []);

  const fetchDropdownData = async (targetColumn: any, conditions: any) => {
    try {
      const response = await fetch(
        "https://financialmodellingapi.azurewebsites.net/data_serve/get-afry-dynamic-params",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            target_column: targetColumn,
            conditions: conditions,
          }),
        }
      );
      const data = await response.json();
      if (data && data[targetColumn]) {
        // Filter out null values from the options
        const filteredOptions = data[targetColumn].filter(
          (item: any) => item !== null
        );

        setDropdownData((prevData: any) => ({
          ...prevData,
          [targetColumn]: filteredOptions,
        }));
      }
    } catch (error) {
      console.error("Error fetching dropdown data:", error);
    }
  };

  const handleDropdownFocus = (field: any) => {
    const currentConditions =
      Object.keys(conditions).length > 0 ? conditions : {};
    fetchDropdownData(field, currentConditions);
  };

  const handleDropdownChange = (field: any, value: any) => {
    setSelectedDropdowns((prevSelections: any) => ({
      ...prevSelections,
      [field]: value,
    }));

    dispatch(setAfryDropdown({ field, value }));

    const newConditions = { ...conditions, [field]: value };
    setConditions(newConditions);
    fetchDropdownData(field, newConditions);
  };

  useEffect(() => {
    fetchDropdownData("scenario", {});
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true)
      const requestBody = Object.entries(selectedDropdowns).reduce(
        (acc: any, [key, value]: any) => {
          if (value !== null && value !== undefined) {
            acc[key] = key === "battery_duration_hours" ? String(value) : value;
          }
          return acc;
        },
        {}
      );

      const response = await fetch(
        "https://financialmodellingapi.azurewebsites.net/data_serve/get-afry",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      const data = await response.json();

      if (data.error === "No data found") {
        setDialogMessage("No data found");
        setIsDialogVisible(true);
        // setApiData([]);
        setProcessedData({});
        dispatch(setAfryProcessedRows([]));
        setHeaderKeys([]);
        dispatch(setAfryHeaderKeys([]));
        setTimeout(() => setIsDialogVisible(false), 30000);
      } else {
        // setApiData(data);
        processData(data);
        setIsLoading(false)
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const processData = (data: ApiDataItem[]) => {
    const newData: ProcessedData = {};
    const headers = new Set<string>();

    data.forEach((item) => {
      const { category, arfy_year, arfy_value, metric } = item;
      const headerKey = `${arfy_year}`;
      headers.add(headerKey);

      if (!newData[category]) {
        newData[category] = { metric: metric, values: {} };
      }

      newData[category].values[headerKey] = arfy_value;
    });

    const sortedHeaders = Array.from(headers).sort();
    setHeaderKeys(sortedHeaders);
    dispatch(setAfryHeaderKeys(sortedHeaders));
    setProcessedData(newData);
    dispatch(setAfryProcessedRows(newData));
  };

  const exportToExcel = () => {
    const sheetData = [];
    sheetData.push(["Category", "Metric", ...headerKeys]);

    Object.keys(processedData).forEach((category) => {
      if (processedData[category]) {
        const row = [
          category,
          processedData[category].metric, // Add metric for each category
        ];

        // Add values for each year or empty if not present
        headerKeys.forEach((header) => {
          row.push(
            processedData[category].values[header] !== undefined
              ? Number(processedData[category].values[header]).toFixed(2)
              : "-"
          );
        });

        sheetData.push(row);
      }
    });

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(sheetData);

    // Force columns to be treated as numbers in Excel
    headerKeys.forEach((_, colIndex) => {
      const colLetter = XLSX.utils.encode_col(colIndex + 2); // Adjust for "Category" and "Cycle"
      for (let row = 1; row < sheetData.length; row++) {
        const cell = ws[`${colLetter}${row + 1}`];
        if (cell && typeof cell.v === "string") {
          const value = parseFloat(cell.v);
          if (!isNaN(value)) {
            cell.v = value; // Set cell value to a number
            cell.t = "n"; // Specify type as number
          }
        }
      }
    });

    // Generate a dynamic sheet name from selected dropdown options

    const generateAbbreviation = (key: string, text: string) => {
      if (key === "year_quarter") return text;

      const words = text.split(" ");
      return words.length > 1
        ? words.map((word: string) => word.charAt(0).toUpperCase()).join("") // Take first character of each word for multi-word text
        : text.slice(0, 2).toUpperCase(); // Take first two characters for single-word text
    };

    // Generate sheet name using dynamic abbreviations
    const sheetName =
      Object.entries(selectedDropdowns)
        .filter(([value]) => value) // Ensure only selected values are included
        .map(([key, value]) => generateAbbreviation(key, String(value))) // Convert to string before abbreviation
        .join("_") || "Baringa_Analysis"; // Default if no dropdowns selected
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
    XLSX.writeFile(wb, `${sheetName}.xlsx`);
  };

  const clearAllSelections = () => {
    setSelectedDropdowns({
      hour: null,
      lowlf: null,
      region: null,
      scenario: null,
      year_quarter: null,
    });
    dispatch(
      setAfryDropdown({
        hour: null,
        lowlf: null,
        region: null,
        scenario: null,
        year_quarter: null,
      })
    );
    setConditions({});
    setDropdownData({
      scenario: [],
      strategy: [],
      site_name: [],
      year_quarter: [],
      connection_level: [],
      battery_duration_hours: [],
    });
    // setApiData([]);
    setProcessedData({});
    dispatch(setAfryProcessedRows({}));
    setHeaderKeys([]);
    dispatch(setAfryHeaderKeys([]));
  };

  useEffect(() => {
    const allFieldsSelected = Object.values(afryDropdown).filter(
      (value) => value === null || undefined
    );
    if (
      allFieldsSelected.length === 0 &&
      Object.keys(selectedDropdowns).length > 0
    ) {
      fetchData();
    }
  }, [afryDropdown]);
  const categoryNames: string[] = [
    'Cycles per Day',
    'Day Ahead Sell Revenue',
    'Day Ahead Buy costs',
    'Intra-Day Sell Revenue',
    'Intra-Day Buy costs',
    'Balancing Mechanism Offer Revenues',
    'Balancing Mechanism Bid Costs',
    'Capacity Market Price',
    'Response Availability Revenue',
    'Response SoE costs',
    'Reserve Availability Revenue'
  ]

  let tableData = []
  categoryNames.map((category) => {
    const objectValue = processedData[category]?.values
    const valueArray = afryHeaderKeysData.map((header) => objectValue ? objectValue[header] : 0)
    tableData.push(
      [0, ...(normalizeArray(valueArray, 300))]
    )
  })

  // const newlyAddedData = processedData.map((regionData, index) => {
  //   const paramName = `afry_4hour_afry`;
  //   const paramIndex = `revenue@forecast_provider_data`;
  //   let numberData = []

  //   categoryNames.map((categoryValues, index) => {
  //     const categoryData = regionData[categoryValues]?.values;
  //     let numberArray = [];
  //     headerKeys.map((header, index) => numberArray.push(categoryData[header] || 0))
  //     numberData.push([0, 0, 0, 0, ...(normalizeArrayBySeasonality(numberArray, 300))])
  //   })
  //   return {
  //     [paramName]: {
  //       data: numberData,
  //       type: 'centralizedInput'
  //     }
  //   }
  // }
  // )
  // const paramNameArray = processedData.map((regionData, index) => {
  //   let region = regionData['grouping by region']['region'];
  //   if (region == "North of Scotland")
  //     region = 'Northern Scotland'
  //   if (region == "South of Scotland")
  //     region = 'Southern Scotland'
  //   if (region == "South Eastern")
  //     region = 'South East'
  //   if (region == "North Western")
  //     region = 'North West'
  //   if (region == "Merseyside & North Wales")
  //     region = 'N Wales & Mersey'
  //   const paramName = `afry_4hour_ancillaries focus_${region.toLowerCase()}`;
  //   return paramName
  // }
  // )
  const { parameterInfos, currentParameterId } = useAppSelector(selectParam);
  const getParameter = useCallback(
    (param_index: string) => {
      return parameterInfos?.find((p) => p?.param_index == param_index);
    },
    [parameterInfos]
  );
  // currentValu is db data
  const currentVal = getParameter(`revenue@forecast_provider_data`)?.value
  let addingData = { ...currentVal }
  const region: string = (selectedDropdowns?.region?.replace(/_/g, " ") || '').toLowerCase()
  const paramInputName = `afry_${(selectedDropdowns.hour)}our_${region}`
  const newlyAddedData = {
    [paramInputName]: {
      data: tableData,
      type: 'centralizedInput'
    }
  }
  // newlyAddedData.forEach(element => {
  //   const key = Object.keys(element)[0];
  //   const value = element[key]
  //   addingData[key] = value
  // });
  // const dispatch = useAppDispatch();
  const handleSave = () => {
    const payload: CreateParamInfo = {
      // id: getParameter(`revenue@forecast_provider_data`)?.id,
      parameter_id: currentParameterId as number,
      param_index: 'revenue@forecast_provider_data',
      value: { ...addingData, ...newlyAddedData },
    };
    dispatch(inputsCreateAsync(payload as UpdateParamInfo));
  };
  return (
    <>
      <div className="flex w-full">
        {/* Sidebar */}

        {/* Main Content */}
        <main className="flex-grow flex justify-center my-10 h-fit">
          <section className="grid min-w-[50vw] grid-cols-1">
            <div className="m-2 p-4 border border-gray-300 rounded-lg flex flex-col justify-between w-[60vw] min-h-[25vh]">
              {/* Dropdown Fields */}
              <div className="w-full">
                <h4 className="text-2xl font-bold">Forecast Afry</h4>
                <hr className="my-2" />

                <div>
                  {dropdownFields.map((field) => (
                    <div
                      key={field}
                      className="flex justify-between items-center py-2 max-w-[60vw]"
                    >
                      <label className="px-5 max-w-[60%] w-[60%] text-left">
                        {field
                          .replace(/_/g, " ")
                          .replace(/\b\w/g, (c) => c.toUpperCase())}
                      </label>
                      <Dropdown
                        value={afryDropdown[field] ?? selectedDropdowns[field]}
                        options={
                          afryDropdown[field]
                            ? [afryDropdown[field]]
                            : dropdownData[field] || []
                        }
                        onFocus={() => handleDropdownFocus(field)}
                        onChange={(e) => handleDropdownChange(field, e.value)}
                        placeholder={`Select ${field
                          .replace(/_/g, " ")
                          .toLowerCase()
                          .replace(/\b\w/g, (char) => char.toUpperCase())}`}
                        className="border border-gray-300 rounded-md px-2 w-full"
                        required
                      />
                    </div>
                  ))}
                </div>

                {/* Buttons */}
                <div className="my-4 flex gap-4 flex-row-reverse">
                  <button
                    onClick={exportToExcel}
                    disabled={headerKeys.length < 1}
                    className={`px-4 py-2 font-semibold text-white rounded-lg ${headerKeys.length > 0
                      ? "bg-main hover:bg-gray-700"
                      : "bg-gray-300 cursor-not-allowed"
                      }`}
                  >
                    Export to Excel
                  </button>
                  <button
                    onClick={clearAllSelections}
                    disabled={
                      Object.values(afryDropdown).filter(
                        (val) => val !== null || undefined
                      ).length === 0
                    }
                    className={`px-4 py-2 font-semibold text-white rounded-lg ${Object.values(afryDropdown).filter(
                      (val) => val !== null || undefined
                    ).length === 0
                      ? "bg-gray-300 cursor-not-allowed"
                      : " bg-red-500 hover:bg-red-400"
                      }`}
                  >
                    Clear All
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={
                      headerKeys.length < 1 &&
                      headerKeys.length < 1 &&
                      isLoading
                    }
                    className={`px-4 py-2 font-semibold text-white rounded-lg ${headerKeys.length > 0 ||
                      (headerKeys.length > 0 && isLoading)
                      ? "bg-main hover:bg-gray-700"
                      : "bg-gray-300 cursor-not-allowed"
                      }`}
                  >
                    Save
                  </button>
                </div>

                {/* Table */}
                <div className="overflow-x-auto max-h-[700px] overflow-y-auto">
                  <table className="w-full border-collapse table-auto min-w-max">
                    <thead className="sticky top-0 z-30 font-inter font-semibold text-[12px] leading-[24px] text-[#2F3746] h-[40px]">
                      <tr className="bg-[#F8F9FA]">
                        <th
                          className={`${headerKeys.length > 0 ||
                            afryHeaderKeysData.length > 0
                            ? "w-[200px] "
                            : "w-[50%]"
                            }  pl-[15px] text-[14px] text-left z-20 sticky left-0 bg-[#F8F9FA] whitespace-normal break-words`}
                        >
                          Category
                        </th>
                        <th className="w-[100px] sticky text-[14px] text-left left-[200px] top-0 pl-[15px] z-20 bg-[#F8F9FA] whitespace-normal break-words">
                          Metric
                        </th>

                        {(afryHeaderKeysData.length > 1
                          ? afryHeaderKeysData
                          : headerKeys
                        ).map((header, index) => (
                          <th
                            key={index}
                            className="text-[14px] w-[100px] py-2 z-10 text-left whitespace-nowrap"
                          >
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    {Object.values(afryDropdown).filter(
                      (val) => val === null || undefined
                    ).length !== 0 && (
                        <tbody>
                          <tr>
                            <td className="text-red-500 pl-[15px] mt-2">
                              Select criteria from dropdowns to view the table
                            </td>
                          </tr>
                        </tbody>
                      )}
                    <tbody>
                      {Object.keys(
                        afryProcessedTableRows &&
                          Object.keys(afryProcessedTableRows).length > 1
                          ? afryProcessedTableRows
                          : processedData
                      ).map(
                        (category, rowIndex) =>
                          (afryProcessedTableRows[category] ||
                            processedData[category]) && (
                            <tr key={rowIndex}>
                              <td className="w-[200px] pl-[15px] border-b border-[#F2F4F7] font-bold text-[14px] text-[#111927] bg-white z-20 sticky left-0 bg-inherit whitespace-normal break-words h-[60px]">
                                {category}
                              </td>
                              <td className="w-[100px] pl-[15px] border-b border-[#F2F4F7] font-bold text-[14px] text-[#111927] bg-white sticky left-[200px] z-20 whitespace-normal break-words">
                                {
                                  (
                                    afryProcessedTableRows[category] ||
                                    processedData[category]
                                  ).metric
                                }
                              </td>
                              {(afryHeaderKeysData || headerKeys).map(
                                (header, colIndex) => (
                                  <td
                                    key={colIndex}
                                    className="w-[100px] py-2 text-left z-10 text-sm text-[#111927] border-b border-[#F2F4F7]"
                                  >
                                    {(
                                      afryProcessedTableRows[category] ||
                                      processedData[category]
                                    ).values[header] !== undefined
                                      ? Number(
                                        (
                                          afryProcessedTableRows[category] ||
                                          processedData[category]
                                        ).values[header]
                                      ).toFixed(2)
                                      : "-"}
                                  </td>
                                )
                              )}
                            </tr>
                          )
                      )}
                    </tbody>
                  </table>
                </div>

                <div className="my-4 flex justify-center w-full ">
                  {isLoading && <div className="  loader"></div>}
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* Dialog */}
      <Dialog
        header="Notification"
        visible={isDialogVisible}
        onHide={() => setIsDialogVisible(false)}
        style={{ width: "30vw" }}
      >
        <p>{dialogMessage}</p>
      </Dialog>
    </>
  );
};

export default AfrayForecast;
