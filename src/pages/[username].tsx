import { Post } from '@/context/AddPostContext';
import { getPostByUsername } from '@/firebase/db';
import Head from 'next/head';
import React from 'react';
import styles from "../styles/AddPost.module.css";

export async function getStaticPaths() {
  const paths = ['/max']
  return {
    paths,
    fallback: false,
  };
}


export async function getStaticProps({ params }: {params: {username: string}}) {
  const posts = await getPostByUsername(params.username);
  console.log(posts)
  return {
    props: {
      posts,
    },
  };
}

export const Profile = ({posts}: {posts: Post[]}) => {
  console.log('profle', posts)
  const postc = posts.map((post, i) => <div key={post.postTime + i}>{post.postTime}</div>)
  return (
<>
      <Head>
        <title>Profile</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div>
    {postc}
        </div>
      </main>
    </>
  )
}

export default Profile