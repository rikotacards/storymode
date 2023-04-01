import { useGetUidFromUsername } from "@/hooks/useGetUidFromUsername";
import { useGetUserInfo } from "@/hooks/useGetUserInfo";
import { Typography } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import styles from "./ProfileStats.module.css";
export const ProfileStats: React.FC = () => {
  const route = useRouter();
  const username = route.query.username as string;
  const uidFromUsernameRes = useGetUidFromUsername(username)
  const userInfoRes = useGetUserInfo(uidFromUsernameRes?.data?.uid)
  return (  
    <div className={styles.container}>
      <div className={styles.stats}>
        <div style={{ fontWeight: "600" }}>{userInfoRes.data?.postCount || 0}</div> 
        <Typography variant='body2'  style={{textTransform: 'capitalize' }}>posts</Typography>
      </div>
      <div className={styles.stats}>
        <div style={{ fontWeight: "600" }}>{userInfoRes.data?.followersCount || 0}</div> 
        <Typography variant='body2' style={{textTransform: 'capitalize' }}>followers</Typography>
      </div>
      <div className={styles.stats}>
        <div style={{ fontWeight: "600" }}>{userInfoRes.data?.followingCount || 0}</div>
        <Typography variant='body2' style={{textTransform: 'capitalize' }}>following</Typography>
      </div>
    </div>
  );
};
