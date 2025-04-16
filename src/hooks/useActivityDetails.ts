import { useQuery } from "@tanstack/react-query";
import { getSingleActivity } from "../services/ActivitiesService";

export default function useActivityDetails(activityUuid: string) {
  return useQuery({
    queryKey: ["activityDetails", activityUuid],
    queryFn: getSingleActivity,
  });
}
