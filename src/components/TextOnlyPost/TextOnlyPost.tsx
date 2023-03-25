import { Typography } from "@mui/material";
import React from "react";
import { PostActions } from "../PostActions/PostActions";
import { PostWrapper } from "../PostWrapper/PostWrapper";
import styles from "./TextOnly.module.css";
export const TextOnlyPost: React.FC = () => {
  return (
    <PostWrapper author="max" postId={''}>
      <div className={styles.textContentWrapper}>
        <Typography>
          Can someone please tell me where the nearest toilet is? About to die
          here.
        </Typography>
      </div>
      <PostActions />
    </PostWrapper>
  );
};
