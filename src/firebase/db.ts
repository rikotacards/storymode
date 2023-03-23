import { collection, doc, getDocs, setDoc, Timestamp } from "firebase/firestore";
import { firestore } from "@/firebase/clientApp";
import { getStorage, ref, uploadString } from "firebase/storage";
import { Post } from "@/context/AddPostContext";
const storage = getStorage();

interface uploadPostProps {
  username: string;
  posts: Post[];
}

export const uploadPost = async (args: uploadPostProps) => {
  const { username, posts } = args;
  const collectionRef = collection(firestore, "content", username, "posts");
  const docRef = doc(collectionRef);
  // add posts
  try {
    await setDoc(doc(firestore, "content", username, "posts", docRef.id), {
      postTime: Timestamp.fromDate(new Date()),
      author: username,
      content: posts,
    });
    // add reactions doc, 
    await setDoc(doc(firestore, "reactions", docRef.id), {
        heart: 0,
    })

    posts.forEach(async (post, i) => {
      // we save images into a directory that references the post
      const storageRef = ref(storage, `${username}/${docRef.id}/${i}.jpg`);
      if (!post.blobData) {
        return;
      }
      await uploadString(storageRef, post.blobData, "data_url").then(
        (snapshot) => {
          console.log("Uploaded a blob or file!");
        }
      );
    });
  } catch (e) {
    return e
  }
};

export const getPostByUsername =  async(username: string) => {
  const querySnapshot = await getDocs(collection(firestore, "content", username, "posts"))
  const post = querySnapshot.docs.map((doc) => {
    // doc.data() is never undefined for query doc snapshots
    const data = {
      ...doc.data(),
      postTime: doc.data().postTime?.toDate().getTime()
    }
    return data 
  });
  return post
}
