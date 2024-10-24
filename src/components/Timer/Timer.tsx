import { memo, useRef, useState } from "react";
import { EventTypes } from "../../App";
import styles from "./timer.module.css";

interface TimerProps {
  addEvent: (eventType: EventTypes) => void;
}

export const Timer: React.FC<TimerProps> = memo(({ addEvent }) => {
  const [timer, setTimer] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const handleStart = () => {
    if (timerRef.current) {
      handleStop();
    }
    timerRef.current = setInterval(() => {
      setTimer((prevState) => prevState + 1);
    }, 1000);
    addEvent(EventTypes.play);
  };
  const handleStop = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null
    }
    addEvent(EventTypes.stop);
  };
  return (
    <>
      <p className={styles.timer}>{timer}</p>
      <div className={styles.actionContainer}>
        <button className={styles.button} onClick={handleStart}>
          Play
        </button>
        <button className={styles.button} onClick={handleStop}>
          Stop
        </button>
      </div>
    </>
  );
});
