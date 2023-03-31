import { useAuth } from "@/context/AuthContext";
import { useGetMyFeed } from "@/hooks/useGetMyFeed";
import { useGetUserInfo } from "@/hooks/useGetUserInfo";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  LinearProgress,
  Typography,
} from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { Gallery } from "../Gallery/Gallery";
import { TabPanel } from "../TabPanel/TabPanel";

export const Feed: React.FC = () => {
  const auth = useAuth();
  const router = useRouter();
  const userInfoRes = useGetUserInfo(auth?.user?.uid || "");
  console.log('brozki',  userInfoRes)
  const feedRes = useGetMyFeed(auth?.user?.uid || "");
  if (!userInfoRes.data && feedRes?.isLoading) {
    return <LinearProgress style={{ width: "100%" }} />;
  }
  const hasNoContent =
    !feedRes.isLoading && userInfoRes?.data?.followersCount === 0;
  if (hasNoContent) {
    return (
      <Card sx={{ margin: 1, display: "flex" }}>
        <CardContent>
          <Typography variant="body2">
            {"You're currently not following anyone"}
          </Typography>
          <CardActions>
            <Button
              sx={{ margin: 1 }}
              onClick={() => router.push("/search")}
              variant="contained"
            >
              Explore
            </Button>
          </CardActions>
        </CardContent>
      </Card>
    );
  }

  return (
    <div>
      <Head>
        <title>Home</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <TabPanel value={0} index={0}>
          <Gallery posts={feedRes.data || []} mode="column" />
        </TabPanel>
      </div>
      <div style={{ height: "50px" }} />
    </div>
  );
};
