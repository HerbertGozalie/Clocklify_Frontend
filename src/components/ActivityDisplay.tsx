import { useQueryClient, useMutation } from "@tanstack/react-query";
import { FaLocationDot } from "react-icons/fa6";
import { GoClockFill } from "react-icons/go";
import { deleteActivity } from "../services/ActivitiesService";
import { useState } from "react";
import { Link } from "react-router-dom";

interface ActivityDisplayProps {
  uuid: string;
  description: string;
  duration: string;
  location_lat: number;
  location_lng: number;
  distance?: number;
  startTime: string;
  endTime: string;
}

const ActivityDisplay = ({
  uuid,
  description,
  duration,
  location_lat,
  location_lng,
  distance,
  startTime,
  endTime,
}: ActivityDisplayProps) => {
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const { mutate: deleteAct } = useMutation({
    mutationFn: deleteActivity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["activities"] });
    },
  });

  const handleDelete = ({ uuid }: { uuid: string }) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this activity?"
    );
    if (confirmDelete) {
      setIsDeleting(true);
      deleteAct(uuid);
      setTimeout(() => {
        setIsDeleting(false);
      }, 100);
    }
    return;
  };

  const trimDescription = (description: string) => {
    return description.length > 15
      ? description.substring(0, 15) + "..."
      : description;
  };

  return (
    <>
      <div className="overflow-x-hidden">
        <div
          className={`w-full relative transform group ${
            isDeleting
              ? "duration-500 opacity-0 translate-x-full"
              : "duration-200 hover:bg-t-dark-blue hover:-translate-x-[60px] "
          }`}
        >
          <Link to={`/activity/${uuid}`}>
            <div className="flex justify-between p-10">
              <div className="flex flex-col">
                <p className="text-sm font-bold">{duration}</p>
                <div className="flex flex-row items-center">
                  <span className="text-xs text-f-light-grey mr-5">
                    <GoClockFill />
                  </span>
                  <span className="text-xs text-f-light-grey">
                    {startTime} - {endTime}
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <p className="text-sm font-semibold mb-2">
                  {trimDescription(description)}
                </p>
                <div className="flex flex-row">
                  <span className="text-f-light-grey mr-2 text-xs">
                    <FaLocationDot />
                  </span>
                  <span className="text-f-light-grey text-xs ">
                    Location: {location_lat}, {location_lng}
                    {distance && (
                      <span className="ml-2">
                        ({Math.round(distance)}m away)
                      </span>
                    )}
                  </span>
                </div>
              </div>
            </div>
          </Link>

          <button
            onClick={() => handleDelete({ uuid })}
            className="absolute right-[-60px] top-0 w-auto h-full bg-red-400 text-white cursor-pointer group-hover:right-[-60px] transition-all duration-300 flex items-center justify-center px-6"
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
};

export default ActivityDisplay;
