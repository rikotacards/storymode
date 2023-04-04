import React from 'react';
import { updatePersonalLinks } from '@/firebase/db';
import { useAuth } from './AuthContext';
import { useGetUserInfo } from '@/hooks/useGetUserInfo';
import { useRouter } from 'next/router';

export interface PostType {
  imagePath: string;
  imageUrl?: string; 
  caption: string;
  blobData?: string;
}

interface PersonalLink {
  name: string;
  url: string;
  imagePath: string;
}

interface AddLinksContextProps {
  personalLinks: PersonalLink[];
  addLink: () => void;
  onTextChange: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, i: number) => void;
  addImage: (imageUrl: string, index: number, blobData:string) => void;
  removeLink: (index:number) => void;
  onSave: () => void;
}

export const AddLinksContext = React.createContext({} as AddLinksContextProps)
export const useAddLinksContext = () => React.useContext(AddLinksContext)

interface AddLinksProviderProps {
  children: React.ReactNode;
}

export const AddLinksProvider: React.FC<AddLinksProviderProps> = ({children}) => {
  const [personalLinks, setPersonalLinks] = React.useState<PersonalLink[]>([{name:'', url: '', imagePath: ''}])
  const auth = useAuth();
  const route = useRouter();
  const {data} = useGetUserInfo(auth?.user?.uid as string)
  
  const onSave = async() => {
    if(!auth?.user?.uid){
      console.log('user needs to be logged in')
      return;
    }
   try {
    const res = await  updatePersonalLinks(auth?.user?.uid, personalLinks)
   } catch (e) {
    console.log(e)
   }
  }
  

  const addLink = () => {
    setPersonalLinks((prev) => [...prev, { url: '', name: '', imagePath: ''}])
  }
  

  const onTextChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    , i: number) => {
      e.preventDefault();
    const id = e.target.id
    const value = e.target.value
    const linktoUpdate = personalLinks[i]
    const newLink = {...linktoUpdate, [id]:value}
    personalLinks[i] = newLink
    let newState = [...personalLinks]
    setPersonalLinks(newState)
    console.log('lol', personalLinks)
  }

  const addImage = (imageUrl: string, i: number, blobData: string) => {
    const postToUpdate = personalLinks[i]
    const newPost = {...postToUpdate, imageUrl, blobData}
    personalLinks[i] = newPost
    const newState = [...personalLinks]
    setPersonalLinks(newState)
  } 

  const removeLink = (index: number) => {
    let newList = [];
    if(personalLinks.length <= 1){
      return;
    }
    for(let i = 0; i < personalLinks.length; i++){
      if(i === index){
        continue;
      } else {
        newList.push(personalLinks[i])
      }
    }
    setPersonalLinks(newList)
  }





  const addLinksFunctions = {
    personalLinks,
    addLink,
    onTextChange,
    addImage,
    removeLink,
    onSave
    
  }

  return (
    <AddLinksContext.Provider value={addLinksFunctions} >
    {children}
    </AddLinksContext.Provider>
  )
}


