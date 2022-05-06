import React, { createContext, useContext } from "react";
import { db } from "../firebase";
import { collection, query } from "firebase/firestore";
import { useFirestoreQueryData } from "@react-query-firebase/firestore";

export const ShopContext = createContext();

const useShopContext = () => {
  return useContext(ShopContext);
};

const ShopContextProvider = (props) => {
  const shopOptionsRef = query(collection(db, "shop"));

  let { data: shopOptions } = useFirestoreQueryData(["shop"], shopOptionsRef, {
    subscribe: true,
  });

  const ordersRef = query(collection(db, "orders"));

  let { data: orders } = useFirestoreQueryData(["orders"], ordersRef, {
    subscribe: true,
  });

  const values = {
    shopOptions,
    orders,
  };

  return (
    <ShopContext.Provider value={values}>{props.children}</ShopContext.Provider>
  );
};

export { useShopContext, ShopContextProvider as default };
