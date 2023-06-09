import { getFollowings } from '@/firebase/db'
import useSWR from 'swr'

const fetcher = ([uid]: string[]) => {
  return getFollowings(uid).then((res) => {
    if(res){
      return res
    } 
    return []
  })
}
export const  useGetFollowings = (uid: string) => {
  const {data, error, isLoading} = useSWR([uid, 'useGetFollowings'], fetcher);
  return {
    data,
    error, 
    isLoading
  }
}