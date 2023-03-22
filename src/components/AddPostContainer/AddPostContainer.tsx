import React from 'react';
import { collection, doc } from "firebase/firestore";
import { firestore } from "@/firebase/clientApp";
import styles from './AddPostContainer.module.css';
import { Button } from '@mui/material';
import { AddPostWidget } from '../AddPostWidget/AddPostWidget';
import { AddPostContext } from '@/context/AddPostContext';
export const AddPostContainer: React.FC = () => {
  const collectionRef = collection(firestore,'/content')
  const addPostContext = React.useContext(AddPostContext);
  const docRef = doc(collectionRef)  
  const postComponents = addPostContext.posts.map((data, i) => <AddPostWidget key={i + data.imageUrl} index={i} docRefId={docRef.id}/>)

  return (
    <div className={styles.addPostContainer}>
      {
        postComponents
      }
      {<div style={{ marginTop: "8px" }}>
        <Button variant="outlined" fullWidth onClick={addPostContext.addPost}>
          Add Part
        </Button>
      </div>}
      <div>
        <Button style={{ marginTop: "8px" }} variant="outlined" fullWidth>
          Post
        </Button>
      </div>

    </div>
  )
}