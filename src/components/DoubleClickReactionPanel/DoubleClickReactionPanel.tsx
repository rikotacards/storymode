import React from "react";
import styles from "./DoubleClickReactionPanel.module.css";
import { Collapse, Dialog, IconButton } from "@mui/material";
import { AddReactionButton } from "../AddReactionButton/AddReactionButton";
import { ReactionQuickSelect } from "../ReactionQuickSelect/ReactionQuickSelect";
import { Picker } from "../Picker/Picker";
import { useEmojiInfo } from "@/hooks/useEmojiInfo";
interface DoubleClickReactionPanelProps {
  visible: boolean;
  cancelTimeout: () => void;
  close: () => void;
  author: string;
  postId: string;
}
export const DoubleClickReactionPanel: React.FC<
  DoubleClickReactionPanelProps
> = ({ visible, cancelTimeout, close, author, postId }) => {
  const [open, setOpen] = React.useState(false);
  const [rerender, setRerender] = React.useState(false);
  const [showEmoji, setShowEmoji] = React.useState(false);
  const [openEmojiPicker, setOpenPicker] = React.useState(false);
  const [displayedEmoji, setDisplayedEmoji] = React.useState<string | null>(
    null
  );
  const { onAddEmojiClick } = useEmojiInfo({ author, postId });
  const openQuickSelect = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setOpenPicker(false);
  };
  const closeQuickSelect = () => {
    setOpen(false);
  };

  return (
    <>
      <div className={styles.container}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {
            ((showEmoji || visible) && <IconButton
              key={rerender + (displayedEmoji ||"") }
              className={ styles.popupAnimation}
            >
            {displayedEmoji || "❤️"}
            </IconButton>)
          }
          <Collapse
            style={{
              display: "flex",
              justifyContent: "center",
              zIndex: 1000,
              textAlign: "center",
              alignItems: "center",
              alignContent: "center",
            }}
            orientation="vertical"
            in={visible && !open}
          >
            <AddReactionButton
              onClick={() => {
                cancelTimeout();
                openQuickSelect();
              }}
            />
          </Collapse>
          <Collapse
            orientation="vertical"
            in={open}
            style={{
              display: "absolute",
              top: 0,
              border: "1px solid blue",
              zIndex: 1000,
            }}
          >
            <ReactionQuickSelect
              openEmojiPicker={() => {
                setOpenPicker(true);
                close();
                closeQuickSelect();
              }}
              onEmojiClick={(unified, emoji) => {
                onAddEmojiClick(unified, emoji);
                setDisplayedEmoji(emoji);
                closeQuickSelect();
                close();
                setRerender(!rerender)
                setShowEmoji(true);
                setTimeout(() => setShowEmoji(false), 2000);
              }}
            />
          </Collapse>
        </div>

        <Dialog onClose={handleClose} open={openEmojiPicker}>
          <div style={{ display: "flex" }}>
            <Picker
              autoFocusSearch={false}
              onEmojiClick={(d) => {
              
                onAddEmojiClick(d.unified, d.emoji);
                setDisplayedEmoji(d.emoji);
                setShowEmoji(true);
                setTimeout(() => setShowEmoji(false), 2000);
                setOpenPicker(false);
              }}
            />
          </div>
        </Dialog>
      </div>
      {/* <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          background: "black",
          opacity: "0.3",
          position: "absolute",
          zIndex:500,
          visibility: visible ? "visible" : "hidden",
        }}
      /> */}
    </>
  );
};
