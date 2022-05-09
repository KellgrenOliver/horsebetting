import React from "react";
import Header from "../components/Headers/Header";
import Game from "../components/Game/Game";
import { useSpring, animated, config } from "react-spring";
import { useAuthContext } from "../contexts/AuthContext";
import PageNotFound from "./PageNotFound";

const FadedGame = animated.div;

const GamePage = () => {
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
          <Header title={"GAME"} />
          <FadedGame style={fade}>
            <Game />
          </FadedGame>
        </>
      ) : (
        <PageNotFound />
      )}
    </>
  );
};

export default GamePage;
