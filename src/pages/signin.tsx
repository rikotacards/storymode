import React from "react";
import Head from "next/head";
import { SignInNewUser } from "@/components/SignInNewUser/SignInNewUser";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";
import { getAuth, getRedirectResult } from "firebase/auth";
import { LinearProgressCustom } from "@/components/LinearProgressCustom/LinearProgressCustom";
import { Button, Toolbar, Typography } from "@mui/material";

const SignIn = () => {
  const auth = useAuth();
  const [isLoading, setLoading] = React.useState(true);
  const [username, setUsername] = React.useState('')
  const auth2 = getAuth();
  const router = useRouter();
  React.useEffect(() => {
    setUsername('loading')
    console.log("SignIn running");
    if(auth.isLoggedIn){
      console.log('aready')
      setUsername('already')
      router.push('/')
    }
    getRedirectResult(auth2)
    
      .then((user) => {
        if(user === null){
          setUsername('NULL')
        }
        console.log("getting redirect result", user);
        console.log("pushing");
        if (user?.user) {
          console.log(user)
          setUsername(user?.user.displayName || 'yay')
          router.push("/");
          return;
        } else {
          setLoading(false)
          // setUsername('whatever')
        }
      })
      
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
          alignItems: 'center', 
          justifyContent: 'center',
          width: "100%",
          height: "100vh",
        }}
      >
        <Toolbar/>
  
        <Button>
          {username}
          </Button>
        <SignInNewUser />
      </div>
    </>
  );
};
export default SignIn;
