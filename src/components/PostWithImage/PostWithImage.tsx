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
import {  Paper, Skeleton, Typography } from "@mui/material";
import { useRouter } from "next/router";

export const Post: React.FC<PostFromDbProps> = (props) => {
  const { author, content, postTime, postId } = props;
  const images: string[] = [];
  const captions: string[] = [];
  const router = useRouter();
  const usernameInPath = router.query.username;
  const postRes = useGetPostsByUid(usernameInPath);
  const dateObject = new Date(postTime)
  const dateString = dateObject.toLocaleDateString('en-us', {month:'short',day: 'numeric' , year:'numeric'})

  content?.forEach((c) => {
    c.imagePath.length > 0 && images.push(c.imagePath);
    captions.push(c.caption);
  });

  const [myswiper, setswiper] = React.useState(
    {} as { slideNext: () => void; slidePrev: () => void }
  );
  const hasImages = images.length > 0;
  images.reverse()
  const next = React.useCallback(() => myswiper.slideNext(), [myswiper]);
  const prev = React.useCallback(() => myswiper.slidePrev(), [myswiper]);
  if (postRes.isLoading) {
    return <Skeleton height={468} variant='rectangular' style={{ width: "100%", marginBottom: '8px' }} />;
  }
  return (
    <PostWrapper author={author} postId={postId}>
      {hasImages && (
        <Swiper
          navigation={true}
          modules={[Navigation]}
          onSlideNextTransitionEnd={next}
          onSlidePrevTransitionEnd={prev}
          onNavigationNext={next}
          onNavigationPrev={prev}
        >
          {images?.map((image, i) => {
            return (
              <SwiperSlide key={image + i}>
                <PostImageContent imagePath={image} />
              </SwiperSlide>
            );
          })}
        </Swiper>
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
                  borderRadius: '10px'
                }}
              >

                <PostTextContent bold key={caption + i} caption={caption} />
              </Paper>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
      <div className={styles.reactionsContainer}>

      <PostActions postId={postId} />
      </div>
      {hasImages && (
        <Swiper effect={"fade"} onInit={(ev) => setswiper(ev)}>
          {captions.map((caption, i) => {
            return (
              <SwiperSlide key={caption + i}>
                <div className={styles.belowImage} key={caption + i}>
                  <PostTextContent fontWeight={500} caption={caption} />
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}
      < Typography variant='caption' sx={{paddingLeft: '16px', fontWeight:'200'}}>
        {dateString}
      </Typography>
    </PostWrapper>
  );
};
