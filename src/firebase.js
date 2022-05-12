// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  collection,
  getFirestore,
  //   getDocs,
  //   addDoc,
  //   doc,
} from "firebase/firestore";

import { getStorage, ref } from "firebase/storage";

import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAo9ypNjL_oTuQ1oNhtRpAAIqxQ3w80s2k",
  authDomain: "my-snips.firebaseapp.com",
  projectId: "my-snips",
  storageBucket: "my-snips.appspot.com",
  messagingSenderId: "28908978910",
  appId: "1:28908978910:web:d2d95cd50af033d63e784f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore();

const auth = getAuth();

const storage = getStorage(app);

const papersColRef = collection(db, "papers");
const usersColRef = collection(db, "users");

export {
  auth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  storage,
  ref,
  papersColRef,
  usersColRef,
  db,
};

// const colRef = collection()
