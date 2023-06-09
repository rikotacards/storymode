import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import { useRouter } from "next/router";
import { useGetMenuItems } from "@/hooks/useGetMenuItems";
import { Badge, Button, Paper, Typography } from "@mui/material";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import { getAuth } from "firebase/auth";
interface TopAppBarProps {
  hide?: boolean;
}
export const TopAppBar: React.FC<TopAppBarProps> = ({ hide }) => {
  const { visible } = useScrollDirection();
  const route = useRouter();
  const auth = getAuth();
  const onLogin = () => {
    route.push("/signin");
  };

  return (
    <AppBar
      position="fixed"
      color="primary"
      sx={{
        display: "flex",
        width: "100%",
        alignItems: "center",
        justifyContent: "space-between",
        top: !visible ? "-55px" : "0",
        // top:0,

        //scroll down
        background: "rgba(0,0,0,0.3)",
        // scroll down
        backdropFilter: "blur(45px)",
        flexDirection: "row",
        transition: "top 0.4s ease-in-out, height 0.3s ease",
        overflow: "hidden",
      }}
    >
      <Paper
        style={{
          background: "rgba(0,0,0,0.7)",
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
          <Typography sx={{ fontWeight: "600" }}>Journey</Typography>
          {!auth.currentUser && (
            <Button
              sx={{ ml: "auto", textTransform: 'none' }}
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
