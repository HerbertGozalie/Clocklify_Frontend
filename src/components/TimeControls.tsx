import Button from "./Button";

type TimeControlsProps = {
  mode: "timer" | "edit";
  isRunning?: boolean;
  isStopped?: boolean;
  handleStart?: () => void;
  handleStop?: () => void;
  handleReset?: () => void;
  handleSave?: () => void;
  handleDelete?: () => void;
  createActivityMutation: {
    isPending: boolean;
  };
};

const TimeControls = ({
  mode,
  isRunning,
  isStopped,
  handleStart,
  handleStop,
  handleReset,
  handleSave,
  handleDelete,
  createActivityMutation,
}: TimeControlsProps) => {
  return (
    <>
      <div className="flex gap-10 justify-center mt-30">
        {mode === "timer" ? (
          <>
            {!isRunning ? (
              isStopped ? (
                <>
                  <Button
                    onClick={handleSave}
                    className="w-[8rem]"
                    disabled={createActivityMutation.isPending}
                  >
                    {createActivityMutation.isPending ? "SAVING..." : "SAVE"}
                  </Button>
                  <Button
                    onClick={handleReset}
                    variant="secondary"
                    className="w-[8rem]"
                    disabled={createActivityMutation.isPending}
                  >
                    DELETE
                  </Button>
                </>
              ) : (
                <Button onClick={handleStart} className="w-[8rem]">
                  START
                </Button>
              )
            ) : (
              <>
                <Button onClick={handleStop} className="w-[8rem]">
                  STOP
                </Button>
                <Button
                  variant="secondary"
                  onClick={handleReset}
                  className="w-[8rem]"
                >
                  RESET
                </Button>
              </>
            )}
          </>
        ) : (
          // EditActivity logic
          <>
            <Button
              onClick={handleSave}
              className="w-[8rem]"
              disabled={createActivityMutation.isPending}
            >
              {createActivityMutation.isPending ? "UPDATING..." : "UPDATE"}
            </Button>
            <Button
              onClick={handleDelete}
              variant="secondary"
              className="w-[8rem]"
              disabled={createActivityMutation.isPending}
            >
              DELETE
            </Button>
          </>
        )}
      </div>
    </>
  );
};

export default TimeControls;
