import { Button, Dialog, Drawer, IconButton, Paper, Typography } from "@mui/material";
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
import { copyToClipboard } from "@/utils/copyToClipboard";
import { SignInNewUser } from "../SignInNewUser/SignInNewUser";

interface ProfileActionsProps {
  hideName?: boolean;
}

export const ProfileActions: React.FC<ProfileActionsProps> = ({ hideName }) => {
  const router = useRouter();
  const { uid, isLoggedIn } = useAuth();
  const [open, setOpen] = React.useState(false);
  const openDrawer = () => {
    setOpen(true);
  };
  const [openLogin, setOpenLogin] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

  const copyClick = () => {
    copyToClipboard()
    setCopied(true);
    setTimeout(() => setCopied(false),2000)
  }
  const closeDrawer = React.useCallback(() => {
    setOpen(false);
  }, []);
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
    if(!isLoggedIn){
      setOpenLogin(true)
      return;
    }
    if (!uid || !uidFromUsernameRes?.data?.uid) {
      return;
    }
    if (!uid) {
      return;
    }
    updateFollowers(uid, uidFromUsernameRes?.data?.uid, !displayedFollow);
    setDisplayedFollow(!displayedFollow);
  };
  const editProfile = <EditProfile onClose={closeDrawer} />;

  return (
    <>
    <div className={styles.container}>
      <div className={styles.layout}>
        {!hideName && (
          <div style={{ marginRight: "8px" }}>
            <Typography style={{ fontWeight: "600", fontSize: 20 }}>
              {usernameInPath}
            </Typography>
          </div>
        )}
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-around",
          }}
        >
          {!isMyProfile && (
            <Button
              onClick={onFollowClick}
              sx={{ fontWeight: '400', borderRadius: 1, margin: '0px' }}
              variant="contained"
              fullWidth
              size='small'
            >
              <Typography variant='caption' sx={{fontWeight: '600',textTransform:'capitalize' }}>
                {displayedFollow ? "Unfollow" : "Follow"}
                </Typography>
            </Button>
          )}
          {isMyProfile && (
            <div style={{  display: "flex", width: "100%" }}>
              <Button
              size='small'
                onClick={openDrawer}
                sx={{ fontWeight: "500", textTransform:'capitalize', borderRadius: 1, margin: 0.5 }}
                variant="contained"
                fullWidth
              >
                {"Edit Profile"}
              </Button>
              <Button
                            size='small'

                onClick={copyClick}
                sx={{ borderRadius: 1, margin: 0.5,  textTransform:'capitalize'}}
                variant="contained"
                fullWidth
              >
               {copied ? "Copied to clipboard" : "Share Profile"}
              </Button>
            </div>
          )}
        </div>
      </div>
      <Drawer
        sx={{ display: "flex", height: "100%" }}
        anchor={"bottom"}
        open={open}
      >
        <Paper style={{ display: "flex", height: "100vh" }}>
          {editProfile}
        </Paper>
      </Drawer>
    </div>
      <Dialog className={styles.dialog} open={openLogin} onClose={() => {setOpenLogin(false)}}>
      <SignInNewUser />
    </Dialog>
    </>
    
  );
};
