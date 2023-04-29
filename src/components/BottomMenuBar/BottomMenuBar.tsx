import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import clx from "clsx";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";
import { useGetMenuItems } from "@/hooks/useGetMenuItems";
import { Badge, Paper } from "@mui/material";
import { useTheme } from "@mui/system";
interface BottomMenuBarProps {
  hide?: boolean;
}
export const BottomMenuBar: React.FC<BottomMenuBarProps> = ({ hide }) => {
  const route = useRouter();
  const theme = useTheme();
  const menuItems = useGetMenuItems({ isWide: false });

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
      sx={{
        display: "flex",
        width: "100%",
        alignItems: "center",
        justifyContent: "space-between",
        top: "auto",
        bottom: hide ? "-55px" : 0,
        backgroundColor: "transparent",
        backdropFilter: "blur(5px)",
        flexDirection: "row",
        transition: "bottom 0.3s",
      }}
    >
      <Paper
        style={{
          opacity: 0.8,
          display: 'flex',
          width: '100%',
          borderRadius: 0
        }}
        elevation={0}
      >
        <Toolbar
          sx={{
            display: "flex",
            height: "100%",
            width: "100%",
          }}
        >
          {items}
        </Toolbar>
      </Paper>
    </AppBar>
  );
};
