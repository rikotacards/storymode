import {
  Button,
  Card,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import styles from "./ShareDrawer.module.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useDrawerContext } from "@/context/DrawerContext";

export const ShareDrawer: React.FC = () => {
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
          <Typography fontWeight={600}>Share</Typography>
          <div>
            <IconButton onClick={drawerContext.onClose}>
              <KeyboardArrowDownIcon />
            </IconButton>
          </div>
        </div>
      </Toolbar>
      <div>
        <Card sx={{m:2, p:2}}>
          <Typography>Copy link</Typography>
        </Card>
      </div>
    </div>
  );
};
