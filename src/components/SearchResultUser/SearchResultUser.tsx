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
      <Avatar color='action' style={{ marginRight: "14px" }}>{username[0]}</Avatar>
      <Typography fontWeight={600}>{username}</Typography>
    </div>
      <Divider style={{width: '100%'}}/>
      </div>
  );
};
