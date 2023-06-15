import {
  Button,
  Card,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import styles from "./ReactionDrawer.module.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useDrawerContext } from "@/context/DrawerContext";
import { quickSelectEmojis } from "@/constants/quickSelectEmojis";
import { Emoji } from "../Emoji/Emoji";

export const ReactionsDrawer: React.FC = () => {
  const drawerContext = useDrawerContext();
  const emojis = quickSelectEmojis.map((emoji) => (
    <IconButton
      key={emoji.unified}
      onClick={() => {
      }}
    >
      <Emoji label={emoji.label} symbol={emoji.symbol} />
    </IconButton>
  ));
  return (
    <div>
      <Toolbar>
        <div className={styles.header}>
          <div>
            <Button onClick={drawerContext.onClose}>
              <Typography></Typography>
            </Button>
          </div>
          <Typography fontWeight={600}>React</Typography>
          <div>
            <IconButton onClick={drawerContext.onClose}>
              <KeyboardArrowDownIcon />
            </IconButton>
          </div>
        </div>
      </Toolbar>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignContent: "center",
          justifyContent: 'space-around'
        }}
      >
        {emojis}
      </div>
    </div>
  );
};
