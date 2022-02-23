import React from "react";
import styled from "@emotion/styled";
import Header from "../components/Header";
import Game from "../components/Game";
import { useSpring, animated, config } from "react-spring";

const FadeWrapper = styled.div({});

const FadedGame = animated(FadeWrapper);

const GamePage = () => {
  const fade = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: 400,
    config: config.molasses,
  });
  return (
    <div>
      <Header title={"GAME"} />
      <FadedGame style={fade}>
        <Game />
      </FadedGame>
    </div>
  );
};

export default GamePage;
