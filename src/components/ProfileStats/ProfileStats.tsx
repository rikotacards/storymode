import { useAuth } from "@/context/AuthContext";
import { useGetUidFromUsername } from "@/hooks/useFetchUidFromUsername";
import { useGetUserInfo } from "@/hooks/useGetUserInfo";
import { useRouter } from "next/router";
import React from "react";
import styles from "./ProfileStats.module.css";
export const ProfileStats: React.FC = () => {
  const route = useRouter();
  const username = route.query.username as string;

  const userInfoRes = useGetUserInfo(username)
  return (  
    <div className={styles.container}>
      <div className={styles.stats}>
        <div style={{ fontWeight: "600" }}>{userInfoRes.data?.postCount || 0}</div> 
        <div>posts</div>
      </div>
      <div className={styles.stats}>
        <div style={{ fontWeight: "600" }}>{userInfoRes.data?.followersCount || 0}</div> 
        <div>followers</div>
      </div>
      <div className={styles.stats}>
        <div style={{ fontWeight: "600" }}>{userInfoRes.data?.followingCount || 0}</div>
        <div>following</div>
      </div>
    </div>
  );
};
