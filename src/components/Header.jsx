import React, { useState } from "react";
import styled from "@emotion/styled";
import { useSpring, animated, config } from "react-spring";

const HeaderWrapper = styled.div({});
const H1 = styled.h1({
  fontWeight: 200,
  fontSize: "3rem",
  marginTop: "5rem",
  "@media screen and (min-width: 600px)": {
    fontSize: "4rem",
    marginTop: "3rem",
  },
  "@media screen and (min-width: 1024px)": {
    fontSize: "5rem",
  },
});

const Faded = animated(HeaderWrapper);
const Header = (props) => {
  const fade = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
    delay: 500,
    config: config.molasses,
  });

  return (
    <>
      <Faded style={fade}>
        <HeaderWrapper>
          <H1>{props.title}</H1>
        </HeaderWrapper>
      </Faded>
    </>
  );
};

export default Header;
