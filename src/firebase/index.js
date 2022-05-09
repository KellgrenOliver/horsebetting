import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBhBfIxi8DCzIZy6Ed4N5G3CHfUheACOyY",
  authDomain: "horse-betting-e823f.firebaseapp.com",
  projectId: "horse-betting-e823f",
  storageBucket: "horse-betting-e823f.appspot.com",
  messagingSenderId: "643195673801",
  appId: "1:643195673801:web:ac27ce8686138c06ca8118",
};

// Init Firebase
const app = initializeApp(firebaseConfig);

// Gets Firebase Firestore instance
const db = getFirestore(app);
// Gets Firebase Authentication instance
const auth = getAuth();

export { app as default, db, auth };
