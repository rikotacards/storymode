import React from "react";
import Head from "next/head";
import { SignInNewUser } from "@/components/SignInNewUser/SignInNewUser";
import { useAuth } from "@/context/AuthContext";

const SignIn = () => {
  const auth = useAuth();
  return (
    <>
      <main style={{ display: "flex", flexDirection: 'column', width: "100%", height: "100%" }}>
        <SignInNewUser />
      </main>
    </>
  );
};
export default SignIn;
