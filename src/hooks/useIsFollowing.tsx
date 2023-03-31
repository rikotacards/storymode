import { useAuth } from '@/context/AuthContext';
import { isFollowing } from '@/firebase/followerFunctions';
import React from 'react';

export const useIsFollowing = (myUserId: string, otherUserId: string) => {
  const [isFollowingUser, setIsFollowingUser] = React.useState(false);
  const {user} = useAuth()
  React.useEffect(() => {
    user?.uid &&
    (isFollowing(user.uid, otherUserId).then((res) => {
      setIsFollowingUser(res)
    }))
  }, [user, otherUserId])
  return {
    isFollowingUser
  }
}