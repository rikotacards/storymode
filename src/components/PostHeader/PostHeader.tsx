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
  demoUsername?: string;
  demoPhotoUrl?: string;
}

export const PostHeader: React.FC<PostHeaderProps> = ({
  demoPhotoUrl,
  demoUsername,
  postId,
  author,
}) => {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const auth = useAuth();
  const { data, isLoading } = useGetUserInfo(author || "");
  const onClick = () => {
    if (auth?.user?.uid === author) setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const onProfileHeaderClick = () => {
    router.push("/" + data?.username);
  };
  return (
    <div className={styles.postHeader}>
      <div className={styles.avatar} onClick={onProfileHeaderClick}>
        {!demoPhotoUrl &&( (!data?.photoUrl || isLoading) ? (
          <Skeleton variant="circular" />
        ) : (
          <Avatar
            src={ data?.photoUrl || ""}
            color="action"
            alt={author[0]}
            sx={{boxShadow: '0px 0px 1px black', height: 32, width: 32}}

          >
            {data?.username[0] || ""}
          </Avatar>
        ))}
        {demoPhotoUrl && 
          <Avatar
          src={demoPhotoUrl}
          color="action"
          alt={author[0]}
          sx={{boxShadow: '0px 0px 1px black', height: 32, width: 32}}
        >
          {demoPhotoUrl}
        </Avatar>
        }
      </div>
      <div className={styles.authorInfo} onClick={onProfileHeaderClick}>
        <Typography sx={{fontSize: '0.875rem', fontWeight: "600", mr: 1, textShadow:'0px 0px 0px black' }}>
          {demoUsername || data?.username}
        </Typography>
        {/* <Typography variant="caption">San Diego</Typography> */}
      </div>
      <div className={styles["more-btn"]}>
        <IconButton onClick={onClick}>
          <MoreHorizIcon />
        </IconButton>
      </div>
      <Dialog open={open} onClose={onClose}>
        <Card variant="outlined" style={{ display: "flex", width: "100%" }}>
          <CardContent>
            <Button onClick={() => deletePost(author, postId)}>Delete</Button>
            <Button>Edit</Button>
          </CardContent>
        </Card>
      </Dialog>
    </div>
  );
};
