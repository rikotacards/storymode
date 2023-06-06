import React from 'react'
import {  createUserWithEmailAndPassword, getAuth, getRedirectResult, GoogleAuthProvider, signInWithPopup, signInWithRedirect, User } from "firebase/auth";
import { Button, Card, CardContent, Input } from '@mui/material';
import { AuthContext } from '@/context/AuthContext';
import { auth } from '@/firebase/clientApp';
import { useRouter } from 'next/router';
import { isProtectedRoute } from '@/constants/routes';

export const SignInNewUser: React.FC = () => {
  const route = useRouter();
  const auth = getAuth()
  const provider = new GoogleAuthProvider();

  

  // getRedirectResult(auth)
  // .then((result) => {
  //   console.log('omgwhat', result)
  //   // This gives you a Google Access Token. You can use it to access Google APIs.
  //   const credential = result && GoogleAuthProvider.credentialFromResult(result);
  //   const token = credential?.accessToken;

  //   // The signed-in user info.
  //   const user = result?.user;
  //   // IdP data available using getAdditionalUserInfo(result)
  //   // ...
  //   route.push('/')
  // }).catch((error) => {
  //   // Handle Errors here.
  //   const errorCode = error.code;
  //   const errorMessage = error.message;
  //   // The email of the user's account used.
  //   const email = error.customData.email;
  //   // The AuthCredential type that was used.
  //   const credential = GoogleAuthProvider.credentialFromError(error);
  //   // ...
  // });

  

  return (
    <div style={{display: 'flex', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
   
      <Button variant='contained'  onClick={(e) => {  signInWithRedirect(auth,provider )
}}>
        Sign In with Google
      </Button>
    
    </div>
  )
}