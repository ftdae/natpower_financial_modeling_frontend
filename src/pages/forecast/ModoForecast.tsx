import { useCallback, useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { Dropdown } from "primereact/dropdown";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { Dialog } from "primereact/dialog";
import {
  setModoDropdown,
  setModoProcessedRows,
  setModoHeaderKeys,
} from "../../store/slices/forecastSlice";
import { useDispatch, useSelector } from "react-redux";
import { normalizeArrayBySeasonality } from "../../calculation/calculates/utils";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { inputsCreateAsync, inputsUpdateAsync, selectParam } from "../../store/slices/parameterSlice";
import { UpdateParamInfo } from "../../store/types/types";

interface DataItem {
  data: { [key: string]: any }[];
}

interface Data {
  [key: string]: DataItem;
}

const ModoForecast = () => {
  const { modoDropdown, modoProcessedTableRows, modoHeaderKeysData } =
    useSelector((state: any) => state.app);

  const [processedData, setProcessedData] = useState<any>([]);
  const [headerKeys, setHeaderKeys] = useState<string[]>(
    modoHeaderKeysData ?? []
  );
  const [dialogMessage, setDialogMessage] = useState("");
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [tableUnits, setTableUnits] = useState({});

  const [conditions, setConditions] = useState({});
  const [isSearchDisabled, setIsSearchDisabled] = useState(true);
  const [dropdownFields, setDropdownFields] = useState<any>([]);
  const [dropdownData, setDropdownData] = useState<any>({});
  const [selectedDropdowns, setSelectedDropdowns] = useState<any>(
    modoDropdown ?? {}
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Fetch dropdown fields from the API
    const fetchDropdownFields = async () => {
      try {
        const response = await fetch(
          "https://financialmodellingapi-stg.azurewebsites.net/data_serve/get-modo-params"
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
          const StoredValues = Object.values(modoDropdown).length === 0;

          if (StoredValues) {
            dispatch(setModoDropdown(initialSelectedDropdowns));
          }

          // Check if few values are selected and not all, then reset them after route change
          if (
            Object.values(modoDropdown).filter(
              (value) => value !== null || undefined
            ).length !==
            Object.keys(initialSelectedDropdowns).length + 1
          ) {
            dispatch(setModoDropdown(initialSelectedDropdowns));
          }

          setDropdownData(initialDropdownData);
          setSelectedDropdowns(initialSelectedDropdowns);
        }
      } catch (error) {
        console.error("Error fetching dropdown fields:", error);
      }

      try {
        const response = await fetch(
          "https://financialmodellingapi-stg.azurewebsites.net/data_serve/get-modo-units"
        );
        const data = await response.json();
        if (data) {
          setTableUnits(data);
        }
      } catch (error) {
        console.log(error);
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
        "https://financialmodellingapi-stg.azurewebsites.net/data_serve/get-modo-dynamic-params",
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

    dispatch(setModoDropdown({ field, value }));
    const newConditions = { ...conditions, [field]: value };
    setConditions(newConditions);
    fetchDropdownData(field, newConditions);
  };

  useEffect(() => {
    fetchDropdownData("scenario", {});
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
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
        "https://financialmodellingapi-stg.azurewebsites.net/data_serve/get-modo",
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
        setProcessedData([]);
        dispatch(setModoProcessedRows([]));
        setHeaderKeys([]);
        dispatch(setModoHeaderKeys([]));
        setTimeout(() => setIsDialogVisible(false), 30000);
      } else {
        // setApiData(data);
        processData(data);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const formatQuarterToDate = (quarterString) => {
    const monthMap = { 1: "Jan", 2: "Apr", 3: "Jul", 4: "Oct" };

    if (!/^\d{1}_\d{4}$/.test(quarterString)) return quarterString;

    const [quarter, year] = quarterString.split("_").map(Number);
    const month = monthMap[quarter] || "Invalid";

    return `1-${month}-${year} (Q${quarter})`;
  };

  const processData = (data: Data) => {
    let newData: any = {};
    const headers = new Set<string>();

    const values = [];

    Object.keys(data).map((item) => {
      const processedRegionData = [];
      const regionGrouping = data[item];
      newData["grouping by region"] = {
        measure: "",
        region: item,
        values: {},
      };

      // Setting the headers
      Object.values(data)[0]?.data?.forEach((item) => {
        const { date, ...rest } = item;
        const headerKey = date ?? item.quarter_year;
        headers.add(headerKey);
      });

      regionGrouping?.data?.forEach((item) => {
        const { date, ...rest } = item;
        const headerKey = date ?? item.quarter_year;
        // Use the date as the header key
        Object.entries(rest).forEach(([key, value]) => {
          if (!newData[key]) {
            newData[key] = {
              measure: key,
              region: "", // Add region to the object
              values: {},
            };
          }
          newData[key].values[headerKey] = value;
        });
      });
      values.push(newData);
      newData = {};
    });

    const sortedHeaders = Array.from(headers).sort((a, b) => {
      const isQuarterFormat = (str) => /^\d{1}_\d{4}$/.test(str);

      if (isQuarterFormat(a) && isQuarterFormat(b)) {
        const [qA, yA] = a.split("_").map(Number);
        const [qB, yB] = b.split("_").map(Number);
        return yA - yB || qA - qB; // Sort by year first, then by quarter
      }

      return a.localeCompare(b); // Default sorting for non-matching formats
    });
    setHeaderKeys(sortedHeaders);
    setProcessedData(values);
    dispatch(setModoHeaderKeys(sortedHeaders));

    dispatch(setModoProcessedRows(values));
  };

  const exportToExcel = () => {
    const sheetData = [];
    sheetData.push([
      "Region",
      "Category",
      "Metric",
      ...headerKeys.map((header, index) => index + 1),
    ]);

    if (headerKeys.length > 0) {
      const row = ["", "Date", ""];

      // Add values for each header key or "-" if not present
      row.push(
        ...headerKeys.map((key) =>
          /^\d{1}_\d{4}$/.test(key) ? formatQuarterToDate(key) : key
        )
      );

      sheetData.push(row);
    }

    // Extract the first object from processedData
    if (processedData.length > 0) {
      const firstRegionData = processedData[0];
      const avgWholesaleData =
        firstRegionData["Avg. Wholesale Day Ahead Price"];

      if (avgWholesaleData) {
        const row = [
          "", // Leave first cell empty
          "Avg. Wholesale Day Ahead Price", // Category
          tableUnits["Avg. Wholesale Day Ahead Price"] || "£/MWh", // Metric
        ];

        // Add values for each header key or "-" if not present
        headerKeys.forEach((header) => {
          row.push(
            avgWholesaleData.values[header] !== undefined
              ? Number(avgWholesaleData.values[header]).toFixed(2)
              : "-"
          );
        });

        sheetData.push(row);
      }
    }

    // Process the remaining region groups (skipping the first one)
    processedData.forEach((regionData, index) => {
      if (index === 0) return;

      const regionName = regionData["grouping by region"].region || "-";

      sheetData.push([regionName, "", "", ...headerKeys.map(() => "")]);

      Object.entries(regionData).forEach(([categoryKey, category]: any) => {
        if (categoryKey === "grouping by region") return; // Skip grouping metadata

        const row = [
          "",
          categoryKey === "quarter_year" ? "Quarter Year" : categoryKey,
          tableUnits[categoryKey] || "-",
        ];

        headerKeys.forEach((header) => {
          const value = category.values[header];

          row.push(
            value !== undefined && !isNaN(Number(value))
              ? Number(value).toFixed(2)
              : typeof value === "string" && /^\d{1}_\d{4}$/.test(value)
                ? formatQuarterToDate(value)
                : "-"
          );
        });

        sheetData.push(row);
      });
    });

    // Create a new workbook and sheet
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(sheetData);

    // Ensure numeric formatting for header key columns
    headerKeys.forEach((_, colIndex) => {
      const colLetter = XLSX.utils.encode_col(colIndex + 3);

      for (let row = 2; row < sheetData.length; row++) {
        const categoryCell = ws[`B${row + 1}`]; // 2nd column (Category column)

        // Check if the category column contains "Quarter Year" or "quarter_year"
        const isQuarterYearRow =
          categoryCell &&
          typeof categoryCell.v === "string" &&
          /^(Quarter Year|quarter_year)$/i.test(categoryCell.v);

        const cell = ws[`${colLetter}${row + 1}`];

        if (cell) {
          if (isQuarterYearRow) {
            cell.t = "s"; // Force string type
          } else if (typeof cell.v === "string") {
            const value = parseFloat(cell.v);
            if (!isNaN(value)) {
              cell.v = value; // Convert to number
              cell.t = "n"; // Mark as numeric
            }
          }
        }
      }
    });

    // Generate the sheet name dynamically
    const generateAbbreviation = (key, text) => {
      if (key === "year_quarter") return text;
      const words = text.split(" ");
      return words.length > 1
        ? words.map((word) => word.charAt(0).toUpperCase()).join("")
        : text.slice(0, 2).toUpperCase();
    };


    console.log(selectedDropdowns)
    const sheetName = Object.entries(selectedDropdowns)
      .filter(([value]) => value)
      .map(([key, value]) => generateAbbreviation(key, String(value)))
      .join("_");

    // Append sheet and save file
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
    XLSX.writeFile(wb, `${sheetName}.xlsx`);
  };
  const newlyAddedData = processedData.map((regionData, index) => {
    let region = regionData['grouping by region']['region'];
    if (region == "North of Scotland")
      region = 'Northern Scotland'
    if (region == "South of Scotland")
      region = 'Southern Scotland'
    if (region == "South Eastern")
      region = 'South East'
    if (region == "North Western")
      region = 'North West'
    if (region == "Merseyside & North Wales")
      region = 'N Wales & Mersey'
    const paramName = `modo_${selectedDropdowns.duration_hours}hour_${(selectedDropdowns['type'] || '').toLowerCase()}_${region.toLowerCase()}`;
    const paramIndex = `revenue@forecast_provider_data`;
    let numberData = []
    const categoryNames: string[] = [
      'Avg. Cycles per day',
      'Wholesale Day Ahead Total Revenues',
      'Wholesale Intraday Revenues',
      'Balancing Mechanism Revenues',
      'Capacity Market Revenues',
      'Frequency Response Revenues',
      'Balancing Reserve Revenues',
      'TNUoS Revenues',
      'Total Revenues'
    ]
    categoryNames.map((categoryValues, index) => {
      const categoryData = regionData[categoryValues]?.values;
      let numberArray = [];
      modoHeaderKeysData.map((header, index) => numberArray.push(categoryData[header] || 0))
      numberData.push([0, 0, 0, 0, ...(normalizeArrayBySeasonality(numberArray, 300))])
    })
    return {
      [paramName]: {
        data: numberData,
        type: 'centralizedInput'
      }
    }
  }
  )
  const paramNameArray = processedData.map((regionData, index) => {
    let region = regionData['grouping by region']['region'];
    if (region == "North of Scotland")
      region = 'Northern Scotland'
    if (region == "South of Scotland")
      region = 'Southern Scotland'
    if (region == "South Eastern")
      region = 'South East'
    if (region == "North Western")
      region = 'North West'
    if (region == "Merseyside & North Wales")
      region = 'N Wales & Mersey'
    const paramName = `modo_4hour_ancillaries focus_${region.toLowerCase()}`;
    return paramName
  }
  )
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

  newlyAddedData.forEach(element => {
    const key = Object.keys(element)[0];
    const value = element[key]
    addingData[key] = value
  });
  const dispatch = useAppDispatch();
  const handleSave = () => {
    const payload: UpdateParamInfo = {
      id: getParameter(`revenue@forecast_provider_data`)?.id,
      parameter_id: currentParameterId as number,
      param_index: 'revenue@forecast_provider_data',
      value: addingData,
    };
    dispatch(inputsCreateAsync(payload as UpdateParamInfo));
  };


  const clearAllSelections = () => {
    setSelectedDropdowns({
      repowering_cycles: null,
      max_daily_cycles: null,
      duration_hours: null,
      efficiency_percentage: null,
      model_version: null,
      type: null,
      period: null,
      macro_scenario: null,
      solar_coupling: null,
      degradation: null,
      connection_type: null,
    });
    dispatch(
      setModoDropdown({
        repowering_cycles: null,
        max_daily_cycles: null,
        duration_hours: null,
        efficiency_percentage: null,
        model_version: null,
        type: null,
        period: null,
        macro_scenario: null,
        solar_coupling: null,
        degradation: null,
        connection_type: null,
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
    setProcessedData([]);
    dispatch(setModoProcessedRows({}));
    setHeaderKeys([]);
    dispatch(setModoHeaderKeys([]));
  };

  useEffect(() => {
    const allFieldsSelected = Object.values(modoDropdown).filter(
      (value) => value === null || undefined
    );

    const hasValidPeriod = modoDropdown?.period != null;
    const nullFieldsInStore = Object.values(selectedDropdowns).filter(
      (value) => value === null || value === undefined
    ).length;

    if (
      allFieldsSelected.length === 0 &&
      hasValidPeriod &&
      nullFieldsInStore === 0 &&
      Object.keys(selectedDropdowns).length > 0
    ) {
      fetchData();
    }
  }, [modoDropdown]);

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
                <h4 className="text-2xl font-bold">Forecast Modo</h4>
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
                        value={modoDropdown[field] ?? selectedDropdowns[field]}
                        options={
                          modoDropdown[field]
                            ? [modoDropdown[field]]
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
                  <div className="flex justify-between items-center py-2 max-w-[60vw]">
                    <label className="px-5 max-w-[60%] w-[60%] text-left">
                      Periods
                    </label>
                    <Dropdown
                      value={modoDropdown["period"] ?? selectedDropdowns.period}
                      options={
                        modoDropdown["period"]
                          ? [modoDropdown["period"]]
                          : [
                            { label: "Monthly", value: "monthly" },
                            { label: "Quarterly", value: "quarterly" },
                          ]
                      }
                      onChange={(e) => handleDropdownChange("period", e.value)}
                      placeholder="Select Period"
                      className="border border-gray-300 rounded-md px-2 w-full"
                      required
                    />
                  </div>
                </div>

                {/* Buttons */}
                <div className="my-4 flex gap-4 flex-row-reverse">
                  <button
                    onClick={exportToExcel}
                    disabled={
                      modoHeaderKeysData.length < 1 &&
                      headerKeys.length < 1 &&
                      isLoading
                    }
                    className={`px-4 py-2 font-semibold text-white rounded-lg ${modoHeaderKeysData.length > 0 ||
                      (headerKeys.length > 0 && isLoading)
                      ? "bg-main hover:bg-gray-700"
                      : "bg-gray-300 cursor-not-allowed"
                      }`}
                  >
                    Export to Excel
                  </button>
                  <button
                    onClick={clearAllSelections}
                    disabled={
                      Object.values(modoDropdown).filter(
                        (val) => val !== null || undefined
                      ).length === 0
                    }
                    className={`px-4 py-2 font-semibold text-white rounded-lg ${Object.values(modoDropdown).filter(
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
                      modoHeaderKeysData.length < 1 &&
                      headerKeys.length < 1 &&
                      isLoading
                    }
                    className={`px-4 py-2 font-semibold text-white rounded-lg ${modoHeaderKeysData.length > 0 ||
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
                        <th className="w-[50px] sticky left-0 top-0 text-[14px] text-left pl-[15px] z-50 bg-[#F8F9FA] whitespace-normal break-words"></th>
                        <th className="w-[150px] sticky left-[50px] top-0 text-[14px] text-left pl-[15px] z-50 bg-[#F8F9FA] whitespace-normal break-words">
                          Region
                        </th>
                        <th
                          className={`${headerKeys.length > 0 ||
                            modoHeaderKeysData.length > 0
                            ? "w-[200px]"
                            : "w-[50%]"
                            } sticky left-[200px] top-0 pl-[15px] text-[14px] text-left z-50 bg-[#F8F9FA] whitespace-normal break-words`}
                        >
                          Original_Index
                        </th>
                        <th className="w-[150px] sticky left-[400px] top-0 text-[14px] text-left pl-[15px] z-50 bg-[#F8F9FA] whitespace-normal break-words">
                          Unit
                        </th>
                        {(modoHeaderKeysData.length > 1
                          ? modoHeaderKeysData
                          : headerKeys
                        ).map((header, index) => (
                          <th
                            key={index}
                            className="text-[14px] w-[100px] py-2 z-50 text-left whitespace-nowrap"
                          >
                            {index + 1}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    {(!Object.keys(modoDropdown).includes("period") ||
                      Object.values(modoDropdown).filter(
                        (val) => val === null || val === undefined
                      ).length !== 0) && (
                        <tbody>
                          <tr className="w-full">
                            <td className="text-red-500 pl-[15px]" colSpan={100}>
                              Select criteria from dropdowns to view the table
                            </td>
                          </tr>
                        </tbody>
                      )}
                    <tbody>
                      {processedData &&
                        processedData[0] &&
                        processedData[0]["Avg. Wholesale Day Ahead Price"] && (
                          <>
                            <tr>
                              <td className="w-[50px] sticky left-0 top-[40px] text-[14px] text-left pl-[15px] border-b border-[#F2F4F7] font-bold text-[#111927] bg-white z-50 whitespace-normal break-words h-[60px]">
                                1
                              </td>
                              <td className="bg-white z-50 sticky top-[40px]  left-[50px]"></td>

                              <td className="w-[150px] sticky top-[40px] left-[200px]  z-50  text-[14px] text-left pl-[15px] border-b border-[#F2F4F7] font-bold text-[#111927] bg-white  whitespace-normal break-words h-[60px]">
                                Date
                              </td>
                              <td className="w-[150px] sticky top-[40px] left-[400px]  pl-[15px] border-b border-[#F2F4F7] font-bold text-[14px] text-[#111927] bg-white z-50 whitespace-normal break-words"></td>
                              {(modoHeaderKeysData || headerKeys).map(
                                (header, headerIndex) => (
                                  <td
                                    key={headerIndex}
                                    className="w-[100px] sticky top-[40px] left-0 z-30 py-2 text-left  text-sm text-[#111927] border-b bg-white border-[#F2F4F7]"
                                  >
                                    {/^\d{1}_\d{4}$/.test(header)
                                      ? formatQuarterToDate(header)
                                      : header}
                                  </td>
                                )
                              )}
                            </tr>
                            <tr>
                              <td className="w-[50px] sticky left-0 top-0 text-[14px] text-left pl-[15px] border-b border-[#F2F4F7] font-bold text-[#111927] bg-white z-20 whitespace-normal break-words h-[60px]">
                                2
                              </td>
                              <td className="bg-white z-20 top-0 sticky left-[50px]"></td>

                              <td className="w-[150px] sticky left-[200px]  z-20  text-[14px] text-left pl-[15px] border-b border-[#F2F4F7] font-bold text-[#111927] bg-white  whitespace-normal break-words h-[60px]">
                                Avg. Wholesale Day Ahead Price
                              </td>
                              <td className="w-[150px] sticky left-[400px] top-0 pl-[15px] border-b border-[#F2F4F7] font-bold text-[14px] text-[#111927] bg-white z-20 whitespace-normal break-words">
                                £/MWh
                              </td>
                              {(modoHeaderKeysData || headerKeys).map(
                                (header, headerIndex) => (
                                  <td
                                    key={headerIndex}
                                    className="w-[100px] py-2 text-left z-0 text-sm text-[#111927] border-b border-[#F2F4F7]"
                                  >
                                    {processedData[0][
                                      "Avg. Wholesale Day Ahead Price"
                                    ].values[header] !== undefined
                                      ? Number(
                                        processedData[0][
                                          "Avg. Wholesale Day Ahead Price"
                                        ].values[header]
                                      ).toFixed(2)
                                      : "-"}
                                  </td>
                                )
                              )}
                            </tr>
                          </>
                        )}
                      {processedData?.map((categoryData, rowIndex) =>
                        Object.keys(categoryData).map(
                          (categoryKey, colIndex) => {
                            if (
                              categoryKey === "Avg. Wholesale Day Ahead Price"
                            ) {
                              return;
                            }
                            const category = categoryData[categoryKey];
                            if (category) {
                              return (
                                <tr key={rowIndex + category.region + colIndex}>
                                  <td className="w-[50px] sticky left-0 top-0 text-[14px] text-left pl-[15px] border-b border-[#F2F4F7] font-bold text-[#111927] bg-white z-20 whitespace-normal break-words h-[60px]">
                                    {colIndex === 0 ? "3" : colIndex + 2}
                                  </td>
                                  {categoryKey === "grouping by region" ? (
                                    <td className="sticky left-[50px] top-0 text-left font-bold text-[14px] text-[#111927] pl-[15px] z-20 bg-white border-b border-[#F2F4F7]">
                                      {category.region}
                                    </td>
                                  ) : (
                                    <td className="sticky left-[50px] bg-white z-20"></td>
                                  )}
                                  {category.region === "" && (
                                    <>
                                      <td className="w-[200px] sticky left-[200px] top-0 pl-[15px] border-b border-[#F2F4F7] font-bold text-[14px] text-[#111927] bg-white z-20 whitespace-normal break-words h-[60px]">
                                        {categoryKey === "quarter_year"
                                          ? "Quarter Year"
                                          : categoryKey}
                                      </td>

                                      <td className="w-[150px] sticky left-[400px] top-0 pl-[15px] border-b border-[#F2F4F7] font-bold text-[14px] text-[#111927] bg-white z-20 whitespace-normal break-words">
                                        {tableUnits[categoryKey] || "-"}
                                      </td>
                                      {(modoHeaderKeysData || headerKeys).map(
                                        (header, headerIndex) => (
                                          <td
                                            key={headerIndex}
                                            className="w-[100px] py-2 text-left z-10 text-sm text-[#111927] border-b border-[#F2F4F7]"
                                          >
                                            {category.values[header] !==
                                              undefined &&
                                              !isNaN(
                                                Number(category.values[header])
                                              )
                                              ? Number(
                                                category.values[header]
                                              ).toFixed(2)
                                              : formatQuarterToDate(
                                                category.values[header]
                                              ) ?? "-"}
                                          </td>
                                        )
                                      )}
                                    </>
                                  )}
                                </tr>
                              );
                            }
                            return null;
                          }
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

export default ModoForecast;
