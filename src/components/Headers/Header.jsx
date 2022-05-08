import React from "react";
import styled from "@emotion/styled";
import { useSpring, animated, config } from "react-spring";

const H1 = styled.h1({
  fontWeight: 200,
  fontSize: "2.5rem",
  marginTop: "3rem",
  marginBottom: "1rem",
  "@media screen and (min-width: 600px)": {
    fontSize: "3rem",
  },
  "@media screen and (min-width: 1024px)": {
    fontSize: "4rem",
  },
});

const FadedHeader = animated.div;

const Header = (props) => {
  const fade = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: 200,
    config: config.molasses,
  });

  return (
    <FadedHeader style={fade}>
      <H1>{props.title}</H1>
    </FadedHeader>
  );
};

export default Header;
