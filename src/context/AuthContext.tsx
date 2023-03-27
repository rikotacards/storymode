import {
  browserLocalPersistence,
  OAuthCredential,
  setPersistence,
} from "firebase/auth";
import React from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  User,
} from "firebase/auth";
import { auth } from "@/firebase/clientApp";
import { doc, setDoc } from "firebase/firestore";
import { addUserToDb } from "@/firebase/db";

interface AuthContextWrapperProps {
  children: React.ReactNode;
}

interface AuthContextState {
  signInWithGooglePopUp: () => void;
  user: User | null | undefined;
}

export const AuthContext = React.createContext<AuthContextState>({} as AuthContextState);
export const AuthContextWrapper: React.FC<AuthContextWrapperProps> = ({
  children,
}) => {
  const provider = new GoogleAuthProvider();
  const [user, setUser] = React.useState<User | null>();
  React.useEffect(() => {
    if (auth.currentUser?.uid) {
      setUser(auth.currentUser);
      addUserToDb(auth.currentUser.uid)
      console.log(auth.currentUser);
      return;
    }
  }, [auth.currentUser?.uid]);
  console.log(auth)
  const signInWithGooglePopUp = async () => {
    setPersistence(auth, browserLocalPersistence).then((d) => {
      signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          // const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          console.log(user);
          setUser(user);
          // IdP data available using getAdditionalUserInfo(result)
          // ...
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.customData.email;
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
          // ...
        });
    });
  };

  const context = {
    signInWithGooglePopUp,
    user,
  };

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};
