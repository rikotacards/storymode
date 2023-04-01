import { Collapse, Fab, Fade, IconButton, Zoom } from "@mui/material";
import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import ExploreIcon from "@mui/icons-material/Explore";
import AddIcon from "@mui/icons-material/Add";
import { useGetMenuItems } from "@/hooks/useGetMenuItems";
import { useRouter } from "next/router";
import styles from './FloatingMenu.module.css';
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
export const FloatingMenu: React.FC = () => {

  const menuItems = useGetMenuItems();
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const toggleOpen = () => {
    setOpen(!open);
  };
  const menu = menuItems.map((item) => (
    <Fab key={item.path} sx={{ margin: 1 }} onClick={() => {router.push(item.path) ;toggleOpen()}} size="small">
      {item.icon}
    </Fab>
  ));
  return (
    <div
      className={styles.container}
    >
      <Collapse orientation="horizontal" in={open}>
        <div
          style={{
            left: "0px",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          {menu}
        </div>
      </Collapse>
      <Fab
        onClick={toggleOpen}
        style={{
          position: "relative",
          right: "0px",
          display: "flex",
          opacity: '0.7'
        }}
      >
        {!open ? <MenuIcon /> : <ChevronRightIcon />}
      </Fab>
    </div>
  );
};
