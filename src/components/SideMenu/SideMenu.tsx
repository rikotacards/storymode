import { Avatar, Card, CSSObject, MenuList, Paper, styled, SwipeableDrawer, Theme } from "@mui/material";
import React from "react";
import MuiDrawer from '@mui/material/Drawer';

import { MenuItem } from "../MenuItem/MenuItem";
import styles from "./SideMenu.module.css";
import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import AddIcon from '@mui/icons-material/Add';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
export const menuItems = [
  { name: "Home", path: "/", icon: <HomeIcon/> },
  { name: "Explore", path: "/explore", icon: <ExploreIcon/> },
  { name: "Add Post", path: "/add-post", icon: <AddIcon/> },
  { name: "Drafts", path: "/drafts", icon: <DriveFileRenameOutlineIcon/> },
  { name: "Profile", path: "/max", icon: <Avatar sx={{height: 24, width: 24}}/> },
];

export const sideMenuWidth = 240;
const openedMixin = (theme: Theme): CSSObject => ({
  width: sideMenuWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: sideMenuWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

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
