import React from 'react';
import styles from './PostWrapper.module.css';
import { PostHeader } from '../PostHeader/PostHeader';

interface PostWrapper {
  children: React.ReactNode;
  author: string;
}
export const PostWrapper: React.FC<PostWrapper> = ({children, author}) => {
  return (
    <div className={styles.post}>
      <PostHeader author={author}/>
      {children}
    </div>
  )
}
