import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import { useRouter } from "next/router";
import { useGetMenuItems } from "@/hooks/useGetMenuItems";
import { Badge, Paper } from "@mui/material";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import { useAuth } from "@/context/AuthContext";
interface BottomMenuBarProps {
  hide?: boolean;
}
export const BottomMenuBar: React.FC<BottomMenuBarProps> = ({ hide }) => {
  const route = useRouter();
  const isHome = route.pathname === '/'
  const auth = useAuth();
  const enableDelayedMenu = isHome && !auth.isLoggedIn
  console.log('d', enableDelayedMenu)
  const [show, setShow] = React.useState(false);
  const delay = 5000
  React.useEffect(() => {
    if(enableDelayedMenu){
      setTimeout(() => setShow(true), delay)
    } else {
      setShow(true)
    }
  }, [])
  const menuItems = useGetMenuItems({ isWide: false });
  const {isScrollDown} = useScrollDirection()
  let items = menuItems.map((item, i) => (
    <div
      key={item.path + i}
      onClick={() => route.push(item.path)}
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <IconButton
          sx={{
            color: route.pathname == item.path ? "white" : "gray",
          }}
          key={item.path + i}
        >
          {item.icon}
        </IconButton>
        <Badge />
      </div>
    </div>
  ));
  return (
    <AppBar
      position="fixed"
      sx={{
        alignItems: "center",
        justifyContent: "space-between",
        top: "auto",
        bottom: show ? "0px" :"-55px",
        height: "45px",
        overflow: 'hidden',
        background: isScrollDown ?'rgba(0,0,0,0)': 'rgba(0,0,0,0.6)',
        backdropFilter: isScrollDown ? "blur(80px)": "blur(88px)",
        webkitBackdropFilter: isScrollDown ? "blur(80px)": "blur(5px)",
        flexDirection: "row",
        transition: "border-radius 0.5s ease-in-out, bottom 0.2s ease-in-out, backdrop-filter 0.3s ease, background 0.4s ease, -webkit-backdrop-filter 0.2s ease-in-out, backdrop-filter 0.3s ease",
      }}
    >
      <Paper sx={{borderRadius: '0px', width: '100%'}} elevation={0}>
        <Toolbar
          sx={{
            display: "flex",
            width: "100%",
          }}
        >
          {items}
        </Toolbar>
        </Paper>
    </AppBar>
  );
};
