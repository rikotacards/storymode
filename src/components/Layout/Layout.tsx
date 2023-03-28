import { AuthContext, AuthContextWrapper, useAuth } from "@/context/AuthContext";
import { useGetBreakpoints } from "@/hooks/useGetBreakpoint";
import { useRouter } from "next/router";
import React from "react";
import { BottomMenuBar } from "../BottomMenuBar/BottomMenuBar";
import { SideMenu } from "../SideMenu/SideMenu";
import { SignInNewUser } from "../SignInNewUser/SignInNewUser";
import styles from "./Layout.module.css";
interface LayoutProps {
  children: React.ReactNode;
}
export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const md = useGetBreakpoints("md");
  const auth = useAuth();
  const router = useRouter();
  console.log(router)
  if(!auth.isLoggedIn && router.pathname!=='/[username]'){
    return <SignInNewUser/>
  }
  return (
    <div className={styles.main}>
      
      <div className={styles.layoutMenuDesktop}>{!md && <SideMenu />}</div>
      <main className={styles.mainColumn}>{children}</main>
      {md && <BottomMenuBar />}
    </div>
  );
};
