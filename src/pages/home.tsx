import { Gallery } from "@/components/Gallery/Gallery";
import { ProfileButtons } from "@/components/ProfileButtons/ProfileButtons";
import { ProfileHeader } from "@/components/ProfileHeader/ProfileHeader";
import { TabPanel } from "@/components/TabPanel/TabPanel";
import { getPostByUsername, PostFromDbProps } from "@/firebase/db";
import { Card, CardContent, Divider, Typography, useTheme } from "@mui/material";
import Head from "next/head";
import React from "react";


interface HomeProps {
  posts: PostFromDbProps[];
}

const Home: React.FC<HomeProps> = ({ posts }) => {
  
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
      <Head>
        <title>Home</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div style={{  padding: '8px'}}>
        <Card>
          <CardContent>
            <Typography>
             {" You're currently not following anyone"}
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Home;
