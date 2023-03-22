import React from 'react';
import {  collection, doc, setDoc, Timestamp } from "firebase/firestore";
import { firestore } from "@/firebase/clientApp";
import { getStorage, ref, uploadString } from "firebase/storage";

const storage = getStorage();

interface AddPostContextProps {
  posts: {imageUrl: string, caption: string, blobData: string}[];
  addPost: () => void;
  onTextChange: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, i: number) => void;
  addImage: (imageUrl: string, index: number, blobData:string) => void;
  removePost: (index:number) => void;
  onPostClick: () => void;
}

export const AddPostContext = React.createContext({} as AddPostContextProps)


interface PostContextProps {
  children: React.ReactNode;
}
const username = 'max'
export const AddPostContextWrapper: React.FC<PostContextProps> = ({children}) => {
  const [posts, setPosts] = React.useState([{imageUrl:'', caption:'', blobData: ''}])
  const collectionRef = collection(firestore,'content', username, 'posts')
  const docRef = doc(collectionRef)  

  
  const onPostClick = async() => {
    try{

      await setDoc(doc(firestore, "content", username, "posts", docRef.id), {
        postTime: Timestamp.fromDate(new Date()),
        author: username,
        content: posts
      });

      posts.forEach(async(post,i) => {
        // we save images into a directory that references the post
        const storageRef = ref(storage, `${username}/${docRef.id}/${i}.jpg`,);
        if(!post.blobData){
          return 
        }
        await uploadString(storageRef, post.blobData, 'data_url').then((snapshot) => {
          console.log('Uploaded a blob or file!');
        });
      })
      
    }catch (e){
      console.log("ER", e)
    }
  
  }
  

  const addPost = () => {
    setPosts((prev) => [...prev, {imageUrl:'', caption: '', blobData: ''}])
  }
  

  const onTextChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    , i: number) => {
    const id = e.target.id
    const value = e.target.value
    const postToUpdate = posts[i]
    const newPost = {...postToUpdate, [id]:value}
    posts[i] = newPost
    let newState = [...posts]
    setPosts(newState)
  }

  const addImage = (imageUrl: string, i: number, blobData: string) => {
    const postToUpdate = posts[i]
    const newPost = {...postToUpdate, imageUrl, blobData}
    posts[i] = newPost
    const newState = [...posts]
    setPosts(newState)
  } 

  const removePost = (index: number) => {
    let newList = [];
    if(posts.length <= 1){
      return;
    }
    for(let i = 0; i < posts.length; i++){
      if(i === index){
        continue;
      } else {
        newList.push(posts[i])
      }
    }
    setPosts(newList)
  }





  const addPostFunctions = {
    posts,
    addPost,
    onTextChange,
    addImage,
    removePost,
    onPostClick
  }

  return (
    <AddPostContext.Provider value={addPostFunctions} >
    {children}
    </AddPostContext.Provider>
  )
}


