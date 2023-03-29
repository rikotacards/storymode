import { Typography } from "@mui/material";
import React from "react";
interface PostTextContent {
  caption: string;
  bold?: boolean;
}
export const PostTextContent: React.FC<PostTextContent> = ({ caption, bold }) => {
  return (
    <div>
      <Typography variant={bold ?'h5' : undefined}  style={{fontWeight: 500}}>
        {caption ||
          "Hi everyone! This is my first post in Lofo. Hope everyone likes it.This was me at Hong Kong Fintech week, just recording something."}
      </Typography>
    </div>
  );
};
