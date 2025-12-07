import { FC, useMemo } from "react";
import { SWITCH_DATA } from "../../utils/constant";
import { User } from "../../store/types/types";
import tokenService from "../../services/token.service";

interface SwitchComponentProps {
  item: any,
  type: string;
  value: string | undefined; // Allow undefined
  onChange: (v: number) => void;
  onFocus: () => void;
  onBlur: () => void;
}

const SwitchComponent: FC<SwitchComponentProps> = ({
  item,
  type,
  value = "0", // Provide a default string value
  onChange,
  onFocus,
  onBlur,
}) => {
  const switchData = useMemo(() => {
    if (Object.keys(SWITCH_DATA).includes(type)) {
      return Object.values(SWITCH_DATA[type]);
    }
    return [];
  }, [type]);
  const user: User = tokenService.getUser();

  // Ensure value is a number and handle undefined
  const checked = useMemo(() => {
    const parsedValue = parseInt(value, 10); // Parse value as an integer
    const s = switchData.find((s) => s?.id === parsedValue);
    return s ? s.id === 1 : false; // Default to false if not found
  }, [value, switchData]);

  return (
    <>
      {switchData.length === 2 && (
        <div className="flex items-center space-x-2">
          <span className="text-gray-700">{switchData[0].label}</span>
          {/* <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only"
              checked={checked} // Controlled input
              onChange={(e) => {
                onChange(e.target.checked ? 1 : 0);
              }}
            />
            
            <div className="w-12 h-6 bg-gray-200 rounded-full transition-colors duration-300 ease-in-out">
              <div
                className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${checked ? 'translate-x-6 bg-blue-500' : 'translate-x-0'
                  }`}
              />
            </div>
          </label> */}

          <label className="switch">
            <input
              type="checkbox"
              checked={checked}
              onFocus={onFocus}
              onBlur={onBlur} // Controlled input
              onChange={(e) => {
                onChange(e.target.checked ? 1 : 0);
              }}
              disabled={
                item?.editable == 'disabled' && user.is_admin == false || false
              }
            />
            <span className="slider"></span>
          </label>

          <span className="text-gray-700">{switchData[1].label}</span>
        </div>
      )}
    </>
  );
};

export default SwitchComponent;
