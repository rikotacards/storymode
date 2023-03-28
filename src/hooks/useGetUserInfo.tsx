import { getUserInfo } from '@/firebase/db';
import React from 'react';

interface UserInfoProps {
  bio: string;
  followersCount: number; 
  followingCount: number;
  postCount: number;
  userId: string;
  username: string;
}

export const useGetUserInfo = (uid?: string) => {
  console.log(uid)
  
  const [userInfo, setUserInfo] = React.useState({} as UserInfoProps)
  const [isLoading, setLoading] = React.useState(true);
  React.useEffect(() => {
    if(!uid){
      return;
    }
    getUserInfo(uid).then((res) => {
      console.log('inside effect', res)
      if(res){
        setUserInfo(res as UserInfoProps);
      }
      setLoading(false);
    })
  }, [isLoading, uid])
  console.log('INSIDE HOOK', userInfo)
  return {
    ...userInfo,
    isLoading
  }
}