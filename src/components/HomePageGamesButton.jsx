import React from "react";
import "../css/GoToTheGame.css";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { useSpring, animated, config } from "react-spring";

const Wrapper = styled(Link)({
  textDecoration: "none",
});

const FadeWrapper = styled.div({});

const FadeButton = animated(FadeWrapper);

const HomePageGamesButton = () => {
  const fade = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: 1000,
    config: config.molasses,
  });
  return (
    <FadeButton style={fade}>
      <Wrapper to="/game">
        <div className="box">
          <p className="header">GO TO THE GAME</p>
        </div>
      </Wrapper>
    </FadeButton>
  );
};

export default HomePageGamesButton;
