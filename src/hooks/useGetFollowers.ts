import { getFollowers, getPostsByUid } from '@/firebase/db'
import useSWR from 'swr'

const fetcher = ([uid]: string[]) => {
  return getFollowers(uid).then((res) => {
    if(res){
      return res
    } 
    return []
  })
}
export const  useGetFollowers = (uid: string) => {
  const {data, error, isLoading} = useSWR([uid, 'useGetFollowers'], fetcher);
  return {
    data,
    error, 
    isLoading
  }
}