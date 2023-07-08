// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyANf_mblu1hLmebg4EczFmdtlAV2GNZDAk",
  authDomain: "batman-project-6930c.firebaseapp.com",
  projectId: "batman-project-6930c",
  storageBucket: "batman-project-6930c.appspot.com",
  messagingSenderId: "287438478283",
  appId: "1:287438478283:web:5c386f05f4b8db5044b44e",
  measurementId: "G-BKR2N0CBT8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); 
export const db = getFirestore(app)