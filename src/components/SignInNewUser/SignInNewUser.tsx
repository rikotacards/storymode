import React from 'react'
import {  createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, User } from "firebase/auth";
import { Button, Card, CardContent, Input } from '@mui/material';
import { AuthContext } from '@/context/AuthContext';
import { auth } from '@/firebase/clientApp';

export const SignInNewUser: React.FC = () => {
  const {signInWithGooglePopUp} = React.useContext(AuthContext);
 
  
  const [state, setState] = React.useState({})
  const [user, setUser] = React.useState<User | undefined>()
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setState((prev) => ({...prev, [e.target.id]:e.target.value}))
  }
  

  return (
    <div style={{display: 'flex', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
      <div>
    <Card>
    <CardContent style={{display: 'flex', flexDirection: 'column'}}>
      Sign in to play
      <Button variant='outlined'  onClick={(e) => {e.preventDefault; return  signInWithGooglePopUp()}}>
        Sign In with Google
      </Button>
    </CardContent>
    </Card>
      </div>
    </div>
  )
}