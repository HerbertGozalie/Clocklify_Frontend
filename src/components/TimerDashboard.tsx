import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ToastContainer, toast } from "react-toastify";
import { createActivity } from "../services/ActivitiesService";
import { useNavigate } from "react-router-dom";
import TimerDisplay from "./TimerDisplay";
import TimeInfo from "./TimeInfo";
import LocationInfo from "./LocationInfo";
import DescriptionInput from "./DescriptionInput";
import TimeControls from "./TimeControls";
import ErrorText from "./ErrorText";
import { getErrorMessage } from "../services/HandleApiError";
import useTimer from "../hooks/useTimer";
import { ActivityCreatePayload } from "../types/activity";

const TimerDashboard = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
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
    handleReset,
    handleSave,
    setDescription,
    error,
    setError,
    hasError,
    setHasError,
  } = useTimer();

  // Activity creation mutation
  const createActivityMutation = useMutation({
    mutationFn: (newActivity: ActivityCreatePayload) =>
      createActivity(newActivity),
    onSuccess: () => {
      toast.success("Activity created successfully!");
      queryClient.invalidateQueries({ queryKey: ["activities"] });
      setTimeout(() => {
        handleReset();
        navigate("/activity");
      }, 2000);
    },
    onError: (err) => {
      const errorMessage = getErrorMessage(err);
      setError(errorMessage);
      setHasError(true);
      console.error("Failed to save activity:", err);
    },
  });

  const handleSaveWithMutation = () => {
    handleSave((activityData) => {
      createActivityMutation.mutate(activityData);
    });
  };

  return (
    <div className="flex justify-center">
      <div className="flex flex-col items-center p-10">
        <h1 className="text-4xl font-bold mb-[3em] text-white">Timer</h1>

        <TimerDisplay time={time} />

        <TimeInfo
          startTime={startTime}
          startDate={startDate}
          endTime={endTime}
          endDate={endDate}
        />

        <LocationInfo location={location} />

        <DescriptionInput
          description={description}
          setDescription={setDescription}
          createActivityMutation={createActivityMutation}
        >
          <ErrorText error={hasError}>{error}</ErrorText>
          <ToastContainer />
        </DescriptionInput>

        <TimeControls
          mode="timer"
          isRunning={isRunning}
          isStopped={isStopped}
          handleStart={handleStart}
          handleStop={handleStop}
          handleReset={handleReset}
          handleSave={handleSaveWithMutation}
          createActivityMutation={createActivityMutation}
        />
      </div>
    </div>
  );
};

export default TimerDashboard;
