import { Avatar, Typography } from "@mui/material";
import React from "react";
import styles from "./NotificationItem.module.css";
import { useGetUserInfo } from "@/hooks/useGetUserInfo";
import { Emoji } from "emoji-picker-react";
import { userInfo } from "os";

export const notificationMessage: { [key: string]: string } = {
  0: "reacted with",
  followed: "started following you",
};

interface NotificationItemProps {
  senderUid: string;
  receiverUid: string;
  payloadId: string;
  unified?: string;
}
export const NotificationItem: React.FC<NotificationItemProps> = (props) => {
  const { senderUid, receiverUid, payloadId, unified } = props;

  const userInfoData = useGetUserInfo(senderUid);
  const senderUsername = userInfoData?.data?.username;
  return (
    <div className={styles.container}>
      <div>
        <Avatar src={userInfoData?.data?.photoUrl}>m</Avatar>
      </div>
      <div style={{ marginLeft: "8px", display: 'flex' }}>
        <Typography sx={{marginRight: 0.5}} variant="body2" fontWeight={600}>
          {senderUsername}
        </Typography>
        <div style={{ display: "flex" }}>
          <Typography variant="body2" sx={{ marginRight: 0.5 }}>
            {notificationMessage[payloadId]}
          </Typography>
          {unified && <Emoji size={18} unified={unified} />}
          <Typography sx={{ marginLeft: 1 }} variant="body2">
            {"on your post"}
          </Typography>
        </div>
      </div>
      <div
        style={{
          marginLeft: "auto",
          height: 50,
          width: 50,
          border: "1px solid white",
        }}
      ></div>
    </div>
  );
};
