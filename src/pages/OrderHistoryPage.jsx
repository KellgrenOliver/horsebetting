import React from "react";
import Header from "../components/Headers/Header";
import Orders from "../components/Orders/Orders";
import { useSpring, animated, config } from "react-spring";
import { useAuthContext } from "../contexts/AuthContext";
import PageNotFound from "./PageNotFound";

const FadeWrapper = animated.div;

const OrderHistoryPage = () => {
  const fade = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: 400,
    config: config.molasses,
  });

  const { user } = useAuthContext();

  return (
    <>
      {user ? (
        <>
          <Header title={"ORDER HISTORY"} />
          <FadeWrapper style={fade}>
            <Orders />
          </FadeWrapper>
        </>
      ) : (
        <PageNotFound />
      )}
    </>
  );
};

export default OrderHistoryPage;
