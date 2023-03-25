import React from "react";
import styles from "./ProfileStats.module.css";
export const ProfileStats: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.stats}>
        <span style={{ fontWeight: "600" }}>1</span> posts
      </div>
      <div className={styles.stats}>
        <span style={{ fontWeight: "600" }}>145</span> followers
      </div>
      <div className={styles.stats}>
        <span style={{ fontWeight: "600" }}>0</span> following
      </div>
    </div>
  );
};
