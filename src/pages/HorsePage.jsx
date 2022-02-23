import React from "react";
import Horses from "../components/Horses";
import { useSpring, animated, config } from "react-spring";
import styled from "@emotion/styled";
import Header from "../components/Header";

const FadeWrapper = styled.div({});

const FadedHorses = animated(FadeWrapper);

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
      <FadedHorses style={fade}>
        <Horses />
      </FadedHorses>
    </div>
  );
};

export default HorsePage;
