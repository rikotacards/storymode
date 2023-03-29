import React from "react";
import styles from "./PostActions.module.css";
import { PartCount } from "../PartCount/PartCount";
import { Reactions } from "../Reactions/Reactions";
import { BookmarkButton } from "../BookmarkButton/BookmarkButton";
import { ShareButton } from "../ShareButton/ShareButton";
import { useAuth } from "@/context/AuthContext";
import { Dialog } from "@mui/material";
import { SignInNewUser } from "../SignInNewUser/SignInNewUser";

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
  
    <div className={styles.postactions} onClick={onOpen}>
      <Reactions postId={postId} />
      <ShareButton />
      {/* <PartCount/> */}
      <div className={styles.bookmarkButton}>
        <BookmarkButton active={false} />
      </div>
    </div>
     <Dialog open={open} onClose={onClose}>
     <SignInNewUser />
   </Dialog>
   </>
  );
};
