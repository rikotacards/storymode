import { getAllNotifications, getAllComments, getUsernames, GetAllCommentsProps } from '@/firebase/db';
import useSWR from 'swr';

const fetcher = ([args]: GetAllCommentsProps[]) => {
  return getAllComments(args).then((res) => {
    if(res){
    return res
    }
  })
}
export const useGetAllComments = (args: GetAllCommentsProps) => {
  const {data, error, isLoading} = useSWR([ args, 'useGetAllComments'], fetcher);
  return {
    data, 
    error, 
    isLoading
  }
}