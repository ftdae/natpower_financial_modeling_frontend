import { Dispatch, FC, SetStateAction, useMemo, useState } from "react";
import { useAppSelector } from "../../hooks/hooks";
import tokenService from "../../services/token.service";
import { selectDate } from "../../store/slices/dateSlice";
import { selectParam } from "../../store/slices/parameterSlice";
import { User } from "../../store/types/types";
import { PARAM_TYPE, PARAM_UNIT } from "../../utils/constant";
import { validateDate } from "../../validations/dateValidation";
import {
  maxValueForBasicInputs,
  minValueForBasicInputs,
  validateOnBlur,
} from "../../validations/projectInputDateValidation";
import ChoiceComponent from "./ChoiceComponent";
import SwitchComponent from "./SwitchComponent";
import TableComponent from "./TableComponent";

interface CardItemProps {
  item: any;
  value: Record<string, any>;
  disabled?: boolean;
  requiredFieldError: string[];
  setRequiredFieldError: Dispatch<SetStateAction<string[]>>;
  uniqueFieldError: string[];
  setUniqueFieldError: Dispatch<SetStateAction<string[]>>;
  onChange: (name: string, value: any, inputType: string) => void;
  // basicProjectInputs?: {
  //   [key: string]: string | null;
  // };
  ppaDate?: {
    [key: string]: string | null;
  };
  assetManagementDate?: {
    [key: string]: string | null;
  };
  setTableUpdated: Dispatch<SetStateAction<boolean>>;
}

const CardItem: FC<CardItemProps> = ({
  item,
  value,
  disabled,
  onChange,
  requiredFieldError,
  setRequiredFieldError,
  // basicProjectInputs,
  assetManagementDate,
  ppaDate,
  setTableUpdated,
  uniqueFieldError,
  setUniqueFieldError,
}) => {
  const { emarineSheetNames } =
    useAppSelector(selectParam);
  const dateState = useAppSelector(selectDate);
  const [focused, setFocused] = useState(false);
  const user: User = tokenService.getUser();
  const type = useMemo(() => {
    return item.type;
  }, [item]);
  const customValue = useMemo(() => {
    if (typeof value === "object" && Object.keys(value).includes(item?.id)) {
      return typeof value[item?.id] === 'object' ? value[item?.id].data : value[item?.id];
    }
    return "";
  }, [value, item]);
  const inputType = item?.editable == "disabled" ? 'centralizedInput' : 'pmInput'
  // const [checkBoxValue, setCheckBoxValue] = useState(customValue);

  // const handleCheckboxChange = () => {
  //   setCheckBoxValue(!checkBoxValue);
  // };
  const minValueCreator = (item: any) => {
    // if (Object.keys(basicProjectInputs ?? {})?.includes(item.id))
    //   return minValueForBasicInputs(item.id, basicProjectInputs);
    if (Object.keys(assetManagementDate ?? {})?.includes(item.id))
      return minValueForBasicInputs(item.id, assetManagementDate);
    else if (Object.keys(ppaDate ?? {})?.includes(item.id))
      return minValueForBasicInputs(item.id, ppaDate);
    else if (
      !item.id.includes("start") &&
      Object.prototype.hasOwnProperty.call(
        dateState.date,
        `${item.id.split("end")[0]}start_date`
      )
    )
      return dateState.date[`${item.id.split("end")[0]}start_date`];
    else return undefined;
  };

  const maxValueCreator = (item: any) => {
    // if (Object.keys(basicProjectInputs ?? {})?.includes(item.id))
    //   return maxValueForBasicInputs(item.id, basicProjectInputs);
    if (Object.keys(assetManagementDate ?? {})?.includes(item.id))
      return maxValueForBasicInputs(item.id, assetManagementDate);
    else if (Object.keys(ppaDate ?? {})?.includes(item.id))
      return maxValueForBasicInputs(item.id, ppaDate);
    else if (
      !item.id.includes("end") &&
      Object.prototype.hasOwnProperty.call(
        dateState.date,
        `${item.id.split("start")[0]}end_date`
      )
    )
      return dateState.date[`${item.id.split("start")[0]}end_date`];
    else return undefined;
  };

  const validateOnBlurAndOnKeyDown = (targetValue, item, onChange) => {
    // if (Object.keys(basicProjectInputs).includes(item.id))
    //   return validateOnBlur(targetValue, item.id, basicProjectInputs, onChange);
    if (Object.keys(assetManagementDate).includes(item.id))
      validateOnBlur(targetValue, item.id, assetManagementDate, onChange);
    else if (Object.keys(ppaDate).includes(item.id))
      validateOnBlur(targetValue, item.id, ppaDate, onChange);
    else validateDate(targetValue, item, dateState, onChange);
  };
  return (
    <div
      className={`flex flex-row justify-between items-center py-2 max-w-[50vw] `}
    >
      {type === PARAM_TYPE.TABLE ? (
        <TableComponent
          tableData={item}
          value={customValue}
          onSave={(value: any) => {
            setTableUpdated(true);
            onChange(item.id || item.title, value, inputType);
          }}
        />
      ) : (
        <>
          <div
            className={`px-5 max-w-[60%] w-[60%] text-left ${focused ? " font-bold" : "" // Highlighted class
              }`}
          >
            {item.title}
            {item?.required === "Must" && (
              <span className="text-red-400 inline"> *</span>
            )}
            {requiredFieldError.includes(item.id) && (
              <p className="text-red-500 text-[13px]">
                This field is required.
              </p>
            )}
            {item?.uniqueness === true && (
              <span className="text-red-400 inline"> *</span>
            )}
            {uniqueFieldError.includes(item.id) && (
              <p className="text-red-500 text-[13px]">
                This field must be unique. The current value of the field is already used in another project!
              </p>
            )}
          </div>
          <div className="px-5 w-full ">
            {type.startsWith("choice") ? (
              <ChoiceComponent
                type={type}
                value={customValue}
                onFocus={() => setFocused(true)}
                onBlur={() => {
                  setFocused(false);
                }}
                onChange={(v: any) => {
                  item?.renderValue;
                  onChange(item.id || item.title, v, inputType);
                  if (v && v.trim() !== "") {
                    setRequiredFieldError((prev) =>
                      prev.filter((fieldId) => fieldId !== item.id)
                    );
                  }
                }}
                item={item}
              />
            ) : type.startsWith("switch") ? (
              <SwitchComponent
                type={type}
                value={customValue}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                onChange={(v: any) => {
                  onChange(item.id || item.title, v, inputType);
                }}
                item={item}
              />
            ) : type == PARAM_TYPE.NUMBER ? (
              <div
                className="w-full"
                style={{
                  position: "relative",
                  display: "inline-block",
                }}
              >
                <input
                  type="text" // Keep type as text for better control
                  className="border rounded px-2 py-1 w-full"
                  value={customValue}
                  disabled={
                    item?.editable == 'disabled' && user.is_admin == false || disabled
                  }
                  onFocus={() => setFocused(true)}
                  onBlur={(v) => {
                    setFocused(false);
                    let min = item?.minValue;
                    let max = item?.maxValue;
                    if (item?.unit === PARAM_UNIT.PERCENTAGE) {
                      min = item?.minValue;
                      max = 100;
                    }
                    if (v.target.value === "") {
                      onChange(item.id || item.title, min, inputType);
                      return;
                    }

                    let value = parseFloat(v.target.value);
                    if (isNaN(value)) {
                      value = min; // Set to min if NaN
                    } else if (value < min) {
                      value = min;
                    } else if (value > max) {
                      value = max;
                    }
                    onChange(item.id || item.title, value, inputType);
                  }}
                  onChange={(v) => {
                    const newValue = v.target.value;
                    // Allow only valid numbers and leading negative sign
                    if (/^-?\d*\.?\d*$/.test(newValue) || newValue === "") {
                      onChange(item.id || item.title, newValue, inputType);
                    }
                    if (newValue && newValue.trim() !== "") {
                      setRequiredFieldError((prev) =>
                        prev.filter((fieldId) => fieldId !== item.id)
                      );
                    }
                  }}
                  onKeyDown={(e) => {
                    const target = e.target as HTMLInputElement;

                    // Allow leading negative sign and digits
                    if (
                      (e.key === "e" || e.key === "E" || e.key === ".") &&
                      target.value.includes(".")
                    ) {
                      e.preventDefault();
                    }
                    if (
                      e.key === "Backspace" ||
                      e.key === "Tab" ||
                      e.key === "ArrowLeft" ||
                      e.key === "ArrowRight"
                    ) {
                      return; // Allow backspace, tab, and arrow keys
                    }
                    if (e.key === "-" && target.selectionStart !== 0) {
                      e.preventDefault(); // Prevent negative sign unless at the start
                    }
                    if (!/[-0-9.]/.test(e.key)) {
                      e.preventDefault(); // Prevent non-numeric input, allowing decimal points
                    }
                  }}
                />

                <span
                  style={{
                    position: "absolute",
                    right: "25px",
                    color: "black",
                    top: "30%",
                    fontSize: "10px",
                  }}
                >
                  {item?.unit?.label}
                </span>
              </div>
            ) : type == PARAM_TYPE.INTEGER ? (
              <div
                className="w-full"
                style={{
                  position: "relative",
                  display: "inline-block",
                }}
              >
                <input
                  type="number"
                  className="border rounded px-2 py-1 w-full"
                  // placeholder={item?.defaultValue}
                  value={customValue}
                  // disabled={disabled}
                  onFocus={() => setFocused(true)}
                  onBlur={(v) => {
                    setFocused(false);
                    const min = item.minValue;
                    const max = item.maxValue;
                    if (v.target.value === "") {
                      onChange(item.id || item.title, min, inputType);
                      return;
                    }

                    let value = Math.round(Number(v.target.value) * 100) / 100;

                    if (value < min) {
                      value = min;
                    } else if (value > max) {
                      value = max;
                    }

                    onChange(item.id || item.title, value, inputType);
                  }}
                  onChange={(v) => {
                    const newValue = v.target.value;
                    const leadingDecimalRegex = /^\./;
                    const max = item?.maxValue || 100; // Maximum value
                    const maxLen = max.toString().length || 10;
                    // Prevent leading zeros and leading decimal point
                    if (
                      (newValue.length > 1 &&
                        newValue.startsWith("0") &&
                        newValue[1] !== ".") ||
                      leadingDecimalRegex.test(newValue) ||
                      newValue.length > maxLen
                    ) {
                      return; // Ignore the change
                    }

                    onChange(item.id || item.title, newValue, inputType);
                    if (newValue && newValue.trim() !== "") {
                      setRequiredFieldError((prev) =>
                        prev.filter((fieldId) => fieldId !== item.id)
                      );
                    }
                  }}
                  onKeyDown={(e) => {
                    // Prevent typing 'e', 'E', and '-'
                    if (
                      e.key === "e" ||
                      e.key === "E" ||
                      e.key === "." ||
                      e.key === "-"
                    ) {
                      e.preventDefault();
                    }
                  }}
                  disabled={
                    item?.editable == 'disabled' && user.is_admin == false || disabled
                  }
                />
                <span
                  style={{
                    position: "absolute",
                    right: "25px",
                    color: "black",
                    top: "30%",
                    fontSize: "10px",
                  }}
                >
                  {item?.unit?.label}
                </span>
              </div>
            ) : type == PARAM_TYPE.YEAR ? (
              <div
                className="w-full"
                style={{
                  position: "relative",
                  display: "inline-block",
                }}
              >
                <input
                  type="number"
                  className="border rounded px-2 py-1 w-full"
                  // placeholder={item?.defaultValue}
                  value={customValue}
                  // disabled={disabled}
                  disabled={
                    item?.editable == 'disabled' && user.is_admin == false || disabled
                  }
                  onFocus={() => setFocused(true)}
                  onBlur={(v) => {
                    setFocused(false);
                    const min = item?.minValue || 2021;
                    const max = item?.maxValue || 2070;
                    if (v.target.value === "") {
                      onChange(item.id || item.title, min, inputType);
                      return;
                    }

                    let value =
                      Math.round(
                        Number(v.target.value.replace(/[^0-9]/, "")) * 100
                      ) / 100;

                    if (value < min) {
                      value = min;
                    } else if (value > max) {
                      value = max;
                    }

                    onChange(item.id || item.title, value, inputType);
                  }}
                  onChange={(v) => {
                    const newValue = v.target.value;
                    const max = item?.maxValue || 2070; // Maximum value
                    const maxLen = max.toString().length;
                    // Prevent leading zeros and leading decimal point
                    if (
                      (newValue.length > 1 &&
                        !newValue.startsWith("20") &&
                        newValue[2] !== ".") ||
                      newValue.length > maxLen
                    ) {
                      return; // Ignore the change
                    }

                    onChange(item.id || item.title, newValue, inputType);
                  }}
                  onKeyDown={(e) => {
                    // Prevent typing 'e', 'E', and '-'
                    if (
                      e.key === "e" ||
                      e.key === "E" ||
                      e.key === "." ||
                      e.key === "-"
                    ) {
                      e.preventDefault();
                    }
                  }}
                />
                <span
                  style={{
                    position: "absolute",
                    right: "25px",
                    color: "black",
                    top: "30%",
                    fontSize: "10px",
                  }}
                >
                  {item?.unit?.label}
                </span>
              </div>
            ) : type == PARAM_TYPE.TEXT ? (
              <div
                className="w-full"
                style={{
                  position: "relative",
                  display: "inline-block",
                  fontSize: `12px`
                }}
              >
                <input
                  type="text"
                  className="border rounded px-2 py-1 w-full"
                  placeholder={item?.defaultValue} // Uncommented if needed
                  value={customValue}
                  disabled={
                    item?.editable == 'disabled' && user.is_admin == false || disabled
                  }
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  onChange={(v: React.ChangeEvent<HTMLInputElement>) => {
                    const value = v.target.value; // Allow all characters
                    let doubledSheetNameProjectIndex = -1;
                    doubledSheetNameProjectIndex = emarineSheetNames.findIndex((sheet) => sheet?.sheet_name == value && value != '')

                    if (doubledSheetNameProjectIndex == -1)
                      setUniqueFieldError([])
                    onChange(item.id || item.title, value, inputType); // Pass the full value
                    if (value && value.trim() !== "") {
                      setRequiredFieldError((prev) =>
                        prev.filter((fieldId) => fieldId !== item.id)
                      );
                    }
                    if (value != "" && doubledSheetNameProjectIndex != -1) {

                      setUniqueFieldError((prev) =>
                        [item.id]
                      );
                    }
                  }}
                />
                <span
                  style={{
                    position: "absolute",
                    right: "25px",
                    color: "black",
                    top: "30%",
                    fontSize: "10px",
                  }}
                >
                  {item?.unit?.label}
                </span>
              </div>
            ) : type == PARAM_TYPE.DATE ? (
              <input
                type="date"
                className="border rounded px-2 py-1 w-full uppercase"
                value={customValue || ""}
                disabled={
                  item?.editable == 'disabled' && user.is_admin == false || disabled
                }
                onFocus={() => setFocused(true)}
                onChange={(v: any) => {
                  onChange(item.id || item.title, v.target.value, inputType);
                  if (v.target.value) {
                    setRequiredFieldError((prev) =>
                      prev.filter((fieldId) => fieldId !== item.id)
                    );
                  }
                }}
                onBlur={(v: any) => {
                  setFocused(false);
                  validateOnBlurAndOnKeyDown(v.target.value, item, onChange);
                }}
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                  if (e.key === "Enter") {
                    validateOnBlurAndOnKeyDown(
                      e.currentTarget.value,
                      item,
                      onChange
                    );
                  }
                }}
                min={minValueCreator(item)}
                max={maxValueCreator(item)}
              />
            ) : type == PARAM_TYPE.CHECKBOX ? (<div className="inline-flex items-center">
              <label className="flex items-center cursor-pointer relative">
                <input
                  type="checkbox"
                  checked={customValue}
                  className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-slate-800 checked:border-slate-800"
                  id="check"
                  onChange={(v: any) => {
                    onChange(item.id || item.title, v.target.checked, inputType);

                  }}
                />
                <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" strokeWidth="1">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                </span>
              </label>
            </div>) : null}
          </div>
        </>
      )}
    </div>
  );
};

export default CardItem;
