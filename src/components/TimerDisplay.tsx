import { useState } from "react";
import useTimer from "../hooks/useTimer";

interface TimerDisplayProps {
  mode: "display" | "edit";
  time: number;
  onDurationChange?: (seconds: number) => void; // pass updated seconds to parent
  disabled?: boolean;
}

const TimerDisplay = ({
  mode,
  time,
  onDurationChange,
  disabled,
}: TimerDisplayProps) => {
  const { formatDurationTimer } = useTimer();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");

  const handleClick = () => {
    if (mode === "edit" && !disabled) {
      setInputValue(formatDurationTimer(time));
      setIsEditing(true);
    }
  };

  const parseToSeconds = (input: string): number => {
    const parts = input.split(":").map(Number).reverse();
    let seconds = 0;
    if (parts.length === 1) {
      seconds = parts[0];
    } else if (parts.length === 2) {
      seconds = parts[0] + parts[1] * 60;
    } else if (parts.length === 3) {
      seconds = parts[0] + parts[1] * 60 + parts[2] * 3600;
    }
    return seconds;
  };

  const commitChange = () => {
    const seconds = parseToSeconds(inputValue);
    if (onDurationChange) {
      onDurationChange(seconds); // Update parent with new duration in seconds
    }
    setInputValue(formatDurationTimer(seconds));
    setIsEditing(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      commitChange();
    } else if (event.key === "Escape") {
      setIsEditing(false);
    }
  };

  const handleBlur = () => {
    commitChange();
  };

  return (
    <div
      onClick={handleClick}
      className={`text-6xl font-bold mb-[1em] text-white cursor-pointer hover:text-f-light-orange transition-all duration-200 ${
        mode === "edit" && !disabled ? "hover:text-f-light-orange" : ""
      }`}
    >
      {mode === "edit" && isEditing ? (
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          autoFocus
          className="bg-transparent outline-none w-[250px] text-center text-f-light-orange"
          disabled={disabled}
        />
      ) : (
        <span>{formatDurationTimer(time)}</span>
      )}
    </div>
  );
};

export default TimerDisplay;
