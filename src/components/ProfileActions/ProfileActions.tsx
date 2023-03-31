import { Button, Drawer, IconButton, Paper, Typography } from "@mui/material";
import React from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import styles from "./ProfileActions.module.css";
import { updateFollowers } from "@/firebase/followerFunctions";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";
import { useGetUserInfo } from "@/hooks/useGetUserInfo";
import { useGetUidFromUsername } from "@/hooks/useGetUidFromUsername";
import { useGetIsFollowing } from "@/hooks/useGetIsFollowing";
import { EditProfile } from "../EditProfile/EditProfile";

interface ProfileActionsProps {
  hideName?: boolean;
}

export const ProfileActions: React.FC<ProfileActionsProps> = ({ hideName }) => {
  const router = useRouter();
  const { uid } = useAuth();
  const [open, setOpen] = React.useState(false);
  const openDrawer = () => {
    setOpen(true)
  }
  const closeDrawer = () => {
    setOpen(false);
  }
  const usernameInPath = router.query.username as string;
  const uidFromUsernameRes = useGetUidFromUsername(usernameInPath);
  const { data: isFollowing } = useGetIsFollowing(
    uid || "",
    uidFromUsernameRes?.data?.uid
  );
  const [displayedFollow, setDisplayedFollow] = React.useState(!!isFollowing);
  const isMyProfile = uidFromUsernameRes?.data?.uid == uid;
  React.useEffect(() => {
    setDisplayedFollow(!!isFollowing);
  }, [uid, isFollowing]);
  const onFollowClick = () => {
    if (!uid || !uidFromUsernameRes?.data?.uid) {
      return;
    }
    if (!uid) {
      return;
    }
    updateFollowers(uid, uidFromUsernameRes?.data?.uid, !displayedFollow);
    setDisplayedFollow(!displayedFollow);
  };

  return (
    <div className={styles.container}>
      <div className={styles.layout}>
        {!hideName && (
          <div style={{ marginRight: "8px" }}>
            <Typography style={{ fontWeight: "400", fontSize: 20 }}>
              {usernameInPath}
            </Typography>
          </div>
        )}
        <div style={{display: 'flex', width: '100%', justifyContent:'space-around'}}>
          {!isMyProfile && (
            <Button
              onClick={onFollowClick}
              sx={{ borderRadius: 1, margin: 0.5 }}
              variant="contained"
              fullWidth
            >
              {displayedFollow ? "Unfollow" : "Follow"}
            </Button>
          )}
          {isMyProfile && (
            <div style={{display: 'flex', width: '100%'}}>
              <Button
                onClick={openDrawer}
                sx={{ borderRadius: 1, margin: 0.5 }}
                variant="contained"
                fullWidth
              >
                {"Edit Profile"}
              </Button>
              <Button
                onClick={onFollowClick}
                sx={{ borderRadius: 1, margin: 0.5 }}
                variant="contained"
                fullWidth
              >
                {"Share Profile"}
              </Button>
            </div>
          )}
        </div>
      </div>
      <Drawer sx={{display: 'flex', height: '100%'}} anchor={'bottom'} open={open}>
        <Paper style={{display: 'flex', height: '100vh'}}>
        <EditProfile onClose={closeDrawer}/>
        </Paper>
      </Drawer>
    </div>
  );
};
