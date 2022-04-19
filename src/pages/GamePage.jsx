import React from "react";
import Header from "../components/Header";
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
    <div>
      <Header title={"GAME"} />
      <FadedGame style={fade}>
        <Game />
      </FadedGame>
    </div>
  );
};

export default GamePage;
