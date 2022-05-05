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
  const [orders, setOrders] = useState();

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

  const ordersRef = query(collection(db, "orders"));

  let { data: orderData } = useFirestoreQueryData(["orders"], ordersRef);

  useEffect(() => {
    const unSubscribe = onSnapshot(ordersRef, (snapshot) => {
      orderData = [];
      snapshot.docs.forEach((doc) => {
        orderData.push({ ...doc.data(), id: doc.id });
      });
      setOrders(orderData);
    });
    return () => {
      unSubscribe();
    };
  }, []);

  const values = {
    shopOptions,
    orders,
  };

  return (
    <ShopContext.Provider value={values}>{props.children}</ShopContext.Provider>
  );
};

export { useShopContext, ShopContextProvider as default };
