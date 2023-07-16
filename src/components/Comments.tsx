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
import { useGetUserInfo } from "@/hooks/useGetUserInfo";
import { useGetAllComments } from "@/hooks/useGetAllComments";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
interface CommentsProps {
  postId: string;
  authorUid: string;
}
export const Comments: React.FC<CommentsProps> = ({ postId, authorUid }) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [comment, setComment] = React.useState<string>("");
  const drawerContext = useDrawerContext()
  const {isLoggedIn} = useAuth();
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };
 
  const onClick = () => {
    if(!isLoggedIn){
      drawerContext.setComponent('signInDrawer');
      drawerContext.onOpen();
    } else {

      setOpen(true);
    }
  };
  
  const auth = useAuth();
  const uid = auth?.user?.uid;
  const { data, isLoading } = useGetUserInfo(uid || "");
  const onAddComment = async () => {
    if (comment.length === 0) {
      return;
    }
    await addComment({
      comment: comment,
      commentAuthorUid: uid || "",
      postId: postId,
      postAuthorUid: authorUid,
    }).then((data) => {
      console.log("fuck", data);
      if (data?.ok) {
        setComment("");
      }
    });
  };

  const {data: comments} = useGetAllComments({
    postId, 
    postAuthorUid: authorUid
  })
  const onClose = () => {
    setOpen(false);
  };
  const commentCount = comments?.length
  return (
    <>
      <div onClick={onClick}>
        <Typography typography="body2">{commentCount ? `View all ${commentCount} comments`: 'Leave a comment'}</Typography>
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
                  <IconButton onClick={onClose}>
                    <KeyboardArrowDownIcon/>
                  </IconButton>
                </div>
              </div>
            </Toolbar>
            <div
              style={{
                maxHeight: "50vh",
                overflowY: "scroll",
                padding: "4px",
                
              }}
            >
              <AllComments postId={postId} postAuthorUid={authorUid} />
            </div>
            <div
              style={{
                width: "100vw",
                bottom: "0px",
                padding: "8px 8px",
                display: "flex",
                flexDirection: "row",
                overflow: 'hidden',
                alignItems: "center",
                zIndex: '10000'
              }}
            >
              <Avatar src={data?.photoUrl} style={{ marginRight: "4px" }}>
                MH
              </Avatar>
              <TextField
                onChange={onChange}
                value={comment}
                size='small'
                placeholder="Leave a comment"
                InputProps={{
                  endAdornment: !!comment.length && (
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
            </div>
          </div>
        </Paper>
      </Drawer>
    </>
  );
};
