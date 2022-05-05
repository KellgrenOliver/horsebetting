import React, { useState } from "react";
import styled from "@emotion/styled";

const OrderWrapper = styled.div({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#303030",
  flexDirection: "column",
  marginBottom: "2rem",
  padding: "1rem",
  borderRadius: "5px",
  width: "80vw",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#4d4d4d",
  },
  "@media screen and (min-width: 600px)": {
    width: "50vw",
  },
  "@media screen and (min-width: 1024px)": {
    width: "70vw",
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
});

const Info = styled.div({
  fontSize: "1rem",
  margin: "1rem",
  "@media screen and (min-width: 1024px)": {
    fontSize: "1.5rem",
  },
});

const Order = ({ order }) => {
  const [showAll, setShowAll] = useState(false);
  return (
    <>
      <OrderWrapper onClick={() => setShowAll(!showAll)}>
        <TopWrapper>
          <Info style={{ fontWeight: 200, fontSize: "2rem" }}>
            {order.money}$
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
            <Info>{order.email}</Info>
            <Info>{order.orderNumber}</Info>
            <Info>{`${(order?.coins / 1000).toFixed(1)}K`}</Info>
          </BottomWrapper>
        )}
      </OrderWrapper>
    </>
  );
};

export default Order;
