import { AddReaction } from "@mui/icons-material";
import { Button, Chip, Dialog, DialogTitle, Fade, IconButton, List, ListItem, Slide } from "@mui/material";

import React from "react";

import dynamic from 'next/dynamic';
import { EmojiClickData } from "emoji-picker-react";

const Picker = dynamic(
  () => {
    return import('emoji-picker-react');
  },
  { ssr: false }
);
interface AddReactionButtonProps {
  onEmojiClick: (emoji: EmojiClickData['emoji']) => void;
}

export const AddReactionButton: React.FC<AddReactionButtonProps> = ({onEmojiClick}) => {
  const [open, setOpen] = React.useState(false)
    const onClick = () => {
      setOpen(!open);
    }
    const handleClose = (value: string) => {
      setOpen(false);
    };
  
  return (
    
    <>

    <Chip
      variant="outlined"
      onClick={onClick}
      label={
        <div style={{ display: "flex" }}>
          <AddReaction color="action" fontSize="small" />
        </div>
      }
      clickable
    />
    {<Dialog onClose={handleClose} open={open}  >
      <div style={{display: 'flex'}}>
      <Picker onEmojiClick={(d) => onEmojiClick(d.emoji)}/>
      </div>
    </Dialog>}
    </>
  );
};
