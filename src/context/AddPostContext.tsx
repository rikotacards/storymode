import React from 'react';

interface AddPostContextProps {
  posts: {imageUrl: string, caption: string}[];
  addPost: () => void;
  onTextChange: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, i: number) => void;
  addImage: (imageUrl: string, index: number) => void;
  removePost: (index:number) => void;
}

export const AddPostContext = React.createContext({} as AddPostContextProps)

interface PostContextProps {
  children: React.ReactNode;
}

export const AddPostContextWrapper: React.FC<PostContextProps> = ({children}) => {
  const [posts, setPosts] = React.useState([{imageUrl:'', caption:''}])
 

  const addPost = () => {
    setPosts((prev) => [...prev, {imageUrl:'', caption: ''}])
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

  const addImage = (imageUrl: string, i: number) => {
    const postToUpdate = posts[i]
    const newPost = {...postToUpdate, imageUrl}
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
    removePost
  }

  return (
    <AddPostContext.Provider value={addPostFunctions} >
    {children}
    </AddPostContext.Provider>
  )
}


