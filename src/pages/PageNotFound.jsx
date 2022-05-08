import React from "react";
import Header from "../components/Headers/Header";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import { useSpring, animated, config } from "react-spring";
import styled from "@emotion/styled";

const FadedGame = animated.div;

const Container = styled.div({
  margin: "auto",
  width: "70%",
  "@media screen and (min-width: 768px)": {
    width: "100%",
  },
});

const PageNotFound = () => {
  const fade = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: 400,
    config: config.molasses,
  });

  return (
    <>
      <Header title={"404 NOT FOUND"} />
      <FadedGame style={fade}>
        <Container>
          <span>THE PAGE YOU WERE LOOKING FOR DOES NOT EXIST</span>
          <div style={{ margin: "1rem" }}>
            <Link to="/">
              <Button title={"BACK TO HOME"} />
            </Link>
          </div>
        </Container>
      </FadedGame>
    </>
  );
};

export default PageNotFound;
