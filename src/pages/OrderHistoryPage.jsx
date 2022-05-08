import React from "react";
import Header from "../components/Headers/Header";
import Orders from "../components/Orders/Orders";
import { useSpring, animated, config } from "react-spring";

const FadeWrapper = animated.div;

const OrderHistoryPage = () => {
  const fade = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: 400,
    config: config.molasses,
  });
  return (
    <>
      <Header title={"ORDER HISTORY"} />
      <FadeWrapper style={fade}>
        <Orders />
      </FadeWrapper>
    </>
  );
};

export default OrderHistoryPage;
