import { IconButton, Paper } from "@mui/material";
import { EmojiClickData } from "emoji-picker-react";
import React from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CancelIcon from '@mui/icons-material/Cancel';
import { Emoji } from "../Emoji/Emoji";
import { quickSelectEmojis } from "@/constants/quickSelectEmojis";

interface ReactionQuickSelectProps {
  onEmojiClick: (unfied: EmojiClickData["unified"], emoji: string) => void;
  openEmojiPicker?: () => void;
  onClose?: () => void
}
export const ReactionQuickSelect: React.FC<ReactionQuickSelectProps> = ({
  onEmojiClick,
  openEmojiPicker,
  onClose
}) => {
  const emojis = quickSelectEmojis.map((emoji) => (
    <IconButton key={emoji.unified} onClick={() => {onEmojiClick(emoji.unified, emoji.symbol)}}>
      <Emoji label={emoji.label} symbol={emoji.symbol} />
    </IconButton>
  ));
  return (
    <Paper sx={{ borderRadius: "20px", display: "flex", alignItems: "center", flexDirection: 'row', width: '100%', opacity: '1', zIndex: '10000' }}>
      {emojis}
      <IconButton onClick={() => {openEmojiPicker && openEmojiPicker()}}>
        <AddCircleIcon />
      </IconButton>
      <IconButton onClick={() => { onClose && onClose()}}>
        <CancelIcon />
      </IconButton>
    </Paper>
  );
};
