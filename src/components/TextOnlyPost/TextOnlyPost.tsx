import { Typography } from "@mui/material";
import React from "react";
import styles from "./TextOnly.module.css";
interface PostTextContentProps {
  caption: string;
}
export const PostTextContent: React.FC<PostTextContentProps> = ({caption}) => {
  return (
      <div className={styles.textContentWrapper}>
        <Typography variant='h4'>
          {caption}
        </Typography>
      </div>
  )
}
