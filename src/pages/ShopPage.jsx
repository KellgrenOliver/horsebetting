import React from "react";
import Shop from "../components/Shop/Shop";
import { useSpring, animated, config } from "react-spring";
import Header from "../components/Headers/Header";
import { useAuthContext } from "../contexts/AuthContext";
import PageNotFound from "./PageNotFound";

const FadeWrapper = animated.div;

const ShopPage = () => {
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
          <Header title={"SHOP"} />
          <FadeWrapper style={fade}>
            <Shop />
          </FadeWrapper>
        </>
      ) : (
        <PageNotFound />
      )}
    </>
  );
};

export default ShopPage;
