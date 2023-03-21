import React from 'react';
import { PostActions } from '../PostActions/PostActions';
import { PostImageContent } from '../PostImageContent/PostImageContent';
import { PostTextContent } from '../PostTextContent/PostTextContent';
import { PostWrapper } from '../PostWrapper/PostWrapper';
import styles from './PostWithImage.module.css'
export const PostWithImage: React.FC = () => {
  return (
    <PostWrapper>
      <PostImageContent/>
      <div className={styles.belowImage}>
      <PostActions/>
      <PostTextContent/>
      </div>
    </PostWrapper>
  )
}
