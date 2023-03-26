import { Post } from "@/context/AddPostContext";
import React from "react";
import styles from "./PostPreview.module.css";
import { getImagePath } from "@/firebase/db";
import { Typography } from "@mui/material";

interface PostPreviewProps {
  post: Post;
}
export const PostPreview: React.FC<PostPreviewProps> = ({ post }) => {
  const [path, setPath] = React.useState("");

  if (post.imagePath) {
    getImagePath(post.imagePath)
      .then((data) => {
        setPath(data);
      })
      .catch((e) => {
        console.log(e);
      })
      .then((d) => {
        console.log(path);
      });
  }
  if (post?.imagePath?.length > 0) {
    console.log("path", post.imagePath);
    return (
      <a href="" className={styles.post}>
        <figure className={styles.postImage}>
          <img alt="" src={path}  />
        </figure>
      </a>
    );
  }

  return (
    <a href="" className={styles.post}>
        <figure className={styles.textPostContainer}>
            {post.caption}
          </figure>
    </a>
  );
};
