import { getAllNotifications, getAllPosts, getUsernames } from '@/firebase/db';
import useSWR from 'swr';

const fetcher = () => {
  return getAllPosts().then((res) => {
    if(res){
    return res
    }
  })
}
export const useGetAllPosts = () => {
  const {data, error, isLoading} = useSWR([ 'useGetAllPosts'], fetcher);
  return {
    data, 
    error, 
    isLoading
  }
}