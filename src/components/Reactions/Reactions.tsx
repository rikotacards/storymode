import React from "react";
import { Emoji } from "../Emoji/Emoji";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import styles from "./Reactions.module.css";
import AddReactionIcon from "@mui/icons-material/AddReaction";
import { EmojiCount } from "../EmojiCount/EmojiCount";
import { AddReactionButton } from "../AddReactionButton/AddReactionButton";
import { EmojiClickData } from "emoji-picker-react";
import { getReactions, incrementReaction } from "@/firebase/db";

interface ReactionsProps {
  postId: string;
}

export const Reactions: React.FC<ReactionsProps> = ({postId}) => {
  const displayed = []
console.log("PS'", postId)
  const [postReactions, setReactions] = React.useState<{[key: string]:number}>({});

  React.useEffect(() => {
    getReactions(postId).then((data) => {console.log('inside', data);setReactions(data)}).catch((e) => {
      console.log(e)
    }).then(() => {console.log("HELLOO", postReactions)})
  },[])

const onEmojiClick = React.useCallback((emoji: EmojiClickData['emoji']) => {
 if(!postReactions[emoji+'liked']) {
  incrementReaction({docId: postId, emoji})
}
},[])
 
  for(let key in postReactions){
    if(typeof(postReactions[key]) === 'boolean'){
      continue
    }
    displayed.push(<EmojiCount key={key} onClick={onEmojiClick} symbol={key} label={key} count={postReactions[key]}/>)
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
