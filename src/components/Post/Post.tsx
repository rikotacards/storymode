import { PostFromDbProps } from "@/firebase/db";
import React from "react";
import { PostActions } from "../PostActions/PostActions";
import { PostImageContent } from "../PostImageContent/PostImageContent";
import { PostTextContent } from "../PostTextContent/PostTextContent";
import { PostWrapper } from "../PostWrapper/PostWrapper";
import styles from "./Post.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useGetPostsByUid } from "@/hooks/useGetPostsByUid";
import { Divider, Paper, Skeleton, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useGetUsernameFromUid } from "@/hooks/useGetUsernameFromUid";
import { DoubleClickReactionWrapper } from "@/DoubleClickReactionWrapper/DoubleClickReactionWrapper";
import { ReactionsProvider } from "@/context/ReactionsContext";
import { Comments } from "../Comments";
import {
  PostDrawerContext,
  PostDrawerProvider,
} from "@/context/PostDrawerContext";
import { PostReactions } from "../PostReactions/PostReactions";

interface PostProps extends PostFromDbProps {
  isDemo?: boolean;
  demoPhotoUrl?: string;
  demoUsername?: string;
}

export const Post: React.FC<PostProps> = (props) => {
  const {
    author,
    content,
    postTime,
    postId,
    demoPhotoUrl,
    demoUsername,
    demoReactions,
  } = props;
  const images: string[] = [];
  const captions: string[] = [];

  const router = useRouter();
  const usernameFromAuthor = useGetUsernameFromUid(author);
  const usernameInPath = router.query.username;
  const postRes = useGetPostsByUid(usernameInPath);
  const dateObject = new Date(postTime);
  const dateString = dateObject.toLocaleDateString("en-us", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  content?.forEach((c) => {
    c.imagePath.length > 0 && images.push(c.imagePath);
    captions.push(c.caption);
  });

  const hasImages = images.length > 0;
  // todo
  // when grabbing info, all is ba
  images.reverse();
  captions.reverse();
  if (postRes.isLoading) {
    return (
      <Skeleton
        height={468}
        variant="rectangular"
        style={{ width: "100%", marginBottom: "8px" }}
      />
    );
  }
  return (
    <PostWrapper
      demoPhotoUrl={demoPhotoUrl}
      demoUsername={demoUsername}
      author={author}
      postId={postId}
    >
      <ReactionsProvider postId={postId} author={author}>
        <PostDrawerProvider>
          <div>
            {hasImages && (
              <DoubleClickReactionWrapper author={author} postId={postId}>
                <Swiper
                  onDoubleClick={() => console.log("do")}
                  navigation={true}
                  modules={[Navigation]}
                >
                  {content?.map((contentItem, i) => {
                    return (
                      <SwiperSlide key={contentItem.imagePath + i}>
                        <div style={{ position: "relative" }}>
                          <PostImageContent
                            isDemo={!!demoUsername}
                            imagePath={contentItem.imagePath}
                            demoImagePath={contentItem.imagePath}
                          />
                          <PostTextContent
                            key={contentItem.caption + i}
                            fontWeight={500}
                            caption={contentItem.caption}
                          />
                        </div>
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </DoubleClickReactionWrapper>
            )}
            {!hasImages && (
              <DoubleClickReactionWrapper author={author} postId={postId}>
                <Swiper navigation={true} modules={[Navigation]}>
                  {captions.map((caption, i) => (
                    <SwiperSlide key={caption + i}>
                      <Paper
                        elevation={1}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          minHeight: "300px",
                          paddingLeft: "10%",
                          paddingRight: "10%",
                          borderRadius: "10px",
                        }}
                      ></Paper>
                      <div style={{ height: "35px" }}></div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </DoubleClickReactionWrapper>
            )}
            <div style={{ display: 'flex', top: '555px', position: 'absolute', zIndex:100, width: '100%'}}>
              <PostReactions
                postId={postId}
                author={author}
                demoReactions={demoReactions}
              />
              <PostActions
                author={author}
                username={usernameFromAuthor?.data?.username}
                postId={postId}
                isDemo={!!demoUsername}
                demoReactions={demoReactions}
              />
              </div>
          </div>
        </PostDrawerProvider>
      </ReactionsProvider>
      <div style={{ paddingTop: "4px", paddingLeft: "16px" }}>
        <Comments postId={postId} authorUid={author} />
      </div>
      <Typography variant="caption" className={styles.date}>
        {dateString}
      </Typography>
      <Divider sx={{ width: "100%", padding: "8px 0px" }} />
    </PostWrapper>
  );
};
