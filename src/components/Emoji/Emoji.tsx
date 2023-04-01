import React from 'react';
import styles from './Emoji.module.css'
export interface EmojiProps {
  label: string;
  symbol: string
}


export const Emoji: React.FC<EmojiProps>  = (props) => (
  <span
      className={styles.emoji}
      role="img"
      style={{fontSize:'medium'}}
      aria-label={props.label ? props.label : ""}
      aria-hidden={props.label ? "false" : "true"}
  >
      {props.symbol}
  </span>
);