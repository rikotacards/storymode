import { useGetBreakpoints } from "@/hooks/useGetBreakpoint";
import {
  Badge,
  Button,
  Paper,
  Snackbar,
  Toolbar,
  Typography,
} from "@mui/material";

import React from "react";
import { SideMenu } from "../SideMenu/SideMenu";
import styles from "./Layout.module.css";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";
import { useSignInWithGooglePopUp } from "@/firebase/useSignInWithGooglePop";
import VerifiedIcon from "@mui/icons-material/Verified";

import { useGetUidFromUsername } from "@/hooks/useGetUidFromUsername";
import { useGetUserInfo } from "@/hooks/useGetUserInfo";
import { useGetNotificationIsReadStatus } from "@/hooks/useGetNotificationIsReadStatus";
import { useGetMenuItems } from "@/hooks/useGetMenuItems";
import { BottomMenuBar } from "../BottomMenuBar/BottomMenuBar";
import { NotLoggedInMessage } from "../LoggedOutCallToAction/LoggedOutCallToAction";
import { TopAppBar } from "../TopAppBar/TopAppBar";
import { getAuth } from "firebase/auth";
import { SignInWithGoogle } from "../SignInNewUser/SignInNewUser";
import { LoggedOutHomeMessage } from "../LoggedOutHomeMessage/LoggedOutHomeMessage";
interface LayoutProps {
  children: React.ReactNode;
}
export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const md = useGetBreakpoints("md");
  const [showSnackbar, setShowSnackbar] = React.useState(false);
  const auth = useAuth();
  const auth2 = getAuth();
  const router = useRouter();
  if (!auth.isLoggedIn) {
    setTimeout(() => {
      setShowSnackbar(true);
    }, 10000);
  }
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
  const isOtherProfile = router.pathname == "/[username]";
  return (
    <div className={styles.main}>
      <div className={styles.layoutMenuDesktop}>{!md && <SideMenu />}</div>
      <main className={styles.mainColumn}>
        {/* <div style={{height: '45px'}}/> */}

        {true && md && <TopAppBar hide={false} />}
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
        <Toolbar />
        {children}
      </main>
      {md && (
        <>
          <div style={{ height: "50px" }} />
          <BottomMenuBar hide={false} />
        </>
      )}

      {showSnackbar && <NotLoggedInMessage />}
    </div>
  );
};
