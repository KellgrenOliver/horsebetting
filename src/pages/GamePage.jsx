import React from "react";
import Header from "../components/Header";
import Game from "../components/Game";
import { useSpring, animated, config } from "react-spring";
import Confetti from "react-confetti";

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
      <Confetti width={"500px"} height={"500px"} />
      <FadedGame style={fade}>
        <Game />
      </FadedGame>
    </div>
  );
};

export default GamePage;
