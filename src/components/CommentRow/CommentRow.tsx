import { Avatar, Typography } from "@mui/material";
import React from "react";

export const CommentRow: React.FC = () => {
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
          MaxwellHsu
          </Typography>
        </div>
        <div>
          <Typography variant="body2">
            This is a comment from a person
          </Typography>
        </div>
      </div>
    </div>
  );
};
