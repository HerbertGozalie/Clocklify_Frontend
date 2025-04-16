const DateDisplay = ({ startDate }: { startDate: string }) => {
  return (
    <>
      <div className="w-full px-10 py-5 bg-t-shade-blue">
        <p className="text-f-light-orange font-bold text-xs">{startDate}</p>
      </div>
    </>
  );
};

export default DateDisplay;
