import { NotificationItem } from "@/components/NotificationItem/NotificationItem";
import { AppBar, Paper, Toolbar, Typography } from "@mui/material";
import React from "react";
import styles from './notifications.module.css'
import { useGetNotifications } from "@/hooks/useGetNotifications";
import { useAuth } from "@/context/AuthContext";
const Notifications: React.FC = () => {
    const auth = useAuth();
    const data = useGetNotifications(auth?.user?.uid || "")
    const notifications = data?.data?.map((data,i) => <NotificationItem postId={data?.postId} key={i} senderUid={data?.senderUid} payloadId={data?.payloadId} receiverUid={data?.receiverUid} unified={data?.unified}/>)
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      width: "100%",
    }}>
      <AppBar className={styles.appbar}>
        <Paper>

        <Toolbar>
          <Typography fontWeight={600}>{"Notifications"}</Typography>
        </Toolbar>
        </Paper>
      </AppBar>
      <Toolbar />
      <div>
        {notifications}
      </div>
    </div>
  );
};

export default Notifications;
