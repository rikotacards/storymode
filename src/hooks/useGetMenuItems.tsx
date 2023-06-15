import React from "react";
import { menuItems } from "@/components/SideMenu/SideMenu";
import { useAuth } from "@/context/AuthContext";
import { Avatar, CircularProgress } from "@mui/material";
import { useGetUsernameFromUid } from "./useGetUsernameFromUid";
import { useGetUserInfo } from "./useGetUserInfo";
interface useGetMenuItemProps {
  isWide?: boolean;
}
export const useGetMenuItems = (args: useGetMenuItemProps) => {
  const { isWide } = args;
  const auth = useAuth();
  const { data, isLoading } = useGetUsernameFromUid(auth?.user?.uid || "");
  const userInfo = useGetUserInfo(auth.user?.uid || "");
  const items = [
    ...menuItems,
    {
      name: "Profile",
      path: "/" + (auth.isLoggedIn ? data?.username as string : '/p'),
      icon: isLoading ? (
        <CircularProgress size={24} />
      ) : (
        <Avatar
          sx={{
            height: "27px",
            width: "27px",
          }}
          src={userInfo?.data?.photoUrl}
          color="active"
        />
      ),
    },
  ];
  return items;
};
