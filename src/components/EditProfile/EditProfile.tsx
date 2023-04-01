import { ChevronLeft } from "@mui/icons-material";
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
import { setUsername, updateProfileImage, updateUserProfileInfo } from "@/firebase/db";
import { useRouter } from "next/router";
import { useGetUidFromUsername } from "@/hooks/useGetUidFromUsername";
import { useAuth } from "@/context/AuthContext";
import { useGetUserInfo } from "@/hooks/useGetUserInfo";
import { UploadProfileImage } from "../UploadProfileImage/UploadProfileImage";
interface EditProfileProps {
  onClose: () => void;
}

export const EditProfile: React.FC<EditProfileProps> = React.memo(
  ({ onClose }) => {
    const [open, setOpen] = React.useState(false);
    const router = useRouter();
    const auth = useAuth();
    const username = router.query.username;
    const [images, setImages] = React.useState([] as any);
    const [imageblobs, setImageblobs] = React.useState<string[]>([])
    
    const setBlob = (blob: string[]) => {
      console.log('set', blob)
      setImageblobs((p) => [...p, ...blob])
    }
    const onImageChange = (e: any) => {
      setImages([...e.target.files]);
    };
    const userIdFromUsernameRes = useGetUidFromUsername(username as string);
    const data = useGetUserInfo(auth?.user?.uid || "");
    const [state, setState] = React.useState({} as { [key: string]: string });
    const [id, setId] = React.useState("");
    const onSave = () => {
      updateUserProfileInfo(auth?.user?.uid || "", state);
      updateProfileImage(auth?.user?.uid || "", imageblobs[0])

    };
    const onClickSetId = (inputId: string) => {
      setId(inputId);
    };
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setState((prev) => ({ ...prev, [id]: e.target.value }));
    };
    const onOpen = () => {
      setOpen(true);
    };
    const close = () => {
      setOpen(false);
    };
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
            margin: "14px 0px 14px 0",
          }}
        >
          <Button onClick={onClose}>cancel</Button>
          <Typography style={{ fontWeight: "600" }}>Edit Profile</Typography>
          <Button
            onClick={() => {
              onSave();
              onClose();
            }}
          >
            done
          </Button>
        </div>
        <div>
          <div style={{padding: 4,display: 'flex', width: '100%', justifyContent: 'center'}}>
            <UploadProfileImage
              uid={data?.data?.userId}
              photoUrl={data?.data?.photoUrl}
              onImageChange={onImageChange}
              setImageBlobs={setBlob}
              images={images}
             
            />
          </div>
          <Divider sx={{ width: "100%" }} />
          <div
            style={{
              margin: "14px 14px 14px 14px",
              display: "flex",
              flexDirection: "row",
              width: "100%",
            }}
          >
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
          <div
            style={{
              margin: "14px 14px 14px 14px",
              display: "flex",
              flexDirection: "row",
              width: "100%",
            }}
          >
            <Typography style={{ width: "100px" }}>Username</Typography>
            <Typography
              color={state["username"]?.length ? undefined : "gray"}
              id={"username"}
              onClick={() => {
                onClickSetId("username");
                setOpen(true);
              }}
            >
              {state["username"] || "Username (Can't update for now.)"}
            </Typography>
          </div>
          <Divider sx={{ width: "100%" }} />
        </div>
        <div>
          <div
            style={{
              margin: "14px 14px 14px 14px",
              display: "flex",
              flexDirection: "row",
              width: "100%",
            }}
          >
            <Typography style={{ width: "100px" }}>Bio</Typography>
            <Typography
              color={state["bio"]?.length ? undefined : "gray"}
              onClick={() => {
                onClickSetId("bio");
                setOpen(true);
              }}
            >
              {state["bio"] || data.data.bio || "Bio"}
            </Typography>
          </div>
          <Divider sx={{ width: "100%" }} />
        </div>
        <div>
          <div
            style={{
              margin: "14px 14px 14px 14px",
              display: "flex",
              flexDirection: "row",
              width: "100%",
            }}
          >
            <Typography style={{ width: "100px" }}>Links</Typography>
            <Typography style={{}}>Add Links</Typography>
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
      </div>
    );
  }
);
