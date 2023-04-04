import { getUserInfo } from '@/firebase/db';
import useSWR from 'swr'
export interface UserInfoProps {
  bio: string;
  followersCount: number; 
  followingCount: number;
  postCount: number;
  userId: string;
  username: string;
  photoUrl: string;
  isVerified?: boolean;
  name: boolean;
  urlName0?: string;
  urlLink0?: string;
  urlName1?: string;
  urlLink1?: string;
  urlName2?: string;
  urlLink2?: string;
  urlName3?: string;
  urlLink3?: string;
  urlName4?: string;
  urlLink4?: string;
  link: {url: string, name: string, imagePath: string}[]

}

const fetcher = ([uid]: string[]) => {
 
  return getUserInfo(uid as string).then((res) => {
    return res
  }).catch((e) => {
    return e
  })
}
export const useGetUserInfo = (uid: string | string[]) => {
  const {data, error, isLoading}: {data: UserInfoProps, error: any, isLoading: boolean} = useSWR([uid,'useGetUserInfo'], fetcher);
  return {
    data, 
    error, 
    isLoading
  }
}