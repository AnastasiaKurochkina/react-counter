import { useCallback, useState } from "react";
import { Timer } from "./components/Timer/Timer";
import { Counter } from "./components/Counter/Counter";
import styles from "./app.module.css";
import Sort from "./assets/icons/sort.svg";

export enum EventTypes {
  increment = "increment",
  decrement = "decrement",
  play = "play",
  stop = "stop",
  reset = "reset",
}

export interface Events {
  type: EventTypes;
  date: string;
  time: string;
}

const App = () => {
  const [events, setEvents] = useState<Events[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Events[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [sortTime, setSortTime] = useState(true);
  const [selectType, setSelectType] = useState<EventTypes | null>(null);
  const typeEvents = EventTypes;

  const addEvent = useCallback(
    (type: EventTypes) => {
      const now = new Date();
      const event: Events = {
        type: type,
        date: `${now.getDate()}:${now.getMonth() + 1}:${now.getFullYear()}`,
        time: `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`,
      };
      setEvents((prevEvents) => [...prevEvents, event]);
      if (type === selectType) {
        setFilteredEvents((prevState) => [...prevState, event]);
      }
    },
    [selectType]
  );

  const handleHistory = () => {
    setShowHistory((prevState) => !prevState);
    setFilteredEvents(events);
  };

  const handleSortTime = () => {
    setSortTime((prevState) => !prevState);
    setFilteredEvents((prevState) => [...prevState].reverse());
  };

  const handleSortType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const type = event.target.value;
    if (type === "") {
      setFilteredEvents(events);
      setSelectType(null);
    } else {
      const filteredEvents = events.filter((item) => item.type === type);
      setFilteredEvents(filteredEvents);
      setSelectType(type as EventTypes);
    }
  };

  return (
    <>
      <div className={styles.container}>
        <Counter addEvent={addEvent} />
        <Timer addEvent={addEvent} />
        <button className={styles.button} onClick={handleHistory}>
          История
        </button>
        {showHistory && events.length > 0 && (
          <>
            <div className={styles.historyAction}>
              <div className={styles.timeSortContainer}>
                <button className={styles.timeSort} onClick={handleSortTime}>
                  {sortTime ? "Сначала старые" : "Сначала новые"}{" "}
                </button>
                <img src={Sort} alt="sort" />
              </div>
              <select
                className={styles.select}
                onChange={(e) => handleSortType(e)}
              >
                <option value="">Все типы</option>
                <option value={typeEvents.increment}>
                  Увеличение счетчика
                </option>
                <option value={typeEvents.decrement}>
                  Уменьшение счетчика
                </option>
                <option value={typeEvents.reset}>Сброс счетчика</option>
                <option value={typeEvents.play}>Запуск таймера</option>
                <option value={typeEvents.stop}>Остановка таймера</option>
              </select>
            </div>
            <ul className={styles.history}>
              {filteredEvents.map((item, index) => (
                <li className={styles.historyItem} key={index}>
                  {item.type} - {item.date} - {item.time}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </>
  );
};

export default App;
