import { getAllNotifications, getUsernames } from '@/firebase/db';
import useSWR from 'swr';

const fetcher = ([uid]: string[]) => {
  return getAllNotifications(uid).then((res) => {
    if(res){
    return res
    }
  })
}
export const useGetNotifications = (uid: string) => {
  const {data, error, isLoading} = useSWR([uid, 'useGetNotifications'], fetcher);
  return {
    data, 
    error, 
    isLoading
  }
}