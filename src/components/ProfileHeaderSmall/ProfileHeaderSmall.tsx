import { useAuth } from "@/context/AuthContext";
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
          Hello, week 1 of building this thing! Been a long week. Phew.
          </Typography>
      </div>
      <div>
        <ProfileActions hideName />
      </div>
    </div>
  );
};
