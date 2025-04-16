export interface ActivityProps {
  uuid: string;
  description: string;
  start_time: Date;
  end_time: Date;
  duration: number;
  location_lat: number;
  location_lng: number;
  distance?: number;
}

export interface ActivityCreatePayload {
  description: string;
  start_time: string;
  end_time: string;
  location_lat: number;
  location_lng: number;
}

export interface ActivityUpdatePayload {
  uuid: string;
  description: string;
  start_time: string;
  end_time: string;
  location_lat: number;
  location_lng: number;
}

export interface CreateActivityResponse {
  status: string;
  message: string;
  data: {
    activity: ActivityProps;
  };
}

export interface GetActivitiesResponse {
  status: string;
  message: string;
  length: number;
  data: {
    activities: ActivityProps[];
  };
}

export interface GetSingleActivityResponse {
  status: string;
  message: string;
  activity: ActivityProps;
}

export interface UpdateActivityResponse {
  status: string;
  message: string;
  data: {
    activity: ActivityProps;
  };
}

export interface DeleteActivityResponse {
  status: string;
  message: string;
}

export interface FilterOptions {
  description?: string;
  sortBy?: "oldestdate" | "latestdate" | "nearby";
  locationCoords?: {
    lat: number;
    lng: number;
  } | null;
}
