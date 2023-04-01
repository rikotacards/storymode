import React from 'react';
import { menuItems } from "@/components/SideMenu/SideMenu";
import { useAuth } from "@/context/AuthContext";
import { Avatar, CircularProgress } from "@mui/material";
import { useGetUsernameFromUid } from "./useGetUsernameFromUid";
export const useGetMenuItems = () => {
  const auth = useAuth();
  console.log(auth)
  const {data, isLoading} = useGetUsernameFromUid(auth?.user?.uid || '')
  console.log('usegetmenu', data, isLoading)
  const items = React.useMemo(() =>
    [...menuItems, {
      name: "Profile",
      path: "/" + (data?.username as string),
      icon: isLoading ? <CircularProgress size={24}/> : <Avatar color='active' sx={{ height: 24, width: 24 }} />,
    }]
  ,[isLoading, data?.username])
  return items
};
