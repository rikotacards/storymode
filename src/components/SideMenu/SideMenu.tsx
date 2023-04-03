import {
  CSSObject,
  Paper,
  styled,
  Theme,
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import React from 'react';

import MuiDrawer from "@mui/material/Drawer";

import { MenuItem } from "../MenuItem/MenuItem";
import HomeIcon from "@mui/icons-material/Home";
import AddIcon from "@mui/icons-material/Add";
import { useAuth } from "@/context/AuthContext";
export const sideMenuWidth = 240;
import MenuIcon from "@mui/icons-material/Menu";
import { useRouter } from "next/router";
import { useGetMenuItems } from "@/hooks/useGetMenuItems";
export const menuItems = [
  { name: "Home", path: "/", icon: <HomeIcon /> },
  { name: "Search", path: "/search", icon: <SearchIcon /> },
  { name: "Add Post", path: "/add-post", icon: <AddIcon /> },
];
const openedMixin = (theme: Theme): CSSObject => ({
  width: sideMenuWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: sideMenuWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export const SideMenu: React.FC = () => {
  const authHook = useAuth();
  const router = useRouter();
  const menuItems = useGetMenuItems({isWide:true});
  if (!authHook.isLoggedIn) {
    return null;
  }
  

  return (
    <Paper>
      <Drawer anchor={"left"} open={true} variant="permanent">
        {menuItems.map((item) => (
          <MenuItem
            icon={item.icon}
            key={item.name}
            name={item.name}
            path={item.path}
          />
        ))}
        <div>
          <MenuItem
            name={"sign out"}
            icon={<MenuIcon />}
            path="/signout"
            onClick={() => {router.push('/signin'); authHook.onLogout()}}
          />
        </div>
      </Drawer>
    </Paper>
  );
};
