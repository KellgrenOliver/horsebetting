import React from "react";
import styled from "@emotion/styled";
import Header from "../components/Header";

const ResultWrapper = styled.div({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});
const WinsLoses = styled.span({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  margin: "5rem",
  flexDirection: "column",
});
const Span = styled.span({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  margin: "2rem",
});
const Wins = styled(Span)({
  color: "#67b57c",
});
const Loses = styled(Span)({
  color: "#b8404a",
});

const Result = () => {
  return (
    <>
      <Header title={"RESULTS"} />
      <ResultWrapper>
        <WinsLoses>
          <Wins>VINSTER</Wins>
          <Span>17</Span>
        </WinsLoses>
        <WinsLoses>
          <Loses>FÖRLUSTER</Loses>
          <Span>82</Span>
        </WinsLoses>
      </ResultWrapper>
    </>
  );
};

export default Result;
