import React, { useState } from "react";
import styled from "@emotion/styled";

const OrderWrapper = styled.div({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#303030",
  flexDirection: "column",
  marginBottom: "1rem",
  borderRadius: "5px",
  width: "85vw",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#4d4d4d",
  },
  "@media screen and (min-width: 600px)": {
    width: "50vw",
  },
});

const TopWrapper = styled.div({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
});

const BottomWrapper = styled.div({
  width: "100%",
  display: "flex",
  flexWrap: "wrap",
});

const InfoWrapper = styled.div({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const Info = styled.div({
  fontSize: "1rem",
  margin: "1rem",
});

const Order = ({ order }) => {
  const [showAll, setShowAll] = useState(false);
  return (
    <>
      <OrderWrapper onClick={() => setShowAll(!showAll)}>
        <TopWrapper>
          <Info style={{ fontWeight: 200, fontSize: "2rem" }}>
            {`${(order?.coins / 1000).toFixed(1)}K`}
          </Info>
          <Info>{order.time}</Info>
          <Info>
            {showAll ? (
              <div style={{ transform: "rotate(0.25turn)" }}>&gt;</div>
            ) : (
              <div>&gt;</div>
            )}
          </Info>
        </TopWrapper>
        {showAll && (
          <BottomWrapper>
            <InfoWrapper>
              <Info>Email: {order.email}</Info>
            </InfoWrapper>
            <InfoWrapper>
              <Info>Order number: {order.orderNumber}</Info>
            </InfoWrapper>
            <InfoWrapper>
              <Info>Total cost: {order.money}$</Info>
            </InfoWrapper>
            <InfoWrapper>
              <Info>First name: {order.first_name}</Info>
            </InfoWrapper>
            <InfoWrapper>
              <Info>Last name: {order.last_name}</Info>
            </InfoWrapper>
          </BottomWrapper>
        )}
      </OrderWrapper>
    </>
  );
};

export default Order;
