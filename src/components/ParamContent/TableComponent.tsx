import React, {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useAppSelector } from "../../hooks/hooks";
import { selectResult } from "../../store/slices/resultSlice";
import { defaultCurrency } from "../../utils/constant";
import { checkEqualObject, cloneObject } from "../../utils/funtions";
import { FiArrowDown, FiArrowUp, FiSave } from "react-icons/fi";
import { Tooltip } from "../Tooltip";
import { User } from "../../store/types/types";
import tokenService from "../../services/token.service";

const VisuallyHiddenInput: FC<React.InputHTMLAttributes<HTMLInputElement>> = (
  props
) => (
  <input
    {...props}
    style={{
      position: "absolute",
      clip: "rect(0 0 0 0)",
      width: 1,
      height: 1,
      overflow: "hidden",
    }}
  />
);

interface TableComponentProps {
  tableData: {
    title: string;
    stickyRows: {
      fn: (params: Record<string, any>) => any[];
      params: string[];
    };
    stickyCols: {
      fn: (params: Record<string, any>) => any[];
      params: string[];
    };
    valueRange: string;
    editable: string
  };
  value: any[][];
  defaultExpanded?: boolean;
  onSave: (value: any[][]) => void;
}

const TableComponent: FC<TableComponentProps> = ({
  tableData,
  value,
  defaultExpanded = false,
  onSave,
}) => {
  const {
    modelStartDate,
    calculationPeriod,
    lengthOfOperations,
    extendedCalculationPeriod,
    operationStartDate,
  } = useAppSelector(selectResult);
  const user: User = tokenService.getUser();

  const [expanded, setExpand] = useState(defaultExpanded);
  const [focusCell, setFocusCell] = useState<{
    rowIndex: number | null;
    colIndex: number | null;
  }>({ rowIndex: null, colIndex: null });
  const valueRef = useRef<any[][]>(value);
  const [customValue, setCustomValue] = useState<any[][]>(value);

  const getTableParameters = useCallback(
    (params: string[]) => {
      const rlt: Record<string, any> = {};
      params.forEach((param) => {
        if (param === "defaultCurrency")
          rlt["defaultCurrency"] = defaultCurrency;
        if (param === "modelStartDate") rlt["modelStartDate"] = modelStartDate;
        if (param === "calculationPeriod")
          rlt["calculationPeriod"] = calculationPeriod;
        if (param === "extendedCalculationPeriod")
          rlt["extendedCalculationPeriod"] = extendedCalculationPeriod;
        if (param === "lengthOfOperations")
          rlt["lengthOfOperations"] = lengthOfOperations;
        if (param === "cyclesPerDay") rlt["cyclesPerDay"] = [2, 1.5, 1];
        if (param === "forecastEfficiency")
          rlt["forecastEfficiency"] = ["Forecast Efficiency"];
        if (param === "operationStartDate")
          rlt["operationStartDate"] = operationStartDate;
      });
      return rlt;
    },
    [
      calculationPeriod,
      lengthOfOperations,
      modelStartDate,
      lengthOfOperations,
      operationStartDate,
      extendedCalculationPeriod,
    ]
  );
  useEffect(() => {
    valueRef.current = value;
    setCustomValue(value);
    setFocusCell({ rowIndex: null, colIndex: null });
  }, [value]);

  const hasChanged = useMemo(() => {
    return !checkEqualObject(customValue, valueRef.current);
  }, [customValue]);

  const stickyRows = useMemo(() => {
    return tableData.stickyRows.fn(
      getTableParameters(tableData.stickyRows.params)
    );
  }, [tableData, getTableParameters]);

  const stickyCols = useMemo(() => {
    return tableData.stickyCols
      .fn(getTableParameters(tableData.stickyCols.params))
      .map((c: any) => (["string", "number"].includes(typeof c) ? c : c.label));
  }, [tableData, getTableParameters]);

  useEffect(() => {
    if (!value) {
      const newValue = new Array(stickyCols.length).fill(
        new Array(stickyRows.length - 1).fill(0)
      );
      setCustomValue(newValue);
      valueRef.current = newValue;
    }
  }, [stickyRows, stickyCols, value]);

  const rows = useMemo(() => {
    if (!customValue || customValue.length !== stickyCols.length) return [];
    return stickyCols.map((col, i) => [
      col,
      ...customValue[i].slice(0, stickyRows.length - 1),
    ]);
  }, [stickyCols, customValue]);

  const generateCSV = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    const l = stickyRows[0].length;
    for (let i = 0; i < l; i++) {
      csvContent += stickyRows.map((s: any) => s[i]).join(",") + "\r\n";
    }
    rows.forEach((row) => {
      csvContent += row.join(",") + "\r\n";
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const importCSV = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];

      // Validate file type
      const validTypes = ["text/csv", "application/csv", "text/plain"];
      if (!validTypes.includes(file.type)) {
        console.error("Please upload a valid CSV file.");
        alert("Invalid file type. Please upload a CSV file.");
        return;
      }

      try {
        const fileUrl = URL.createObjectURL(file);
        const response = await fetch(fileUrl);
        const text = await response.text();
        const lines = text.split("\n").filter((line) => line.trim() !== ""); // Filter out empty lines

        const rowL = stickyCols.length;
        const stickyRowL = stickyRows[0].length;
        const _data = lines.slice(stickyRowL, stickyRowL + rowL).map((line) =>
          line.split(",").map((cell, index, arr) => {
            // Remove '%' from the cell if it exists
            if (index > 0) {
              let cleanedCell = cell;

              if (cell.includes("%")) {
                cleanedCell = cell.replace(/%/g, "").trim();
              }
              const numericValue = parseFloat(cleanedCell);

              // Check if the numeric value is valid
              if (
                (isNaN(numericValue) ||
                  numericValue < 0 ||
                  numericValue > 100) &&
                tableData?.valueRange == "percentage"
              ) {
                alert(
                  `Invalid value detected: ${cleanedCell} in ${arr[0]}. Values must be greater than 0 and less than 100.`
                );
                throw new Error("Invalid cell value");
              }

              return cleanedCell === "" ? "0" : cleanedCell;
            } // Replace empty strings with '0'}
            return cell === "" ? "0" : cell;
          })
        );

        // Check for special characters
        const specialCharPattern = /[!@#$%^&*(),?:{}A-Za-z|<>]/; // Add any other characters you want to check for
        const hasSpecialChars = _data.some((row) => {

          row.some(
            (cell, index) => index !== 0 && specialCharPattern.test(cell)
          )
        }
        );

        if (hasSpecialChars) {
          alert(
            `Non numeraic values detected in the data. Please remove them and try again.`
          );
          return; // Exit the function if special characters are found
        }

        setCustomValue(
          _data.map((d) => {
            d.shift(); // Remove the first element if needed
            return d;
          })
        );
      } catch (error) {
        console.error("Error processing the CSV file:", error);
        alert("An error occurred while processing the file. Please try again.");
      } finally {
        // Reset the file input
        e.target.value = ""; // Clear the input value
      }
    }
  };

  // const handleChange = (rowIndex: number, colIndex: number, value: string) => {
  //   const v = cloneObject(customValue);
  //   v[rowIndex][colIndex] = value;
  //   setCustomValue(v);
  // };
  const handleChange = (rowIndex: number, colIndex: number, value: string) => {
    const numericValue = parseFloat(value); // Convert the value to a number

    // Check if the value is within the valid range
    if (
      (numericValue < 0 || numericValue > 100) &&
      tableData?.valueRange == "percentage"
    ) {
      alert("Please enter a value between 0 and 100."); // Raise an alert
      return; // Exit the function to prevent state update
    }

    const v = cloneObject(customValue);
    v[rowIndex][colIndex] = value;
    setCustomValue(v);
  };

  const toggleExpand = () => {
    setExpand(!expanded);
  };

  return (
    <div className="border rounded-lg shadow-md m-2 w-full">
      <div className="flex justify-between p-4 gap-4 ">
        <div className="flex items-center">
          <button onClick={toggleExpand} className="p-2">
            {expanded ? <span>-</span> : <span>+</span>}
          </button>
          <h4 className="text-lg font-bold">{tableData.title}</h4>
        </div>
        <div className="flex items-center space-x-4 p-4">
          <Tooltip content="Export the table data in csv format">
            <button
              onClick={generateCSV}
              className="flex items-center px-4 py-2 rounded-lg bg-main text-white font-semibold hover:bg-gray-700 cursor-pointer"
            >
              <FiArrowUp className="w-5 h-5 mr-2" />
              Export
            </button>
          </Tooltip>

          <Tooltip content={`${(tableData?.editable == 'disabled' && user.is_admin == false) ? 'Not allowed for non admins' : 'Upload csv format file to populate the whole table'}`}>
            <label className={`flex items-center cursor-pointer px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-600 ${(tableData?.editable == 'disabled' && user.is_admin == false) ? '' : 'hover:bg-gray-100'}`}>
              <FiArrowDown className="w-5 h-5 mr-2" />
              Import
              <input
                type="file"
                accept=".csv"
                onChange={importCSV}
                className="hidden"
                disabled={
                  tableData?.editable == 'disabled' && user.is_admin == false || false}
              />
            </label>
          </Tooltip>

          <Tooltip content="Save the input data table">
            <button
              disabled={!hasChanged}
              onClick={() => {
                valueRef.current = customValue;
                onSave(customValue);
              }}
              className={`flex items-center px-4 py-2 rounded-lg ${hasChanged
                ? "bg-main hover:bg-gray-700 text-white"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
            >
              <FiSave className="w-5 h-5 mr-2" />
              Save
            </button>
          </Tooltip>
        </div>
      </div>
      <div className="border-t max-h-[40vh] overflow-auto">
        {expanded && (
          <div className="">
            <table>
              <thead className="sticky top-0 left-0 h-max z-20 bg-[#F8F9FA]">
                <tr>
                  {stickyRows.map((row: any, index: number) => (
                    <th
                      key={index}
                      className={`text-center bg-[#F8F9FA] 
            px-2 py-3 font-inter font-semibold text-[12px] leading-[24px]
            ${index === 0
                          ? "min-w-[200px] sticky left-0 top-0 pl-[15px] h-full"
                          : "min-w-[100px]"
                        } `}
                    >
                      {Array.isArray(row)
                        ? row.map((item, itemIndex) => (
                          <div key={itemIndex}>
                            {String(item).toUpperCase()}
                          </div>
                        ))
                        : String(row).toUpperCase()}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((r, ri) => (
                  <tr key={ri}>
                    {r.map((c, ci) => (
                      <td
                        key={ci}
                        className={`border px-2 py-3 text-center ${ci === 0 ? "sticky left-0 bg-white z-10" : ""
                          }`}
                      >
                        {ri === focusCell.rowIndex &&
                          ci === focusCell.colIndex ? (
                          <input
                            type="tel"
                            className="text-center border rounded"
                            value={c}
                            onChange={(e: any) => {
                              const inputValue = e.target.value;
                              const isNegative = inputValue.startsWith("-");
                              const numericValue = inputValue
                                .replace(/[^0-9.-]/g, "") // Allow digits, dots, and negative sign
                                .replace(/(\..*)\..*/g, "$1") // Allow only one dot
                                .replace(/--/g, "-"); // Prevent double negative signs

                              handleChange(
                                ri,
                                ci - 1,
                                isNegative && inputValue.length > 1
                                  ? "-" + numericValue.replace(/^-/, "")
                                  : numericValue
                              );
                            }}
                            onBlur={() => {
                              const currentValue = parseFloat(c);
                              if (!isNaN(currentValue)) {
                                handleChange(
                                  ri,
                                  ci - 1,
                                  currentValue.toString()
                                );
                              } else {
                                handleChange(ri, ci - 1, "0");
                              }
                            }}
                            disabled={
                              tableData?.editable == 'disabled' && user.is_admin == false || false}
                          />
                        ) : (
                          <div
                            className={`cursor-pointer ${ci === 0 ? "text-start font-bold" : ""
                              }`}
                            onClick={() => {
                              setFocusCell({ rowIndex: ri, colIndex: ci });
                            }}
                          >
                            {c}
                          </div>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default TableComponent;
