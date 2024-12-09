// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCX0pL3S7YL3busAzhz17hd5aslr-wITMQ",
  authDomain: "notion-clone-2a034.firebaseapp.com",
  projectId: "notion-clone-2a034",
  storageBucket: "notion-clone-2a034.firebasestorage.app",
  messagingSenderId: "990517402662",
  appId: "1:990517402662:web:518ffcb033940d7b7b1ae7",
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp(); //this will setup the connection with firebase and our app and initialize the firebase

const db = getFirestore(app); //creating an instance of firebase database

export { db };
