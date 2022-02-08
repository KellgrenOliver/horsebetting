import { useState } from "react";
import { initializeApp } from "firebase/app";
import { onSnapshot, getFirestore, collection } from "firebase/firestore";

const useGetHorses = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyBhBfIxi8DCzIZy6Ed4N5G3CHfUheACOyY",
    authDomain: "horse-betting-e823f.firebaseapp.com",
    projectId: "horse-betting-e823f",
    storageBucket: "horse-betting-e823f.appspot.com",
    messagingSenderId: "643195673801",
    appId: "1:643195673801:web:ac27ce8686138c06ca8118",
  };

  initializeApp(firebaseConfig);
  const db = getFirestore();
  const [horses, setHorses] = useState();
  const colRef = collection(db, "horses");

  onSnapshot(colRef, (snapshot) => {
    const data = [];
    snapshot.docs.forEach((doc) => {
      data.push({ ...doc.data(), id: doc.id });
    });
    setHorses(data);
  });

  return {
    horses,
  };
};
export default useGetHorses;
