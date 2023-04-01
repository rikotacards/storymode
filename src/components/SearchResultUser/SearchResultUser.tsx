import { useGetUidFromUsername } from "@/hooks/useGetUidFromUsername";
import { useGetUserInfo } from "@/hooks/useGetUserInfo";
import { Verified } from "@mui/icons-material";
import { Avatar, Divider, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
interface SearchResultUserProps {
  username: string;
}
export const SearchResultUser: React.FC<SearchResultUserProps> = ({
  username,
}) => {
  const router = useRouter();
  const data = useGetUidFromUsername(username);
  const userInfoRes = useGetUserInfo(data?.data?.uid || "");
  return (
    <div>
      <div
        onClick={() => {
          router.push("/" + username);
        }}
        style={{
          display: "flex",
          marginBottom: "16px",
          marginLeft: "8px",
          marginTop: "16px",

          alignItems: "center",
        }}
      >
        <Avatar src={userInfoRes?.data?.photoUrl} color="action" style={{ marginRight: "14px" }}>
          {username[0]}
        </Avatar>
        <Typography fontWeight={600}>{username}</Typography>
       {userInfoRes?.data?.isVerified &&  <Verified fontSize="small" sx={{marginLeft: '4px'}} color='info'/>}
      </div>
      <Divider style={{ width: "100%" }} />
    </div>
  );
};
