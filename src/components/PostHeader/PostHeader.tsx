import React from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import {
  IconButton,
  Avatar,
  Typography,
  Dialog,
  Button,
  Card,
  Skeleton,
  CardContent,
} from "@mui/material";
import styles from "./PostHeader.module.css";
import { deletePost } from "@/firebase/db";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";
import { useGetUserInfo } from "@/hooks/useGetUserInfo";

interface PostHeaderProps {
  author: string;
  postId: string;
}

export const PostHeader: React.FC<PostHeaderProps> = ({postId, author }) => {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const auth = useAuth();
  const {data, isLoading} = useGetUserInfo(author || "")
  const onClick = () => {
    if(auth?.user?.uid === author)
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const onProfileHeaderClick = () => {
    router.push('/'+data?.username)
  }
  return (
    <div className={styles["post-header"]}>
      <div className={styles.avatar} onClick={onProfileHeaderClick}>
       {(!data?.photoUrl|| isLoading) ? <Skeleton variant='circular'/> : <Avatar src={data.photoUrl || ""} color='action' alt={author[0]}>{data?.username[0]||""}</Avatar>}
      </div>
      <div className={styles.authorInfo} onClick={onProfileHeaderClick}>
        <Typography sx={{ fontWeight: '600', mr: 1 }}>{data?.username}</Typography>
        {/* <Typography variant="caption">San Diego</Typography> */}
      </div>
      <div className={styles["more-btn"]}>
        <IconButton onClick={onClick}>
          <MoreHorizIcon />
        </IconButton>
      </div>
      <Dialog open={open} onClose={onClose}>
        <Card variant="outlined" style={{display: 'flex', width: '100%'}}>
          <CardContent>

          <Button onClick={() => deletePost(author, postId)}>Delete</Button>
          <Button >Edit</Button>

          </CardContent>
        </Card>
      </Dialog>
    </div>
  );
};
