import React from "react";
import styled from "@emotion/styled";

const Header = styled.div({
  fontWeight: 200,
  fontSize: "1rem",
  paddingLeft: "1rem",
  paddingRight: "1rem",
  marginBottom: "0.5rem",
  "@media screen and (min-width: 600px)": {
    fontSize: "1.5rem",
  },
  "@media screen and (min-width: 1024px)": {
    fontSize: "2rem",
  },
});

const SmallHeader = (props) => {
  return <Header>{props.title}</Header>;
};

export default SmallHeader;
