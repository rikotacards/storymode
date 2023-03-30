import { PostType } from "@/context/AddPostContext";
import React from "react";
import styles from "./PostPreview.module.css";
import { getImagePath } from "@/firebase/db";

interface PostPreviewProps {
  post: PostType;
  postId: string;
}
export const PostPreview: React.FC<PostPreviewProps> = ({ post }) => {
  const [path, setPath] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const onClick = () => {setOpen(true)}
  const onClose = () => {setOpen(false)}
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
      <div onClick={onClick} className={styles.post}>
        <figure className={styles.postImage}>
          <img alt="" src={path}  />
        </figure>
      </div>
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
