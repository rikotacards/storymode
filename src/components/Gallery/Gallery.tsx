import { PostFromDbProps } from '@/firebase/db';
import React from 'react';
import styles from './Gallery.module.css';
import { PostPreview } from '../PostPreview/PostPreview';
import { PostWithImage } from '../PostWithImage/PostWithImage';
interface GalleryProps {
  posts: PostFromDbProps[];
  mode: 'grid' | 'column'
}
export const Gallery: React.FC<GalleryProps> = ({mode,posts}) => {
  const galleryItems = posts.map((post,i) => {
    if(mode === 'grid'){
      return(
        <PostPreview  postId={post.postId} key={post.content[0].caption + i} post={post.content[0]}/>
      )
    }
    return (
      <PostWithImage postTime={post.postTime} key={i} author={post.author} postId={post.postId} content={post.content}/>
    )
    
    
  })
  if (mode=='grid')
  return (
    <section className={styles['post-list']}>
      {galleryItems}
    </section>
  )

    return (
      <main style={{ flexDirection: 'column', display: 'flex', overflow: 'hidden'}}>
        {galleryItems}
      </main>
    )
  
}