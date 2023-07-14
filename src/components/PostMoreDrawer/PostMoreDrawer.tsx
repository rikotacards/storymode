import {
  Button,
  Card,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import styles from "./PostMoreDrawer.module.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useDrawerContext } from "@/context/DrawerContext";

export const PostMoreDrawer: React.FC = () => {
  const drawerContext = useDrawerContext();
  return (
    <div>
      <Toolbar>
        <div className={styles.header}>
          <div>
            <Button onClick={drawerContext.onClose}>
              <Typography></Typography>
            </Button>
          </div>
          <Typography fontWeight={600}>More</Typography>
          <div>
            <IconButton onClick={drawerContext.onClose}>
              <KeyboardArrowDownIcon />
            </IconButton>
          </div>
        </div>
      </Toolbar>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Button variant='contained' sx={{ margin: 2 }}>
          Delete
        </Button>
      </div>
    </div>
  );
};
