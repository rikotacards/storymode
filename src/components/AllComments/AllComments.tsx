import { useGetAllComments } from '@/hooks/useGetAllComments';
import React from 'react';
import { CommentRow } from '../CommentRow/CommentRow';

interface AllCommentsProps {
  postId: string;
  postAuthorUid: string;
}
export const AllComments: React.FC<AllCommentsProps> = ({postId, postAuthorUid}) => {
  const {data, isLoading} = useGetAllComments({
    postId, 
    postAuthorUid
  })
  if(isLoading){
    return <></>
  }
  const commentRows = data?.map((data, i) => <CommentRow commentAuthorUid={data.commentAuthorUid} commentId={data.commentId} postId={postId} postAuthorUid={postAuthorUid}key={data.commentId} username={data?.commentAuthorUid} comment={data.comment}/>)
  return (
    <>{commentRows}</>
  )
}