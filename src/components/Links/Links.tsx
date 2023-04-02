import { useAuth } from "@/context/AuthContext";
import { useDrawerContext } from "@/context/DrawerContext";
import { useGetUidFromUsername } from "@/hooks/useGetUidFromUsername";
import { useGetUserInfo } from "@/hooks/useGetUserInfo";
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { AddLinks } from "../AddLinks/AddLinks";
import { LinkEdit } from "../LinkEdit/LinkEdit";
import { LinkItem } from "../LinkItem/LinkItem";

interface LinksProps {
  username: string;
}

export const Links: React.FC<LinksProps> = ({ username }) => {
  const { data } = useGetUidFromUsername(username as string);
  const [indexKey, setIndexKey] = React.useState(0);
  const auth = useAuth();
  const drawerContext = useDrawerContext();
  
  const uid = useGetUidFromUsername(username || "");
  const isMyProfile = auth?.user?.uid == uid?.data?.uid;
  const userInfoRes = useGetUserInfo(data?.uid);
  const links = [
    { url: userInfoRes?.data?.urlLink0, name: userInfoRes?.data?.urlName0 },
    { url: userInfoRes?.data?.urlLink1, name: userInfoRes?.data?.urlName1 },
    { url: userInfoRes?.data?.urlLink2, name: userInfoRes?.data?.urlName2 },
    { url: userInfoRes?.data?.urlLink3, name: userInfoRes?.data?.urlName3 },
    { url: userInfoRes?.data?.urlLink4, name: userInfoRes?.data?.urlName4 },
  ];
  React.useEffect(() => {
    drawerContext.setComponent("linkEditForm");
  }, [userInfoRes?.data?.urlLink0]);
  const [open, setOpen] = React.useState(false);
  const toggle = () => {
    setOpen(!open);
  };
  const setClose = () => {
    setOpen(false);
  };
  const setIndexKeyOnClick = (i: number) => {
    setIndexKey(i);
    toggle();
  };
  const items = links?.map((url, i) => (
    <LinkItem
      set={setIndexKeyOnClick}
      key={i}
      index={i}
      uid={data?.uid}
      name={url?.name || ""}
      url={url?.url || ""}
    />
  ));
  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      {items}
      {isMyProfile && (
        <>
          <Button
            onClick={drawerContext.onOpen}
            style={{ margin: "8px" }}
            variant="outlined"
            size="small"
          >
           <Typography sx={{ fontWeight: '600', textTransform: 'capitalize'}}>
            Add / Edit Link
            </Typography> 
          </Button>
          <LinkEdit
            index={indexKey}
            open={open}
            setClose={setClose}
            toggle={toggle}
          />
        </>
      )}
    </div>
  );
};
