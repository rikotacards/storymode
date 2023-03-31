import { Typography } from "@mui/material";
import React from "react";
interface PostTextContent {
  caption: string;
  bold?: boolean;
  fontWeight?: number;
}
export const PostTextContent: React.FC<PostTextContent> = ({ caption, bold,fontWeight }) => {
  return (
    <div>
      <Typography variant={bold ?'h5' : 'body2'}  style={{fontWeight: fontWeight || 550, fontSize: fontWeight ? '14px' : undefined}}>
        {caption ||
          "Hi everyone! This is my first post in Lofo. Hope everyone likes it.This was me at Hong Kong Fintech week, just recording something."}
      </Typography>
    </div>
  );
};
