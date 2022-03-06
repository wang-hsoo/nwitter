import firebase from "firebase/compat/app";
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import "firebase/compat/firestore";
import "firebase/compat/storage";



const firebaseConfig = {
  apiKey: "AIzaSyDo_vdES3CqDrLMHnwRnLsaibL2uR4LVT8",
  authDomain: "nwitter-c5745.firebaseapp.com",
  projectId: "nwitter-c5745",
  storageBucket: "nwitter-c5745.appspot.com",
  messagingSenderId: "858925675696",
  appId: "1:858925675696:web:5fc19e180388f5152c3775"
  };

firebase.initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);

export const authService = getAuth(app);