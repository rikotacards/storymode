import React from "react";
import { collection, doc } from "firebase/firestore";
import { firestore } from "@/firebase/clientApp";
import styles from "./AddPostContainer.module.css";
import { Button, Switch, Typography } from "@mui/material";
import { AddPostWidget } from "../AddPostWidget/AddPostWidget";
import { AddPostContext } from "@/context/AddPostContext";
export const AddPostContainer: React.FC = () => {
  const collectionRef = collection(firestore, "/content");
  const addPostContext = React.useContext(AddPostContext);
  const docRef = doc(collectionRef);
  const postComponents = addPostContext.posts.map((data, i) => (
    <AddPostWidget key={data?.imageUrl || i} index={i} docRefId={docRef.id} />
  ));
  return (
    <div className={styles.addPostContainer}>
      {postComponents}
      <div style={{ marginTop: "8px" }}>
        <Button variant="outlined" fullWidth onClick={addPostContext.addPost}>
          {/* <AddCircleIcon fontSize="medium" /> */}
          <Typography variant="body2" sx={{ textTransform: "capitalize" }}>
            Add Part
          </Typography>
        </Button>
      </div>
      <div>
        <Button
          onClick={addPostContext.onPostClick}
          style={{ marginTop: "8px", textTransform: "capitalize" }}
          variant="contained"
          fullWidth
        >
          Post
        </Button>
      </div>
    </div>
  );
};
