import React from "react";
import { getImagePath } from "@/firebase/db";
import { Skeleton } from "@mui/material";
import photo from '../../demo/demoPost1Part1.png'
import styles from "./PostImageContent.module.css";
import Image from "next/image";
interface PostImageContentProps {
  imagePath: string;
  ref?: any;
  isDemo?: boolean;
  demoImagePath?: string;
}
export const PostImageContent: React.FC<PostImageContentProps> = ({
  imagePath,
  isDemo,
  demoImagePath,
}) => {
  const [path, setPath] = React.useState(isDemo ? imagePath : undefined);
  const [isLoading, setLoading] = React.useState(true)
  const loadComplete = () => {
    setLoading(false);
  }
  if (!imagePath) {
    return <></>;
  }
    !isDemo && getImagePath(imagePath)
      .then((data) => {
        setPath(data);
      })
      .catch((e) => {
        console.log(e);
      });

  return (
    <div className={styles.imageContainer}>
      {!isDemo && (isLoading || !path) && (
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
          src={isDemo ? imagePath : path}
          onLoad={loadComplete}
          // originally 468
          width={path ? 468 : 0}
          //oriignally 540
          height={path ? 484 : 0}
        />
      )}
    </div>
  );
};
