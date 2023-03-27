import { deleteDoc, doc, getDoc, increment, setDoc, Timestamp } from "firebase/firestore";
import { firestore } from "./clientApp";

export const isFollowing = async(myUserId: string, otherUserId:string) => {
  console.log("FOW", myUserId, otherUserId)
  const queryDoc = await getDoc(doc(firestore, "userProfiles", myUserId, 'following', otherUserId));
  console.log(queryDoc.exists())
  return !!queryDoc.exists()
  
}

export const getFollowerInfo = async(userId: string) => {
  const queryDoc = await getDoc(doc(firestore, "userProfiles", userId));
  if (!queryDoc.exists()) {
    return {};
  }
  const reactions = queryDoc.data();
  return reactions;
}

export const updateFollowers = async (
  userId: string,
  userBeingFollowed: string,
  isIncrement: boolean,
) => {
  // 1) adding new user to my following list
  const myProfileRef = doc(
    firestore,
    "userProfiles",
    userId,
    "following",
    userBeingFollowed
  );
 
    await (isIncrement?setDoc: deleteDoc)(
      myProfileRef,
      { followDate: Timestamp.fromDate(new Date()) },
      { merge: true }
    );
  
  
  // 2) increment my following count
  await setDoc(
    doc(firestore,"userProfiles", userId),
    { followingCount: increment(isIncrement?1:-1) },
    { merge: true }
  );
  //3) new user gains followers, so add
  // into followers
  const followedUserRef = doc(
    firestore, 
    "userProfiles", 
    userBeingFollowed, 
    "followers", 
    userId
  )
  await (isIncrement?setDoc:deleteDoc)(
    followedUserRef,
    { followDate: Timestamp.fromDate(new Date()) },
    { merge: true }
  )
  // 4) increment follow count
  await setDoc(
    doc(firestore,'userProfiles', userBeingFollowed),
    { followersCount: increment(isIncrement?1:-1) },
    { merge: true }
  );

};