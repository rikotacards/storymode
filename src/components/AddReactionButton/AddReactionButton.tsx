import { AddReaction } from "@mui/icons-material";
import {  Chip} from "@mui/material";
import React from "react";

import dynamic from 'next/dynamic';



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
