import { getUserInfo } from '@/firebase/db';
import React from 'react';
import useSWR from 'swr'
interface UserInfoProps {
  bio: string;
  followersCount: number; 
  followingCount: number;
  postCount: number;
  userId: string;
  username: string;
}

const fetcher = ([uid]: string[]) => {
  if(!uid){
    return undefined
  }
  return getUserInfo(uid as string).then((res) => {
    return res
  })
}
export const useGetUserInfo = (uid: string | string[]) => {
  const {data, error, isLoading} = useSWR([uid,'useGetUserInfo'], fetcher);
  return {
    data, 
    error, 
    isLoading
  }
}