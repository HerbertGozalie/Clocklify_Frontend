import { QueryFunctionContext } from "@tanstack/react-query";
import {
  ActivityCreatePayload,
  CreateActivityResponse,
  GetActivitiesResponse,
  GetSingleActivityResponse,
  UpdateActivityResponse,
  DeleteActivityResponse,
  FilterOptions,
  ActivityUpdatePayload,
} from "../types/activity";

import apiClient from "./apiClient";

export async function createActivity(
  payload: ActivityCreatePayload
): Promise<CreateActivityResponse> {
  const response = await apiClient.post<CreateActivityResponse>(
    `/api/v1/activity`,
    payload
  );
  return response.data;
}

export async function getAllActivities(
  params: FilterOptions
): Promise<GetActivitiesResponse> {
  const queryParams = new URLSearchParams();

  if (params.description) queryParams.append("description", params.description);
  if (params.sortBy) queryParams.append("sortBy", params.sortBy);
  if (params.locationCoords) {
    queryParams.append("lat", params.locationCoords.lat.toString());
    queryParams.append("lng", params.locationCoords.lng.toString());
  }

  const response = await apiClient.get<GetActivitiesResponse>(
    `/api/v1/activity?${queryParams.toString()}`
  );
  return response.data;
}

// export async function getAllActivities({
//   queryKey,
// }: QueryFunctionContext<
//   [string, string | null | undefined]
// >): Promise<GetActivitiesResponse> {
//   const [, filterOptions] = queryKey;

//   const response = await apiClient.get<GetActivitiesResponse>(
//     `/api/v1/activity?${filterOptions}`
//   );
//   return response.data;
// }

export async function getSingleActivity({
  queryKey,
}: QueryFunctionContext<
  [string, string | null | undefined]
>): Promise<GetSingleActivityResponse> {
  const [, uuid] = queryKey;
  const response = await apiClient.get<GetSingleActivityResponse>(
    `/api/v1/activity/${uuid}`
  );
  return response.data;
}

export async function updateActivity(
  payload: ActivityUpdatePayload
): Promise<UpdateActivityResponse> {
  const response = await apiClient.patch<UpdateActivityResponse>(
    `/api/v1/activity/${payload.uuid}`,
    payload
  );
  return response.data;
}

export async function deleteActivity(
  uuid: string
): Promise<DeleteActivityResponse> {
  const response = await apiClient.delete<DeleteActivityResponse>(
    `/api/v1/activity/${uuid}`
  );
  return response.data;
}
