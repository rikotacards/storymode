import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";

import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";
import { useGetMenuItems } from "@/hooks/useGetMenuItems";

export const BottomMenuBar: React.FC = () => {
  const route = useRouter();
  const auth = useAuth();
  const menuItems = useGetMenuItems();
  console.log("BMENU", auth?.isLoggedIn)
  if (!auth.isLoggedIn) {
    return null;
  }
 
  let items = menuItems.map((item, i) => (
    <IconButton disabled={route.query.username == item.name} key={item.path+i} onClick={() => route.push(item.path)}>
      {item.icon}
    </IconButton>
  ));
  return (
    <AppBar position="fixed" color="primary" sx={{ display:'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between', top: "auto", bottom: 0 }}>
      <Toolbar sx={{display: 'flex', width: '100%', justifyContent: 'space-between'}} >
        {items}
      </Toolbar>
    </AppBar>
  );
};
