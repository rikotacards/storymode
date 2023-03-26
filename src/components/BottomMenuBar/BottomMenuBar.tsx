import * as React from "react";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";

import { menuItems } from "../SideMenu/SideMenu";
import { useRouter } from "next/router";

export const BottomMenuBar: React.FC = () => {
  const route = useRouter()
  const items = menuItems.map((item) => <IconButton key={item.path} onClick={() => route.push(item.path)}>{item.icon}</IconButton>)
  return (

  <AppBar position="fixed" color="primary" sx={{ top: "auto", bottom: 0 }}>
    <Toolbar >
      <Box sx={{display: 'flex', justifyContent:'space-around', width: '100%', flexGrow:1}} />
      {items}
    </Toolbar>
  </AppBar>
  )
};
