import { memo, useEffect, useRef, useState } from "react";
import { EventTypes } from "../../App";
import styles from "./counter.module.css";
import { Button } from "../Button/Button";

interface TimerProps {
  addEvent: (eventType: EventTypes) => void;
  onOpenModal: () => void;
}

export const Counter: React.FC<TimerProps> = memo(
  ({ addEvent, onOpenModal }) => {
    const [counter, setCounter] = useState(0);
    const [number, setNumber] = useState("");
    const [timer, setTimer] = useState(false)

    const increment = () => {
      setCounter((prevState) => prevState + 1);
      addEvent(EventTypes.increment);
    };

    const decrement = () => {
      if (counter - 1 < 0) {
        onOpenModal();
      } else {
        setCounter((prevState) => prevState - 1);
      }
      addEvent(EventTypes.decrement);
    };

    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      if (/^[0-9]+$/.test(value)) {
        setNumber(value);
      } else {
        setNumber("");
      }
    };

    const resetCounter = () => {
      setCounter(0);
      addEvent(EventTypes.reset);
    };

    const handlePlay = () => {
      setTimer(prev => !prev)
      addEvent(EventTypes.play);
    }

    const handeStop = () => {
      setTimer(prev => !prev)
      addEvent(EventTypes.stop);
    }

    useEffect(() => {
      let a: NodeJS.Timeout | null = null
      if (timer && number) {
        a = setTimeout(() => setCounter((prevState) => prevState + Number(number)), 1000);
      } else if (a) {
        clearTimeout(a);
      }
    }, [counter, timer]);

    return (
      <>
        <div className={styles.counterContainer}>
          <div className={styles.counter}>{counter}</div>
          <div className={styles.actionContainer}>
            <Button onClick={increment}>+</Button>
            <Button onClick={decrement}>-</Button>
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
        <div className={styles.actionContainer}>
          <Button onClick={resetCounter}>Сбросить счетчик</Button>
          <Button onClick={handlePlay}>Play</Button>
          <Button onClick={handeStop}>Stop</Button>
        </div>
      </>
    );
  }
);
