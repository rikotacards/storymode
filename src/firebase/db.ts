import {
  collection,
  deleteDoc,
  doc,
  FieldValue,
  getDoc,
  getDocs,
  increment,
  orderBy,
  query,
  setDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { firestore } from "@/firebase/clientApp";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  listAll,
  ref,
  uploadString,
} from "firebase/storage";
import { PostType } from "@/context/AddPostContext";
const storage = getStorage();

interface uploadPostProps {
  username: string;
  posts: PostType[];
}

export interface PostFromDbProps {
  author: string;
  content: PostType[];
  postTime: number;
  postId: string;
}

export const deletePost = async (username: string, postId: string) => {
  await deleteDoc(doc(firestore, "content", username, "posts", postId));
  await deleteDoc(doc(firestore, "reactions", postId));
  // Create a root reference
  const listRef = ref(storage, `${username}/${postId}`);
  // Create a reference
  listAll(listRef).then((res) => {
    res.items.forEach((item) => {
      const docRef = ref(storage, item.fullPath);
      deleteObject(docRef)
        .then(() => {
          console.log("deleted");
        })
        .catch((e) => {
          console.log(e);
        });
    });
  });

  const docRef = doc(firestore, "userProfiles", username);
  await setDoc(docRef, { postCount: increment(-1) }, { merge: true });
};

export const addUserToDb = async (userId: string) => {
  // Create mapping between uid to username
  const uidToUsernameRef = doc(firestore, "uidToUsername", userId);
  setDoc(uidToUsernameRef, {username: ""})

  // add self as follower
  const followersRef = doc(firestore, "userProfiles", userId, "followers", userId)
  setDoc(followersRef, {followDate:  Timestamp.fromDate(new Date())}, {merge: true})
  
  // create a userProfile
  const userProfileRef = doc(firestore, "userProfiles", userId);
  setDoc(userProfileRef, { userId: userId }, { merge: true });
};

export const uploadPost = async (args: uploadPostProps) => {
  const { username, posts } = args;
  const collectionRef = collection(firestore, "content", username, "posts");
  const docRef = doc(collectionRef);

  const contentToUpload: PostType[] = [];
  // increment post count
  const userProfileRef = collection(firestore, "userProfiles");
  const userProfileDocRef = doc(userProfileRef, username);
  await setDoc(userProfileDocRef, { postCount: increment(1) }, { merge: true });
  // add posts start
  try {
    posts.forEach(async (post, i) => {
      // 1) we save images into a directory that references the post
      const storageRef = ref(storage, `${username}/${docRef.id}/${i}.jpg`);
      if (!post?.blobData?.length) {
        // NO PHOTOS
        contentToUpload.push({
          caption: post.caption,
          imagePath: "",
        });

        // These 'then' are linked up because we need the content to upload array
        // if we didn't use the then, then the array would be empty.
        await setDoc(doc(firestore, "content", username, "posts", docRef.id), {
          postTime: Timestamp.fromDate(new Date()),
          author: username,
          content: contentToUpload,
          postId: docRef.id,
        });

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
      "2764-fe0f": { count: 0, hasLiked: false, emoji: "❤️" },
    });
  } catch (e) {
    return e;
  }
};
interface IncrementReactionProps {
  docId: string;
  unified: string;
  direction: "increment" | "decrement";
}
export const updateReaction = async ({
  docId,
  unified,
  direction,
}: IncrementReactionProps) => {
  const collectionRef = collection(firestore, "reactions");
  const docRef = doc(collectionRef, docId);
  await setDoc(
    docRef,
    {
      [unified]: {
        count: increment(direction == "increment" ? 1 : -1),
        hasLiked: direction == "increment",
      },
    },
    { merge: true }
  );
};

export const getUsername = async (username: string) => {
  try {
    const docRef = await getDoc(doc(firestore, "usernames", username));
    if (docRef.exists()) {
      return docRef.data();
    } else {
      return undefined;
    }
  } catch (e) {
    console.log(e);
  }
};

export const updateUserProfileInfo = async (
  uid: string,
  update: { [key: string]: any }
) => {
  const collectionRef = collection(firestore, "userProfiles");
  const docRef = doc(collectionRef, uid);
  await setDoc(docRef, update, { merge: true });
};

export const setUsername = async (username: string, uid: string) => {
  const docRef = doc(firestore, "usernames", username);
  await setDoc(docRef, { uid: uid }, { merge: true }).then(() => {
    return { status: "done" };
  });
  await updateUserProfileInfo(uid, { username });
};

export const getUserInfo = async (userId?: string) => {
  
  try {
    if(!userId){
      return undefined
    }
    const userInfo = await getDoc(doc(firestore, "userProfiles", userId));
    if (userInfo.exists()) {
      return userInfo.data();
    } else {
      return undefined;
    }
  } catch (e) {
    console.log(e);
  }
};

export const getUsernames = async () => {
  const querySnapshot = await getDocs(collection(firestore, "usernames"));
  const post = querySnapshot.docs;
  return post;
};

export const addNewReaction = async ({
  docId,
  emoji,
  unified,
}: {
  docId: string;
  emoji: string;
  unified: string;
}) => {
  const collectionRef = collection(firestore, "reactions");
  const docRef = doc(collectionRef, docId);
  await setDoc(
    docRef,
    { [unified]: { count: 1, hasLiked: true, emoji } },
    { merge: true }
  );
};

export const getReactions = async (docId: string) => {
  const queryDoc = await getDoc(doc(firestore, "reactions", docId));
  try {
    if (!queryDoc.exists()) {
      return {};
    }
    const reactions = queryDoc.data();
    return reactions;
  } catch (e){
    console.log(e)
  }
  
};

export const getImagePath = (imagePath: string) => {
  const pathReference = ref(storage, imagePath);
  return getDownloadURL(pathReference)
    .then((url) => url)
    .catch((e) => {
      return e;
    });
};

export const getPostByUsername = async (username: string) => {
  try {
    if (!username) {
      return [];
    }
    const querySnapshot = await getDocs(
      collection(firestore, "content", username, "posts")
    )
    const post = querySnapshot.docs.map((doc) => {
      // doc.data() is never undefined for query doc snapshots
      const data = {
        ...doc.data(),
        postTime: doc.data().postTime?.toDate().getTime(),
        postId: doc.id,
      };
      return data as PostFromDbProps;
    });
    return post;
  } catch (e) {
    console.log("eee", e);
    return e;
  }
};

const getMyFollowings = async (username: string) => {
  const querySnapshot = await getDocs(
    collection(firestore, "userProfiles", username, "following")
  );
  return querySnapshot.docs.map((data) => data.id);
};

// feed
export const getPostsFromFollowings = async (username: string) => {
  const users = await getMyFollowings(username);
  const postsPerUser = await Promise.all(
    users.map(async (user) => await getPostByUsername(user))
  ).then((res) => {
    return res
  });
  let res: PostFromDbProps[] = [];
  postsPerUser.forEach((post) => {res = [...res, ...post as PostFromDbProps[]]})
  return res.sort((a,b) => b.postTime-a.postTime)
};
