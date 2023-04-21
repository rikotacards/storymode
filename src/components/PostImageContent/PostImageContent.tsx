import React from "react";
import { getImagePath } from "@/firebase/db";
import {  Skeleton } from "@mui/material";
import styles from "./PostImageContent.module.css";
interface PostImageContentProps {
  imagePath: string;
  ref?: any;
}
export const PostImageContent: React.FC<PostImageContentProps> = ({
  imagePath,
}) => {

  const [path, setPath] = React.useState();
  if (!imagePath) {
    return <></>;
  }
  getImagePath(imagePath)
    .then((data) => {
      setPath(data);
    })
    .catch((e) => {
      console.log(e);
    });

  return (
    <div className={styles.imageContainer}>
      {!path && (
        <Skeleton
          height={484}
          width={468}
          animation="wave"
          variant="rectangular"
        />
      )}
      {path && (
        <img
          draggable={false}
          className={styles.image}
          alt={imagePath}
          src={path}
          // fill={true}
          // originally 468
          width={path ? 468 : 0}
          //oriignally 540
          height={path ? 484 : 0}
        />
      )}
    </div>
  );
};
