import React from "react";
import Head from "next/head";
import { AddPostContainer } from "@/components/AddPostContainer/AddPostContainer";
import { AddPostContextWrapper } from "@/context/AddPostContext";

const AddPost = () => {
  const ref = React.useRef<HTMLDivElement | undefined>();
  React.useEffect(() => {
    ref.current?.scrollIntoView({behavior: 'smooth'})
  })
  return (
    <>
      <Head >
        <title>Add Post</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <div ref={ref}/> */}
        <AddPostContextWrapper>
          <AddPostContainer />
        </AddPostContextWrapper>
    </>
  );
};
export default AddPost;
