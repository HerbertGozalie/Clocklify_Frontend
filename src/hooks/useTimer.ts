import { useContext } from "react";
import TimerContext from "../context/TimerContext";

export default function useTimer() {
  const context = useContext(TimerContext);
  if (context === undefined) {
    throw new Error("useTimer must be used within an AuthProvider");
  }

  return context;
}
