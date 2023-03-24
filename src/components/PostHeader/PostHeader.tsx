import React from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { IconButton, Avatar, Typography } from "@mui/material";
import styles from './PostHeader.module.css'

interface PostHeaderProps {
  author: string;
}

export const PostHeader: React.FC<PostHeaderProps> = ({author}) => {
  return (
    <div className={styles['post-header']}>
      <div className={styles.avatar}>
        <Avatar  alt="Michael Hsu">M</Avatar>
      </div>
      <div className={styles.authorInfo}>
        <Typography sx={{mr:1}}>{author || 'Michael'}</Typography>
        <Typography variant="caption">San Diego</Typography>
      </div>
      <div className={styles['more-btn']}>
        <IconButton>
          <MoreHorizIcon />
        </IconButton>
      </div>
    </div>
  );
};
