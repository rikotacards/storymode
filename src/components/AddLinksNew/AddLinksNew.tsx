import { useAddLinksContext } from "@/context/AddLinksContext";
import { useDrawerContext } from "@/context/DrawerContext";
import { Button, TextField, Typography } from "@mui/material";
import React from "react";
import { LinkFormNew } from "../LinkFormNew/LinkFormNew";
import styles from "./AddLinksNew.module.css";

interface LinkFormNewProps {
  url: string;
  name: string;
  index: number;
}

export const AddLinksNew: React.FC = () => {
  const context = useAddLinksContext();
  const personalLinksContext = useAddLinksContext();
  const drawerContext = useDrawerContext();
  const onAddLink = React.useCallback(() => {
    context.addLink();
  }, []);

  const personalLinks = personalLinksContext.personalLinks?.map((link, i) => {
    return <LinkFormNew key={i} {...link} index={i} />;
  });

  const onSave = () => {
    context.onSave();
    drawerContext.onClose();
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div className={styles.header}>
        <div>
          <Button onClick={drawerContext.onClose}>
            <Typography>Cancel</Typography>
          </Button>
        </div>
        <Typography fontWeight={600}>Edit Links</Typography>
        <div>
          <Button onClick={onSave}>
            <Typography>Save</Typography>
          </Button>
        </div>
      </div>
      <div style={{ padding: 16 }}>{personalLinks}</div>
      <div style={{ margin: 16, display: "flex" }}>
        <Button variant="contained" fullWidth onClick={onAddLink}>
          Add Another Link
        </Button>
      </div>
    </div>
  );
};
