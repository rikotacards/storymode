import { NotificationItem } from "@/components/NotificationItem/NotificationItem";
import { AppBar, Paper, Toolbar, Typography } from "@mui/material";
import React from "react";
import styles from './notifications.module.css'
import { useGetNotifications } from "@/hooks/useGetNotifications";
import { useAuth } from "@/context/AuthContext";
import { sampleNotificationsData } from "@/constants/sampleNotifications.data";
import { NotLoggedInMessage } from "@/components/LoggedOutCallToAction/LoggedOutCallToAction";

const NotificationsLoggedOut: React.FC = () => {
  return (
    <Typography>
      See reactions on your stories from your friends!
    </Typography>
  )
}

const Notifications: React.FC = () => {
    const auth = useAuth();
    const data = useGetNotifications(auth?.user?.uid || "")
    console.log('not', data)
    const isLoggedIn = auth.isLoggedIn
    const notifications = (isLoggedIn ? data?.data : sampleNotificationsData)?.map((data,i) => <NotificationItem postId={data?.postId} key={i} senderUid={data?.senderUid} payloadId={data?.payloadId} receiverUid={data?.receiverUid} unified={data?.unified}/>)
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      width: "100%",
    }}>
      <div>
        {notifications }
      </div>
      <NotLoggedInMessage/>
    </div>
  );
};

export default Notifications;
