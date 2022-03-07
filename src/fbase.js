import firebase from "firebase/compat/app";
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import "firebase/compat/firestore";
import "firebase/compat/storage";



const firebaseConfig = {
  
  };

firebase.initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);


export const firebaseInstance = firebase;
export const authService = getAuth(app);