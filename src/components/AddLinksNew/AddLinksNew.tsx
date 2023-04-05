import { useAddLinksContext } from "@/context/AddLinksContext";
import { useDrawerContext } from "@/context/DrawerContext";
import { AppBar, Button, Paper, TextField, Toolbar, Typography } from "@mui/material";
import React from "react";
import { LinkForm } from "../LinkForm/LinkForm";
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
  }, [context]);

  const personalLinks = personalLinksContext.personalLinks?.map((link, i) => {
    return <LinkForm key={i} {...link} index={i} />;
  });

  const onSave = () => {
    context.onSave();
    drawerContext.onClose();
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Paper>
        <AppBar>
          <Toolbar>
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
          </Toolbar>
        </AppBar>
        <Toolbar />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            margin: "0px 8px 0px 8px",
          }}
        >
          {personalLinks}
        </div>
        <div style={{ margin: 16, display: "flex" }}>
          <Button variant="contained" fullWidth onClick={onAddLink}>
            Add Another Link
          </Button>
        </div>
      </Paper>
    </div>
  );
};
