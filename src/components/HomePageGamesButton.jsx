import React from "react";
import "../css/GoToTheGame.css";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

const Wrapper = styled(Link)({
  textDecoration: "none",
});

const HomePageGamesButton = () => {
  return (
    <Wrapper to="/game">
      <div className="box">
        <p className="header">GO TO THE GAME</p>
      </div>
    </Wrapper>
  );
};

export default HomePageGamesButton;
