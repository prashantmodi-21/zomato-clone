// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: "zomato-clone-bee46.firebaseapp.com",
  projectId: "zomato-clone-bee46",
  storageBucket: "zomato-clone-bee46.appspot.com",
  messagingSenderId: "892767007717",
  appId: "1:892767007717:web:f487fc8e74d0f6612af50c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);