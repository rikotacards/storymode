import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import { useRouter } from "next/router";
import { useGetMenuItems } from "@/hooks/useGetMenuItems";
import { Badge, Button, Paper, Typography } from "@mui/material";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import { getAuth } from "firebase/auth";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
interface TopAppBarProps {
  hide?: boolean;
}
export const TopAppBar: React.FC<TopAppBarProps> = ({ hide }) => {
  const { isScrollDown } = useScrollDirection();
  const route = useRouter();
  
  const pathLength = route.asPath.split("/");
  const enableBack = pathLength.length > 1;
  const isUserProfile = route.pathname === "/[username]";
  const isHome = route.pathname ==='/'
  const auth = getAuth();
  const username = route.asPath.replace('/','')
  const isLoggedIn = !!auth.currentUser
  const onLogin = () => {
    route.push("/signin");
  };

  return (
    <AppBar
      position="fixed"
      // color="primary"
      sx={{
        display: "flex",
        width: "100%",
        alignItems: "center",
        justifyContent: "space-between",
        top: isLoggedIn ? (isUserProfile? "0px" : isScrollDown ? "-56px" : '0px') : "0px",
        flexDirection: "row",
        height: "56px",
        transition: "top 0.5s ease-in-out, height 0.3s ease",
        // overflow: "hidden",
      }}
    >
      <Paper
        style={{
          // background: "rgba(0,0,0,0)",
          display: "flex",
          width: "100%",
          borderRadius: '0px'

        }}
        elevation={0}
      >
        <Toolbar
          sx={{
            width: "100%",

          }}
        >
          {!isHome && <IconButton size="small" onClick={route.back}>
            <ArrowBackIosNewIcon />
          </IconButton>}
          <Typography variant='h5' sx={{ fontWeight: "600" }}>{route.pathname ==='/[username]' ? username : "Stills"}</Typography>
          {!auth.currentUser && (
            <Button
              sx={{ ml: "auto", textTransform: "none" }}
              variant="contained"
              size="small"
              onClick={onLogin}
            >
              Log in
            </Button>
          )}
        </Toolbar>
      </Paper>
    </AppBar>
  );
};
