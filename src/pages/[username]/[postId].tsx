import { Gallery } from "@/components/Gallery/Gallery";
import { LinearProgressCustom } from "@/components/LinearProgressCustom/LinearProgressCustom";
import { TabPanel } from "@/components/TabPanel/TabPanel";
import { useAuth } from "@/context/AuthContext";
import {
  getPostByPostId,
  PostFromDbProps,
} from "@/firebase/db";
import { useGetPostByPostId } from "@/hooks/useGetPostByPostId";
import { useGetUidFromUsername } from "@/hooks/useGetUidFromUsername";
import {
  Card,
  CardContent,
  Typography,
  useTheme,
} from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";

interface SinglePost {
  posts: PostFromDbProps[];
  uname: { uid: string };
  username: string;
  error: { code: number; message: string };
}

export const SinglePost: React.FC<SinglePost> = () => {
  const [value, setValue] = React.useState(0);
  const theme = useTheme();
  const router = useRouter();
  const postId = router.query.postId;
  const usernameInPath = router.query.username || "";
  const uidFromUsernameRes = useGetUidFromUsername(usernameInPath as string);
  const auth = useAuth();

  const data = useGetPostByPostId(uidFromUsernameRes?.data?.uid, postId || "");
  if (data.isLoading) {
    return <LinearProgressCustom />;
  }
  if (!data?.post || uidFromUsernameRes.isLoading || !auth) {
    return <LinearProgressCustom />;
  }
  if (uidFromUsernameRes.error) {
    return (
      <Card>
        <CardContent>
          <Typography color="error">Something went wrong</Typography>
        </CardContent>
      </Card>
    );
  }

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Head>
        <title>Profile</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {data?.post?.length && (
        <TabPanel value={0} index={0} dir={theme.direction}>
          <Gallery mode="column" posts={data?.post as PostFromDbProps[] } />
        </TabPanel>
      )}
      <div style={{ height: "50px" }} />
    </>
  );
};

export default SinglePost;
