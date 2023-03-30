import React from 'react';
import { uploadPost } from '@/firebase/db';
import { useAuth } from './AuthContext';
import { useGetUserInfo } from '@/hooks/useGetUserInfo';
import { useRouter } from 'next/router';

export interface PostType {
  imagePath: string;
  imageUrl?: string; 
  caption: string;
  blobData?: string;
}

interface AddPostContextProps {
  posts: PostType[];
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

export const AddPostContextWrapper: React.FC<PostContextProps> = ({children}) => {
  const [posts, setPosts] = React.useState([{imageUrl:'', caption:'', blobData: '', imagePath: ''}])
  const auth = useAuth();
  const route = useRouter();
  const {data} = useGetUserInfo(auth?.uid as string)
  const onPostClick = async() => {
    if(!auth?.user?.uid){
      console.log('user needs to be logged in')
      return;
    }
   try {
    const res = await  uploadPost({
      username:data?.username || auth.user.uid, 
      posts
    }).then(() => {
      route.push('/')
    })
   } catch (e) {
    console.log(e)
   }
  }
  

  const addPost = () => {
    setPosts((prev) => [...prev, {imageUrl:'', caption: '', blobData: '', imagePath: ''}])
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


