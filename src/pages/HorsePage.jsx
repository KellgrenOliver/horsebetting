import React from "react";
import Horses from "../components/Horses/Horses";
import { useSpring, animated, config } from "react-spring";
import Header from "../components/Headers/Header";

const FadeWrapper = animated.div;

const HorsePage = () => {
  // Animations from react-spring
  const fade = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: 400,
    config: config.molasses,
  });
  return (
    <>
      <Header title={"HORSES"} />
      <FadeWrapper style={fade}>
        <Horses />
      </FadeWrapper>
    </>
  );
};

export default HorsePage;
