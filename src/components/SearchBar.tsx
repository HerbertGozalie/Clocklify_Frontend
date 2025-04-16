// import { useQuery } from "@tanstack/react-query";
// import { useState } from "react";
import { IoMdSearch } from "react-icons/io";
// import { ActivityProps, GetActivitiesResponse } from "../types/activity";
// import useDebounce from "../hooks/useDebounce";
// import { getAllActivities } from "../services/ActivitiesService";

// function SearchResult({
//   isLoading,
//   data,
// }: {
//   isLoading: boolean;
//   data: ActivityProps[];
// }) {
//   return (
//     <div className="flex flex-col pt-10 px-10 absolute -mt-10 w-full bg-white rounded-b-lg shadow-lg">
//       {isLoading && <div className="text-f-light-grey">Loading...</div>}
//       {data &&
//         data.map((item) => (
//           <div
//             className="text-black text-sm py-10 cursor-pointer"
//             key={item.uuid}
//           >
//             {item.description}
//           </div>
//         ))}
//     </div>
//   );
// }

const SearchBar = ({
  search,
  setSearch,
}: {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}) => {
  // const [search, setSearch] = useState("");

  // const debounceSearchTerm = useDebounce(search, 200);

  // const { data, isLoading, error } = useQuery<GetActivitiesResponse>({
  //   queryKey: ["search", debounceSearchTerm],
  //   queryFn: async () => {
  //     console.log("fetching", debounceSearchTerm);
  //     if (debounceSearchTerm.trim().length > 0) {
  //       return await getAllActivities({ description: debounceSearchTerm });
  //     }

  //     return {
  //       status: "success",
  //       message: "No activities found",
  //       length: 0,
  //       data: {
  //         activities: [],
  //       },
  //     };
  //   },
  //   enabled: debounceSearchTerm.trim().length > 0,
  // });

  return (
    <>
      <div className="relative w-full">
        <div className="flex items-center w-full bg-white rounded-lg shadow-lg">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search activity"
            className="w-full p-10  border-none bg-transparent focus:outline-none text-black text-sm"
          />
          <IoMdSearch className="fill-black cursor-pointer size-22" />
        </div>
        {/* Search results overlaying other components */}
        {/* {data && data.data.activities.length > 0 && (
          <SearchResult isLoading={isLoading} data={data.data.activities} />
        )}

        {error && (
          <div className="text-red-500 mt-2">
            Error fetching activities. Please try again.
          </div>
        )} */}
      </div>
    </>
  );
};

export default SearchBar;
