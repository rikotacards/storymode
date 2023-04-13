import { useGetBreakpoints } from "@/hooks/useGetBreakpoint";
import {
  Badge,
  Button,
  IconButton,
  Paper,
  Snackbar,
  Toolbar,
  Typography,
} from "@mui/material";
import { featureFlags } from "../..//featureFlags";
import HomeIcon from "@mui/icons-material/Home";

import React from "react";
import { SideMenu } from "../SideMenu/SideMenu";
import styles from "./Layout.module.css";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";
import { useSignInWithGooglePopUp } from "@/firebase/useSignInWithGooglePop";
import { FloatingMenu } from "../FloatingMenu/FloatingMenu";
import VerifiedIcon from "@mui/icons-material/Verified";

import { useGetUidFromUsername } from "@/hooks/useGetUidFromUsername";
import { useGetUserInfo } from "@/hooks/useGetUserInfo";
import { useGetNotificationIsReadStatus } from "@/hooks/useGetNotificationIsReadStatus";
import { useLongPress } from "@/hooks/useLongPress";
import { useGetMenuItems } from "@/hooks/useGetMenuItems";
import { BottomMenuBar } from "../BottomMenuBar/BottomMenuBar";
import { useScrollDirection } from "@/hooks/useScrollDirection";
interface LayoutProps {
  children: React.ReactNode;
}
export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const md = useGetBreakpoints("md");
  const auth = useAuth();
  const {visible} = useScrollDirection();
  const router = useRouter();
  const menuItems = useGetMenuItems({ isWide: false });
  const username = router.query?.username;
  const uid = useGetUidFromUsername(username as string);
  const userInfo = useGetUserInfo(uid?.data?.uid as string);
  const notificationStatus = useGetNotificationIsReadStatus(
    (auth?.user?.uid as string) || ""
  );
  const hasUnreadNotifications = notificationStatus.data?.isRead;
  const showPostBar =
    router.pathname == "/[username]/[postId]" ||
    router.pathname == "/[username]";
  const signIn = useSignInWithGooglePopUp();
  const longPress = useLongPress();

  const showLoginSnackbar =
    !auth?.isLoading && !auth?.isLoggedIn && router.pathname == "/[username]";
  return (
    <div className={styles.main}>
      <div className={styles.layoutMenuDesktop}>
        {auth?.isLoggedIn && !md && <SideMenu />}
      </div>
      <main
        className={styles.mainColumn}
        //@ts-ignore
        onTouchStart={(e) => longPress.handlePressStart(e)}
        onTouchEnd={longPress.handlePressEnd}
      >
        {showPostBar && (
          <div
            className={styles.topbar}
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              zIndex: "100",
              display: "flex",
              position: "fixed",
              height: "50px",
            }}
            onClick={() => router.push("/" + username)}
          >
            <Paper
              style={{
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                zIndex: "100",
                display: "flex",
                position: "fixed",
                height: "50px",
                opacity: 0.8,
                borderRadius: 0,
              }}
              elevation={0}
            ></Paper>
            <Typography
              sx={{ position: "relative", zIndex: "1000", fontWeight: 600 }}
            >
              {username}
            </Typography>
            {userInfo?.data?.isVerified && (
              <VerifiedIcon
                sx={{ zIndex: "1000", marginLeft: "4px", fontSize: "large" }}
                color="info"
              />
            )}
          </div>
        )}
        {showPostBar && <Toolbar />}
        {children}
      </main>
      { featureFlags.enableBottomMenuBar && md && <BottomMenuBar hide={!visible} />}
      <Snackbar
        open={showLoginSnackbar}
        message="Welcome to Stomo.io"
        action={
          <Button
            variant="contained"
            onClick={(e) => {
              e.preventDefault();
              signIn.signIn();
            }}
          >
            Sign Up
          </Button>
        }
      />
      {!featureFlags.enableBottomMenuBar && auth?.isLoggedIn && (
        <Badge badgeContent={1} variant="dot">
          <FloatingMenu />
        </Badge>
      )}
      {longPress.isOpen && (
        <div
          style={{
            left: longPress.position.x - 120,
            top: longPress.position.y - 100,
          }}
          className={styles.container}
        >
          {menuItems.map((item, i) => {
            if (i !== 0)
              return (
                <IconButton
                  onClick={() => router.push(item.path)}
                  className={styles.buttons}
                  key={item.name}
                >
                  {item.icon}
                </IconButton>
              );
          })}
        </div>
      )}
      {longPress.isOpen && (
        <div
          style={{
            left: longPress.position.x - 120,
            top: longPress.position.y - 20,
          }}
          className={styles.container}
        >
          <IconButton onClick={() => router.push("/")}>
            <HomeIcon />
          </IconButton>
        </div>
      )}
      {longPress.isOpen && (
        <div
          style={{
            left: longPress.position.x + 60,
            top: longPress.position.y - 20,
          }}
          className={styles.container}
        >
          <IconButton onClick={() => router.push("/")}>
            <HomeIcon />
          </IconButton>
        </div>
      )}
    </div>
  );
};
