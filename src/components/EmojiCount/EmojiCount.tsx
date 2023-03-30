import { updateReaction } from '@/firebase/db';
import { IconButton, Typography } from '@mui/material';
import { EmojiClickData } from 'emoji-picker-react';
import React from 'react';
import { Emoji, EmojiProps } from '../Emoji/Emoji';
import styles from './EmojiCount.module.css'
interface EmojiCountProps extends EmojiProps  {
  count: number;
  hasLiked: boolean;
  postId: string;
  unified: string;
}


export const EmojiCount: React.FC<EmojiCountProps> = ({unified, postId,label, symbol, count, hasLiked}) => {
  const [displayedCount, setDisplayedCount ] = React.useState(count)
  const [reacted, setReacted] = React.useState(hasLiked)

  const toggleReacted = () => {
    setReacted(!reacted);
  }
  
  const onEmojiClick = () => {
    if(reacted){
      setDisplayedCount(displayedCount-1)
      updateReaction({ docId: postId, unified, direction: "decrement" });

    } else {
      setDisplayedCount(displayedCount+1)
      updateReaction({ docId: postId, unified, direction: "increment" });
    }
    toggleReacted()
  }
  return <div className={styles.emojicount}>
    <IconButton onClick={onEmojiClick} size='small'>
    <Emoji label={label} symbol={symbol}/>
    <Typography sx={{ marginLeft: '4px', fontWeight:600}}>
      {displayedCount}
    </Typography>
    </IconButton>
  </div>
}