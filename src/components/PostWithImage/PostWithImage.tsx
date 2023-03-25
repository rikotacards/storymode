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


export const PostWithImage: React.FC<PostFromDbProps> = (props) => {
  const { author, content, postTime, postId } = props;
  const images: string[] = [];
  const captions: string[] = [];
 
 
  content?.forEach((c) => {images.push(c.imagePath);captions.push(c.caption)})
  // todo: quick hack. we should just save it in order
  images.reverse();
  captions.reverse();
  const [myswiper, setswiper] = React.useState(
    {} as { slideNext: () => void; slidePrev: () => void }
  );
  
  const  next = React.useCallback(() => myswiper.slideNext(),[myswiper])
  const  prev = React.useCallback(() => myswiper.slidePrev(),[myswiper])

  return (
    <PostWrapper author={author}>
      <Swiper
        navigation={true}
        modules={[Navigation]}
        onSlideNextTransitionEnd={next}
        onSlidePrevTransitionEnd={prev}
        onNavigationNext={next}
        onNavigationPrev={prev}
      >
        {images.map((image, i) => {
          return (
            <SwiperSlide key={image + i}>
              <PostImageContent imagePath={image} imageUrl={image} />
            </SwiperSlide>
          );
        })}
      </Swiper>
      <PostActions />
      <Swiper onInit={(ev) => setswiper(ev)}>
        {captions.map((caption, i) => {
          return (
            <SwiperSlide key={caption + i}>
              <div className={styles.belowImage} key={caption + i}>
                <PostTextContent caption={caption}/>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </PostWrapper>
  );
};
