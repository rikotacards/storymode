import { auth } from "@/firebase/clientApp";
import {
  browserLocalPersistence,
  GoogleAuthProvider,
  setPersistence,
  signInWithPopup,
} from "firebase/auth";
import { useRouter } from "next/router";

const provider = new GoogleAuthProvider();

export const useSignInWithGooglePopUp =  ()=> {
  const router = useRouter();
  const signIn = () => setPersistence(auth, browserLocalPersistence).then((d) => {
    signInWithPopup(auth, provider)
      .then((result) => {
        if(result.user){
          console.log('lol', router.pathname)
          if(router.pathname =='/signin')
          router.push('/')
          console.log('yay', result.user)
        }
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        // The signed-in user info.
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
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
  return {
    signIn
  }
}