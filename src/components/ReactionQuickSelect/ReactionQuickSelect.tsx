import { IconButton, Paper } from "@mui/material";
import { EmojiClickData } from "emoji-picker-react";
import React from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CancelIcon from '@mui/icons-material/Cancel';
import { Emoji } from "../Emoji/Emoji";
const quickSelectEmojis = [
  {
    label: "fire",
    symbol: "🔥",
    unified: "1f525",
  },
  {
    symbol: "😥",
    label: "cry",
    unified: "1f625",
  },
  {
    symbol: "🤣",
    label: "laugh",
    unified: "1f923",
  },
  {
    symbol: '😍',
    label: 'loveeyes',
    unified: "1f60d",
  },
  {
    symbol: "🚩",
    label: 'redflag',
    unified: '1f6a9'
  },
  {
    symbol: "👏",
    label: 'clap', 
    unified: "1f44f"
  }
];
interface ReactionQuickSelectProps {
  onEmojiClick: (unfied: EmojiClickData["unified"], emoji: string) => void;
  callback?: () => void;
  openPicker?: () => void;
  onClose?: () => void
}
export const ReactionQuickSelect: React.FC<ReactionQuickSelectProps> = ({
  callback,
  onEmojiClick,
  openPicker
}) => {
  const emojis = quickSelectEmojis.map((emoji) => (
    <IconButton key={emoji.unified} onClick={() => {onEmojiClick(emoji.unified, emoji.symbol); callback && callback()}}>
      <Emoji label={emoji.label} symbol={emoji.symbol} />
    </IconButton>
  ));
  return (
    <Paper sx={{ borderRadius: "20px", display: "flex", alignItems: "center", flexDirection: 'row' }}>
      {emojis}
      <IconButton onClick={() => {openPicker && openPicker(); callback && callback()}}>
        <AddCircleIcon />
      </IconButton>
      <IconButton onClick={() => { callback && callback()}}>
        <CancelIcon />
      </IconButton>
    </Paper>
  );
};
