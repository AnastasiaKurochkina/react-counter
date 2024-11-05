import { Events } from "../../App";
import styles from "./history.module.css";
interface HistoryProprs {
    events: Events[]
}
export const History: React.FC<HistoryProprs> = ({events}) => {
  return (
    <ul className={styles.history}>
      {events.map((item, index) => (
        <li className={styles.historyItem} key={index}>
          {item.type} - {item.date} - {item.time}
        </li>
      ))}
    </ul>
  );
};
