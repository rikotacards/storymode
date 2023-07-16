import { drawerChildren } from "@/constants/drawerComponents";
import {  Drawer, Paper } from "@mui/material";
import React from "react";

interface PostDrawerData {
  author?: string;
  postId?: string;
}
interface PostDrawerContextProps {
  onOpen: () => void;
  onClose: () => void;
  setComponent: (cName: string) => void;
  setData: (data: PostDrawerData) => void;
  drawerData: PostDrawerData;
}
export const PostDrawerContext = React.createContext({} as PostDrawerContextProps);
export const usePostDrawerContext = () => React.useContext(PostDrawerContext);

interface PostDrawerProviderProps {
  children: React.ReactNode;
}

export const PostDrawerProvider: React.FC<PostDrawerProviderProps> = (props) => {
  const { children } = props;
  const [open, setOpen] = React.useState(false);
  const [componentName, setComponentName] =
    React.useState<string>("linkEditForm");

  const [drawerData, setDrawerData] = React.useState({} as PostDrawerData);

  const setData = React.useCallback((data: PostDrawerData) => {
    setDrawerData((prev) => ({ ...prev, ...data }));
  }, []);

  const setComponent = React.useCallback((cName: string) => {
    setComponentName(cName);
  }, []);

  const onOpen = () => {
    setOpen(true);
  };
  const onClose = () => {
    console.log('closing')
    setOpen(false);
  };

  React.useEffect(() => {}, [componentName]);

  const context = {
    onOpen,
    onClose,
    setComponent,
    setData,
    drawerData,
  };

  return (
    <PostDrawerContext.Provider value={context}>
      {children}
      <Drawer anchor={"bottom"} open={open} onClose={onClose}>
        <Paper sx={{ overflow: "hidden" }} elevation={0}>
          {drawerChildren?.[componentName] || null}
        </Paper>
      </Drawer>
    </PostDrawerContext.Provider>
  );
};
