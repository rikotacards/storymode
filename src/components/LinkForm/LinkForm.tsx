import { useAddLinksContext } from "@/context/AddLinksContext";
import { useCreateLocalImageUrls } from "@/hooks/useCreateImageUrl";
import {
  Button,
  Card,
  CardActionArea,
  Divider,
  TextField,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import styles from "./LinkForm.module.css";
import React from "react";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
interface LinkFormProps {
  index: number;
  name: string;
  url: string;
  imagePath?: string;
}

const enableThumbnail = false;

export const LinkForm: React.FC<LinkFormProps> = (props) => {
  const { index, name, url, imagePath } = props;
  const context = useAddLinksContext();
  const getImage = useCreateLocalImageUrls();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const handleClick = () => {
    if (inputRef.current !== null) {
      inputRef.current.click();
    }
  };
  return (
    <div className={styles.container}>
      {enableThumbnail && (
        <Card variant="outlined" className={styles.thumbnail}>
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
              {!!context.personalLinks[index]?.imagePath?.length && (
                <img
                  onLoad={() => {
                    console.log("Image Loaded");
                  }}
                  alt={""}
                  src={imagePath || context.personalLinks[index].imagePath}
                />
              )}

              <input
                type="file"
                style={{ display: "none" }}
                ref={inputRef}
                accept="image/*"
                onChange={(e) => getImage.onChange(e)}
              />

              <AddPhotoAlternateIcon color="action" />
            </div>
          </CardActionArea>
        </Card>
      )}
      <Divider sx={{ width: "100%", margin: '16px' }} />
      <div className={styles.linkFormButtonContainer}>
      <div className={styles.linkForm}>
        <TextField
          id={"name"}
          placeholder="Name"
          variant="outlined"
          size="small"
          value={name}
          onChange={(e) => {
            context.onTextChange(e, index);
          }}
          sx={{marginBottom:'4px'}}
        />
        <TextField
          id={"url"}
          placeholder="url"
          variant="outlined"
          size="small"
          value={url}
          onChange={(e) => {
            context.onTextChange(e, index);
          }}
        />
      </div>
        <Button onClick={() => context.onRemove(index)} color='error' sx={{borderRadius:'10px', marginLeft: '8px'}} size='small' variant='outlined'>
          <HighlightOffIcon />
        </Button>
        </div>
    </div>
  );
};
