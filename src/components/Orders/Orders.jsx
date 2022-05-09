import React from "react";
import Order from "./Order";
import { useShopContext } from "../../contexts/ShopContext";
import { useAuthContext } from "../../contexts/AuthContext";
import SmallHeader from "../Headers/SmallHeader";
import styled from "@emotion/styled";

const Container = styled.div({
  marginBottom: "4rem",
  "@media screen and (min-width: 1024px)": {
    marginBottom: "1rem",
  },
});

const Orders = () => {
  const { orders } = useShopContext();
  const { user } = useAuthContext();

  const filteredOrders = orders?.filter((order) => order.userId === user?.uid);

  return (
    <>
      {filteredOrders?.length > 0 ? (
        <Container>
          {filteredOrders?.map((order) => (
            <Order key={order.orderNumber} order={order} />
          ))}
        </Container>
      ) : (
        <SmallHeader title={"You have not bought anything"} />
      )}
    </>
  );
};

export default Orders;
