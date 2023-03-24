import { Typography } from "@mui/material";
import React from "react";
interface PostTextContent {
  caption: string;
}
export const PostTextContent: React.FC<PostTextContent> = ({ caption }) => {
  return (
    <div>
      <Typography>
        {caption ||
          "Hi everyone! This is my first post in Lofo. Hope everyone likes it.This was me at Hong Kong Fintech week, just recording something."}
      </Typography>
    </div>
  );
};
