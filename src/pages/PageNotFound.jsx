import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import Header from "../components/Headers/Header";
import SmallHeader from "../components/Headers/SmallHeader";
import Button from "../components/Buttons/Button";
import { Link } from "react-router-dom";
import { useSpring, animated, config } from "react-spring";
import { useLocation } from "react-router-dom";

const FadedGame = animated.div;

const Container = styled.div({
  margin: "auto",
});

const PageNotFound = () => {
  // States
  const [title, setTitle] = useState("404 NOT FOUND");
  const [description, setDescription] = useState(
    "THE PAGE YOU WERE LOOKING FOR DOES NOT EXIST"
  );
  // Animations from react-spring
  const fade = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: 400,
    config: config.molasses,
  });

  // Gets url from browser
  const location = useLocation();

  // useEffect listens to the browser url
  // If the url is /game etc... then the title state will change
  // If the url is /game etc...  then the description state will change
  useEffect(() => {
    if (location.pathname === "/game") {
      setTitle("OOPS");
    }
    if (location.pathname === "/game") {
      setDescription("You seem to have entered a page that requires login");
    }
    if (location.pathname === "/myprofile") {
      setTitle("OOPS");
    }
    if (location.pathname === "/myprofile") {
      setDescription("You seem to have entered a page that requires login");
    }
    if (location.pathname === "/myprofile/orderhistory") {
      setTitle("OOPS");
    }
    if (location.pathname === "/myprofile/orderhistory") {
      setDescription("You seem to have entered a page that requires login");
    }
    if (location.pathname === "/shop") {
      setTitle("OOPS");
    }
    if (location.pathname === "/shop") {
      setDescription("You seem to have entered a page that requires login");
    }
  }, [location]);

  return (
    <>
      <Header title={title} />
      <FadedGame style={fade}>
        <Container>
          <SmallHeader title={description} />
          <div style={{ margin: "1rem" }}>
            <Link to="/">
              <Button
                title={
                  title === "404 NOT FOUND" ? "BACK TO HOME" : "LOG IN HERE"
                }
              />
            </Link>
          </div>
        </Container>
      </FadedGame>
    </>
  );
};

export default PageNotFound;
