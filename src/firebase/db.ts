import {
  collection,
  deleteDoc,
  doc,
  FieldValue,
  getDoc,
  getDocs,
  increment,
  setDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { firestore } from "@/firebase/clientApp";
import { deleteObject, getDownloadURL, getStorage, listAll, ref, uploadString } from "firebase/storage";
import { Post } from "@/context/AddPostContext";
const storage = getStorage();

interface uploadPostProps {
  username: string;
  posts: Post[];
}

export interface PostFromDbProps {
  author: string;
  content: Post[];
  postTime: number;
  postId: string;
}

export const deletePost = async(username: string, postId: string) => {

  await deleteDoc(doc(firestore, "content", username, "posts", postId ));
  await deleteDoc(doc(firestore, "reactions", postId))
   // Create a root reference
   const listRef = ref(storage, `${username}/${postId}`);
   // Create a reference 
   listAll(listRef).then((res) => {
    res.items.forEach((item) => {
      const docRef = ref(storage, item.fullPath);
      deleteObject(docRef).then(()=> {
        console.log('deleted')
      }).catch((e) => {console.log(e)})
    })
   })

}

export const uploadPost = async (args: uploadPostProps) => {
  const { username, posts } = args;

  const collectionRef = collection(firestore, "content", username, "posts");
  const docRef = doc(collectionRef);

  const contentToUpload: Post[] = [];
  // add posts start
  try {
    posts.forEach(async (post, i) => {
      console.log(post)
      // 1) we save images into a directory that references the post
      const storageRef = ref(storage, `${username}/${docRef.id}/${i}.jpg`);
      if (!post?.blobData?.length) {
        // NO PHOTOS
        contentToUpload.push({
          caption: post.caption,
          imagePath: '',
        });
        
          // These 'then' are linked up because we need the content to upload array
          // if we didn't use the then, then the array would be empty.
          await setDoc(
            doc(firestore, "content", username, "posts", docRef.id),
            {
              postTime: Timestamp.fromDate(new Date()),
              author: username,
              content: contentToUpload,
              postId: docRef.id,
            }
          );
        
        return;
      }
      await uploadString(storageRef, post.blobData, "data_url")
        .then((snapshot) => {
          posts[i]["imagePath"] = snapshot.ref.fullPath;
          // create the content without large blob data
          contentToUpload.push({
            caption: post.caption,
            imagePath: snapshot.ref.fullPath,
          });
        })
        .then(async () => {
          // These 'then' are linked up because we need the content to upload array
          // if we didn't use the then, then the array would be empty.
          await setDoc(
            doc(firestore, "content", username, "posts", docRef.id),
            {
              postTime: Timestamp.fromDate(new Date()),
              author: username,
              content: contentToUpload,
              postId: docRef.id,
            }
          );
        });
    });

    // Init Reactions doc in firestore,
    await setDoc(doc(firestore, "reactions", docRef.id), {
      "2764-fe0f": {count: 0, hasLiked: false, emoji:'❤️' }
    });
  } catch (e) {
    return e;
  }
};
interface IncrementReactionProps {
  docId: string;
  unified: string;
  direction: 'increment' | 'decrement';
}
export const updateReaction = async({docId, unified, direction}: IncrementReactionProps) => {
  const collectionRef = collection(firestore, "reactions")
  const docRef = doc(collectionRef, docId)
  await setDoc(docRef, {[unified]: {count: increment(direction == 'increment' ? 1 : -1), hasLiked: direction == 'increment'}}, {merge: true})
}

export const addNewReaction = async({docId, emoji, unified}: {docId:string, emoji: string, unified: string}) => {
  const collectionRef = collection(firestore, "reactions")
  const docRef = doc(collectionRef, docId)
  await setDoc(docRef, {[unified]: {count: 1, hasLiked: true, emoji}}, {merge: true})
}

export const getReactions = async(docId: string) => {
  const queryDoc = await getDoc(doc(firestore, 'reactions', docId));
  if(!queryDoc.exists()){
    return {}
  }
  const reactions = queryDoc.data()
  return reactions
}



export const getImagePath = (imagePath: string) => {
  const pathReference = ref(storage, imagePath);
  return getDownloadURL(pathReference).then((url) => url).catch((e) => {
    return e
  })
}



export const getPostByUsername = async (username: string) => {
  const querySnapshot = await getDocs(
    collection(firestore, "content", username, "posts")
  );
  const post = querySnapshot.docs.map((doc) => {
    // doc.data() is never undefined for query doc snapshots
    const data = {
      ...doc.data(),
      postTime: doc.data().postTime?.toDate().getTime(),
      postId: doc.id
    };
    return data;
  });
  return post;
};
