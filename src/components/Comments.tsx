import { useDrawerContext } from "@/context/DrawerContext";
import {
  Avatar,
  Button,
  Drawer,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { CommentRow } from "./CommentRow/CommentRow";
import { addComment } from "@/firebase/db";
import { useAuth } from "@/context/AuthContext";
import styles from "./Comments.module.css";
import { AllComments } from "./AllComments/AllComments";
interface CommentsProps {
  postId: string;
  authorUid: string;
}
export const Comments: React.FC<CommentsProps> = ({ postId, authorUid }) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [comment, setComment] = React.useState<string>('');
  const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  }
  const onClick = () => {
    setOpen(true);
  };
  const auth = useAuth();
  const uid = auth?.user?.uid;

  const onAddComment = async () => {
    if(comment.length === 0){
      return;
    }
    await addComment({
      comment: comment,
      commentAuthorUid: uid || "",
      postId: postId,
      postAuthorUid: authorUid,
    }).then((data) => {
      console.log('fuck', data)
      if(data?.ok){
        setComment('')

      }
    })
  };

  const onClose = () => {
    setOpen(false);
  };
  return (
    <>
      <div onClick={onClick}>
        <Typography typography="body2">View all 5 comments</Typography>
      </div>

      <Drawer anchor={"bottom"} open={open}>
        <Paper elevation={0}>
          <div>
            <Toolbar>
              <div className={styles.header}>
                <div>
                  <Button onClick={onClose}>
                    <Typography></Typography>
                  </Button>
                </div>
                <Typography fontWeight={600}>Comments</Typography>
                <div>
                  <Button onClick={onClose}>
                    <Typography>Close</Typography>
                  </Button>
                </div>
              </div>
            </Toolbar>
            <div
              style={{
                maxHeight: "50vh",
                overflowY: "scroll",
                padding: "4px",
                paddingBottom: "55px",
              }}
            >
              <AllComments postId={postId} postAuthorUid={authorUid}/>
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
              onChange={onChange}
              value={comment}
                placeholder="Leave a comment"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={onAddComment}
                        edge="end"
                        color="primary"
                        disabled={comment.length === 0}
                      >
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
        </Paper>
      </Drawer>
    </>
  );
};
