import { getUsernameFromUid } from '@/firebase/db';
import useSWR from 'swr';

const fetcher = ([uid]: string[]) => {
  return getUsernameFromUid(uid).then((res) => {
    if(res){
      return res
    } 
    return undefined
  })
}
export const useGetUsernameFromUid = (uid: string) => {
  const {data, error, isLoading} = useSWR([uid, 'useGetUsernameFromUid'], fetcher);
  return {
    data, 
    error, 
    isLoading
  }
}