import useTimer from "../hooks/useTimer";
const TimerDisplay = ({ time }: { time: number }) => {
  const { formatDurationTimer } = useTimer();
  return (
    <>
      <div className="text-6xl font-bold mb-[1em] text-white">
        {formatDurationTimer(time)}
      </div>
    </>
  );
};

export default TimerDisplay;
