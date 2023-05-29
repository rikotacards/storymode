import { useGetBreakpoints } from "@/hooks/useGetBreakpoint";
import {
  Badge,
  Button,
  Paper,
  Snackbar,
  Toolbar,
  Typography,
} from "@mui/material";
import { featureFlags } from "../..//featureFlags";

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
import { useGetMenuItems } from "@/hooks/useGetMenuItems";
import { BottomMenuBar } from "../BottomMenuBar/BottomMenuBar";
import { NotLoggedInMessage } from "../LoggedOutCallToAction/LoggedOutCallToAction";
import { TopAppBar } from "../TopAppBar/TopAppBar";
interface LayoutProps {
  children: React.ReactNode;
}
export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const md = useGetBreakpoints("md");
  const auth = useAuth();
  const router = useRouter();
  const username = router.query?.username;
  const uid = useGetUidFromUsername(username as string);
  const userInfo = useGetUserInfo(uid?.data?.uid as string);
  const notificationStatus = useGetNotificationIsReadStatus(
    (auth?.user?.uid as string) || ""
  );
  const hasUnreadNotifications = notificationStatus.data?.isRead;
  const showPostBar =
    router.pathname == "/[username]/[postId]" ||
    router.pathname == "/[username]" ||
    router.pathname == "/p";

  const signIn = useSignInWithGooglePopUp();
  const isOtherProfile = router.pathname == '/[username]'
  return (
    <div className={styles.main}>
      <div className={styles.layoutMenuDesktop}>
        {!md && <SideMenu />}
      </div>
      <main
        className={styles.mainColumn}
      >
              {/* <div style={{height: '45px'}}/> */}

        { false && md && 
        <TopAppBar hide={false} />
      }
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
        {!auth.isLoggedIn &&  <NotLoggedInMessage />}
      </main>
      { md && 
        <BottomMenuBar hide={false} />
      }
      <Snackbar
        open={false}
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
    </div>
  );
};
