import { Typography } from "@mui/material";
import React from "react";
import { PostActions } from "../PostActions/PostActions";
import { PostWrapper } from "../PostWrapper/PostWrapper";
import styles from "./TextOnly.module.css";
interface TextOnlyPostProps {
  caption: string;
}
export const TextOnlyPost: React.FC<TextOnlyPostProps> = ({caption}) => {
  return (
      <div className={styles.textContentWrapper}>
        <Typography variant='h4'>
          {caption}
        </Typography>
      </div>
  )
}
