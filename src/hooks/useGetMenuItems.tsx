import React from 'react';
import { menuItems } from "@/components/SideMenu/SideMenu";
import { useAuth } from "@/context/AuthContext";
import { Avatar, CircularProgress } from "@mui/material";
import { useGetUsernameFromUid } from "./useGetUsernameFromUid";
import { useGetUserInfo } from './useGetUserInfo';
export const useGetMenuItems = () => {
  const auth = useAuth();
  const {data, isLoading} = useGetUsernameFromUid(auth?.user?.uid || '')
  const userInfo = useGetUserInfo(auth.user?.uid || "")
  console.log(userInfo)
  const items =  [...menuItems, {
    name: "Profile",
    path: "/" + (data?.username as string),
    icon: isLoading ? <CircularProgress size={24}/> : <Avatar src={userInfo?.data?.photoUrl} color='active' sx={{ height: '100%', width: '100%' }} />,
  }]
  return items
};
