import { PostFromDbProps } from '@/firebase/db';
import React from 'react';
import styles from './Gallery.module.css';
import { PostPreview } from '../PostPreview/PostPreview';
interface GalleryProps {
  posts: PostFromDbProps[];
}
export const Gallery: React.FC<GalleryProps> = ({posts}) => {
  const galleryItems = posts.map((post,i) => {
    console.log(post.content[0])
    return (
      <PostPreview key={post.content[0].caption + i} post={post.content[0]}/>
    )
    
  })
  return (
    <section className={styles['post-list']}>
      {galleryItems}
    </section>
  )
}