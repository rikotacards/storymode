import { Avatar, Card, Drawer, MenuList, Paper, SwipeableDrawer } from "@mui/material";
import React from "react";
import { MenuItem } from "../MenuItem/MenuItem";
import styles from "./SideMenu.module.css";
import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import AddIcon from '@mui/icons-material/Add';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
const menuItems = [
  { name: "Home", path: "/", icon: <HomeIcon/> },
  { name: "Explore", path: "/explore", icon: <ExploreIcon/> },
  { name: "Add Post", path: "/add-post", icon: <AddIcon/> },
  { name: "Drafts", path: "/drafts", icon: <DriveFileRenameOutlineIcon/> },
  { name: "Profile", path: "/max", icon: <Avatar sx={{height: 24, width: 24}}/> },
];

export const SideMenu: React.FC = () => {
  return (
    <Paper>
      <Drawer anchor={"left"} open={true} variant="permanent">
        {menuItems.map((item) => (
          <MenuItem icon={item.icon} key={item.name} name={item.name} path={item.path} />
        ))}
      </Drawer>
    </Paper>
  );
};
