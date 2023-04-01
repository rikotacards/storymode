import React from "react";
import { getImagePath } from "@/firebase/db";
import { Skeleton } from "@mui/material";

interface PostImageContentProps {
  imagePath: string;
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
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        position: "relative",
        borderRadius:'10px'
      }}
    >
      {(!path) && (
        <Skeleton
          height={484}
          width={468}

          animation="wave"
          variant="rectangular"
        />
      )}
      {path && <img
        style={{ objectFit: "cover" }}
        alt={imagePath}
        src={path}
        // fill={true}
        // originally 468
        width={path ? 468: 0}
        //oriignally 540
        height={path ? 484: 0}
      />}
    </div>
  );
};
