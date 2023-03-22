import { Input, Button, Card, CardActionArea } from "@mui/material";
import React from "react";
import {
  ImageThumbnail,
  UploadImageThumbnail,
} from "../UploadImageThumbnail/UploadImageThumbnail";
import styles from "./AddPostNew.module.css";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import Image, { ImageProps } from "next/image";
import { AddPostWidget } from "../AddPostWidget/AddPostWidget";
const images = [1, 2, 3];
const posts = [{}];
interface ImageThumbnailProps {
  src: string;
  alt: string;
}

export const AddPostNew: React.FC = () => {
  const [images, setImages] = React.useState([] as any);
  const [imageURLS, setImageURLs] = React.useState([]);
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (images.length < 1) return;
    const newImageUrls: any = [];
    images.forEach((image: any) =>
      newImageUrls.push(URL.createObjectURL(image))
    );
    setImageURLs(newImageUrls);
  }, [images]);

  const onImageChange = (e: any) => {
    setImages([...e.target.files]);
  };
  const handleClick = () => {
    if (inputRef.current !== null) {
      inputRef.current.click();
    }
  };

  return (
    <div className={styles.layout}>
      <div className={styles.postDetails}>
        <div className={styles.imageAndCaption}>
          <div className={styles.container}>
            <Card variant="outlined" className={styles.imageCard}>
              <CardActionArea
                sx={{ display: "flex", height: "100%" }}
                onClick={handleClick}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                    width: "100%",
                  }}
                >
                  <input
                    type="file"
                    style={{ display: "none" }}
                    multiple
                    ref={inputRef}
                    accept="image/*"
                    onChange={onImageChange}
                  />

                  <AddPhotoAlternateIcon color="action" />
                </div>
              </CardActionArea>
            </Card>
            <>
              {imageURLS.map((imageSrc) => (
                <AddPostWidget />
              ))}
            </>
          </div>
        </div>
        <div className={styles.reorderContainer}>
          <DragHandleIcon color="action" />
        </div>
      </div>
    </div>
  );
};
