// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCD274Yo9EKX5KiQyDrKYQpHHHobT2LH0A",
  authDomain: "chat-app-c60cd.firebaseapp.com",
  databaseURL: "https://chat-app-c60cd-default-rtdb.firebaseio.com",
  projectId: "chat-app-c60cd",
  storageBucket: "chat-app-c60cd.appspot.com",
  messagingSenderId: "843557183159",
  appId: "1:843557183159:web:caca437905c75fb2f2f732"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db=getFirestore(app)
export const storage=getStorage(app)