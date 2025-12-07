import { useCallback, useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { Dropdown } from "primereact/dropdown";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { Dialog } from "primereact/dialog";
import {
  setBaringaDropdown,
  setBaringaProcessedRows,
  setBaringaHeaderKeys,
} from "../../store/slices/forecastSlice";
import { useDispatch, useSelector } from "react-redux";
import { BARINGA_PARAMS } from "../../utils/constant";
import { normalizeArray } from "../../calculation/calculates/utils";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { inputsCreateAsync, selectParam } from "../../store/slices/parameterSlice";
import { CreateParamInfo, UpdateParamInfo } from "../../store/types/types";

type ApiDataItem = {
  sub_category2: string;
  baringa_year: number;
  baringa_value: number;
  year_quarter: string;
  measure: string;
};

type ProcessedData = {
  [category: string]: {
    measure: string; // Add this line
    values: { [yearQuarter: string]: number };
  };
};

const BaringaForecast = () => {
  const dispatch = useAppDispatch();

  const { baringaDropdown, baringaProcessedTableRows, baringaHeaderKeysData } =
    useSelector((state: any) => state.app);

  const [processedData, setProcessedData] = useState<any>(
    baringaProcessedTableRows ?? {}
  );
  const [headerKeys, setHeaderKeys] = useState<string[]>(
    baringaHeaderKeysData ?? []
  );
  const [dialogMessage, setDialogMessage] = useState("");
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [conditions, setConditions] = useState({});
  const [isSearchDisabled, setIsSearchDisabled] = useState(true);
  const [dropdownFields, setDropdownFields] = useState<any>([]);
  const [dropdownData, setDropdownData] = useState<any>({});
  const [selectedDropdowns, setSelectedDropdowns] = useState<any>(
    baringaDropdown ?? {}
  );
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Fetch dropdown fields from the API
    const fetchDropdownFields = async () => {
      try {
        const response = await fetch(
          "https://financialmodellingapi.azurewebsites.net/data_serve/get-baringa-params"
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
          const StoredValues = Object.values(baringaDropdown).length === 0;
          if (StoredValues) {
            dispatch(setBaringaDropdown(initialSelectedDropdowns));
          }

          // Check if few values are selected and not all, then reset them after route change
          if (
            Object.values(baringaDropdown).filter(
              (value) => value !== null || undefined
            ).length !== Object.keys(initialSelectedDropdowns).length
          ) {
            dispatch(setBaringaDropdown(initialSelectedDropdowns));
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

  useEffect(() => {
    // Check if all dropdown values are selected
    const allSelected = Object.values(selectedDropdowns).every(
      (value) => value !== null && value !== undefined
    );

    setIsSearchDisabled(!allSelected);
  }, [selectedDropdowns, isSearchDisabled, dropdownData]);

  const fetchDropdownData = async (targetColumn: any, conditions: any) => {
    try {
      const response = await fetch(
        "https://financialmodellingapi.azurewebsites.net/data_serve/get-baringa-dynamic-params",
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
        setDropdownData((prevData: any) => ({
          ...prevData,
          [targetColumn]: data[targetColumn],
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
    dispatch(setBaringaDropdown({ field, value }));
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
        "https://financialmodellingapi.azurewebsites.net/data_serve/get-baringa",
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
        dispatch(setBaringaProcessedRows([]));
        setHeaderKeys([]);
        dispatch(setBaringaHeaderKeys([]));
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
      const { sub_category2, baringa_year, baringa_value, measure } = item;
      const headerKey = `${baringa_year}`;
      headers.add(headerKey);

      if (!newData[sub_category2]) {
        newData[sub_category2] = { measure, values: {} };
      }

      newData[sub_category2].values[headerKey] = baringa_value;
    });

    const sortedHeaders = Array.from(headers).sort();
    setHeaderKeys(sortedHeaders);
    dispatch(setBaringaHeaderKeys(sortedHeaders));
    setProcessedData(newData);
    dispatch(setBaringaProcessedRows(newData));
  };

  const exportToExcel = () => {
    const sheetData = [];
    sheetData.push(["Category", "Measure", ...headerKeys]);

    Object.keys(processedData).forEach((category) => {
      if (processedData[category]) {
        const row = [
          category,
          processedData[category].measure, // Add metric for each category
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

    // Generate sheet name using dynamic abbreviations
    const sheetName = selectedDropdowns.filename;

    XLSX.utils.book_append_sheet(wb, ws, sheetName);
    XLSX.writeFile(wb, `${sheetName}.xlsx`);
  };

  const clearAllSelections = () => {
    setSelectedDropdowns({
      scenario: null,
      strategy: null,
      site_name: null,
      year_quarter: null,
      connection_level: null,
      battery_duration_hours: null,
    });
    dispatch(
      setBaringaDropdown({
        scenario: null,
        strategy: null,
        site_name: null,
        year_quarter: null,
        connection_level: null,
        battery_duration_hours: null,
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
    dispatch(setBaringaProcessedRows({}));
    setHeaderKeys([]);
    dispatch(setBaringaHeaderKeys([]));
  };

  useEffect(() => {
    const allFieldsSelected = Object.values(baringaDropdown).filter(
      (value) => value === null || undefined
    );

    if (
      allFieldsSelected.length === 0 &&
      Object.keys(selectedDropdowns).length > 0
    ) {
      fetchData();
    }
  }, [baringaDropdown]);

  const categoryNames: string[] = BARINGA_PARAMS
  let tableData = []
  categoryNames.map((category) => {
    const objectValue = processedData[category]?.values
    const valueArray = baringaHeaderKeysData.map((header) => objectValue ? objectValue[header] : 0)
    tableData.push(
      [0, ...(normalizeArray(valueArray, 300))]
    )
  })

  const { parameterInfos, currentParameterId } = useAppSelector(selectParam);
  const getParameter = useCallback(
    (param_index: string) => {
      return parameterInfos?.find((p) => p?.param_index == param_index);
    },
    [parameterInfos]
  );
  // { id: 1, label: "B2" },
  // { id: 2, label: "B4" },
  // { id: 3, label: "B6" },
  // { id: 4, label: "B7a" },
  // { id: 5, label: "B8" },
  // { id: 6, label: "EC5" },
  // // { id: 7, label: "SC1" },
  // { id: 8, label: "X" },
  const currentVal = getParameter(`revenue@forecast_provider_data`)?.value
  let addingData = { ...currentVal }
  let region: string = (selectedDropdowns?.zone?.replace(/_/g, " ") || '').toLowerCase()
  if (region == 'sc01')
    region = 'sc1'
  const paramInputName = `baringa_${(selectedDropdowns.battery_duration_hours)}hour_${region}`
  const newlyAddedData = {
    [paramInputName]: {
      data: tableData,
      type: 'centralizedInput'
    }
  }
  const handleSave = () => {
    const payload: CreateParamInfo = {
      // id: getParameter(`revenue@forecast_provider_data`)?.id,
      parameter_id: currentParameterId as number,
      param_index: 'revenue@forecast_provider_data',
      value: { ...addingData, ...newlyAddedData },
    };
    dispatch(inputsCreateAsync(payload as CreateParamInfo));
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
                <h4 className="text-2xl font-bold">Forecast Baringa</h4>
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
                        value={
                          baringaDropdown[field] ?? selectedDropdowns[field]
                        }
                        options={
                          baringaDropdown[field]
                            ? [baringaDropdown[field]]
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
                      Object.values(baringaDropdown).filter(
                        (val) => val !== null || undefined
                      ).length === 0
                    }
                    className={`px-4 py-2 font-semibold text-white rounded-lg ${Object.values(baringaDropdown).filter(
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
                            baringaHeaderKeysData.length > 0
                            ? "w-[200px] "
                            : "w-[50%]"
                            }  pl-[15px] text-[14px] text-left z-20 sticky left-0 bg-[#F8F9FA] whitespace-normal break-words`}
                        >
                          Category
                        </th>
                        <th className="w-[100px] text-[14px] sticky text-left left-[200px] top-0 pl-[15px] z-20 bg-[#F8F9FA] whitespace-normal break-words">
                          Metric
                        </th>
                        {(baringaHeaderKeysData.length > 1
                          ? baringaHeaderKeysData
                          : headerKeys
                        ).map((header, index) => (
                          <th
                            key={index}
                            className="w-[100px] text-[14px] py-2 z-10 text-left whitespace-nowrap"
                          >
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    {Object.values(baringaDropdown).filter(
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
                        baringaProcessedTableRows &&
                          Object.keys(baringaProcessedTableRows).length > 1
                          ? baringaProcessedTableRows
                          : processedData
                      ).map(
                        (category, rowIndex) =>
                          (baringaProcessedTableRows[category] ||
                            processedData[category]) && (
                            <tr key={rowIndex}>
                              <td className="w-[200px] pl-[15px] border-b border-[#F2F4F7] font-bold text-[14px] text-[#111927] bg-white z-20 sticky left-0 bg-inherit whitespace-normal break-words h-[60px]">
                                {category}
                              </td>
                              <td className="w-[200px] pl-[15px] border-b border-[#F2F4F7] font-bold text-[14px] text-[#111927] bg-white sticky left-[200px] z-20 whitespace-normal break-words">
                                {
                                  (
                                    baringaProcessedTableRows[category] ||
                                    processedData[category]
                                  ).measure
                                }
                              </td>
                              {(baringaHeaderKeysData || headerKeys).map(
                                (header, colIndex) => (
                                  <td
                                    key={colIndex}
                                    className="w-[100px] py-2 text-left z-10 text-sm text-[#111927] border-b border-[#F2F4F7]"
                                  >
                                    {(
                                      baringaProcessedTableRows[category] ||
                                      processedData[category]
                                    ).values[header] !== undefined
                                      ? Number(
                                        (
                                          baringaProcessedTableRows[
                                          category
                                          ] || processedData[category]
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

export default BaringaForecast;
