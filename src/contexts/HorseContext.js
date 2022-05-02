import React, { createContext, useContext, useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, onSnapshot, query } from "firebase/firestore";
import { useFirestoreQueryData } from "@react-query-firebase/firestore";

export const HorseContext = createContext();

const useHorseContext = () => {
  return useContext(HorseContext);
};

const HorseContextProvider = (props) => {
  const [horses, setHorses] = useState();

  const horsesRef = query(collection(db, "horses"));

  let { data: horsesData } = useFirestoreQueryData(["horses"], horsesRef);

  useEffect(() => {
    const unSubscribe = onSnapshot(horsesRef, (snapshot) => {
      horsesData = [];
      snapshot.docs.forEach((doc) => {
        horsesData.push({ ...doc.data(), id: doc.id });
      });
      setHorses(horsesData);
    });
    return () => {
      unSubscribe();
    };
  }, []);

  const values = {
    horses,
  };

  return (
    <HorseContext.Provider value={values}>
      {props.children}
    </HorseContext.Provider>
  );
};

export { useHorseContext, HorseContextProvider as default };
