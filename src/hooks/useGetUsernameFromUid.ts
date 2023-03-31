import { getPostsFromFollowings, getUidFromUsername, getUsernameFromUid, getUsernames } from '@/firebase/db';
import useSWR from 'swr';

const fetcher = ([uid]: string[]) => {
  return getUsernameFromUid(uid).then((res) => {
    console.log(res)
    if(res){
      return res
    } 
    return []
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