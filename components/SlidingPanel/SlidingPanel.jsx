import React from 'react';
import styles from './SlidingPanel.module.css';

const SlidingPanel = ({ children }) => {
  return (
    <div className={styles.panelWrapper}>
      {/* <div className={styles.innerButton} onClick={handleTogglePanel}>
        Чаты
      </div> */}
      {children}
    </div>
  );
};

export default SlidingPanel;
