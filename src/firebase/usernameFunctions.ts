import { doc, getDoc, setDoc } from "firebase/firestore";
import { firestore } from "./clientApp";

export const doesUsernameExist = async(username: string) => {
  const queryDoc = await getDoc(doc(firestore, "usernames", username));
  if (queryDoc.exists()) {
    console.log("WT")
    return true
  }
return false
}
export const doesUserProfileExist = async(uid: string) => {
  const queryDoc = await getDoc(doc(firestore, "userProfiles", uid));
  return !!queryDoc.exists()
}

export const addUsername = async(username: string, uid: string) => {
  console.log()
  try{
    const exists = await
     doesUsernameExist(username)
    if(exists){
      console.log('exists')
    } else {
      setDoc(doc(firestore, "usernames", username), {uid})
    }
  } catch(e){
  }
}


export const getReactions = async (docId: string) => {
  const queryDoc = await getDoc(doc(firestore, "reactions", docId));
  if (!queryDoc.exists()) {
    return {};
  }
  const reactions = queryDoc.data();
  return reactions;
};