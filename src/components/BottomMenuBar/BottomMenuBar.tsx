import * as React from "react";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Fab from "@mui/material/Fab";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import Avatar from "@mui/material/Avatar";
import MenuIcon from "@mui/icons-material/Menu";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import MoreIcon from "@mui/icons-material/MoreVert";
import { menuItems } from "../SideMenu/SideMenu";
import { useRouter } from "next/router";

export const BottomMenuBar: React.FC = () => {
  const route = useRouter()
  const items = menuItems.map((item) => <IconButton onClick={() => route.push(item.path)}>{item.icon}</IconButton>)
  return (

  <AppBar position="fixed" color="primary" sx={{ top: "auto", bottom: 0 }}>
    <Toolbar >
      <Box sx={{display: 'flex', justifyContent:'space-around', width: '100%', flexGrow:1}} />
      {items}
    </Toolbar>
  </AppBar>
  )
};
