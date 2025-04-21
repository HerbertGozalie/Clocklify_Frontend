import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { enGB } from "date-fns/locale";
import { useState, useEffect } from "react";
import useTimer from "../hooks/useTimer";

registerLocale("en-GB", enGB);

type TimeInfoProps = {
  mode: "display" | "edit";
  startTime: string | null;
  startDate: string | null;
  endTime: string | null;
  endDate: string | null;
  onTimeChangeStart?: (time: string) => void;
  onTimeChangeEnd?: (time: string) => void;
  onDateChangeStart?: (date: string) => void;
  onDateChangeEnd?: (date: string) => void;
  disabled?: boolean;
};

const TimeInfo = ({
  mode,
  startTime,
  startDate,
  endTime,
  endDate,
  onTimeChangeStart,
  onTimeChangeEnd,
  onDateChangeStart,
  onDateChangeEnd,
  disabled,
}: TimeInfoProps) => {
  const [isEditingStart, setIsEditingStart] = useState(false);
  const [isEditingEnd, setIsEditingEnd] = useState(false);
  const [inputStartTime, setInputStartTime] = useState(startTime || "");
  const [inputEndTime, setInputEndTime] = useState(endTime || "");
  const [inputStartDate, setInputStartDate] = useState<Date | null>(null);
  const [inputEndDate, setInputEndDate] = useState<Date | null>(null);

  const { formatDate } = useTimer();

  useEffect(() => {
    if (startDate) {
      const parsedDate = new Date(startDate);
      if (!isNaN(parsedDate.getTime())) {
        // => check if date is valid
        setInputStartDate(parsedDate);
      }
    }
    if (endDate) {
      const parsedDate = new Date(endDate);
      if (!isNaN(parsedDate.getTime())) {
        // => check if date is valid
        setInputEndDate(parsedDate);
      }
    }
  }, [startDate, endDate]);

  const normalizeToHHMMSS = (input: string): string => {
    const clean = input.replace(/\D/g, "");
    const padded = clean.padStart(6, "0");
    const hours = padded.slice(0, 2);
    const minutes = padded.slice(2, 4);
    const seconds = padded.slice(4, 6);
    return `${hours}:${minutes}:${seconds}`;
  };

  const handleStartDateChange = (date: Date | null) => {
    setInputStartDate(date);
    if (date && onDateChangeStart) {
      onDateChangeStart(formatDate(date));
    }
  };

  const handleEndDateChange = (date: Date | null) => {
    setInputEndDate(date);
    if (date && onDateChangeEnd) {
      onDateChangeEnd(formatDate(date));
    }
  };

  const handleBlurStart = () => {
    const formatted = normalizeToHHMMSS(inputStartTime);
    onTimeChangeStart?.(formatted);
    setIsEditingStart(false);
  };

  const handleBlurEnd = () => {
    const formatted = normalizeToHHMMSS(inputEndTime);
    onTimeChangeEnd?.(formatted);
    setIsEditingEnd(false);
  };

  const handleKeyDownStart = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === "Escape") handleBlurStart();
  };

  const handleKeyDownEnd = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === "Escape") handleBlurEnd();
  };

  return (
    <div className="flex flex-row gap-90 mb-[2em]">
      {/* Start Time */}
      <div className="flex w-90 h-70 flex-col items-center">
        <p className="text-white text-sm mb-2">Start Time</p>
        <div
          onClick={() => {
            if (mode === "edit" && !disabled) {
              setIsEditingStart(true);
              setInputStartTime(startTime || "");
            }
          }}
          className={`text-white font-bold text-xl cursor-pointer transition-all duration-200 ${
            mode === "edit" && !disabled ? "hover:text-f-light-orange" : ""
          }`}
        >
          {mode === "edit" && isEditingStart ? (
            <input
              type="text"
              value={inputStartTime}
              onChange={(e) => setInputStartTime(e.target.value)}
              onBlur={handleBlurStart}
              onKeyDown={handleKeyDownStart}
              autoFocus
              className="bg-transparent outline-none w-[100px] text-center text-f-light-orange"
              disabled={disabled}
            />
          ) : (
            <p>{startTime || "-"}</p>
          )}
        </div>
        <div className="text-white text-xs">
          {mode === "edit" && !disabled ? (
            <DatePicker
              locale={enGB}
              selected={inputStartDate}
              onChange={handleStartDateChange}
              dateFormat="d MMM yy"
              className="rounded p-2 cursor-pointer hover:bg-t-shade-blue w-[70px] text-center"
              disabled={disabled}
            />
          ) : (
            <p>{startTime ? startDate : "-"}</p>
          )}
        </div>
      </div>

      {/* End Time */}
      <div className="flex w-90 h-70 flex-col items-center">
        <p className="text-white text-sm mb-2">End Time</p>
        <div
          onClick={() => {
            if (mode === "edit" && !disabled) {
              setIsEditingEnd(true);
              setInputEndTime(endTime || "");
            }
          }}
          className={`text-white font-bold text-xl cursor-pointer transition-all duration-200 ${
            mode === "edit" && !disabled ? "hover:text-f-light-orange" : ""
          }`}
        >
          {mode === "edit" && isEditingEnd ? (
            <input
              type="text"
              value={inputEndTime}
              onChange={(e) => setInputEndTime(e.target.value)}
              onBlur={handleBlurEnd}
              onKeyDown={handleKeyDownEnd}
              autoFocus
              className="bg-transparent outline-none w-[100px] text-center text-f-light-orange"
              disabled={disabled}
            />
          ) : (
            <p>{endTime || "-"}</p>
          )}
        </div>
        <div className="text-white text-xs">
          {mode === "edit" && !disabled ? (
            <DatePicker
              locale={enGB}
              selected={inputEndDate}
              onChange={handleEndDateChange}
              dateFormat="d MMM yy"
              className="rounded p-2 cursor-pointer hover:bg-t-shade-blue w-[70px] text-center"
              disabled={disabled}
            />
          ) : (
            <p>{endTime ? endDate : "-"}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TimeInfo;
