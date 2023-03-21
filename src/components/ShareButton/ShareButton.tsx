import React from "react";
import { IconButton } from "@mui/material";
import SendRoundedIcon from '@mui/icons-material/SendRounded';

export const ShareButton: React.FC = () => {
  return (
    <IconButton>
      <SendRoundedIcon />
    </IconButton>
  );
};
