import { useAddLinksContext } from "@/context/AddLinksContext";
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
  const personalLinksContext = useAddLinksContext()

  const onAddLink = React.useCallback(() => {
    context.addLink();
  }, []);

  const personalLinks = personalLinksContext.personalLinks?.map((link,i) => {
    return <LinkFormNew key={i} {...link} index={i}/>
  })

  const onSave = () => {
    context.onSave();
  };
  return (
    <div>
      <div className={styles.header}>
        <div>
          <Button>
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
      <div>{personalLinks}</div>
      <div>
        <Button onClick={onAddLink}>Add Link</Button>
      </div>
    </div>
  );
};
