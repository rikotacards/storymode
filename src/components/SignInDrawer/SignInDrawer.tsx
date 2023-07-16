import {
  Button,
  Collapse,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";

import styles from "./SignInDrawer.module.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { usePostDrawerContext } from "@/context/PostDrawerContext";
import { LoggedOutHomeMessage } from "../LoggedOutHomeMessage/LoggedOutHomeMessage";
import { NotLoggedInMessage } from "../LoggedOutCallToAction/LoggedOutCallToAction";
import { useDrawerContext } from "@/context/DrawerContext";

export const SignInDrawer: React.FC = () => {
 
  const drawerContext = usePostDrawerContext();
  const appwideDrawerContext = useDrawerContext();
  
  return (
    <div>
      <Toolbar>
        <div className={styles.header}>
          <div>
            <Button>
              <Typography></Typography>
            </Button>
          </div>
          <Typography fontWeight={600}>Log In</Typography>
          <div>
            <IconButton 
            // hacky way to access both context
                        onClick={() => {drawerContext?.onClose?.(); appwideDrawerContext?.onClose?.()}}>

              <KeyboardArrowDownIcon />
            </IconButton>
          </div>
        </div>
      </Toolbar>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignContent: "center",
            justifyContent: "space-around",
          }}
        >
          <NotLoggedInMessage/>
        </div>
      </div>
    </div>
  );
};
