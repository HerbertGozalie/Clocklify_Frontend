import React from "react";

interface SortFilterProps {
  sortBy: "oldestdate" | "latestdate" | "nearby";
  setSortBy: React.Dispatch<
    React.SetStateAction<"oldestdate" | "latestdate" | "nearby">
  >;
}

const SortFilter = ({ sortBy, setSortBy }: SortFilterProps) => {
  return (
    <div className="flex items-center w-1/5 bg-t-shade-blue rounded-lg shadow-lg px-10">
      <select
        value={sortBy}
        onChange={(e) =>
          setSortBy(e.target.value as "oldestdate" | "latestdate" | "nearby")
        }
        className="w-full py-10 focus:outline-none border-none bg-transparent text-white  text-sm"
      >
        <option value="latestdate">Latest Date</option>
        <option value="oldestdate">Oldest Date</option>
        <option value="nearby">Nearby</option>
      </select>
    </div>
  );
};

export default SortFilter;
