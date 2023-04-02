import { useAuth } from "@/context/AuthContext";
import { useDrawerContext } from "@/context/DrawerContext";
import { updateUserProfileInfo } from "@/firebase/db";
import { useGetUserInfo, UserInfoProps } from "@/hooks/useGetUserInfo";
import { ClearOutlined } from "@mui/icons-material";
import { Button, IconButton, TextField, Typography } from "@mui/material";
import React from "react";
import styles from "./AddLinks.module.css";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
interface LinkFormProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  index: number;
  name?: string;
  url?: string;
  onClear: (index: number) => void;
}

const LinkForm: React.FC<LinkFormProps> = ({ onClear, name, url, onChange, index }) => {
  return (
    <div className={styles.linkGroupContainer}>
      <div className={styles.linkGroup}>
          <TextField
            value={name}
            sx={{ marginBottom: "4px" }}
            id={"urlName" + index}
            onChange={onChange}
            placeholder="Name, e.g. Instagram"
            size="small"
            fullWidth
          />
          <TextField
            value={url}
            id={"urlLink" + index}
            onChange={onChange}
            placeholder="Url"
            size="small"
            fullWidth
          />
      </div>
      <div style={{borderRadius: '20px', flexShrink: 1, display: 'flex', justifyContent: 'center'}}>
        <IconButton color="error" onClick={() => onClear(index)}>
          <HighlightOffIcon />
        </IconButton>
      </div>
    </div>
  );
};

export const AddLinks: React.FC = () => {
  const auth = useAuth();
  const drawrContext = useDrawerContext();
  const uid = auth?.user?.uid;
  const userInfoRes = useGetUserInfo(uid as string);
  const [state, setState] = React.useState({} as any);
  React.useEffect(() => {
    setState(userInfoRes?.data);
  }, [
    userInfoRes?.data?.urlLink0,
    userInfoRes?.data?.urlLink1,
    userInfoRes?.data?.urlLink2,
    userInfoRes?.data?.urlLink3,
    userInfoRes?.data?.urlLink4,
  ]);
  const links = [
    {
      name: userInfoRes?.data?.urlName0,
      url: userInfoRes?.data?.urlLink0,
    },
    {
      name: userInfoRes?.data?.urlName1,
      url: userInfoRes?.data?.urlLink1,
    },
    {
      name: userInfoRes?.data?.urlName2,
      url: userInfoRes?.data?.urlLink2,
    },
    {
      name: userInfoRes?.data?.urlName3,
      url: userInfoRes?.data?.urlLink3,
    },
    {
      name: userInfoRes?.data?.urlName4,
      url: userInfoRes?.data?.urlLink4,
    },
  ];
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState((prev: any) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const onSave = () => {
    updateUserProfileInfo(uid || "", state);
  };
  const onClear = (index:number) => {
    setState((prev: any) => ({ ...prev, ["urlName"+index]: "", ["urlLink"+index]:"" }));

  }

  const linksDisplayed = links.map((link, i) => (
    <LinkForm
      url={state?.[`urlLink${i}`]}
      name={state?.[`urlName${i}`]}
      index={i}
      onChange={onChange}
      onClear={onClear}
    />
  ));
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <Button onClick={drawrContext.onClose}>cancel</Button>
        </div>
        <div>
          <Typography sx={{ fontWeight: 600 }}>Edit Links</Typography>
        </div>
        <div>
          <Button
            onClick={() => {
              onSave();
              drawrContext.onClose();
            }}
          >
            save
          </Button>
        </div>
      </div>
      {linksDisplayed}
    </div>
  );
};
