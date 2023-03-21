import { IconButton, Typography } from '@mui/material';
import React from 'react';
import { Emoji, EmojiProps } from '../Emoji/Emoji';
import styles from './EmojiCount.module.css'
interface EmojiCountProps extends EmojiProps  {
  count: number;
}
export const EmojiCount: React.FC<EmojiCountProps> = (props) => {
  return <div className={styles.emojicount}>
    <IconButton  size='small'>
    <Emoji {...props}/>
    <Typography>
      {props.count}
    </Typography>
    </IconButton>
  </div>
}