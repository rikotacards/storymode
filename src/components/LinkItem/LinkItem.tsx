import { Avatar, Card, IconButton, Paper, Typography } from "@mui/material";
import React from "react";

import { ClearOutlined, MoreVert } from "@mui/icons-material";
import { LinkEdit } from "../LinkEdit/LinkEdit";
import Link from "next/link";
interface LinkItemProps {
  url: string;
  name: string;
  uid: string;
  index: number;
  set: (i: number) => void;
}
export const LinkItem: React.FC<LinkItemProps> = ({ url, name }) => {
  return (
    <div>
      <Card
        sx={{
          alignItems: "center",
          margin: "8px 8px 4px 8px",
          display: name.length === 0 ? "none" : "flex",
        }}
      >
        <Paper
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            padding: 1,
            width: "100%",
          }}
        >
          <Link
            href={url}
            target="_blank"
            style={{
              display: "flex",
              width: "100%",
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <IconButton sx={{ mr: 1 }}>
              <Avatar>{name[0]}</Avatar>
            </IconButton>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Typography sx={{ fontWeight: "600" }}>{name}</Typography>
              <Typography variant="caption">{url}</Typography>
            </div>
          </Link>
        </Paper>
      </Card>
    </div>
  );
};
