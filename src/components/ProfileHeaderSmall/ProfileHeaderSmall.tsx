import { useAuth } from "@/context/AuthContext";
import { useGetUserInfo } from "@/hooks/useGetUserInfo";
import { MoreHoriz } from "@mui/icons-material";
import { Avatar, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import { ProfileActions } from "../ProfileActions/ProfileActions";
import { ProfileStats } from "../ProfileStats/ProfileStats";
import VerifiedIcon from "@mui/icons-material/Verified";
import { useGetUidFromUsername } from "@/hooks/useGetUidFromUsername";

export const ProfileHeaderSmall: React.FC = () => {
  const router = useRouter();
  const username = router.query.username;
  const uidRes = useGetUidFromUsername(username as string);
  const { data } = useGetUserInfo(uidRes?.data?.uid || "");
  return (
    <div
      style={{
        width: "100%",
        padding: "0px 16px 4px 16px",
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
      
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div>
          <Avatar
            src={data?.photoUrl || ""}
            style={{ marginRight: "8px", height: 90, width: 90 }}
          ></Avatar>
        </div>
        <ProfileStats />
      </div>
      <div style={{ fontWeight: "600", marginTop: "4px" }}>{data?.name}</div>
      <div style={{ margin: "0px 0px 8px 0" }}>
        <Typography variant="body2">{data?.bio}</Typography>
      </div>
      <ProfileActions hideName />
    </div>
  );
};
