import {
  addDoc,
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
import { abort } from "process";
import { doesUsernameExist } from "./usernameFunctions";
import { ReactionsStateType } from "@/components/Reactions/Reactions";
const storage = getStorage();

interface uploadPostProps {
  uid: string;
  posts: PostType[];
}

export interface PostFromDbProps {
  author: string;
  content: PostType[];
  postTime: number;
  postId: string;
  demoPhotoUrl?: string;
  demoUsername?: string;
  demoReactions?: ReactionsStateType
}



export const deletePost = async (uid: string, postId: string) => {
  await deleteDoc(doc(firestore, "content", uid, "posts", postId));
  await deleteDoc(doc(firestore, "reactions", postId));
  // Create a root reference
  const listRef = ref(storage, `${uid}/${postId}`);
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

  const docRef = doc(firestore, "userProfiles", uid);
  await setDoc(docRef, { postCount: increment(-1) }, { merge: true });
};

const updateUidToUsername = async (
  uid: string,
  username: string,
  merge?: boolean
) => {
  const uidToUsernameRef = doc(firestore, "uidToUsername", uid);
  await setDoc(uidToUsernameRef, { username: username || "" }, { merge });
};
//init a user to db
export const addUserToDb = async ({
  userId,
  photoUrl,
}: {
  userId: string;
  photoUrl: string;
}) => {
  // Create mapping between uid to username
  // add self as follower
  // create a userProfile
  const userProfileRef = doc(firestore, "userProfiles", userId);
  const snap = await getDoc(userProfileRef);
  if (snap.exists()) {
    return;
  } else {
    const followersRef = doc(
      firestore,
      "userProfiles",
      userId,
      "following",
      userId
    );
    setDoc(
      followersRef,
      { followDate: Timestamp.fromDate(new Date()) },
      { merge: true }
    );
    setDoc(userProfileRef, { userId: userId, photoUrl }, { merge: true });
  }
};

export const updateProfileImage = async (
  uid: string,
  localImagePath: string
) => {
  if (!localImagePath) {
    return;
  }
  const storageRef = ref(storage, `${uid}/profieImage/profileImage.jpg`);
  const snapshot = await uploadString(storageRef, localImagePath, "data_url");
  const url = await getImagePath(snapshot.ref.fullPath);
  await setDoc(
    doc(firestore, "userProfiles", uid),
    {
      photoUrl: url,
    },
    { merge: true }
  );
};

export const uploadPost = async (args: uploadPostProps) => {
  const { uid, posts } = args;
  const collectionRef = collection(firestore, "content", uid, "posts");
  const docRef = doc(collectionRef);

  const contentToUpload: PostType[] = [];
  // increment post count
  const userProfileRef = collection(firestore, "userProfiles");
  const userProfileDocRef = doc(userProfileRef, uid);
  await setDoc(userProfileDocRef, { postCount: increment(1) }, { merge: true });
  // add posts start
  try {
    posts.forEach(async (post, i) => {
      // 1) we save images into a directory that references the post
      const storageRef = ref(storage, `${uid}/${docRef.id}/${i}.jpg`);
      if (!post?.blobData?.length) {
        // NO PHOTOS
        contentToUpload.push({
          caption: post.caption,
          imagePath: "",
        });

        // These 'then' are linked up because we need the content to upload array
        // if we didn't use the then, then the array would be empty.
        await setDoc(doc(firestore, "content", uid, "posts", docRef.id), {
          postTime: Timestamp.fromDate(new Date()),
          author: uid,
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
          await setDoc(doc(firestore, "content", uid, "posts", docRef.id), {
            postTime: Timestamp.fromDate(new Date()),
            author: uid,
            content: contentToUpload,
            postId: docRef.id,
          });
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
export const getUsernameFromUid = async (uid: string) => {
  try {
    const docRef = await getDoc(doc(firestore, "uidToUsername", uid));
    if (docRef.exists()) {
      return docRef.data();
    } else {
      return undefined;
    }
  } catch (e) {
    console.log(e);
  }
};
export const getUidFromUsername = async (username: string) => {
  try {
    const docRef = await getDoc(doc(firestore, "usernames", username));
    if (docRef.exists()) {
      return docRef.data();
    } else {
      return undefined;
    }
  } catch (e) {
    console.log(e);
    return undefined;
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

export const updateUsernameToUid = async (uid: string, username: string) => {
  const docRef = doc(firestore, "usernames", username);
  await setDoc(docRef, { uid: uid }, { merge: true }).then(() => {
    return { status: "done" };
  });
};

export const setUsername = async (username: string, uid: string) => {
  const yeswehave = await doesUsernameExist(username);
  console.log("whatever", username, uid);
  if (yeswehave) {
    console.log("yes");
    return;
  }

  await updateUidToUsername(uid, username);
  await updateUsernameToUid(uid, username);
  await updateUserProfileInfo(uid, { username });
};

export const getUserInfo = async (userId?: string) => {
  try {
    if (!userId) {
      return undefined;
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
  } catch (e) {
    console.log(e);
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

export const getPostByPostId = async (uid: string, postId: string) => {
  if (!uid || !postId) {
    return undefined;
  }
  const querySnapshot = await getDoc(
    doc(firestore, "content", uid, "posts", postId)
  );
  if (!querySnapshot.exists()) {
    return undefined;
  }
  const data = {
    ...querySnapshot.data(),
    postTime: querySnapshot.data().postTime?.toDate().getTime(),
    postId: querySnapshot.id,
  };
  return data;
};

// Used for discover / search
export const getAllPosts = async () => {
  const uidsWithPosts: string[] = []
  let allPosts: PostFromDbProps[] = []
  try {
    const querySnapshot = await getDocs(collection(
      firestore,
      "content"
    ))
    querySnapshot.docs.forEach((doc) => {
      uidsWithPosts.push(doc.data().author)
    })
    uidsWithPosts.forEach(async (uid) => {
      const posts = await getPostsByUid(uid)
      if(posts?.length){
        allPosts.push(...posts)
      }
      
    })
    return allPosts

  } catch (e) {
    console.log('error', e)
  }
};

export const getPostsByUid = async (uid: string) => {
  try {
    if (!uid) {
      return [];
    }
    const querySnapshot = await getDocs(
      collection(firestore, "content", uid, "posts")
    );
    const post = querySnapshot.docs.map((doc) => {
      // doc.data() is never undefined for query doc snapshots
      const data = {
        ...doc.data(),
        postTime: doc.data().postTime?.toDate().getTime(),
        postId: doc.id,
      };
      return data as PostFromDbProps;
    });
    return post.sort((a, b) => b.postTime - a.postTime);
  } catch (e) {
    console.log("eee", e);
  }
};

const getMyFollowings = async (uid: string) => {
  const querySnapshot = await getDocs(
    collection(firestore, "userProfiles", uid, "following")
  );
  return querySnapshot.docs.map((data) => data.id);
};

// feed
export const getPostsFromFollowings = async (uid: string) => {
  const users = await getMyFollowings(uid);
  console.log("users", users);
  const postsPerUser = await Promise.all(
    users.map(async (uid) => await getPostsByUid(uid))
  ).then((res) => {
    return res;
  });
  let res: PostFromDbProps[] = [];
  postsPerUser.forEach((post) => {
    res = [...res, ...(post as PostFromDbProps[])];
  });
  return res.sort((a, b) => b.postTime - a.postTime);
};

export const updatePersonalLinks = async (
  uid: string,
  personalLinks: { url: string; name: string; imagePath: string }[]
) => {
  const filteredLinks = personalLinks.map((link) => {
    if (link.name.length > 0 && link.url.length > 0) {
      return link;
    }
  });
  await setDoc(
    doc(firestore, "userProfiles", uid),
    { link: filteredLinks },
    { merge: true }
  );
};

interface addNotificationArgs {
  senderUid: string;
  receiverUid: string;
  payloadId: number;
  unified?: string;
  postId: string;
}
export const addNotification = async (args: addNotificationArgs) => {
  const { receiverUid } = args;
  const collRef = collection(
    firestore,
    "notifications",
    receiverUid,
    "allNotifications"
  );
  await addDoc(collRef, args);
};

export const getAllNotifications = async (uid: string) => {
  const collRef = collection(
    firestore,
    "notifications",
    uid,
    "allNotifications"
  );
  const nots = await getDocs(collRef);
  if (nots.size > 0) {
    return nots.docs.map((data) => data.data());
  }
  return [];
};
export const toggleNotificationStatus = async (
  uid: string,
  isRead: boolean
) => {
  setDoc(doc(firestore, "notifications", uid), { isRead });
};
export const getNotificationIsReadStatus = async (uid: string) => {
  const docRef = await getDoc(doc(firestore, "notifications", uid));
  return docRef.data();
};

// uid to know whos posting
// text of post
// parentId
interface AddCommentProps {
  postId: string;
  postAuthorUid: string;
  comment: string;
  commentAuthorUid: string;

}
export const addComment = async ({postId,commentAuthorUid, postAuthorUid, comment}: AddCommentProps) => {
  const docRef = await addDoc(collection(firestore, 'content', postAuthorUid, 'posts', postId, 'comments'), {
    comment, 
    postTime: Timestamp.fromDate(new Date()),
    commentAuthorUid

  })
  if(docRef.id){
    return {ok: true, data: {comment, postTime: Timestamp.fromDate(new Date()), commentAuthorUid}}
  }
}

export const deleteComment = async() => {

}
export interface GetAllCommentsProps {
  postId: string;
  postAuthorUid: string;
}
export const getAllComments = async ({postId, postAuthorUid}: GetAllCommentsProps) => {
  const snapshot = await getDocs(collection(firestore, "content", postAuthorUid, 'posts', postId, 'comments'))
  const res = [] as any[]
  snapshot.forEach((data) => {
    const newData = {
      ...data.data(),
      commentId: data.id
    }

    res.push(newData)
    console.log(res)
  })
  return res
}

export const reportComment = async () => {

}
