import React from 'react';
import styles from './Emoji.module.css'
export interface EmojiProps {
  label: string;
  symbol: string
}


export const Emoji: React.FC<EmojiProps>  = (props) => (
 <div style={{paddingLeft: '4px'}}>
      {props.symbol}
 </div>

);