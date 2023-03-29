import { useGetBreakpoints } from "@/hooks/useGetBreakpoint";
import {  useGetUserInfo } from "@/hooks/useGetUserInfo";
import { Avatar, Card, CardContent, LinearProgress } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import { ProfileActions } from "../ProfileActions/ProfileActions";
import { ProfileLinks } from "../ProfileLinks/ProfileLinks";
import { ProfilePersonalInfo } from "../ProfilePersonalInfo/ProfilePersonalInfo";
import { ProfileStats } from "../ProfileStats/ProfileStats";
import styles from "./ProfileHeader.module.css";
export const ProfileHeader: React.FC = () => {
  const isLessThanMd = useGetBreakpoints("sm");
  const px = isLessThanMd ? 90 : 180;
  const router = useRouter();
  const uid = router.query.username as string;
  const {data, isLoading, error} = useGetUserInfo(uid)
  console.log('profileheader', data)
  if(isLoading){
    return <LinearProgress/>
  }
  if(error){
    return <Card>
      <CardContent>
        Something went wrong
      </CardContent>
    </Card>
  }
  return (
    <div className={styles.container}>
      <div className={styles.avatarContainer}>
        <Avatar sx={{ width: px, height: px }}>{uid?.[0]}</Avatar>
        {isLessThanMd && <ProfileActions/>}
      </div>
      <div className={styles.actionsLinksContainer}>
        {!isLessThanMd && <ProfileActions />}
        <ProfileStats />
        <ProfilePersonalInfo bio={data?.bio} displayedName={data?.username} />
        <ProfileLinks />
      </div>
    </div>
  );
};
