import React from "react";
import { Emoji } from "../Emoji/Emoji";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import styles from "./Reactions.module.css";
import AddReactionIcon from "@mui/icons-material/AddReaction";
import { EmojiCount } from "../EmojiCount/EmojiCount";
import { AddReactionButton } from "../AddReactionButton/AddReactionButton";
import { EmojiClickData } from "emoji-picker-react";



export const Reactions: React.FC = () => {
  const displayed = []
  const [emojis, setemojis] = React.useState<{[key: string]:number}>({"❤️": 0})

const onEmojiClick = React.useCallback((emoji: EmojiClickData['emoji']) => {
  setemojis((prev) =>  ({...prev, [emoji]: (prev[emoji] || 0) + 1}))
},[])
 
  for(let key in emojis){
    displayed.push(<EmojiCount key={key} onClick={onEmojiClick} symbol={key} label={key} count={emojis[key]}/>)
  }
  return (
    <div className={styles.reactions}>
      <div className={styles.allEmojis}>

      {displayed}
      </div>
      <AddReactionButton onEmojiClick={onEmojiClick} />
      
    </div>
  );
};
