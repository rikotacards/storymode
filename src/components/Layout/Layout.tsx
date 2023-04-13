import { useGetBreakpoints } from "@/hooks/useGetBreakpoint";
import {
  AppBar,
  Avatar,
  Badge,
  Button,
  CssBaseline,
  Fab,
  IconButton,
  Paper,
  Snackbar,
  Toolbar,
  Typography,
} from "@mui/material";
import {featureFlags} from '../..//featureFlags'
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
import { Box, useTheme } from "@mui/system";
import { useGetNotificationIsReadStatus } from "@/hooks/useGetNotificationIsReadStatus";
import { useLongPress } from "@/hooks/useLongPress";
import { useGetMenuItems } from "@/hooks/useGetMenuItems";
import { FloatingMenuNotAbs } from "../FloatingMenuNotAbs/FloatingMenuNotAbs";
import { BottomMenuBar } from "../BottomMenuBar/BottomMenuBar";
interface LayoutProps {
  children: React.ReactNode;
}
export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const md = useGetBreakpoints("md");
  const auth = useAuth();
  const router = useRouter();
  const [prevScrollPos, setPrevScrollPos] = React.useState(0);
const [visible, setVisible] = React.useState(true)

const handleScroll = () => {
    const currentScrollPos = window.scrollY
    const bottomMenu = document.getElementById("bottomMenuBar")
  if(!bottomMenu){
    return;
  }  
  if(currentScrollPos > prevScrollPos){
        // setVisible(false)
        bottomMenu.style.bottom= "-55px"
    }else{
        // setVisible(true)
        bottomMenu.style.bottom= "0px"

    }

    setPrevScrollPos(currentScrollPos)
}
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
  const theme = useTheme();
  const signIn = useSignInWithGooglePopUp();
  const longPress = useLongPress();
    const ref = React.useRef<HTMLDivElement>({} as HTMLDivElement)
    
    React.useEffect(() => {
      window.addEventListener('scroll', handleScroll);
  
      return () => window.removeEventListener('scroll', handleScroll)
  })
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
        <div       ref={ref} onScroll={(e) => {console.log(e)}}
/>
        {children}
      </main>
      {visible && featureFlags.enableBottomMenuBar  && md && <BottomMenuBar />}
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
          {menuItems.map((item,i) => 
            { if(i!==0)return (<IconButton
              onClick={() => router.push(item.path)}
              className={styles.buttons}
              key={item.name}
            >
              {item.icon}
            </IconButton>)}
          )}
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
          <IconButton onClick={() => router.push('/')}>
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
          <IconButton onClick={() => router.push('/')}>
            <HomeIcon />
          </IconButton>
        </div>
      )}
    </div>
  );
};
