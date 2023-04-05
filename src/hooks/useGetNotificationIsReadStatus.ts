import {  getNotificationIsReadStatus, getUsernames } from '@/firebase/db';
import useSWR from 'swr';

const fetcher = ([uid]: string[]) => {
  return getNotificationIsReadStatus(uid).then((res) => {
    if(res){
    return res
    }
  })
}
export const useGetNotificationIsReadStatus = (uid: string) => {
  const {data, error, isLoading} = useSWR([uid, 'useGetNotificationIsReadStatus'], fetcher);
  return {
    data, 
    error, 
    isLoading
  }
}