import { AddReaction } from "@mui/icons-material";
import { Button, Chip, Collapse, Dialog} from "@mui/material";
import React from "react";

import dynamic from 'next/dynamic';
import { EmojiClickData } from "emoji-picker-react";
import { Emoji } from "../Emoji/Emoji";
import { ReactionQuickSelect } from "../ReactionQuickSelect/ReactionQuickSelect";
import { isDesktop } from "@/platform/platform";



const Picker = dynamic(
  () => {
    return import('emoji-picker-react');
  },
  { ssr: false }
);
interface AddReactionButtonProps {
  onClick: () => void;
}

export const AddReactionButton: React.FC<AddReactionButtonProps> = ({onClick}) => {
  const [open, setOpen] = React.useState(false)
  const [openCol, setOpenCol] = React.useState(false)
 
    const toggleOpenCol=() => {
      setOpenCol(!openCol)
    }
    const handleClose = () => {
      setOpen(false);
    };
  
  return (
    
    <>

    <Chip
      variant="outlined"
      onClick={onClick }
      label={
        <div style={{ display: "flex" }}>
          <AddReaction color="action" fontSize="small" />
        </div>
      }
      clickable
    />
    </>
  );
};
