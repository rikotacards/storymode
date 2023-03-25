import { Typography } from "@mui/material";
import React from "react";
import styles from "./ProfilePersonalInfo.module.css";
export const ProfilePersonalInfo: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.firstNameLastName}>
        <Typography sx={{fontWeight: 'bold'}}>Max Hsu</Typography>
      </div>
      <div>Hi my name is Max, and I liked to create video content as well as websites. </div>
    </div>
  );
};
