import { menuItems } from "@/components/SideMenu/SideMenu";
import { useAuth } from "@/context/AuthContext";
import { Avatar, CircularProgress } from "@mui/material";
import { useGetUserInfo } from "./useGetUserInfo";
import React from 'react';
export const useGetMenuItems = () => {
  const auth = useAuth();
  const { data, isLoading } = useGetUserInfo(auth?.user?.uid as string);
  
  
  
  return [...menuItems, {
    name: "Profile",
    path: "/" + (data?.username || "signin"),
    icon: isLoading ? <CircularProgress size={24}/> : <Avatar color='active' sx={{ height: 24, width: 24 }} />,
  }];
};
