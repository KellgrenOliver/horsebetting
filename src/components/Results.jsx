import React from "react";
import styled from "@emotion/styled";
import { useAuthContext } from "../contexts/AuthContext";

const ResultWrapper = styled.div({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  width: "80vw",
  "@media screen and (min-width: 600px)": {
    width: "50vw",
  },
});
const WinsLosses = styled.span({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  margin: "2rem",
  width: "100%",
  height: "15vh",
  fontSize: "2rem",
  borderRadius: "5px",
  backgroundColor: "#303030",
});
const Span = styled.span({
  margin: "1rem",
});

const Result = () => {
  const { user } = useAuthContext();

  return (
    <>
      <ResultWrapper>
        {user && (
          <>
            <WinsLosses>
              <Span>{user?.wins}</Span>
              <Span style={{ color: "#67b57c" }}>WINS</Span>
            </WinsLosses>
            <WinsLosses>
              <Span>{user?.losses}</Span>
              <Span style={{ color: "#b8404a" }}>LOSSES</Span>
            </WinsLosses>
          </>
        )}
      </ResultWrapper>
    </>
  );
};

export default Result;
