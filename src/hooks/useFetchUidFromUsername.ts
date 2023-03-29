import { getUsername } from '@/firebase/db';
import useSWR from 'swr';

const fetcher = ([username]: string[]) => {
  return getUsername(username).then((res) => {
    if(res){
      return res
    }
  })
}
export const useGetUidFromUsername = (username?: string | string[]) => {
  const {data, error, isLoading} = useSWR([username, 'useGetUidFromUsername'], fetcher);
  return {
    data, 
    error, 
    isLoading
  }
}