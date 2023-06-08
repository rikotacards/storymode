import {
  Avatar,
  Button,
  Collapse,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import React from "react";
import { Expand } from "@mui/icons-material";
import { deleteComment } from "@/firebase/db";
import { useAuth } from "@/context/AuthContext";
interface CommentRowProps {
  username: string;
  comment: string;
  timestamp?: string;
  commentId: string;
  postId: string;
  postAuthorUid: string;
  commentAuthorUid: string;
}
export const CommentRow: React.FC<CommentRowProps> = (props) => {
  const {
    commentAuthorUid,
    username,
    comment,
    timestamp,
    postAuthorUid,
    postId,
    commentId,
  } = props;
  const [open, setOpen] = React.useState<boolean>(false);
  const [isDeleted, setDelete] = React.useState(false);
  const auth = useAuth();
  const uid = auth?.uid;
  const isCommentAuthor = commentAuthorUid === uid;
  const toggle = () => {
    setOpen(!open);
  };
  const onDelete = async () => {
    await deleteComment({
      commentId,
      postId,
      postAuthorUid,
    });
    toggle();
    setDelete(true);
  };
  return (
    <div>
      <div
        style={{
          marginBottom: "0px",
          alignItems: "center",
          padding: '0px 4px',
          display: isDeleted ? "none" : "flex",
          flexDirection: "row",
        }}
      >
        <div style={{ marginRight: "8px" }}>
          <Avatar>mh</Avatar>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div>
            <Typography variant="caption">{username || "Username"}</Typography>
          </div>
          <div>
            <Typography variant="body2">{comment || "testcomment"}</Typography>
          </div>
        </div>
        {isCommentAuthor && (
          <div style={{ marginLeft: "auto" }}>
            <IconButton
              style={{ visibility: open ? "hidden" : "visible" }}
              onClick={toggle}
            >
              <MoreVertIcon />
            </IconButton>
          </div>
        )}
        <Collapse orientation="horizontal" in={open}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Button variant="outlined" size="small" onClick={onDelete}>
              <Typography>Delete</Typography>
            </Button>
            <Button variant="outlined" size="small" onClick={toggle}>
              <Typography>Cancel</Typography>
            </Button>
          </div>
        </Collapse>
      </div>
      <Divider sx={{ width: "100%", padding: '4px 4px'}} />
    </div>
  );
};
