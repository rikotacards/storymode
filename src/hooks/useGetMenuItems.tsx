import { menuItems } from "@/components/SideMenu/SideMenu";
import { useAuth } from "@/context/AuthContext";
import { Avatar, CircularProgress } from "@mui/material";
import { useGetUserInfo } from "./useGetUserInfo";
import React from 'react';
import { useGetUsernameFromUid } from "./useGetUsernameFromUid";
export const useGetMenuItems = () => {
  const auth = useAuth();
  const {data, isLoading} = useGetUsernameFromUid(auth?.user?.uid || '')
  
  
  return [...menuItems, {
    name: "Profile",
    path: "/" + (data?.username as string),
    icon: isLoading ? <CircularProgress size={24}/> : <Avatar color='active' sx={{ height: 24, width: 24 }} />,
  }];
};
