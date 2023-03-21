import React from 'react';
import styles from './PostWrapper.module.css';
import { PostHeader } from '../PostHeader/PostHeader';

interface PostWrapper {
  children: React.ReactNode;
}
export const PostWrapper: React.FC<PostWrapper> = ({children}) => {
  return (
    <div className={styles.post}>
      <PostHeader/>
      {children}
    </div>
  )
}
