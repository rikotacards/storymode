import {
  browserLocalPersistence,
  OAuthCredential,
  setPersistence,
} from "firebase/auth";
import React from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  User,
} from "firebase/auth";
import { auth } from "@/firebase/clientApp";
import { doc, setDoc } from "firebase/firestore";
import { addUserToDb } from "@/firebase/db";
import { useRouter } from "next/router";

interface AuthContextWrapperProps {
  children: React.ReactNode;
}

interface AuthContextState {
  signInWithGooglePopUp: () => void;
  user: User | null | undefined;
  uid: string |null | undefined;
  isLoggedIn: boolean;
  signOut: () => void;
  isLoading: boolean;
}

export const AuthContext = React.createContext<AuthContextState>({} as AuthContextState);
export const useAuth= ()=> {
  return React.useContext(AuthContext)
}
export const AuthContextWrapper: React.FC<AuthContextWrapperProps> = ({
  children,
}) => {
  const router = useRouter();
  const provider = new GoogleAuthProvider();
  const [user, setUser] = React.useState<User | null>();
  const [currentUser, setCurrentUser] = React.useState<User | null>()
  const [isLoading, setLoading] = React.useState(true)
  const [isLoggedIn, setLogIn] = React.useState(false);
  const [currUserId, setCurrUserId] = React.useState<string | undefined>(auth?.currentUser?.uid)
  console.log('AUTHCONTEXT', user)
  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if(user){
        setLogIn(!!user)
        setCurrentUser(user)
        setCurrUserId(user.uid)
        addUserToDb(user.uid)
        setUser(user)
      } else {
        setLogIn(false)
      }

      setLoading(false)
    })

    return unsubscribe
  }, [user?.uid])
  const signOut = () => {
    router.push('/signin')
    auth.signOut()
  }
  const signInWithGooglePopUp = async () => {
    setPersistence(auth, browserLocalPersistence).then((d) => {
      signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          // const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          setUser(user);
          // IdP data available using getAdditionalUserInfo(result)
          // ...
        }).then(() => {router.push('/')})
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

  const context: AuthContextState = {
    signInWithGooglePopUp,
    user: currentUser,
    uid: currUserId, 
    isLoggedIn,
    signOut,
    isLoading
  };

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};
