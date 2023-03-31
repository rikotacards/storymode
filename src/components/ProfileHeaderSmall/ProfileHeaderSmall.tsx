import { useAuth } from "@/context/AuthContext";
import { useGetUserInfo } from "@/hooks/useGetUserInfo";
import { MoreHoriz } from "@mui/icons-material";
import { Avatar, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import { ProfileActions } from "../ProfileActions/ProfileActions";
import { ProfileStats } from "../ProfileStats/ProfileStats";

export const ProfileHeaderSmall: React.FC = () => {
  const router = useRouter();
  const auth = useAuth();
  const username = router.query.username;
  const {data} = useGetUserInfo(auth?.user?.uid || "")
  return (
    <div
      style={{
        width: "100%",
        padding: "16px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography sx={{ fontWeight: 800 }}>{username}</Typography>
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div>
          <Avatar
          src={auth?.user?.photoURL || ""}
            style={{ marginRight: "8px", height: 90, width: 90 }}
          ></Avatar>
        </div>
        <ProfileStats />
      </div>
      <div style={{ marginTop: "4px" }}>Max</div>
      <div style={{ margin: "0px 0px 8px 0" }}>
        <Typography>
          {data?.bio}
          </Typography>
      </div>
      <div>
        <ProfileActions hideName />
      </div>
    </div>
  );
};
