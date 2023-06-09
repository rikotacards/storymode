import { useAuth } from "@/context/AuthContext";
import { updateFollowers } from "@/firebase/followerFunctions";
import { useGetIsFollowing } from "@/hooks/useGetIsFollowing";
import { useGetUserInfo } from "@/hooks/useGetUserInfo";
import { useGetUsernameFromUid } from "@/hooks/useGetUsernameFromUid";
import { Avatar, Button, Divider, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
interface UserRowProps {
  uid: string;
}
export const UserRow: React.FC<UserRowProps> = ({ uid }) => {
  const { data } = useGetUserInfo(uid);
  const auth = useAuth();
  const route = useRouter();
  const goToProfile = (username: string) => {
    route.push(`/${username}`)
  }
  const { data: username } = useGetUsernameFromUid(uid);
  const {data: isFollowing} = useGetIsFollowing(auth?.uid || "", uid);
  return (
    <div
    onClick={() => goToProfile(username?.username)}
    style={{width: '100%', display: 'flex', flexDirection: 'column', padding: '0px 8px'}}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Avatar src={data?.photoUrl} sx={{ marginRight: "8px", height: '50px', width: '50px' }}></Avatar>
        <div>
          <Typography sx={{fontWeight:'bold'}}>{username?.username}</Typography>
          <Typography >{data?.name}</Typography>
        </div>
        <div style={{ marginLeft: "auto" }}>
          <Button
          variant={isFollowing ? 'outlined' : 'contained'}
          onClick={ () =>   updateFollowers(auth?.uid || "", uid, !isFollowing)}
          
          style={{textTransform: 'none', marginLeft: '8px', fontWeight: 'bold'}} size='small'>{isFollowing ? 'Unfollow' : 'Follow'}</Button>
        </div>
      </div>
      <Divider sx={{ width: "100%", margin: '8px 0px' }} />
    </div>
  );
};
