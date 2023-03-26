import { useGetBreakpoints } from "@/hooks/useGetBreakpoint";
import { Avatar } from "@mui/material";
import React from "react";
import { ProfileActions } from "../ProfileActions/ProfileActions";
import { ProfileLinks } from "../ProfileLinks/ProfileLinks";
import { ProfilePersonalInfo } from "../ProfilePersonalInfo/ProfilePersonalInfo";
import { ProfileStats } from "../ProfileStats/ProfileStats";
import styles from "./ProfileHeader.module.css";
export const ProfileHeader: React.FC = () => {
  const isLessThanMd = useGetBreakpoints("sm");
  const px = isLessThanMd ? 90 : 180;

  return (
    <div className={styles.container}>
      <div className={styles.avatarContainer}>
        <Avatar sx={{ width: px, height: px }}>M</Avatar>
        {isLessThanMd && <ProfileActions/>}
      </div>
      <div>
        {!isLessThanMd && <ProfileActions />}
        <ProfileStats />
        {/* <ProfilePersonalInfo /> */}
        <ProfileLinks />
      </div>
    </div>
  );
};
