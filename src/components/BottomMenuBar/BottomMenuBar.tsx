import * as React from "react";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";

import { menuItems } from "../SideMenu/SideMenu";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";
import { Avatar } from "@mui/material";

export const BottomMenuBar: React.FC = () => {
  const route = useRouter()
  const auth = useAuth();
  if(!auth.isLoggedIn){
    return null
  }
  let items = menuItems.map((item) => <IconButton key={item.path} onClick={() => route.push(item.path)}>{item.icon}</IconButton>)
  items = [...items,<IconButton key={auth?.user?.uid||'undefined'} onClick={() => route.push(`/${auth?.user?.uid || 'signin'}`)}>{<Avatar sx={{height: 24, width: 24}}/>}</IconButton> ]
  return (

  <AppBar position="fixed" color="primary" sx={{ top: "auto", bottom: 0 }}>
    <Toolbar >
      <Box sx={{display: 'flex', justifyContent:'space-around', width: '100%', flexGrow:1}} />
      {items}
    </Toolbar>
  </AppBar>
  )
};
