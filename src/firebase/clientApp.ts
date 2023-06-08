// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore";
import firebase from "firebase/app"
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfigHardCoded = {
  apiKey: "AIzaSyCihlRapz-_cQunIxs8f8Rxs7fLj0wyjUA",
  authDomain: "storymode-app.firebaseapp.com",
  projectId: "storymode-app",
  storageBucket: "storymode-app.appspot.com",
  messagingSenderId: "546787786385",
  appId: "1:546787786385:web:4401705f292b9dd0ca4930",
  measurementId: "G-4Y0H8V2VZY"
};
const firebaseConfigApacDb = {
  
    apiKey: "AIzaSyA6terG0jvp_XqDI3NpiB3ZNEE1riWSTyA",
    authDomain: "storymode-3427d.firebaseapp.com",
    projectId: "storymode-3427d",
    storageBucket: "storymode-3427d.appspot.com",
    messagingSenderId: "506291013940",
    appId: "1:506291013940:web:a291f532905ba85f927d61",
    measurementId: "G-3YEQESN4EC"

}

// Initialize Firebase



// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
  apiKey:process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain:process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId:process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket:process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId:process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId:process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId:process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
}

// Initialize Firebase
const app = initializeApp(firebaseConfigApacDb);

// Initialize Auth

export const auth = getAuth(app)
// Initialize Cloud Firestore and get a reference to the service
export const firestore = getFirestore(app);



