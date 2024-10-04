//.src/firebaseConfig.js
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
    const apiKey = import.meta.env.VITE_FIREBASE_API_KEY ||  "AIzaSyDGkSIXe_ExwyOhMaa06Iaig00HziaPanQ";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: apiKey,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: "random-video-chat-46c5e",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)