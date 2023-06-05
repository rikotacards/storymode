import { Avatar, Divider, Typography } from "@mui/material";
import React from "react";
import styles from "./NotificationItem.module.css";
import { useGetUserInfo } from "@/hooks/useGetUserInfo";
import { Emoji } from "emoji-picker-react";
import { useGetPostByPostId } from "@/hooks/useGetPostByPostId";
import { getImagePath } from "@/firebase/db";
import { useRouter } from "next/router";

export const notificationMessage: { [key: string]: string } = {
  0: "reacted with",
  followed: "started following you",
};

interface NotificationItemProps {
  senderUid: string;
  receiverUid: string;
  payloadId: string;
  unified?: string;
  postId: string;
}
export const NotificationItem: React.FC<NotificationItemProps> = (props) => {
  const { senderUid, receiverUid, payloadId, unified, postId } = props;
  const router = useRouter();
  console.log("whatever", receiverUid, postId);
  const { post, isLoading } = useGetPostByPostId(receiverUid, postId);
  const userInfoData = useGetUserInfo(senderUid);
  const receiverUsername = useGetUserInfo(receiverUid);
  const [image, setImage] = React.useState("");
  if (isLoading) {
    return <></>;
  }
  console.log("dta", post);

  post[0]?.content?.[0].imagePath &&
    getImagePath(post[0]?.content?.[0].imagePath).then((res) => {
      setImage(res);
    });
  console.log(receiverUid, postId);
  const senderUsername = userInfoData?.data?.username;
  const redirectToPost = () => {
    router.push("/" + receiverUsername?.data?.username + "/" + postId);
  };
  return (
    <div>
      <div className={styles.container} onClick={redirectToPost}>
        <div>
          <Avatar
            sx={{ height: 32, width: 32 }}
            src={userInfoData?.data?.photoUrl}
          >
            m
          </Avatar>
        </div>
        <div style={{ marginLeft: "8px", display: "flex" }}>
          <Typography
            sx={{ marginRight: 0.5 }}
            variant="body2"
            fontWeight={600}
          >
            {senderUsername}
          </Typography>
          <div style={{ display: "flex" }}>
            <Typography variant="body2" sx={{ marginRight: 0.5 }}>
              {notificationMessage[payloadId]}
            </Typography>
            {unified && <Emoji size={18} unified={unified} />}
            <Typography sx={{ marginLeft: 0.5 }} variant="body2">
              {"on your post"}
            </Typography>
          </div>
        </div>
        <img
          src={image}
          style={{
            objectFit: "cover",
            marginLeft: "auto",
            height: 50,
            width: 50,
            visibility: !image ? "hidden" : undefined,
          }}
        />
      </div>
      <Divider sx={{ width: "100%" }} />
    </div>
  );
};
