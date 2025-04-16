import { FaLocationDot } from "react-icons/fa6";

const LocationInfo = ({ location }: { location: string }) => {
  return (
    <>
      <div className="bg-t-shade-blue rounded-lg p-10 mb-40 w-2xs flex flex-row items-center justify-center">
        <span className="text-yellow-300 mr-2">
          <FaLocationDot />
        </span>
        <span className="text-white text-sm ">{location}</span>
      </div>
    </>
  );
};

export default LocationInfo;
