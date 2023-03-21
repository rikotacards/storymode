import React from 'react';
import styles from './PostActions.module.css'
import { PartCount } from '../PartCount/PartCount';
import { Reactions } from '../Reactions/Reactions';
import { BookmarkButton } from '../BookmarkButton/BookmarkButton';
import { ShareButton } from '../ShareButton/ShareButton';
export const PostActions: React.FC = () => {
  return (
    <div className={styles.postactions}>
      <Reactions/>
      <ShareButton/>
      <PartCount/>
      <div className={styles.bookmarkButton}>

      <BookmarkButton active={false}/>
      </div>
    </div>
  )
}