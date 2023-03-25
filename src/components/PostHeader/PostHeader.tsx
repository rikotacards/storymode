import React from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import {
  IconButton,
  Avatar,
  Typography,
  Dialog,
  Button,
  Card,
} from "@mui/material";
import styles from "./PostHeader.module.css";
import { deletePost } from "@/firebase/db";
import { username } from "@/context/AddPostContext";

interface PostHeaderProps {
  author: string;
  postId: string;
}

export const PostHeader: React.FC<PostHeaderProps> = ({postId, author }) => {
  const [open, setOpen] = React.useState(false);
  const onClick = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  return (
    <div className={styles["post-header"]}>
      <div className={styles.avatar}>
        <Avatar alt="Michael Hsu">M</Avatar>
      </div>
      <div className={styles.authorInfo}>
        <Typography sx={{ mr: 1 }}>{author || "Michael"}</Typography>
        <Typography variant="caption">San Diego</Typography>
      </div>
      <div className={styles["more-btn"]}>
        <IconButton onClick={onClick}>
          <MoreHorizIcon />
        </IconButton>
      </div>
      <Dialog open={open} onClose={onClose}>
        <Card>
          <Button onClick={() => deletePost(author, postId)}>Delete</Button>
        </Card>
      </Dialog>
    </div>
  );
};
