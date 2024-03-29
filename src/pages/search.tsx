import Head from "next/head";
import React from "react";
import { Gallery } from "../components/Gallery/Gallery"

import { useAuth } from "@/context/AuthContext";
import {
  LinearProgress,
  TextField,
  Typography,
} from "@mui/material";
import { useGetUserInfo } from "@/hooks/useGetUserInfo";
import { useGetAllUsernames } from "@/hooks/useGetAllUsernames";
import { SearchResultUser } from "@/components/SearchResultUser/SearchResultUser";
import { LinearProgressCustom } from "@/components/LinearProgressCustom/LinearProgressCustom";
import { getAllPosts } from "@/firebase/db";
import { useGetAllPosts } from "@/hooks/useGetAllPosts";
import { sampleId } from "@/constants/sampledId";

export default function Search() {
  const auth = useAuth();
  const { data, error, isLoading } = useGetUserInfo(auth?.user?.uid || sampleId as string);
  const [text, setText] = React.useState("");
  const usernames = useGetAllUsernames();
  const users = usernames?.data?.map((user) => <SearchResultUser   key={user.id} username={user.id}/>)
  const allPosts = useGetAllPosts()
  console.log(allPosts)
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };
  if (allPosts.isLoading) {
    return <LinearProgressCustom />;
  }
  if(allPosts.error){
    return <Typography>error</Typography>
  }
 
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: '100%'
      }}
    >
      <Head>
        <title>Search</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: '100%',
          height: '100%',
          padding: "8px",
        }}
      >
        <TextField
          fullWidth
          onChange={onChange}
          value={text}
          variant="outlined"
          placeholder={"Search"}
        />
        <div style={{marginTop:'8px'}}>

        {/* {users} */}
        <Gallery mode='grid' posts={allPosts?.data || []}/>
        </div>
      </div>
    </div>
  );
}
