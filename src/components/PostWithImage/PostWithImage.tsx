import { PostFromDbProps } from "@/firebase/db";
import React from "react";
import { PostActions } from "../PostActions/PostActions";
import { PostImageContent } from "../PostImageContent/PostImageContent";
import { PostTextContent } from "../PostTextContent/PostTextContent";
import { PostWrapper } from "../PostWrapper/PostWrapper";
import styles from "./PostWithImage.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useGetPostsByUid } from "@/hooks/useGetPostsByUid";
import { Paper, Skeleton, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useGetUsernameFromUid } from "@/hooks/useGetUsernameFromUid";
import { DoubleClickReactionWrapper } from "@/DoubleClickReactionWrapper/DoubleClickReactionWrapper";
import { ReactionsProvider } from "@/context/ReactionsContext";

export const Post: React.FC<PostFromDbProps> = (props) => {
  const { author, content, postTime, postId } = props;
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
    <PostWrapper author={author} postId={postId}>
      <ReactionsProvider>
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
                    <PostImageContent imagePath={contentItem.imagePath} />
                    <div style={{ height: "35px" }} />
                    <PostTextContent
                      key={contentItem.caption + i}
                      fontWeight={500}
                      caption={contentItem.caption}
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </DoubleClickReactionWrapper>
        )}
        {!hasImages && (
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
                >
                  <PostTextContent bold key={caption + i} caption={caption} />
                </Paper>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
        <div className={hasImages ? styles.reactionsContainer : undefined}>
          <PostActions
            author={author}
            username={usernameFromAuthor?.data?.username}
            postId={postId}
          />
        </div>
        <Typography variant="caption" className={styles.date}>
          <div onTouchStart={(e) => e.preventDefault()}></div> {dateString}
        </Typography>
      </ReactionsProvider>
    </PostWrapper>
  );
};
