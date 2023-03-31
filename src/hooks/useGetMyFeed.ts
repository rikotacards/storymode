import { getPostsFromFollowings } from '@/firebase/db';
import useSWR from 'swr';

const fetcher = ([uid]: string[]) => {
  return getPostsFromFollowings(uid).then((res) => {
    if(res){
      return res
    } 
    return []
  })
}
export const useGetMyFeed = (uid: string) => {
  const {data, error, isLoading} = useSWR([uid, 'useGetMyFeed'], fetcher);
  return {
    data, 
    error, 
    isLoading
  }
}