import { useCallback, useState } from "react";
import { Counter } from "./components/Counter/Counter";
import styles from "./app.module.css";
import Modal from "./components/Modal/Modal";
import { Button } from "./components/Button/Button";
import { History } from "./components/History/History";
import { Select } from "./components/Select/Select";
import { Sort } from "./components/Sort/Sort";

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
  const [isOpenModal, setIsOpenModal] = useState(false);
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
      if (type === selectType || selectType === null) {
        setFilteredEvents((prevState) => [...prevState, event]);
      }
    },
    [selectType]
  );

  const handleOpenModal = () => {
    setIsOpenModal((prev) => !prev);
  };

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
        <Counter addEvent={addEvent} onOpenModal={handleOpenModal} />
        {isOpenModal && (
          <Modal onClose={handleOpenModal}>
            <h2>Счетчик не может быть отрицательным!</h2>
            <Button onClick={handleOpenModal}>Закрыть</Button>
          </Modal>
        )}
        <div className={styles.historyContainer}>
          <Button onClick={handleHistory}>История</Button>
          {showHistory && events.length > 0 && (
            <>
              <div className={styles.historyAction}>
                <Sort handleSortTime={handleSortTime} sortTime={sortTime} />
                <Select
                  handleSortType={handleSortType}
                  typeEvents={typeEvents}
                />
              </div>
              <History events={filteredEvents} />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default App;
