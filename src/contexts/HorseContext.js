import React, { createContext, useContext } from "react";
import { db } from "../firebase";
import { collection, query } from "firebase/firestore";
import { useFirestoreQuery } from "@react-query-firebase/firestore";

export const HorseContext = createContext();

const useHorseContext = () => {
  return useContext(HorseContext);
};

const HorseContextProvider = (props) => {
  const horsesRef = query(collection(db, "horses"));

  let { data: horsesSnapshot } = useFirestoreQuery(["horses"], horsesRef, {
    subscribe: true,
  });

  const values = {
    horses: horsesSnapshot?.docs.map((horse) => {
      return { ...horse.data(), id: horse.id };
    }),
  };

  return (
    <HorseContext.Provider value={values}>
      {props.children}
    </HorseContext.Provider>
  );
};

export { useHorseContext, HorseContextProvider as default };
