import React from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  getRedirectResult,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  User,
} from "firebase/auth";
import { Button, Card, CardContent, Input } from "@mui/material";
import { AuthContext } from "@/context/AuthContext";
import { auth } from "@/firebase/clientApp";
import { useRouter } from "next/router";
import { isProtectedRoute } from "@/constants/routes";

export const SignInNewUser: React.FC = () => {
  const route = useRouter();
  const auth = getAuth();
  const provider = new GoogleAuthProvider();


  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button
        variant="contained"
        onClick={(e) => {
          signInWithRedirect(auth, provider);
        }}
      >
        Sign In with Google
      </Button>
    </div>
  );
};
