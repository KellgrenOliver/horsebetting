import React from "react";
import styled from "@emotion/styled";
import MostWins from "./MostWins";
import MostCoins from "./MostCoins";

const Container = styled.div({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  flexDirection: "column",
  gap: "2rem",
  marginBottom: "4rem",
  "@media screen and (min-width: 1024px)": {
    flexDirection: "row",
    gap: 0,
    marginBottom: 0,
  },
});

const TopList = () => {
  return (
    <Container>
      <MostWins />
      <MostCoins />
    </Container>
  );
};

export default TopList;
