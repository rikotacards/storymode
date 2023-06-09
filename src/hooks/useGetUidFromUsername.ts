import {  getUidFromUsername } from '@/firebase/db';
import useSWR from 'swr';

const fetcher = ([username]: string[]) => {
  return getUidFromUsername(username).then((res) => {
    if(res){
      return res
    } 
    return {}
  })
}
export const useGetUidFromUsername = (username: string) => {
  const {data, error, isLoading} = useSWR([username, 'useGetUidFromUsername'], fetcher);
  return {
    data, 
    error, 
    isLoading
  }
}