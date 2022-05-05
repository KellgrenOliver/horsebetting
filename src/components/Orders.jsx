import React from "react";
import Order from "./Order";
import { useShopContext } from "../contexts/ShopContext";
import { useAuthContext } from "../contexts/AuthContext";

const Orders = () => {
  const { orders } = useShopContext();
  const { user } = useAuthContext();

  const filteredOrders = orders?.filter((order) => order.userId === user?.uid);

  return (
    <>
      {filteredOrders?.map((order) => (
        <Order key={order.orderNumber} order={order} />
      ))}
    </>
  );
};

export default Orders;
