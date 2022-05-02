import React, { createContext, useContext, useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, onSnapshot, query } from "firebase/firestore";
import { useFirestoreQueryData } from "@react-query-firebase/firestore";

export const ShopContext = createContext();

const useShopContext = () => {
  return useContext(ShopContext);
};

const ShopContextProvider = (props) => {
  const [shopOptions, setShopOptions] = useState();

  const shopOptionsRef = query(collection(db, "shop"));

  let { data: shopData } = useFirestoreQueryData(["shop"], shopOptionsRef);

  useEffect(() => {
    const unSubscribe = onSnapshot(shopOptionsRef, (snapshot) => {
      shopData = [];
      snapshot.docs.forEach((doc) => {
        shopData.push({ ...doc.data(), id: doc.id });
      });
      setShopOptions(shopData);
    });
    return () => {
      unSubscribe();
    };
  }, []);

  const values = {
    shopOptions,
  };

  return (
    <ShopContext.Provider value={values}>{props.children}</ShopContext.Provider>
  );
};

export { useShopContext, ShopContextProvider as default };
