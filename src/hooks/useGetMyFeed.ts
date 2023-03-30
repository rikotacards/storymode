import { getPostsFromFollowings, getUsernames } from '@/firebase/db';
import useSWR from 'swr';

const fetcher = ([username]: string[]) => {
  return getPostsFromFollowings(username).then((res) => {
    if(res){
      return res
    } 
    return []
  })
}
export const useGetMyFeed = (username: string) => {
  const {data, error, isLoading} = useSWR([username, 'useGetMyFeed'], fetcher);
  return {
    data, 
    error, 
    isLoading
  }
}