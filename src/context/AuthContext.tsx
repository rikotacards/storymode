import React from "react";
import { User } from "firebase/auth";
import { auth } from "@/firebase/clientApp";
import { useSignInWithGooglePopUp } from "@/firebase/useSignInWithGooglePop";
import { useRouter } from "next/router";
interface AuthContextWrapperProps {
  children: React.ReactNode;
}

interface AuthContextState {
  isLoggedIn: boolean;
  uid: string;
  user: User | null | undefined;
  isLoading: boolean;
  onLogout: () => void;
}

export const AuthContext = React.createContext<AuthContextState>(
  {} as AuthContextState
);
export const useAuth = () => React.useContext(AuthContext);

export const AuthContextWrapper: React.FC<AuthContextWrapperProps> = ({
  children,
}) => {
  const router = useRouter();
  const [user, setUser] = React.useState<User | null | undefined>();
  const [uid, setUid] = React.useState("");
  const [isLoading, setLoading] = React.useState(true);
  const [isLoggedIn, setLogIn] = React.useState(false);
  const onLogout = () => {
    setLogIn(false);
    setLoading(false);
    setUser(null);
    auth.signOut();
  };
  React.useEffect(() => {
    console.log("useEffectRan");
    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log(user)
     
        setLogIn(!!user);
        setUser(user);
        setUid(uid);
        setLoading(false);
      
    });

    return unsubscribe;
  }, []);

 
  const context: AuthContextState = React.useMemo(
    () => ({
      uid,
      isLoggedIn,
      isLoading,
      user,
      onLogout,
    }),
    [isLoggedIn, user, isLoading]
  );

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};
