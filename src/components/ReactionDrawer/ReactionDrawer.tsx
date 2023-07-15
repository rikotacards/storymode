import {
  Button,
  Card,
  Collapse,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { useEmojiInfo } from "@/hooks/useEmojiInfo";

import styles from "./ReactionDrawer.module.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useDrawerContext } from "@/context/DrawerContext";
import { quickSelectEmojis } from "@/constants/quickSelectEmojis";
import { Emoji } from "../Emoji/Emoji";
import { Picker } from "../Picker/Picker";

export const ReactionsDrawer: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const toggle = () => {
    setOpen(!open);
  };
  const drawerContext = useDrawerContext();
  const { drawerData } = drawerContext;
  const { author, postId } = drawerData;
  const { onAddEmojiClick } = useEmojiInfo({
    author: author || "",
    postId: postId || "",
  });
  const emojis = quickSelectEmojis.map((emoji) => (
    <IconButton key={emoji.unified} onClick={() => {}}>
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
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignContent: "center",
            justifyContent: "space-around",
          }}
        >
          {emojis}
        </div>
        <Button onClick={toggle}>{open ? "Less" : "More"}</Button>
        <div
          style={{ display: "flex", width: "100%", justifyContent: "center" }}
        >
          <Collapse in={open}>
            <Picker
              onEmojiClick={({ unified, emoji }) => {
                onAddEmojiClick(unified, emoji);
              }}
            />
          </Collapse>
        </div>
      </div>
    </div>
  );
};
