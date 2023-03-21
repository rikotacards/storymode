import { AddPostWidget } from "@/components/AddPostWidget/AddPostWidget";
import { Button, Input } from "@mui/material";
import React from "react";
import Head from 'next/head'
import styles from '../styles/AddPost.module.css'
const AddPost = () => {
  return (
    <>
      <Head>
        <title>Add Post</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
     
      <AddPostWidget/>
      </main>
    </>
  );
};
export default AddPost;
