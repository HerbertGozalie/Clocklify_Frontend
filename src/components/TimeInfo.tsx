type TimeInfoProps = {
  startTime: string | null;
  startDate: string | null;
  endTime: string | null;
  endDate: string | null;
};

const TimeInfo = ({
  startTime,
  startDate,
  endTime,
  endDate,
}: TimeInfoProps) => {
  return (
    <>
      <div className="flex flex-row gap-90 mb-[2em]">
        <div className="flex w-90 h-70 flex-col items-center">
          <p className="text-white text-sm mb-2">Start Time</p>
          <p className="text-white font-bold text-xl">{startTime || "-"}</p>
          {(startTime && <p className="text-white text-xs">{startDate}</p>) ||
            "-"}
        </div>
        <div className="flex w-90 h-70 flex-col items-center">
          <p className="text-white text-sm mb-2">End Time</p>
          <p className="text-white font-bold text-xl">{endTime || "-"}</p>
          {(endTime && <p className="text-white text-xs">{endDate}</p>) || "-"}
        </div>
      </div>
    </>
  );
};

export default TimeInfo;
