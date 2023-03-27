import { useAuth } from '@/context/AuthContext';
import { auth } from '@/firebase/clientApp';
import { isFollowing } from '@/firebase/followerFunctions';
import React from 'react';

export const useIsFollowing = (myUserId: string, otherUserId: string) => {
  const [isFollowingUser, setIsFollowingUser] = React.useState(false);
  const {user} = useAuth()
  React.useEffect(() => {
    user?.uid &&
    (isFollowing(user.uid, otherUserId).then((res) => {
     console.log("RES', ", user.uid, otherUserId)
      setIsFollowingUser(res)
    }))
  }, [user, otherUserId])
  return {
    isFollowingUser
  }
}