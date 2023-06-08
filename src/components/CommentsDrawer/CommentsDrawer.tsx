import { useDrawerContext } from "@/context/DrawerContext";
import {
  AppBar,
  Avatar,
  Button,
  Paper,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import styles from "./CommentsDrawer.module.css";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { addComment } from "@/firebase/db";
import { useAuth } from "@/context/AuthContext";

export const CommentsDrawer: React.FC = () => {
  const drawerContext = useDrawerContext();
  const onClose = () => {
    drawerContext.onClose();
  };
  const auth = useAuth();
  const uid = auth?.user?.uid;
  const onPostClick = async() => {
    await addComment({
      comment: 'test1 from max, this is a very long post', 
      commentAuthorUid: uid || '',
      postId: '1mTBbss9I77Stfz45kSj',
      postAuthorUid: 'Jq6BwdiA2NSioj7m0son8IS1kXs1'
    })
  }

  return (
    <div>
        <Toolbar>
          <div className={styles.header}>
            <div>
              <Button onClick={drawerContext.onClose}>
                <Typography></Typography>
              </Button>
            </div>
            <Typography fontWeight={600}>Comments</Typography>
            <div>
              <Button size='small' onClick={onClose}>
                <Typography>Close</Typography>
              </Button>
            </div>
          </div>
        </Toolbar>
      <div style={{maxHeight: '50vh', overflowY: 'scroll', padding: "4px", paddingBottom: "55px" }}>
      </div>
      <Paper
        style={{
          width: "100%",
          position: "fixed",
          bottom: "0px",
          padding: "4px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Avatar style={{ marginRight: "4px" }}>MH</Avatar>
        <TextField
          placeholder="Leave a comment"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={onPostClick} edge="end" color="primary">
                  <Typography variant="caption">Post</Typography>
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{ borderRadius: "20px" }}
          fullWidth
        />
      </Paper>
    </div>
  );
};
