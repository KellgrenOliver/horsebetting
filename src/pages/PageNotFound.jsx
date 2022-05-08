import React from "react";
import styled from "@emotion/styled";
import Header from "../components/Headers/Header";
import SmallHeader from "../components/Headers/SmallHeader";
import Button from "../components/Buttons/Button";
import { Link } from "react-router-dom";
import { useSpring, animated, config } from "react-spring";

const FadedGame = animated.div;

const Container = styled.div({
  margin: "auto",
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
          <SmallHeader title={"THE PAGE YOU WERE LOOKING FOR DOES NOT EXIST"} />
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
