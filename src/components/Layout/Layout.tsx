import { AuthContext, AuthContextWrapper } from "@/context/AuthContext";
import { useGetBreakpoints } from "@/hooks/useGetBreakpoint";
import React from "react";
import { BottomMenuBar } from "../BottomMenuBar/BottomMenuBar";
import { SideMenu } from "../SideMenu/SideMenu";
import styles from "./Layout.module.css";
interface LayoutProps {
  children: React.ReactNode;
}
export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const md = useGetBreakpoints("md");
  return (
    <AuthContextWrapper >
    <div className={styles.main}>
      <div className={styles.layoutMenuDesktop}>{!md && <SideMenu />}</div>
      <main className={styles.mainColumn}>{children}</main>
      {md && <BottomMenuBar />}
    </div>
    </AuthContextWrapper>
  );
};
