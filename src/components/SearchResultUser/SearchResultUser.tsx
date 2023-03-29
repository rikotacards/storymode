import { Avatar } from "@mui/material";
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
      <Avatar style={{ marginRight: "8px" }}>{username[0]}</Avatar>
      <div>{username}</div>
    </div>
  );
};