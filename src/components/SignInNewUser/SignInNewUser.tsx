import React from 'react'
import {  createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, User } from "firebase/auth";
import { Button, Card, CardContent, Input } from '@mui/material';
import { AuthContext } from '@/context/AuthContext';
import { auth } from '@/firebase/clientApp';
import { useSignInWithGooglePopUp } from '@/firebase/useSignInWithGooglePop';
import { useRouter } from 'next/router';
import { isProtectedRoute } from '@/constants/routes';

export const SignInNewUser: React.FC = () => {
  const route = useRouter();
  const signIn = useSignInWithGooglePopUp()
  const isProtected = isProtectedRoute(route.pathname);
  

  return (
    <div style={{display: 'flex', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
      <div style={{height: '100%'}}>
   
      <Button variant='contained'  onClick={(e) => {e.preventDefault; signIn.signIn()}}>
        Sign In with Google
      </Button>
    
      </div>
    </div>
  )
}