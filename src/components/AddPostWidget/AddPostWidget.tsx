import { Input, Button } from "@mui/material";
import React from "react";
import styles from "./AddPostWidget.module.css";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import { UploadImageThumbnail } from "../UploadImageThumbnail/UploadImageThumbnail";

const disableExtraFeatures = true;

export const AddPostWidget: React.FC = () => {
  return (
    <div className={styles.addPostContainer}>
      <div className={styles.layout}>
        <div className={styles.postDetails}>
          <div className={styles.imageAndCaption}>
            <UploadImageThumbnail />
            <div className={styles.textInputContainer}>
              <Input
                placeholder={"Write your caption..."}
                fullWidth
                multiline
                type="text"
                disableUnderline
              />
            </div>
          </div>
          {!disableExtraFeatures && (
            <>
              <div className={styles.addDetailInput}>tag</div>
              <div className={styles.addDetailInput}>add</div>
            </>
          )}
          <div>
            <Button style={{marginTop: '8px'}} variant="outlined" fullWidth>
              Cancel
            </Button>
          </div>
        </div>
        <div className={styles.reorderContainer}>
          <DragHandleIcon color='action' />
        </div>
      </div>
      <div style={{marginTop: '8px'}}>
        <Button variant="outlined" fullWidth>
          Add part 2
        </Button>
      </div>
      <div>
        <Button variant="outlined" fullWidth>
          Post
        </Button>
      </div>
    </div>
  );
};
