import { Badge, Collapse, Fab } from "@mui/material";
import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { useGetMenuItems } from "@/hooks/useGetMenuItems";
import { useRouter } from "next/router";
import styles from "./FloatingMenu.module.css";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { BadgeCustom } from "../BadgeCustom/BadgeCustom";
export const FloatingMenu: React.FC = () => {
  const menuItems = useGetMenuItems({ isWide: false });
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const toggleOpen = () => {
    setOpen(!open);
  };
  const menu = menuItems.map((item, i) => (

    <Badge invisible={item.name!=='notifications'} color='error' variant='dot'>
    <Fab
      key={item.path +i}
      sx={{ margin: '0px 0px 0px 16px' }}
      onClick={() => {
        router.push(item.path);
        toggleOpen();
      }}
      size="small"
      >
      {item.icon}
    </Fab>
    </Badge>
  ));
  return (
    <div className={styles.container }>
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
      <BadgeCustom color='error' invisible={open} badgeContent={1} variant='dot'>
      <Fab
        onClick={toggleOpen}
        style={{
          position: "relative",
          right: "0px",
          margin: '0px',
          display: "flex",
          opacity: "0.7",
          marginLeft: open? '8px': undefined,
        }}
      >

        {!open ? <MenuIcon /> : <ChevronRightIcon />}
      </Fab>
        </BadgeCustom>
    </div>
  );
};