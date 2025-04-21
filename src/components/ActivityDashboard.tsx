import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getAllActivities } from "../services/ActivitiesService";
import { FilterOptions } from "../types/activity";
import ActivityDisplay from "./ActivityDisplay";
import DateDisplay from "./DateDisplay";
import useTimer from "../hooks/useTimer";
import useDebounce from "../hooks/useDebounce";
import SearchBar from "./SearchBar";
import SortFilter from "./SortFilter";
import _ from "lodash";
import Loader from "./Loader";

const ActivityDashboard = () => {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"oldestdate" | "latestdate" | "nearby">(
    "latestdate"
  );
  const { locationCoords, formatDate, formatDateTime, formatDurationTimer } =
    useTimer();

  const debounceSearch = useDebounce(search, 100);

  const filterOptions: FilterOptions = {
    sortBy,
    locationCoords,
    description: debounceSearch.trim().length > 0 ? debounceSearch : undefined,
  };

  const { data: activities, isLoading } = useQuery({
    queryKey: ["activities", filterOptions],
    queryFn: () => getAllActivities(filterOptions),
    // staleTime: Infinity,
    retry: 1,
  });

  const groupByDate = activities?.data?.activities
    ? _.groupBy(activities.data.activities, (activities) =>
        formatDate(activities.start_time)
      )
    : {};

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center">
          <div className="flex flex-col">
            <div className="flex flex-col items-center w-[405px] md:w-md xl:w-3xl">
              <h1 className="text-4xl font-bold mb-[1.5em] text-white">
                Activity
              </h1>
              <div className="flex flex-row items-center gap-20 w-full">
                <SearchBar search={search} setSearch={setSearch} />
                <SortFilter sortBy={sortBy} setSortBy={setSortBy} />
              </div>
            </div>

            {isLoading ? (
              // <div className="text-center text-white opacity-60 mt-[2.7em]">
              //   Loading ...
              // </div>
              <Loader isLoading={isLoading} />
            ) : (
              <div className="grid gap-6 mt-[2.7em]">
                {activities?.data?.activities ||
                activities?.data.activities.length === 0 ? (
                  Object.entries(groupByDate).map(([date, activities]) => (
                    <div key={date}>
                      <DateDisplay startDate={date} />
                      {activities.map((activity) => (
                        <div key={activity.uuid} className="text-white">
                          <ActivityDisplay
                            description={activity.description}
                            startTime={formatDateTime(activity.start_time)}
                            endTime={formatDateTime(activity.end_time)}
                            duration={formatDurationTimer(activity.duration)}
                            location_lat={activity.location_lat}
                            location_lng={activity.location_lng}
                            distance={activity.distance}
                            uuid={activity.uuid}
                          />
                        </div>
                      ))}
                    </div>
                  ))
                ) : (
                  <div className="text-white text-center">
                    No activities found.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ActivityDashboard;
