import { useAuth } from "@/context/AuthContext";
import { getUserInfo } from "@/firebase/db";
import React from "react";
import styles from "./ProfileStats.module.css";
export const ProfileStats: React.FC = () => {
  const auth = useAuth();
  const [dPostCount, setDPostCount] = React.useState<number | null>();
  const [dFollowersCount, setDFollowersCount] = React.useState<number | null>();
  const [dFollowingCount, setDFollowingCount] = React.useState<number | null>();
  React.useEffect(() => {
    
    auth.user?.uid && getUserInfo(auth.user.uid).then((data) => {
      if(data){
        setDPostCount(data.postCount)
        setDFollowersCount(data.followersCount)
        setDFollowingCount(data.followingCount);
      }
    })
  }, [auth])
  
  return (
    <div className={styles.container}>
      <div className={styles.stats}>
        <span style={{ fontWeight: "600" }}>{dPostCount || 0}</span> posts
      </div>
      <div className={styles.stats}>
        <span style={{ fontWeight: "600" }}>{dFollowersCount || 0}</span> followers
      </div>
      <div className={styles.stats}>
        <span style={{ fontWeight: "600" }}>{dFollowingCount || 0}</span> following
      </div>
    </div>
  );
};
