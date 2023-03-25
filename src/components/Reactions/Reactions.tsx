import React from "react";
import { Emoji } from "../Emoji/Emoji";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import styles from "./Reactions.module.css";
import AddReactionIcon from "@mui/icons-material/AddReaction";
import { EmojiCount } from "../EmojiCount/EmojiCount";
import { AddReactionButton } from "../AddReactionButton/AddReactionButton";
import { EmojiClickData } from "emoji-picker-react";
import {
  decrementReaction,
  getReactions,
  incrementReaction,
} from "@/firebase/db";

interface ReactionsProps {
  postId: string;
}

export const Reactions: React.FC<ReactionsProps> = ({ postId }) => {
  const displayed = [];
  const [postReactions, setReactions] = React.useState<{
    [key: string]: number;
  }>({});
  const [displayedReactions, setDisplayedReactions] = React.useState<{
    [key: string]: number;
  }>({});

  React.useEffect(() => {
    getReactions(postId)
      .then((data) => {
        setReactions(() => data);
        setDisplayedReactions(() => data);
      })
      .catch((e) => {
        // todo
        console.log(e);
      })
      .then(() => {
      });
  }, []);

  const updateDisplayedReactions = (
    emoji: EmojiClickData["emoji"],
    incrementValue: number
  ) => {
    setDisplayedReactions({
      ...displayedReactions,
      [emoji]: displayedReactions[emoji] + incrementValue, 
      [emoji+'liked']: displayedReactions[emoji+'liked'] == 0 ? 1 : 0
    });
  };

  const onEmojiClick = React.useCallback((emoji: EmojiClickData["emoji"]) => {
    if (displayedReactions[emoji + "liked"] == 1) {
      decrementReaction({ docId: postId, emoji });
      updateDisplayedReactions(emoji, -1);
    }
    if (displayedReactions[emoji + "liked"] !== 1) {
      incrementReaction({ docId: postId, emoji });
      // we have this so we don't need to 'get' the data after increment.
      updateDisplayedReactions(emoji, 1);
    }
  }, [postReactions, displayedReactions]);

  for (let key in displayedReactions) {
    if (key.indexOf('liked') > 1) {
      continue;
    }
    displayed.push(
      <EmojiCount
        key={key}
        onClick={onEmojiClick}
        symbol={key}
        label={key}
        count={displayedReactions[key]}
      />
    );
  }
  return (
    <div className={styles.reactions}>
      <div className={styles.allEmojis}>{displayed}</div>
      <AddReactionButton onEmojiClick={onEmojiClick} />
    </div>
  );
};
