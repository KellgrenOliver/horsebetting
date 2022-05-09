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
  // Gets all orders from shop context
  const { orders } = useShopContext();
  // Gets all users from auth context
  const { user } = useAuthContext();

  // Filters out the orders belonging to the logged in user
  const filteredOrders = orders?.filter((order) => order.userId === user?.uid);

  return (
    <>
      {/* If the user has any orders it will be rendered */}
      {filteredOrders?.length > 0 ? (
        <Container>
          {filteredOrders?.map((order) => (
            // Sends order as a prop to order component
            <Order key={order.orderNumber} order={order} />
          ))}
        </Container>
      ) : (
        // If the user dont have any order this text will be rendered
        <SmallHeader title={"You have not bought anything"} />
      )}
    </>
  );
};

export default Orders;
