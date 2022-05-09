import React from "react";
import styled from "@emotion/styled";
import Header from "../components/Headers/Header";
import SmallHeader from "../components/Headers/SmallHeader";
import Button from "../components/Buttons/Button";
import { Link } from "react-router-dom";
import { useSpring, animated, config } from "react-spring";
import { useAuthContext } from "../contexts/AuthContext";

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

  const { user } = useAuthContext();

  return (
    <>
      <Header title={"404 NOT FOUND"} />
      <FadedGame style={fade}>
        <Container>
          <SmallHeader
            title={
              user
                ? "THE PAGE YOU WERE LOOKING FOR DOES NOT EXIST"
                : "You seem to have entered a page that requires login"
            }
          />
          <div style={{ margin: "1rem" }}>
            <Link to="/">
              <Button title={user ? "BACK TO HOME" : "LOG IN HERE"} />
            </Link>
          </div>
        </Container>
      </FadedGame>
    </>
  );
};

export default PageNotFound;
