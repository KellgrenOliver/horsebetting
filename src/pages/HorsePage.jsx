import React from "react";
import Horses from "../components/Horses";
import { useSpring, animated, config } from "react-spring";
import Header from "../components/Header";

const FadeWrapper = animated.div;

const HorsePage = () => {
  const fade = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: 400,
    config: config.molasses,
  });
  return (
    <div>
      <Header title={"HORSES"} />
      <FadeWrapper style={fade}>
        <Horses />
      </FadeWrapper>
    </div>
  );
};

export default HorsePage;
