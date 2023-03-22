import { Card, CardActionArea } from "@mui/material";
import React from "react";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import styles from "./UploadImageThumbnail.module.css";
import Image from "next/image";
import { AddPostContext } from "@/context/AddPostContext";
interface UploadImageThumbnailProps {
  index: number;
}

export const UploadImageThumbnail: React.FC<UploadImageThumbnailProps> = ({
  index
}) => {
  const [images, setImages] = React.useState([] as any);

  const [imageURLS, setImageURLs] = React.useState([]);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const addPostContext = React.useContext(AddPostContext);
  React.useEffect(() => {
    if (images.length < 1) return;
    const newImageUrls: any = [];
    images.forEach((image: any) =>
      newImageUrls.push(URL.createObjectURL(image))
    );
    addPostContext.addImage(newImageUrls[0], index)
    setImageURLs(newImageUrls);

  }, [images]);

  const onImageChange = (e: any) => {
    addPostContext
    setImages([...e.target.files]);
  };
  const handleClick = () => {
    if(inputRef.current!==null){
      inputRef.current.click();
    }
  };

  return (
    <div className={styles.container}>
      <Card variant="outlined" className={styles.imageCard}>
        <CardActionArea sx={{ display: "flex", height: "100%" }} onClick={handleClick}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              width: "100%",
            }}
          >
            {(!!addPostContext.posts[index].imageUrl.length || !!imageURLS.length) && <Image  fill alt={''} src={addPostContext.posts[index].imageUrl || imageURLS[0]} />}

            <input
              type="file"
              style={{ display: "none" }}
              ref={inputRef}
              accept="image/*"
              onChange={onImageChange}
            />

            <AddPhotoAlternateIcon color="action" />
          </div>
        </CardActionArea>
      </Card>
      <>
        {/* {imageURLS.map((imageSrc) => (
          <ImageThumbnail key={imageSrc} src={imageSrc} alt="not fount"/>
        ))} */}
      </>
    </div>
  );
};
