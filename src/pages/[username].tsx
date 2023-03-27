import { Gallery } from "@/components/Gallery/Gallery";
import { ProfileButtons } from "@/components/ProfileButtons/ProfileButtons";
import { ProfileHeader } from "@/components/ProfileHeader/ProfileHeader";
import { TabPanel } from "@/components/TabPanel/TabPanel";
import { getPostByUsername, PostFromDbProps } from "@/firebase/db";
import { Divider, useTheme } from "@mui/material";
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
      posts,
    },
  };
}

interface ProfileProps {
  posts: PostFromDbProps[];
}

export const Profile: React.FC<ProfileProps> = ({ posts }) => {
  const [value, setValue] = React.useState(0);
  const theme = useTheme();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

 
  return (
    <>
      <Head>
        <title>Profile</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <ProfileHeader />
        <Divider sx={{width:'100%'}}/>
    
        <ProfileButtons handleChange={handleChange} value={value}/>
        <TabPanel value={value} index={0} dir={theme.direction}>
        <Gallery mode='column' posts={posts}/>
      </TabPanel>
      <TabPanel value={value} index={1} dir={theme.direction}>
        < Gallery mode='grid' posts={posts}/>
      </TabPanel>
    </>
  );
};

export default Profile;
