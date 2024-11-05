import { ReactNode } from "react";
import styles from "./button.module.css";
interface ButtonProps {
    onClick: () => void;
    children: ReactNode;
}
export const Button: React.FC<ButtonProps> = ({onClick, children}) => {
    return (
        <button onClick={onClick} className={styles.button}>{children}</button>
    )
    
}
