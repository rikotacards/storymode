import React from "react";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { IconButton } from "@mui/material";
interface BookmarkButtonProps {
  active: boolean;
}
export const BookmarkButton: React.FC<BookmarkButtonProps> = ({ active }) => {
  return (
    <IconButton>
      {active ? <BookmarkIcon /> : <BookmarkBorderIcon/>}
    </IconButton>
  );
};
