import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";

import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";
import { useGetMenuItems } from "@/hooks/useGetMenuItems";
import { Badge } from "@mui/material";
import { useTheme } from "@mui/system";

export const BottomMenuBar: React.FC = () => {
  const route = useRouter();
  const auth = useAuth();
  const theme = useTheme();
  const menuItems = useGetMenuItems({isWide: false});

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
            background:
              route.pathname == item.path
                ? theme.palette.primary.light
                : undefined,
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
      id={"bottomMenuBar"}
      sx={{
        display: "flex",
        width: "100%",
        alignItems: "center",
        justifyContent: "space-between",
        top: "auto",
        bottom: 0,        
        backgroundColor: 'transparent',
        backdropFilter: 'blur(5px)',
        flexDirection: "row",
        transition: "bottom 0.3s"
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          height: "100%",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        {items}
      </Toolbar>
    </AppBar>
  );
};
