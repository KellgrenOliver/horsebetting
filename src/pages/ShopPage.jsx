import React from "react";
import ShopOptions from "../components/ShopOptions";
import { useSpring, animated, config } from "react-spring";
import Header from "../components/Header";

const FadeWrapper = animated.div;

const ShopPage = () => {
  const fade = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: 400,
    config: config.molasses,
  });
  return (
    <>
      <Header title={"SHOP"} />
      <FadeWrapper style={fade}>
        <ShopOptions />
      </FadeWrapper>
    </>
  );
};

export default ShopPage;
