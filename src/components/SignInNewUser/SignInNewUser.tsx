import React from 'react'
import {  createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, User } from "firebase/auth";
import { Button, Input } from '@mui/material';
import { auth } from '@/firebase/clientApp';
import { AuthContext } from '@/context/AuthContext';

export const SignInNewUser: React.FC = () => {
  const {signInWithGooglePopUp} = React.useContext(AuthContext);
 
  
  const [state, setState] = React.useState({})
  const [user, setUser] = React.useState<User | undefined>()
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setState((prev) => ({...prev, [e.target.id]:e.target.value}))
  }
  

  return (
    <div style={{display: 'flex'}}>
      <Button  onClick={signInWithGooglePopUp}>
        Sign In with Google
      </Button>
      <Button onClick={() => {auth.signOut()}}>
    sign
      </Button>
    </div>
  )
}