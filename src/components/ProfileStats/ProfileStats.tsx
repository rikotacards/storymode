import { useAuth } from "@/context/AuthContext";
import { getUserInfo } from "@/firebase/db";
import { useGetUserInfo } from "@/hooks/useGetUserInfo";
import { useRouter } from "next/router";
import React from "react";
import styles from "./ProfileStats.module.css";
export const ProfileStats: React.FC = () => {
  const auth = useAuth();
  const route = useRouter();
  const uid = route.query.username as string;
  const userInfo = useGetUserInfo(uid)
  
  return (
    <div className={styles.container}>
      <div className={styles.stats}>
        <span style={{ fontWeight: "600" }}>{userInfo?.postCount || 0}</span> posts
      </div>
      <div className={styles.stats}>
        <span style={{ fontWeight: "600" }}>{userInfo?.followersCount || 0}</span> followers
      </div>
      <div className={styles.stats}>
        <span style={{ fontWeight: "600" }}>{userInfo?.followingCount || 0}</span> following
      </div>
    </div>
  );
};
