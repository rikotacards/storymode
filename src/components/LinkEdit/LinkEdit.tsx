import React from "react";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogContentText,
  TextField,
} from "@mui/material";
import { useGetUidFromUsername } from "@/hooks/useGetUidFromUsername";
import { useGetUserInfo } from "@/hooks/useGetUserInfo";
import styles from "./LinkEdit.module.css";
import { updateUserProfileInfo } from "@/firebase/db";
import { useAuth } from "@/context/AuthContext";
interface LinkEditProps {
  open: boolean;
  setClose: () => void;
  toggle: () => void;
  index?: number;
  urlName?: string;
  urlPath?: string;
  urls?: {name: string, url: string}[];
}
export const LinkEdit: React.FC<LinkEditProps> = ({index, setClose,  toggle, open, urlName, urlPath }) => {
  const auth = useAuth();
  
  const [name, setName] = React.useState(urlName || '');
  const [url, setUrl] = React.useState(urlPath || '')
  const [isLoading, setLoading] = React.useState(false);
  const linkKey = 'url'+index
  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }
 
  const onUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value)
  }
  const onSave = () => {
    setLoading(true)
    updateUserProfileInfo(auth?.user?.uid || "", {
      [linkKey]: {name, url}
    }).then(() => {
      setLoading(false)
    }).then(() => {
      setClose();
    })
  }

  
  return (
    <Dialog
      // sx={{ display: "flex", width: "100%", justifyContent: "center" }}
      onClose={setClose}
      open={open}
      className={styles.dialog}
    >
      <DialogContent>
        <DialogContentText>
          <TextField
            size="small"
            sx={{ m: 0.5 }}
            placeholder="e.g. Instagram"
            variant="outlined"
            fullWidth
            onChange={onNameChange}
          />

          <TextField
            size="small"
            sx={{ m: 0.5 }}
            placeholder={"Url"}
            variant="outlined"
            fullWidth
            onChange={onUrlChange}
          />
        </DialogContentText>
        <Button onClick={setClose} color="warning" sx={{ m: 0.5 }} fullWidth variant="outlined">
          Cancel
        </Button>
        <Button onClick={onSave} sx={{ m: 0.5 }} fullWidth variant="contained">
          {isLoading ?<CircularProgress size={24} /> : 'Save'}
        </Button>
      </DialogContent>
    </Dialog>
  );
};
