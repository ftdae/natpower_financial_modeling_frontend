import { useState, useRef, useEffect } from "react";
import dayjs from "dayjs";
import { FiCalendar } from "react-icons/fi";
import "./FinStatement.css";

const DateRangePicker = ({
  value,
  onChange,
  minDate,
  maxDate,
  size,
  onClearDates,
}: {
  value: { from: string; to: string };
  onChange: (v: { from: string; to: string }) => void;
  minDate: string;
  maxDate: string;
  size?: string;
  onClearDates: () => void;
}) => {
  const [fromDate, setFromDate] = useState(value.from);
  const [toDate, setToDate] = useState(value.to);
  useEffect(() => {
    setToDate(value.to)
  }, [value])
  const fromDateRef = useRef<HTMLInputElement>(null);
  const toDateRef = useRef<HTMLInputElement>(null);

  const handleFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (dayjs(newValue).isValid() && dayjs(newValue).isBefore(dayjs(toDate))) {
      setFromDate(newValue);
      onChange({ from: newValue, to: toDate });
    }
  };

  const handleToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (dayjs(newValue).isValid() && dayjs(newValue).isAfter(dayjs(fromDate))) {
      setToDate(newValue);
      onChange({ from: fromDate, to: newValue });
    }
  };

  const handleClearDates = () => {
    setFromDate(minDate);
    setToDate(maxDate);
    onClearDates();
  };

  return (
    <div className={`flex ${size === "sm" ? "gap-4" : "gap-2"}`}>
      <div className={`flex justify-between w-[200px] ${size === "sm" ? " h-[50px]" : ""} items-center bg-[#f6f6f7] border-[1px] border-[#E5E7EB] rounded-lg px-4 py-2 `}>
        <div>
          <label className="text-gray-500 text-xs mb-2">From</label>
          <div className="flex items-center">
            <input
              type="date"
              value={fromDate}
              min={minDate}
              max={toDate}
              onChange={handleFromChange}
              onFocus={(e) => e.target.showPicker()}
              ref={fromDateRef}
              className="custom-date-input bg-transparent text-black text-sm outline-none "
            />
          </div>
        </div>

        <FiCalendar
          color={"#6C737F"}
          size={20}
          className="ml-2 cursor-pointer"
          onClick={() => fromDateRef.current?.showPicker()}
        />
      </div>
      <div className={`flex justify-between w-[200px] ${size === "sm" ? " h-[50px]" : ""} items-center border-[1px] border-[#E5E7EB] rounded-lg px-4 py-2 `}>
        <div>
          <label className="text-gray-500 text-xs mb-2">To</label>
          <div className="flex items-center">
            <input
              type="date"
              value={toDate}
              min={fromDate}
              max={maxDate}
              onChange={handleToChange}
              onFocus={(e) => e.target.showPicker()}
              ref={toDateRef}
              className="custom-date-input bg-transparent text-black text-sm outline-none flex-grow"
            />
          </div>
        </div>

        <FiCalendar
          color={"#6C737F"}
          size={20}
          className="ml-2 cursor-pointer"
          onClick={() => toDateRef.current?.showPicker()}
        />
      </div>

      <button
        className={`px-4 py-2 ${size === "sm" ? "text-[13px]" : ""} font-semibold text-white rounded-lg bg-main hover:bg-gray-700`}
        onClick={handleClearDates}
      >
        Reset Dates
      </button>
    </div>
  );
};

export default DateRangePicker;
