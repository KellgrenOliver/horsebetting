import React from "react";
import Order from "./Order";
import { useShopContext } from "../../contexts/ShopContext";
import { useAuthContext } from "../../contexts/AuthContext";
import SmallHeader from "../Headers/SmallHeader";

const Orders = () => {
  const { orders } = useShopContext();
  const { user } = useAuthContext();

  const filteredOrders = orders?.filter((order) => order.userId === user?.uid);

  return (
    <>
      {filteredOrders.length > 0 ? (
        <>
          {filteredOrders?.map((order) => (
            <Order key={order.orderNumber} order={order} />
          ))}
        </>
      ) : (
        <SmallHeader title={"You have not bought anything"} />
      )}
    </>
  );
};

export default Orders;
