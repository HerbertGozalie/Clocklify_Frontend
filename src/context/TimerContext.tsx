import { createContext, useEffect, useState } from "react";
import { ActivityCreatePayload } from "../types/activity";

interface TimerContextType {
  time: number;
  isRunning: boolean;
  startTime: string;
  startDate: string;
  endTime: string;
  endDate: string;
  location: string;
  description: string;
  isStopped: boolean;
  handleStart: () => void;
  handleStop: () => void;
  handleSave: (onSave?: (data: ActivityCreatePayload) => void) => void;
  handleReset: () => void;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
  hasError: boolean;
  setHasError: React.Dispatch<React.SetStateAction<boolean>>;
  locationCoords: {
    lat: number;
    lng: number;
  } | null;
  formatDateTime: (date: Date) => string;
  formatDate: (date: Date) => string;
  formatDurationTimer: (seconds: number) => string;
}

const TimerContext = createContext<TimerContextType | undefined>(undefined);

export function TimerProvider({ children }: { children: React.ReactNode }) {
  const [time, setTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [isStopped, setIsStopped] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [hasError, setHasError] = useState(false);
  const [locationCoords, setLocationCoords] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            const roundedLatitude = latitude.toFixed(5);
            const roundedLongitude = longitude.toFixed(5);
            setLocationCoords({
              lat: Number(roundedLatitude),
              lng: Number(roundedLongitude),
            });
            setLocation(`${roundedLatitude}, ${roundedLongitude}`);
          },
          (error) => {
            console.error("Error getting location:", {
              code: error.code,
              message: error.message,
              PERMISSION_DENIED: error.PERMISSION_DENIED,
              POSITION_UNAVAILABLE: error.POSITION_UNAVAILABLE,
              TIMEOUT: error.TIMEOUT,
            });
            setError(
              `Failed to get location: ${error.message}. Please enable location services and refresh the page.`
            );
          },
          {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
        setError("Geolocation is not supported by your browser.");
      }
    };
    getLocation();
  }, []);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatDateTime = (date: Date): string => {
    return new Date(date).toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const formatDate = (date: Date): string => {
    return new Date(date).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "2-digit",
    });
  };

  const formatDurationTimer = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(remainingSeconds).padStart(2, "0")}`;
  };

  const handleStart = () => {
    if (!locationCoords) {
      setError("Please enable location services to start tracking");
      setHasError(true);
      return;
    }
    setError("");
    setIsRunning(true);
    setIsStopped(false);
    const now = new Date();
    setStartTime(formatDateTime(now));
    setStartDate(formatDate(now));
  };

  const handleStop = () => {
    setIsRunning(false);
    setIsStopped(true);
    const now = new Date();
    setEndTime(formatDateTime(now));
    setEndDate(formatDate(now));
  };

  const handleReset = () => {
    setTime(0);
    setIsRunning(false);
    setIsStopped(false);
    setStartTime("");
    setStartDate("");
    setEndTime("");
    setEndDate("");
    setDescription("");
    setError("");
    setHasError(false);
  };

  const handleSave = (onSave?: (data: ActivityCreatePayload) => void) => {
    if (!description.trim()) {
      setError("Please enter an activity description");
      setHasError(true);
      return;
    }

    if (!locationCoords) {
      setError("Please enable location services to start tracking");
      setHasError(true);
      return;
    }
    setError("");
    setHasError(false);

    const startDateTime = new Date(`${startDate} ${startTime}`);
    const endDateTime = new Date(`${endDate} ${endTime}`);

    const activityData = {
      description: description,
      start_time: startDateTime.toISOString(),
      end_time: endDateTime.toISOString(),
      location_lat: locationCoords.lat,
      location_lng: locationCoords.lng,
    };

    if (onSave) {
      onSave(activityData);
    }
  };

  return (
    <TimerContext.Provider
      value={{
        time,
        isRunning,
        startTime,
        startDate,
        endTime,
        endDate,
        location,
        description,
        isStopped,
        handleStart,
        handleStop,
        handleSave,
        handleReset,
        setDescription,
        error,
        setError,
        hasError,
        locationCoords,
        setHasError,
        formatDateTime,
        formatDate,
        formatDurationTimer,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
}

export default TimerContext;
