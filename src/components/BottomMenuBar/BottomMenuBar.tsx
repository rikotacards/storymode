import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import { useRouter } from "next/router";
import { useGetMenuItems } from "@/hooks/useGetMenuItems";
import { Badge, Paper } from "@mui/material";
import { useScrollDirection } from "@/hooks/useScrollDirection";
interface BottomMenuBarProps {
  hide?: boolean;
}
export const BottomMenuBar: React.FC<BottomMenuBarProps> = ({ hide }) => {
  const route = useRouter();
  const menuItems = useGetMenuItems({ isWide: false });
  const {visible} = useScrollDirection()
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
      // color="primary"
      sx={{
        // display: "flex",
        // width: "100%",
        alignItems: "center",
        justifyContent: "space-between",
        top: "auto",
        bottom: '0px',
        boxShadow: '0px, 10px',
        // border: visible? undefined : '0.5px solid white',
        height: visible ? "45px" : '45px',
        //scroll up color
        background: visible ?'rgba(0,0,0,0)': 'rgba(0,0,0,0.6)',
        // scrooll up blur
        backdropFilter: visible ? "blur(80px)": "blur(88px)",
        webkitBackdropFilter: visible ? "blur(80px)": "blur(5px)",

        //scroll down
        // background: 'rgba(0,0,0,0.3)',
        // scroll down
        // backdropFilter: "blur(45px)",
        flexDirection: "row",
        // borderRadius: visible ? 0 :'50px 50px 0px 0px',
        transition: "border-radius 0.5s ease-in-out, height 0.3s ease, backdrop-filter 0.3s ease, background 0.4s ease, -webkit-backdrop-filter 0.2s ease-in-out, backdrop-filter 0.3s ease",
      }}
    >
      
        <Toolbar
          sx={{
            display: "flex",
            width: "100%",
          }}
        >
          {items}
        </Toolbar>
    </AppBar>
  );
};
