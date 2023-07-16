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
import { useDrawerContext } from "@/context/DrawerContext";
import { AddReactionButton } from "../AddReactionButton/AddReactionButton";
import { usePostDrawerContext } from "@/context/PostDrawerContext";

interface PostActionsProps {
  postId: string;
  username: string;
  // used for recevingUid
  author: string;
  isDemo?: boolean;
  demoReactions?: ReactionsStateType;
}

export const PostActions: React.FC<PostActionsProps> = ({
  author,
  username,
  postId,
  isDemo,
  demoReactions,
}) => {
  const auth = useAuth();
  const drawerContext = usePostDrawerContext();
  const onShareClick = () => {
    drawerContext.setComponent("shareDrawer");
    drawerContext.onOpen();
  };
  const [open, setOpen] = React.useState(false);
  const onClose = () => {
    setOpen(false);
  };
  const onAddReactionButtonClick = () => {
    drawerContext.setComponent("reactionsDrawer");
    drawerContext.setData({ postId, author });
    drawerContext.onOpen();
  };
  const onOpen = () => {
    // !auth.isLoggedIn && setOpen(true);
  };
  return (
    <>
      <div
        onClick={(e) => {
          e.preventDefault();
          return onOpen();
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <AddReactionButton onClick={onAddReactionButtonClick} />
          <IconButton onClick={onShareClick}>
            <SendRoundedIcon />
          </IconButton>
        </div>
      </div>
      <Dialog className={styles.dialog} open={open} onClose={onClose}>
        <SignInWithGoogle />
      </Dialog>
    </>
  );
};
