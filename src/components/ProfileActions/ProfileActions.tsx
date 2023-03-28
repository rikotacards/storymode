import { Button, IconButton, Typography } from "@mui/material";
import React from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import styles from "./ProfileActions.module.css";
import { updateFollowers } from "@/firebase/followerFunctions";
import { useRouter } from "next/router";
import { useIsFollowing } from "@/hooks/useIsFollowing";
import { AuthContext, useAuth } from "@/context/AuthContext";
import {useGetUserInfo } from "@/hooks/useGetUserInfo";
import { getUserInfo } from "@/firebase/db";

export const ProfileActions: React.FC = () => {
  const router = useRouter();
  const { user } = useAuth();
  let uid = user?.uid;
  const profileUid = router.asPath.replace("/", "");
  const userInfo = useGetUserInfo(profileUid)
  const { isFollowingUser } = useIsFollowing(uid || "1", profileUid);
  const [displayedFollow, setDisplayedFollow] = React.useState(isFollowingUser);
  
  React.useEffect(() => {
    setDisplayedFollow(isFollowingUser);
  }, [uid, isFollowingUser]);
  const onFollowClick = () => {
    if (!uid) {
      return;
    }
    updateFollowers(uid, profileUid, !displayedFollow);
    setDisplayedFollow(!displayedFollow);
  };
  if(userInfo == undefined){
    return null
  }

  return (
    <div className={styles.container}>
      <div className={styles.layout}>
        <div style={{ marginRight: "8px" }}>
          <Typography style={{ fontWeight: "400", fontSize: 20 }}>
            {userInfo.username}
          </Typography>
        </div>
        <div>
          <Button
            onClick={onFollowClick}
            sx={{ borderRadius: 1 }}
            variant="contained"
          >
            {displayedFollow ? "Unfollow" : "Follow"}
          </Button>
        </div>
      </div>
      <IconButton sx={{ marginLeft: "auto" }}>
        <MoreHorizIcon />
      </IconButton>
    </div>
  );
};
