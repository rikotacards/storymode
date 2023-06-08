import React from "react";
import Head from "next/head";
import { SignInWithGoogle } from "@/components/SignInNewUser/SignInNewUser";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";
import { getAuth, getRedirectResult } from "firebase/auth";
import { LinearProgressCustom } from "@/components/LinearProgressCustom/LinearProgressCustom";
import { Button, Toolbar, Typography } from "@mui/material";

const SignIn = () => {
  const auth = useAuth();
  const [isLoading, setLoading] = React.useState(true);
  const auth2 = getAuth();
  const router = useRouter();
  React.useEffect(() => {
    if (auth.isLoggedIn) {
      router.push("/");
    }
    getRedirectResult(auth2).then((user) => {
      if (user?.user) {
        router.push("/");
        return;
      } else {
        setLoading(false);
      }
    });
  }, []);
  if (isLoading || auth.isLoggedIn) {
    return <LinearProgressCustom />;
  }
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          
          height: "95vh",
        }}
      >
        <SignInWithGoogle />
        <Toolbar/>
      </div>
    </>
  );
};
export default SignIn;
