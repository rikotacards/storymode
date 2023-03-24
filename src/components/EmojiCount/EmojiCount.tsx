import { IconButton, Typography } from '@mui/material';
import { EmojiClickData } from 'emoji-picker-react';
import React from 'react';
import { Emoji, EmojiProps } from '../Emoji/Emoji';
import styles from './EmojiCount.module.css'
interface EmojiCountProps extends EmojiProps  {
  count: number;
  onClick: (emoji: EmojiClickData['emoji']) => void;
}
export const EmojiCount: React.FC<EmojiCountProps> = ({label, symbol, count, onClick}) => {
  return <div className={styles.emojicount}>
    <IconButton onClick={() => onClick(label)} size='small'>
    <Emoji label={label} symbol={symbol}/>
    <Typography>
      {count}
    </Typography>
    </IconButton>
  </div>
}