import React from "react";
import styles from "./PostWrapper.module.css";
import { PostHeader } from "../PostHeader/PostHeader";

interface PostWrapper {
  children: React.ReactNode;
  author: string;
  postId: string;
  demoPhotoUrl?: string;
  demoUsername?: string;
}
export const PostWrapper: React.FC<PostWrapper> = ({
  demoUsername,
  demoPhotoUrl,
  postId,
  children,
  author,
}) => {
  console.log('hi', demoPhotoUrl)
  return (
    <div className={styles.post}>
      <PostHeader
        demoPhotoUrl={demoPhotoUrl}
        demoUsername={demoUsername}
        author={author}
        postId={postId}
      />
      {children}
    </div>
  );
};
