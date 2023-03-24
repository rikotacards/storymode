import React from 'react';
import Image, { StaticImageData } from 'next/image'
import { getImagePath } from '@/firebase/db';
import { Url } from 'next/dist/shared/lib/router/router';

interface PostImageContentProps {
  imageUrl: string | StaticImageData;
  imagePath: string;
}
export const PostImageContent: React.FC<PostImageContentProps> = ({imagePath, imageUrl}) => {
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
      alt={`${imageUrl}`}
      src={path}
      width={468}
      //oriignally 540
      height={484}
      />
    </div>
  )
}
