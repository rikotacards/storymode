import { isFollowing } from '@/firebase/followerFunctions';
import useSWR from 'swr';

const fetcher = ([uid, otherUid]: string[]) => {
  return isFollowing(uid, otherUid).then((res) => {
    return res
  })
}
export const useGetIsFollowing = (uid: string, otherUid: string) => {
  const {data, error, isLoading} = useSWR([uid,otherUid, 'useGetIsFollowing'], fetcher);
  return {
    data, 
    error, 
    isLoading
  }
}