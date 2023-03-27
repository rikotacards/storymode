import { Avatar, Card, CSSObject, MenuList, Paper, styled, SwipeableDrawer, Theme } from "@mui/material";
import React from "react";
import MuiDrawer from '@mui/material/Drawer';

import { MenuItem } from "../MenuItem/MenuItem";
import styles from "./SideMenu.module.css";
import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import AddIcon from '@mui/icons-material/Add';
import { useAuth } from "@/context/AuthContext";
export const sideMenuWidth = 240;

export  const menuItems = [
  { name: "Home", path: "/", icon: <HomeIcon/> },
  { name: "Explore", path: "/explore", icon: <ExploreIcon/> },
  { name: "Add Post", path: "/add-post", icon: <AddIcon/> },

];
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
  
  const auth = useAuth()
  const all = [...menuItems,   { name: "Profile", path: "/"+ (auth?.user?.uid || 'signin'), icon: <Avatar sx={{height: 24, width: 24}}/> },
]
  

  return (
    <Paper>
      <Drawer anchor={"left"} open={true} variant="permanent">
        {all.map((item) => (
          <MenuItem icon={item.icon} key={item.name} name={item.name} path={item.path} />
        ))}
      </Drawer>
    </Paper>
  );
};
