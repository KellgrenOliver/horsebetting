import React from "react";
import Header from "../components/Headers/Header";
import Orders from "../components/Orders/Orders";
import { useSpring, animated, config } from "react-spring";
import { useAuthContext } from "../contexts/AuthContext";
import PageNotFound from "./PageNotFound";

const FadeWrapper = animated.div;

const OrderHistoryPage = () => {
  // Animations from react-spring
  const fade = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: 400,
    config: config.molasses,
  });

  // Gets user from auth context
  const { user } = useAuthContext();

  return (
    <>
      {user ? (
        <>
          {/* If there is an logged in user this will be rendered */}
          <Header title={"ORDER HISTORY"} />
          <FadeWrapper style={fade}>
            <Orders />
          </FadeWrapper>
        </>
      ) : (
        // If you try to get to this route without beeing logged in 404 will be rendered
        <PageNotFound />
      )}
    </>
  );
};

export default OrderHistoryPage;
