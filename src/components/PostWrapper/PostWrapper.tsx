import React from 'react';
import styles from './PostWrapper.module.css';
import { PostHeader } from '../PostHeader/PostHeader';
import { Dialog } from '@mui/material';

interface PostWrapper {
  children: React.ReactNode;
  author: string;
  postId: string;
}
export const PostWrapper: React.FC<PostWrapper> = ({postId, children, author}) => {
  return (
    <div className={styles.post}>
      <PostHeader author={author} postId={postId}/>
      {children}
    </div>
  )
}
