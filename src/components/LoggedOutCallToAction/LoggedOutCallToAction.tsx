import {
  Button,
  Card,
  CardContent,
} from "@mui/material";
import styles from "./LoggedOutCallToAction.module.css";
import { useRouter } from "next/router";
import React from "react";
import { LoggedOutProfileMessage } from "../LoggedOutProfileMessage/LoggedOutProfileMessage";
import { LoggedOutExploreMessage } from "../LoggedOutExploreMessage/LoggedOutExploreMessage";
import { LoggedOutHomeMessage } from "../LoggedOutHomeMessage/LoggedOutHomeMessage";
import { LoggedOutNotificationsMessageCard } from "../LoggedOutNotificationsMessageCard/LoggedOutNotificationsMessageCard";
import { LoggedOutFollowProfileMessage } from "../LoggedOutFollowProfileMessage/LoggedOutFollowProfileMessage";
import { SignInWithGoogle } from "../SignInNewUser/SignInNewUser";

const messages: { [key: string]: React.ReactNode } = {
  "/search": <LoggedOutExploreMessage />,
  "/": <LoggedOutHomeMessage />,
  "/p": <LoggedOutProfileMessage />,
  "/add-post": <LoggedOutProfileMessage />,
  "/notifications": <LoggedOutNotificationsMessageCard />,
  "/[username]": <LoggedOutFollowProfileMessage />,
};

export const NotLoggedInMessage: React.FC = () => {
  const route = useRouter();

  return (
    <Card
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        // bottom: true ? "55px" : 0,
        backgroundColor: "transparent",
        backdropFilter: "blur(80px)",
        // position: "fixed",
        background: 'rgba(0, 0, 0, 0)',
        zIndex: "1000",
        flexDirection: "row",
        borderRadius: "20px",
        transition: "bottom 0.3s",
        margin: "8px",
      }}
      className={styles.container}
    >
      <CardContent sx={{ width: "100%", borderRadius: "20px" }}>
        {messages[route.pathname]}
        <div style={{ marginTop: '8px', display: "flex", flexDirection: "row" }}>
          <SignInWithGoogle/>
        </div>
      </CardContent>
    </Card>
  );
};
