import { Input, Button } from "@mui/material";
import React from "react";
import styles from "./AddPostWidget.module.css";
import { UploadImageThumbnail } from "../UploadImageThumbnail/UploadImageThumbnail";
import { AddPostContext } from "@/context/AddPostContext";

interface AddPostWidgetProps {
  docRefId: string;
  index: number;
}

export const AddPostWidget: React.FC<AddPostWidgetProps> = ({
  docRefId,
  index,
}) => {
  const addPostContext = React.useContext(AddPostContext);
  const { posts } = addPostContext;
  const ref = React.useRef<HTMLInputElement>(null);

  return (
    <div className={styles.layout}>
      <div className={styles.postDetails}>
        <div className={styles.imageAndCaption}>
          <UploadImageThumbnail index={index} />
          <div className={styles.textInputContainer} onClick={() => {ref?.current?.click()}}>
            <Input
            ref={ref}
              placeholder={"Write your caption..."}
              fullWidth
              multiline
              id="caption"
              type="text"
              disableUnderline
              value={addPostContext.posts[index].caption}
              onChange={(e) => {
                addPostContext.onTextChange(e, index);
              }}
            />
          </div>
        </div>
        {posts.length > 1 && (
          <div>
            <Button
              onClick={() => addPostContext.removePost(index)}
              style={{ marginTop: "8px" }}
              variant="outlined"
              fullWidth
              size="small"
              color='error'
            >
              Remove
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
