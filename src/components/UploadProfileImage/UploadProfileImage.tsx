import { updateProfileImage } from '@/firebase/db';
import { Avatar } from '@mui/material';
import React from 'react'
interface UploadProfileImageProps {
  photoUrl: string;
  uid: string;
  images: string[];
  onImageChange: (e: any) => void
  setImagePaths: (blob: string[]) => void
}
export const UploadProfileImage: React.FC<UploadProfileImageProps> = ({setImagePaths,images, onImageChange, photoUrl, uid}) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  React.useEffect(() => {
    if (images.length < 1) return;
    const newlocalImageUrls: any = [];
    images.forEach(async(image: any) =>{

      newlocalImageUrls.push(URL.createObjectURL(image))
      let dataUrl = await new Promise(r => {let a=new FileReader(); 
        a.onload=r; 
        a.readAsDataURL(image)}).then((e) => {
          // todo
          let b = e as any
          return (b.target?.result)});
      setImagePaths([dataUrl])
    }
    )
    setlocalImageUrls(newlocalImageUrls);
    // setImagePaths(blobs)

  }, [images, updateProfileImage, ]);
  const [localImageUrls, setlocalImageUrls] = React.useState([]);
  

  const handleClick = () => {
    if(inputRef.current!==null){
      inputRef.current.click();
    }
  };

  return (
    <div onClick={handleClick} style={{paddingBottom: 10}}>
       <input
              type="file"
              style={{ display: "none" }}
              ref={inputRef}
              accept="image/*"
              onChange={onImageChange}
            />
      
    <Avatar sx={{height: '120px', width: '120px'}}  src={localImageUrls[0] || photoUrl}>
   
    </Avatar>
    </div>
  )


}