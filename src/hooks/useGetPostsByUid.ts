import { getPostsByUid } from '@/firebase/db'
import useSWR from 'swr'

const fetcher = ([uid]: string[]) => {
  return getPostsByUid(uid).then((res) => {
    if(res){
      return res
    } 
    return []
  })
}
export const  useGetPostsByUid = (uid?: string | string[]) => {
  const {data, error, isLoading} = useSWR([uid, 'useGetPostsByUid'], fetcher);
  return {
    posts: data || [], 
    error, 
    isLoading
  }
}