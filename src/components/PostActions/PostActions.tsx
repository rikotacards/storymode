import React from "react";
import styles from "./PostActions.module.css";
import { PartCount } from "../PartCount/PartCount";
import { Reactions } from "../Reactions/Reactions";
import { BookmarkButton } from "../BookmarkButton/BookmarkButton";
import { ShareButton } from "../ShareButton/ShareButton";
import { useAuth } from "@/context/AuthContext";
import { Dialog, IconButton } from "@mui/material";
import { SignInNewUser } from "../SignInNewUser/SignInNewUser";
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { copyToClipboard } from "@/utils/copyToClipboard";

interface PostActionsProps {
  postId: string;
}

export const PostActions: React.FC<PostActionsProps> = ({ postId }) => {
  const auth = useAuth();
  const [open, setOpen] = React.useState(false);
  const onClose = () => {
    setOpen(false);
  };
  const onOpen = () => {
    !auth.isLoggedIn && setOpen(true);
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
            pointerEvents: auth?.isLoggedIn ? undefined : "none",
            display: "flex",
          }}
        >
          <Reactions postId={postId} />
          <IconButton onClick={() => copyToClipboard('/'+postId)}>
            <SendRoundedIcon />
          </IconButton>
        </div>
        {/* <PartCount/> */}
        {/* <div className={styles.bookmarkButton}>
          <BookmarkButton active={false} />
        </div> */}
      </div>
      <Dialog className={styles.dialog} open={open} onClose={onClose}>
        <SignInNewUser />
      </Dialog>
    </>
  );
};
