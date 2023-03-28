import { Typography } from "@mui/material";
import React from "react";
import styles from "./ProfilePersonalInfo.module.css";
interface ProfilePersonalInfoProps {
  displayedName: string;
  bio: string;
}
export const ProfilePersonalInfo: React.FC<ProfilePersonalInfoProps> = (props) => {
  const {displayedName, bio} = props;
  
  return (
    <div className={styles.container}>
      <div className={styles.firstNameLastName}>
        <Typography sx={{fontWeight: 'bold'}}>{displayedName}</Typography>
      </div>
      <div>{bio}</div>
    </div>
  );
};
