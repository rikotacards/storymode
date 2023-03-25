import { Avatar } from "@mui/material";
import React from "react";
import { ProfileActions } from "../ProfileActions/ProfileActions";
import { ProfileLinks } from "../ProfileLinks/ProfileLinks";
import { ProfilePersonalInfo } from "../ProfilePersonalInfo/ProfilePersonalInfo";
import { ProfileStats } from "../ProfileStats/ProfileStats";
import styles from './ProfileHeader.module.css'
export const ProfileHeader: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.avatarContainer}>
        <Avatar sx={{width: 180, height: 180}}>M</Avatar>
      </div>
      <div>
        <ProfileActions />
        <ProfileStats />
        <ProfilePersonalInfo />
        <ProfileLinks/>
      </div>
    </div>
  );
};
