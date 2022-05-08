import React from "react";
import Header from "../components/Headers/Header";
import Game from "../components/Game";
import { useSpring, animated, config } from "react-spring";

const FadedGame = animated.div;

const GamePage = () => {
  const fade = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: 400,
    config: config.molasses,
  });

  return (
    <>
      <Header title={"GAME"} />
      <FadedGame style={fade}>
        <Game />
      </FadedGame>
    </>
  );
};

export default GamePage;
