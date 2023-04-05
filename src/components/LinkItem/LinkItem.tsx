import {
  Card,
  CardActionArea,
  Paper,
  Typography,
} from "@mui/material";
import React from "react";

interface LinkItemProps {
  url: string;
  name: string;
  uid: string;
  index: number;
  set: (i: number) => void;
}
const showLink = false;
export const LinkItem: React.FC<LinkItemProps> = ({ url, name }) => {
  return (
    <div>
      <Card
        sx={{
          margin: "8px 8px 4px 8px",
          display: name.length === 0 ? "none" : "flex",
        }}
      >
        <Paper
          sx={{
            justifyContent: "center",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
          }}
        >
          <CardActionArea>
            <a
              href={url}
              target="_blank"
              style={{
                display: "flex",
                width: "100%",
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  width: "100%",
                  textAlign: 'center',
                  padding: 8
                }}
              >
                <Typography sx={{ fontWeight: "600" }}>{name}</Typography>
                {showLink && <Typography variant="caption">{url}</Typography>}
              </div>
            </a>
          </CardActionArea>
        </Paper>
      </Card>
    </div>
  );
};
