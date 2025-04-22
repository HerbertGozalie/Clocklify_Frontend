import { IoMdSearch } from "react-icons/io";

const SearchBar = ({
  search,
  setSearch,
}: {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      (event.target as HTMLInputElement).blur();
      // console.log("Search for:", search);
    }
  };

  return (
    <>
      <div className="relative w-full">
        <div className="flex items-center w-full bg-white rounded-lg shadow-lg">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search activity"
            className="w-full p-10  border-none bg-transparent focus:outline-none text-black text-sm"
          />
          <IoMdSearch
            className="fill-black cursor-pointer size-22"
            // onClick={() => {
            //   console.log("Search committed:", search);
            // }}
          />
        </div>
      </div>
    </>
  );
};

export default SearchBar;
