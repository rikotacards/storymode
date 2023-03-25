import { PostWithImage } from "@/components/PostWithImage/PostWithImage";
import { ProfileHeader } from "@/components/ProfileHeader/ProfileHeader";
import { getPostByUsername, PostFromDbProps } from "@/firebase/db";
import Head from "next/head";
import React from "react";
import styles from "../styles/AddPost.module.css";

export async function getStaticPaths() {
  const paths = ["/max"];
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({
  params,
}: {
  params: { username: string };
}) {
  const posts = await getPostByUsername(params.username);
  return {
    props: {
      posts
    },
  };
}

interface ProfileProps {
  posts: PostFromDbProps[]
}

export const Profile: React.FC<ProfileProps> = ({posts}) => {
  const postWithImage = posts.map((postData, i) => <PostWithImage postId={postData.postId} key={postData.postTime+i} author={postData.author} content={postData.content} postTime={postData.postTime} />);
  return (
    <>
      <Head>
        <title>Profile</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <ProfileHeader/>
        <div>{postWithImage}</div>
      </main>
    </>
  );
};

export default Profile;
