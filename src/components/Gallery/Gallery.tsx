import { PostFromDbProps } from "@/firebase/db";
import React from "react";
import styles from "./Gallery.module.css";
import { PostPreview } from "../PostPreview/PostPreview";
import { Post } from "../Post/Post";

interface GalleryProps {
  mode: "grid" | "column";
  posts: PostFromDbProps[];
}
export const Gallery: React.FC<GalleryProps> = ({ mode, posts }) => {
  console.log('po', posts)
  if(!posts.length){
    return <></>
  }
  const galleryItems = posts.map((post:PostFromDbProps, i) => {
    if (mode === "grid") {
      return (
        <PostPreview
        postId={post.postId}
        key={post.content[0].caption + i}
        post={post.content[0]}
        />
        );
      }
      console.log('toona', post.demoPhotoUrl)
      return (
        <Post
        postTime={post.postTime}
        key={i}
        author={post.author}
        postId={post.postId}
        content={post.content}
        demoPhotoUrl={post.demoPhotoUrl}
        demoUsername={post.demoUsername}
        demoReactions={post.demoReactions}
        />
        );
      });
      if (mode == "grid")
      return <section className={styles["post-list"]}>{galleryItems}</section>;
      
      return (
    <main
      style={{
        width: "100%",
        alignContent: "center",
        flexDirection: "column",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {galleryItems}
    </main>
  );
};
