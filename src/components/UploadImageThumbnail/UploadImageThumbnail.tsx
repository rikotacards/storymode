import { Card, CardActionArea, CardContent } from "@mui/material";
import React from "react";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import styles from "./UploadImageThumbnail.module.css";
import testImage from "../../../public/test.jpg";
import Image from 'next/image'

const ImageThumbnail: React.FC = () => {
  return (
    <div className={styles.container}>
      <Card className={styles.imageCard}>
        <CardActionArea sx={{ display: "flex", height: "100%" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              width: "100%",
            }}
          >
            <Image height={100} alt='uploaded' src={testImage} />
          </div>
        </CardActionArea>
      </Card>
    </div>
  );
};

const hasImage = false;

export const UploadImageThumbnail: React.FC = () => {
  
  return (
    <div className={styles.container}>
      { !hasImage ? (<Card  variant='outlined' className={styles.imageCard}>
        <CardActionArea sx={{ display: "flex", height: "100%" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              width: "100%",
            }}
          >
            <AddPhotoAlternateIcon color="action" />
          </div>
        </CardActionArea>
      </Card>) : (
        <ImageThumbnail/>
      )}
    </div>
  );
};
