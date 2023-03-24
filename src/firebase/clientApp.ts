// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore";
import firebase from "firebase/app"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyCihlRapz-_cQunIxs8f8Rxs7fLj0wyjUA",
//   authDomain: "storymode-app.firebaseapp.com",
//   projectId: "storymode-app",
//   storageBucket: "storymode-app.appspot.com",
//   messagingSenderId: "546787786385",
//   appId: "1:546787786385:web:4401705f292b9dd0ca4930",
//   measurementId: "G-4Y0H8V2VZY"
// };

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
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
export const firestore = getFirestore(app);


