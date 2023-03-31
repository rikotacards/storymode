import { useGetBreakpoints } from "@/hooks/useGetBreakpoint";
import { Button, Snackbar } from "@mui/material";
import React from "react";
import { BottomMenuBar } from "../BottomMenuBar/BottomMenuBar";
import { SideMenu } from "../SideMenu/SideMenu";
import { SignInNewUser } from "../SignInNewUser/SignInNewUser";
import styles from "./Layout.module.css";
import { AuthContext, useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";
import { useSignInWithGooglePopUp } from "@/firebase/useSignInWithGooglePop";

interface LayoutProps {
  children: React.ReactNode;
}
export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const md = useGetBreakpoints("md");
  const auth = useAuth();
  const router = useRouter();
  const signIn = useSignInWithGooglePopUp();

  return (
    <div className={styles.main}>
      <div className={styles.layoutMenuDesktop}>{auth?.isLoggedIn &&!md && <SideMenu />}</div>
      <main className={styles.mainColumn}>{children}</main>
      {auth?.isLoggedIn && md && <BottomMenuBar />}
      <Snackbar
        open={!auth?.isLoggedIn && router.pathname == "/[username]"}
        autoHideDuration={6000}
        onClose={() => {}}
        message="Welcome"
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
