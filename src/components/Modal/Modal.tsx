import React, { ReactNode } from 'react';
import styles from "./modal.module.css";

interface ModalProps {
    onClose: () => void;
    children: ReactNode
  }
  
  export const Modal: React.FC<ModalProps> = ({ onClose, children }) => {

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <button className={styles.close} onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
