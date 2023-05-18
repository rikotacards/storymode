import { Typography } from "@mui/material";
import React from "react";
import styles from './PostTextContent.module.css'
import clx from 'clsx'
interface PostTextContent {
  caption: string;
  bold?: boolean;
  fontWeight?: number;
}
export const PostTextContent: React.FC<PostTextContent> = ({ caption, bold,fontWeight }) => {
  const [expanded, setExpanded ] = React.useState(false);
  const toggle = () => {setExpanded(!expanded);console.log('click')};
  return (
    <div className={styles.container} onClick={toggle}>
      <Typography sx={{
        // maxHeight: expanded ? '100%' :'4.5em',
        WebkitLineClamp: expanded ? 10 : 2,
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        WebkitBoxOrient: 'vertical',
        display: '-webkit-box',
        textShadow: '1px 1px 4px black'
      }} 
      
      variant={bold ?'h5' : 'body2'}  >
        {caption ||
          "Hi everyone! This is my first post in Lofo. Hope everyone likes it.This was me at Hong Kong Fintech week, just recording something."}
      </Typography>
      
    </div>
  );
};
