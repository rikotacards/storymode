'use client';

import Head from "next/head";
import React from "react";

import { useAuth } from "@/context/AuthContext";
import { CreateUsername } from "@/components/CreateUsername/CreateUsername";
import { useGetUserInfo } from "@/hooks/useGetUserInfo";
import { Feed } from "@/components/Feed/Feed";
import { LinearProgressCustom } from "@/components/LinearProgressCustom/LinearProgressCustom";


export default function Home() {
  const auth = useAuth();
  
  const { data, isLoading } = useGetUserInfo(auth?.user?.uid as string);
  
  const showCreateUserName = auth.isLoggedIn && !isLoading && !data?.username
  if(isLoading){
    return <LinearProgressCustom/>
  }

 
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: '100%'
      }}
    >
      <Head>
        <title>Home</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    
      <div
        style={{
          display: "flex",
          width: "100%",
          flexDirection: "column",
        }}
      >
          <div style={{ padding: "8px" }}>
        {showCreateUserName ? <CreateUsername /> : null}
      </div>
        <Feed />
      </div>
    </div>
  );
}
