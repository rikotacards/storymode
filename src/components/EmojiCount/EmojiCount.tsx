import { addNotification, updateReaction } from "@/firebase/db";
import { Chip, IconButton, Typography } from "@mui/material";
import React from "react";
import { Emoji, EmojiProps } from "../Emoji/Emoji";
import styles from "./EmojiCount.module.css";
import { useAuth } from "@/context/AuthContext";
interface EmojiCountProps extends EmojiProps {
  count: number;
  hasLiked: boolean;
  postId: string;
  unified: string;
  //used for recivinuid
  author: string;
}

const enableChips = true;

export const EmojiCount: React.FC<EmojiCountProps> = ({
  author,
  unified,
  postId,
  label,
  symbol,
  count,
  hasLiked,
}) => {
  const [displayedCount, setDisplayedCount] = React.useState(count);
  const [reacted, setReacted] = React.useState(hasLiked);
  const auth = useAuth();
  const uid = auth?.user?.uid;
  const toggleReacted = () => {
    setReacted(!reacted);
  };

  const onEmojiClick = () => {
    if (reacted) {
      setDisplayedCount(displayedCount - 1);
      updateReaction({ docId: postId, unified, direction: "decrement" });
    } else {
      setDisplayedCount(displayedCount + 1);
      updateReaction({ docId: postId, unified, direction: "increment" });
      uid &&
        addNotification({
          unified,
          receiverUid: author,
          senderUid: uid,
          payloadId: 0,
          postId,
        });
    }
    toggleReacted();
  };
  if (enableChips) {
    return (
      <div className={styles.emojicount}>
        <Chip
          onClick={onEmojiClick}
          size="small"
          variant="outlined"
          label={`${symbol} ${displayedCount}`}
          sx={{
            background: 'rgba(0,0,0,0.2)',
            backdropFilter:'blur(45px)',
          }}
        />
      </div>
    );
  }
  return (
    <div className={styles.emojicount}>
      <IconButton onClick={onEmojiClick} size="small">
        <Emoji label={label} symbol={symbol} />
        <Typography
          sx={{ marginLeft: "4px", fontWeight: 600, fontSize: "small" }}
        >
          {displayedCount}
        </Typography>
      </IconButton>
    </div>
  );
};
