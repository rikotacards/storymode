import { Avatar, Typography } from "@mui/material";
import React from "react";
interface CommentRowProps {
  username: string; 
  comment: string;
  timestamp?: string;
}
export const CommentRow: React.FC<CommentRowProps> = (props) => {
  const {username, comment, timestamp} = props;
  return (
    <div
      style={{
        marginBottom: "32px",
        alignItems: "center",
        display: "flex",
        flexDirection: "row",
      }}
    >
      <div style={{ marginRight: "8px" }}>
        <Avatar>mh</Avatar>
      </div>
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <div>
          <Typography variant='caption' >
          {username || 'Username'}
          </Typography>
        </div>
        <div>
          <Typography variant="body2">
            {comment || 'testcomment'}
          </Typography>
        </div>
      </div>
    </div>
  );
};
