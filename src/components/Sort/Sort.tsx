import styles from "./sort.module.css";
import SortIcon from "../../assets/icons/sort.svg";
interface SortProps {
  handleSortTime: () => void;
  sortTime: boolean;
}
export const Sort: React.FC<SortProps> = ({ handleSortTime, sortTime }) => {
  return (
    <div className={styles.timeSortContainer}>
      <button className={styles.timeSort} onClick={handleSortTime}>
        {sortTime ? "Сначала старые" : "Сначала новые"}
      </button>
      <img src={SortIcon} alt="sort" />
    </div>
  );
};
