import { drawerChildren } from "@/constants/drawerComponents";
import { AppBar, Drawer, Paper, Toolbar } from "@mui/material";
import React from "react";

interface PostContextProps {
  onOpen: () => void;
  onClose: () => void;
  setComponent: (cName: string) => void;
  setData: (data: any) => void;
  data: {[key: string]: any}
}
export const PostContext = React.createContext({} as DrawerContextProps);
export const useDrawerContext = () => React.useContext(DrawerContext);

interface DrawerProviderProps {
  children: React.ReactNode;
}

export const DrawerProvider: React.FC<DrawerProviderProps> = (props) => {
  const { children } = props;
  const [open, setOpen] = React.useState(false);
  const [componentName, setComponentName] =
    React.useState<string>("linkEditForm");

  const [postInfo, setPostInfo] = React.useState({})

  const setData= React.useCallback((data: any) => {
    setPostInfo(data);
  }, []);


  const setComponent = React.useCallback((cName: string) => {
    setComponentName(cName);
  }, []);

  const onOpen = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {}, [componentName]);

  const context = {
    onOpen,
    onClose,
    setComponent,
    setData,
    data: {
      postInfo
    }
  };

  return (
    <DrawerContext.Provider value={context}>
      {children}
      <Drawer  anchor={"bottom"} open={open} onClose={onClose}>
        <Paper  elevation={0}>

        {drawerChildren?.[componentName] || null}
        </Paper>
      </Drawer>
    </DrawerContext.Provider>
  );
};
