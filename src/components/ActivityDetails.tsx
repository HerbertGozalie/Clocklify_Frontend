import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ToastContainer, toast } from "react-toastify";
import {
  deleteActivity,
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
  const queryClient = useQueryClient();

  const { formatDate, formatDateTime } = useTimer();
  const [descriptionDetails, setDescriptionDetails] = useState<string>("");
  const [startTimeDetails, setStartTimeDetails] = useState<string>("");
  const [startDateDetails, setStartDateDetails] = useState<string>("");
  const [endTimeDetails, setEndTimeDetails] = useState<string>("");
  const [endDateDetails, setEndDateDetails] = useState<string>("");
  const [locationLatDetails, setLocationLatDetails] = useState<number>(0);
  const [locationLngDetails, setLocationLngDetails] = useState<number>(0);
  const [durationDetails, setDurationDetails] = useState<number>(0);
  const [errorDetails, setErrorDetails] = useState<string>("");
  const [hasErrorDetails, setHasErrorDetails] = useState(false);
  // const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const todayDate = new Date();

  const { isLoading, data, isError, error } = useQuery({
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
  const updateActivityMutation = useMutation({
    mutationFn: (newActivity: ActivityUpdatePayload) =>
      updateActivity(newActivity),
    onSuccess: () => {
      // navigate("/activity");
      toast.success("Activity updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["activities"] });
    },
    onError: (err) => {
      const errorMessage = getErrorMessage(err);
      setErrorDetails(errorMessage);
      setHasErrorDetails(true);
      console.error("Failed to save activity:", err);
    },
  });

  const handleSave = (onSave?: (data: ActivityUpdatePayload) => void) => {
    if (!descriptionDetails.trim()) {
      setErrorDetails("Please enter an activity description");
      setHasErrorDetails(true);
      return;
    }

    if (!locationLatDetails || !locationLngDetails) {
      setErrorDetails("Please enable location services to start tracking");
      setHasErrorDetails(true);
      return;
    }
    setErrorDetails("");
    setHasErrorDetails(false);

    const startDateTime = new Date(`${startDateDetails} ${startTimeDetails}`);
    const endDateTime = new Date(`${endDateDetails} ${endTimeDetails}`);

    const activityData = {
      uuid: uuid!,
      description: descriptionDetails,
      start_time: startDateTime.toISOString(),
      end_time: endDateTime.toISOString(),
      location_lat: locationLatDetails,
      location_lng: locationLngDetails,
    };

    if (onSave) {
      onSave(activityData);
    }
  };

  const handleSaveWithMutation = () => {
    handleSave((activityData) => {
      updateActivityMutation.mutate(activityData);
    });
  };

  const { mutate: deleteActDetails } = useMutation({
    mutationFn: deleteActivity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["activities"] });
    },
  });

  const handleDeleteDetails = ({ uuid }: { uuid: string }) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this activity?"
    );
    if (confirmDelete) {
      // setIsDeleting(true);
      deleteActDetails(uuid);
      setTimeout(() => {
        // setIsDeleting(false);
        navigate("/activity");
      }, 100);
    }
    return;
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

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
          createActivityMutation={updateActivityMutation}
        >
          <ErrorText error={hasErrorDetails}>{errorDetails}</ErrorText>
          <ToastContainer />
        </DescriptionInput>

        <TimeControls
          mode="edit"
          handleDelete={() => handleDeleteDetails({ uuid: uuid! })}
          handleSave={handleSaveWithMutation}
          createActivityMutation={updateActivityMutation}
        />
      </div>
    </div>
  );
};

export default ActivityDetails;
