import { PostFromDbProps, getPostByPostId } from '@/firebase/db'
import useSWR from 'swr'

const fetcher = ([uid, postId]: string[]) => {
  console.log('hithe', uid,postId)
  return getPostByPostId(uid, postId).then((res) => {
    if(res){
      return res
    } 
    return []
  })
}
export const  useGetPostByPostId = (uid: string | string[], postId: string | string[]) => {
  const {data, error, isLoading} = useSWR([uid,postId, 'useGetPostByPostId'], fetcher);
  return {
    post: [data] as PostFromDbProps[] || [], 
    error, 
    isLoading
  }
}