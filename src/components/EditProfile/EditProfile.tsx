import {
  Button,
  Divider,
  Drawer,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { updateProfileImage, updateUserProfileInfo } from "@/firebase/db";
import { useAuth } from "@/context/AuthContext";
import { useGetUserInfo } from "@/hooks/useGetUserInfo";
import { UploadProfileImage } from "../UploadProfileImage/UploadProfileImage";
import styles from "./EditProfile.module.css";
interface EditProfileProps {
  onClose: () => void;
}

export const EditProfile: React.FC<EditProfileProps> = ({ onClose }) => {
  const [open, setOpen] = React.useState(false);
  const auth = useAuth();
  const [images, setImages] = React.useState([] as any);
  const [localImagePaths, setLocalImagePaths] = React.useState<string[]>([]);

  const setImagePaths = (localImagePaths: string[]) => {
    setLocalImagePaths((p) => [...p, ...localImagePaths]);
  };
  const onImageChange = (e: any) => {
    setImages([...e.target.files]);
  };
  const data = useGetUserInfo(auth?.user?.uid || "");
  const [state, setState] = React.useState({} as { [key: string]: string });
  const [id, setId] = React.useState("");
  const onSave = () => {
    updateUserProfileInfo(auth?.user?.uid || "", state);
    updateProfileImage(auth?.user?.uid || "", localImagePaths[0]);
  };
  const onClickSetId = (inputId: string) => {
    setId(inputId);
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState((prev) => ({ ...prev, [id]: e.target.value }));
  };

  const onDone = () => {
    onSave();
    onClose();
  };

  const close = () => {
    setOpen(false);
  };
  return (
    <Paper elevation={0} className={styles.container}>
      <div className={styles.header}>
        <Button onClick={onClose}>cancel</Button>
        <Typography fontWeight={600}>Edit Profile</Typography>
        <Button onClick={onDone}>done</Button>
      </div>
      <div>
        <div className={styles.profileImage}>
          <UploadProfileImage
            uid={data?.data?.userId}
            photoUrl={data?.data?.photoUrl}
            onImageChange={onImageChange}
            setImagePaths={setImagePaths}
            images={images}
          />
        </div>
        <Divider sx={{ width: "100%" }} />
        <div className={styles.fieldRow}>
          <Typography style={{ width: "100px" }}>Name</Typography>
          <Typography
            onClick={() => {
              onClickSetId("name");
              setOpen(true);
            }}
            color={state["name"]?.length ? undefined : "gray"}
          >
            {state["name"] || "Name"}
          </Typography>
        </div>
        <Divider sx={{ width: "100%" }} />
      </div>
      <div>
        <div className={styles.fieldRow}>
          <Typography style={{ width: "100px" }}>Username</Typography>
          <Typography
            color={state["username"]?.length ? undefined : "gray"}
            id={"username"}
            onClick={() => {
              // onClickSetId("username");
              // setOpen(true);
            }}
          >
            {state["username"] || "Username (Can't update for now.)"}
          </Typography>
        </div>
        <Divider sx={{ width: "100%" }} />
      </div>
      <div>
        <div className={styles.fieldRow}>
          <Typography style={{ width: "100px" }}>Bio</Typography>
          <Typography
            color={state["bio"]?.length ? undefined : "gray"}
            onClick={() => {
              onClickSetId("bio");
              setOpen(true);
            }}
          >
            {state["bio"] || data?.data?.bio || "Bio"}
          </Typography>
        </div>
        <Divider sx={{ width: "100%" }} />
      </div>
      <Drawer open={open} onClose={close} anchor={"right"}>
        <div style={{ width: "100vw" }}>
          <Button sx={{ marginTop: 2 }} onClick={close}>
            <ChevronLeftIcon />
          </Button>
        </div>
        <Paper style={{ margin: 14 }}>
          <TextField
            id={id}
            onChange={onChange}
            fullWidth
            variant="outlined"
            placeholder={id}
          />
        </Paper>
      </Drawer>
    </Paper>
  );
};
