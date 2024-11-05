import { EventTypes } from "../../App";
import styles from "./select.module.css";
interface SelectProps {
  handleSortType: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  typeEvents: typeof EventTypes;
}
export const Select: React.FC<SelectProps> = ({
  handleSortType,
  typeEvents,
}) => {
  return (
    <select className={styles.select} onChange={(e) => handleSortType(e)}>
      <option value="">Все типы</option>
      <option value={typeEvents.increment}>Увеличение счетчика</option>
      <option value={typeEvents.decrement}>Уменьшение счетчика</option>
      <option value={typeEvents.reset}>Сброс счетчика</option>
      <option value={typeEvents.play}>Запуск таймера</option>
      <option value={typeEvents.stop}>Остановка таймера</option>
    </select>
  );
};
