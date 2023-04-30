import { Avatar, Input, Typography } from "@mui/material";
import React from "react";
import styles from "./AddComment.module.css";
import { useAuth } from "@/context/AuthContext";
import { isDesktop } from "@/platform/platform";

export const AddComment: React.FC = () => {
  const desktopInput = <Input placeholder="Add a comment" disableUnderline />;
  const mobileInput = (
    <div>
      <Typography variant="caption">Add a comment</Typography>
    </div>
  );

  return (
    <div className={styles.container}>
      <div className={styles.avatar}>
        <Avatar sx={{ width: "20px", height: "20px" }} />
      </div>
      {true ? desktopInput : mobileInput}
    </div>
  );
};
