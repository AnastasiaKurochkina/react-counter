import { memo, useState } from "react";
import { EventTypes } from "../../App";
import styles from "./counter.module.css";

interface TimerProps {
  addEvent: (eventType: EventTypes) => void;
}

export const Counter: React.FC<TimerProps> = memo(({ addEvent }) => {
  const [counter, setCounter] = useState(0);
  const [number, setNumber] = useState("");
  const increment = () => {
    setCounter((prevState) => prevState + 1);
    addEvent(EventTypes.increment);
  };

  const decrement = () => {
    setCounter((prevState) => prevState - 1);
    addEvent(EventTypes.decrement);
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (/^[0-9]+$/.test(value)) {
      setNumber(value);
      setCounter((prevState) => prevState + Number(value));
    } else {
      setNumber("");
    }
  };

  const resetCounter = () => {
    setCounter(0);
    addEvent(EventTypes.reset);
  };

  return (
    <>
      <div className={styles.counterContainer}>
        <div className={styles.counter}>{counter}</div>
        <div className={styles.actionContainer}>
          <button className={styles.button} onClick={increment}>
            +
          </button>
          <button className={styles.button} onClick={decrement}>
            -
          </button>
        </div>
      </div>
      <div>
        <input
          type="text"
          className={styles.input}
          value={number}
          onChange={handleInput}
        />
      </div>
      <button className={styles.button} onClick={resetCounter}>
        Сбросить счетчик
      </button>
    </>
  );
});
