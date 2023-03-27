import { doc, getDoc, setDoc } from "firebase/firestore";
import { firestore } from "./clientApp";

export const doesUsernameExist = async(username: string) => {
  const queryDoc = await getDoc(doc(firestore, "usernames", username));
  if (!queryDoc.exists()) {
    return true
  }
  return false
}

export const addUsername = async(username: string, uid: string) => {
  try{
    const exists = await doesUsernameExist(username)
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