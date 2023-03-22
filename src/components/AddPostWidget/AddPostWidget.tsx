import { Input, Button } from "@mui/material";
import React from "react";
import styles from "./AddPostWidget.module.css";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import { UploadImageThumbnail } from "../UploadImageThumbnail/UploadImageThumbnail";
import { AddPostContext } from "@/context/AddPostContext";

interface AddPostWidgetProps {
  docRefId: string;
  index: number
}

export const AddPostWidget: React.FC<AddPostWidgetProps> = ({docRefId, index}) => {
  const addPostContext = React.useContext(AddPostContext);

  return (
      <div className={styles.layout}>
        <div className={styles.postDetails}>
          <div className={styles.imageAndCaption}>
            <UploadImageThumbnail index={index} />
            <div className={styles.textInputContainer}>
              <Input
                placeholder={"Write your caption..."}
                fullWidth
                multiline
                id='caption'
                type="text"
                disableUnderline
                value={addPostContext.posts[index].caption}
                onChange={(e) => {addPostContext.onTextChange(e,index)}}
              />
            </div>
          </div>
          <div>
            <Button onClick={() => addPostContext.removePost(index)} style={{ marginTop: "8px" }} variant="outlined" fullWidth>
              Remove
            </Button>
          </div>
        </div>
        <div className={styles.reorderContainer}>
          <DragHandleIcon color="action" />
        </div>
      </div>
     
  );
};
