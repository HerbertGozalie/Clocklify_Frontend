import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  // createActivity,
  getSingleActivity,
  updateActivity,
} from "../services/ActivitiesService";
import { useNavigate, useParams } from "react-router-dom";
import TimerDisplay from "./TimerDisplay";
import TimeInfo from "./TimeInfo";
import LocationInfo from "./LocationInfo";
import DescriptionInput from "./DescriptionInput";
import TimeControls from "./TimeControls";
import ErrorText from "./ErrorText";
import useTimer from "../hooks/useTimer";
import { getErrorMessage } from "../services/HandleApiError";
import { useEffect, useState } from "react";
import { ActivityUpdatePayload } from "../types/activity";
// import useActivityDetails from "../hooks/useActivityDetails";

const ActivityDetails = () => {
  const { uuid } = useParams();
  const navigate = useNavigate();
  // const queryClient = useQueryClient();

  const { formatDate, formatDateTime, handleReset } = useTimer();
  const [descriptionDetails, setDescriptionDetails] = useState<string>("");
  const [startTimeDetails, setStartTimeDetails] = useState<string>("");
  const [startDateDetails, setStartDateDetails] = useState<string>("");
  const [endTimeDetails, setEndTimeDetails] = useState<string>("");
  const [endDateDetails, setEndDateDetails] = useState<string>("");
  const [locationLatDetails, setLocationLatDetails] = useState<number>(0);
  const [locationLngDetails, setLocationLngDetails] = useState<number>(0);
  const [durationDetails, setDurationDetails] = useState<number>(0);
  const todayDate = new Date();

  const { isLoading, data, error } = useQuery({
    queryKey: ["activityDetails", uuid],
    queryFn: getSingleActivity,
  });

  useEffect(() => {
    if (data) {
      setDescriptionDetails(data.activity.description);
      setStartTimeDetails(formatDateTime(data.activity.start_time));
      setStartDateDetails(formatDate(data.activity.start_time));
      setEndTimeDetails(formatDateTime(data.activity.end_time));
      setEndDateDetails(formatDate(data.activity.end_time));
      setLocationLatDetails(data.activity.location_lat);
      setLocationLngDetails(data.activity.location_lng);
      setDurationDetails(data.activity.duration);
    }
  }, [data, formatDate, formatDateTime]);

  // Activity creation mutation
  const createActivityMutation = useMutation({
    mutationFn: (newActivity: ActivityUpdatePayload) =>
      updateActivity(newActivity),
    onSuccess: () => {
      navigate("/activity");
    },
    onError: (err) => {
      const errorMessage = getErrorMessage(err);
      setError(errorMessage);
      setHasError(true);
      console.error("Failed to save activity:", err);
    },
  });

  const handleSave = (onSave?: (data: ActivityUpdatePayload) => void) => {
    if (!form.description.trim()) {
      setError("Please enter an activity description");
      setHasError(true);
      return;
    }

    if (!form.location_lat || !form.location_lng) {
      setError("Please enable location services to start tracking");
      setHasError(true);
      return;
    }
    setError("");
    setHasError(false);

    const startDateTime = new Date(`${startDate} ${startTime}`);
    const endDateTime = new Date(`${endDate} ${endTime}`);

    const activityData = {
      description: activity,
      start_time: startDateTime.toISOString(),
      end_time: endDateTime.toISOString(),
      location_lat: locationCoords.lat,
      location_lng: locationCoords.lng,
    };

    if (onSave) {
      onSave(activityData);
    }
  };

  const handleSaveWithMutation = () => {
    handleSave((activityData) => {
      createActivityMutation.mutate(activityData);
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // if (isError) {
  //   return <div>Error: {error.message}</div>;
  // }

  return (
    <div className="flex justify-center">
      <div className="flex flex-col items-center p-10">
        <h1 className="text-4xl font-bold mb-[1em] text-white">Timer</h1>
        <p className="text-lg text-f-light-orange mb-[3em]">
          {formatDate(todayDate)}
        </p>
        <TimerDisplay time={durationDetails} />

        <TimeInfo
          startTime={startTimeDetails}
          startDate={startDateDetails}
          endTime={endTimeDetails}
          endDate={endDateDetails}
        />

        <LocationInfo
          location={`${locationLatDetails}, ${locationLngDetails}`}
        />

        <DescriptionInput
          description={descriptionDetails}
          setDescription={setDescriptionDetails}
          createActivityMutation={createActivityMutation}
        >
          {/* <ErrorText error={hasError}>{error}</ErrorText> */}
        </DescriptionInput>

        <TimeControls
          mode="edit"
          handleReset={handleReset}
          handleSave={handleSaveWithMutation}
          createActivityMutation={createActivityMutation}
        />
      </div>
    </div>
  );
};

export default ActivityDetails;
