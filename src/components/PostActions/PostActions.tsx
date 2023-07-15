import React from "react";
import styles from "./PostActions.module.css";
import { PartCount } from "../PartCount/PartCount";
import { Reactions, ReactionsStateType } from "../Reactions/Reactions";
import { BookmarkButton } from "../BookmarkButton/BookmarkButton";
import { ShareButton } from "../ShareButton/ShareButton";
import { useAuth } from "@/context/AuthContext";
import { Dialog, IconButton } from "@mui/material";
import { SignInWithGoogle } from "../SignInNewUser/SignInNewUser";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import { copyToClipboard } from "@/utils/copyToClipboard";
import { useDrawerContext } from "@/context/DrawerContext";

interface PostActionsProps {
  postId: string;
  username: string;
  // used for recevingUid
  author: string;
  isDemo?: boolean;
  demoReactions?: ReactionsStateType
}

export const PostActions: React.FC<PostActionsProps> = ({
  author,
  username,
  postId,
  isDemo,
  demoReactions
}) => {
  const auth = useAuth();
  const drawerContext = useDrawerContext()
  const onShareClick = () => {
    drawerContext.setComponent('shareDrawer')
    drawerContext.onOpen()
  }
  const [open, setOpen] = React.useState(false);
  const onClose = () => {
    setOpen(false);
  };
  const onOpen = () => {
    // !auth.isLoggedIn && setOpen(true);
  };
  return (
    <>
      <div
        className={styles.postactions}
        onClick={(e) => {
          e.preventDefault();
          return onOpen();
        }}
      >
        <div
          style={{
            display: "flex",
            width: '100%'
          }}
        >
          <Reactions demoReactions={isDemo ? demoReactions : {}} isDemo author={author} postId={postId} />

          <IconButton
            onClick={onShareClick}
          >
            <SendRoundedIcon />
          </IconButton>
        </div>
        {/* <PartCount/> */}
        {/* <div className={styles.bookmarkButton}>
          <BookmarkButton active={false} />
        </div> */}
      </div>
      <Dialog className={styles.dialog} open={open} onClose={onClose}>
        <SignInWithGoogle />
      </Dialog>
    </>
  );
};
