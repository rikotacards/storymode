import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import { useRouter } from "next/router";
import { useGetMenuItems } from "@/hooks/useGetMenuItems";
import { Badge, Paper, Typography } from "@mui/material";
import { useScrollDirection } from "@/hooks/useScrollDirection";
interface TopAppBarProps {
  hide?: boolean;
}
export const TopAppBar: React.FC<TopAppBarProps> = ({ hide }) => {
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
      color="primary"
      sx={{
        display: "flex",
        width: "100%",
        alignItems: "center",
        justifyContent: "space-between",
        top: !visible ? '-55px': '0',
        // top:0,

        //scroll down
        background: 'rgba(0,0,0,0.3)',
        // scroll down
        backdropFilter: "blur(45px)",
        flexDirection: "row",
        // borderRadius: visible ? 0 :'50px 50px 0px 0px',
        transition: "top 0.5s ease-in-out, height 0.3s ease",
        overflow: 'hidden',
      }}
    >
      <Paper
        style={{
          background: 'rgba(0,0,0,0.5)',
          display: "flex",
          width: "100%",
          borderRadius: 0,
        }}
        elevation={1}
      >
        <Toolbar
          sx={{
            display: "flex",
            height: "100%",
            width: "100%",
          }}
        >
          <Typography sx={{fontWeight: '600'}}>
            Sumri
          </Typography>
        </Toolbar>
      </Paper>
    </AppBar>
  );
};
