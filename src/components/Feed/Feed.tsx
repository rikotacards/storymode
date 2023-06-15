import { useAuth } from "@/context/AuthContext";
import { useGetMyFeed } from "@/hooks/useGetMyFeed";
import { useGetUserInfo } from "@/hooks/useGetUserInfo";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { Gallery } from "../Gallery/Gallery";
import { TabPanel } from "../TabPanel/TabPanel";
import { LinearProgressCustom } from "../LinearProgressCustom/LinearProgressCustom";
import { sampleId } from "@/constants/sampledId";
import { PostFromDbProps } from "@/firebase/db";
import { demoFeed } from "@/constants/sampleFeed.data";

interface FeedProps {
  sampleFeed?: {
    data: PostFromDbProps[] | undefined;
    error: any;
    isLoading: boolean;
  };
  isDemo?: boolean;
}

export const Feed: React.FC<FeedProps> = () => {
  const auth = useAuth();
  const router = useRouter();
  const userInfoRes = useGetUserInfo(auth?.user?.uid || sampleId);
  const feedRes =  useGetMyFeed(auth?.user?.uid || sampleId);
  //airplane
  // if (!userInfoRes.data && feedRes?.isLoading) {
  //   return <LinearProgressCustom />;
  // }
  const hasNoContent = 
    !feedRes?.isLoading && userInfoRes?.data?.followersCount === 0;
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

  const data = auth.isLoggedIn ? (feedRes?.data || []) : demoFeed 

  return (
    <div>
          <Gallery  posts={ data} mode="column" />
    </div>
  );
};
