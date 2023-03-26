import React from 'react';
import Image from 'next/image'
import { getImagePath } from '@/firebase/db';

interface PostImageContentProps {
  imagePath: string;
}
export const PostImageContent: React.FC<PostImageContentProps> = ({imagePath}) => {
  const [path, setPath] = React.useState("");
  if(!imagePath){
    return <></>
  }
  getImagePath(imagePath).then((data) => {
    setPath(data)
  }).catch((e) => {
    console.log(e)
  }).then(((d) => {console.log(path)}))

  return (
    <div style={{
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      overflow: 'hidden',  
      position: 'relative'}}>
      <Image 
      style={{objectFit: 'cover'}} 
      alt={imagePath}
      src={path}
      width={468}
      //oriignally 540
      height={484}
      />
    </div>
  )
}
