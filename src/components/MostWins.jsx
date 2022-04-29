import React from "react";
import styled from "@emotion/styled";
import { useAuthContext } from "../contexts/AuthContext";

const Container = styled.div({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
});

const Wrapper = styled.div({
  backgroundColor: "#212121",
  padding: "2rem",
  borderRadius: "5px",
});

const User = styled.p({
  textAlign: "left",
  margin: "0.5rem",
});

const MostWins = () => {
  const { currentUser, users } = useAuthContext();

  if (!users) return null;

  users.sort((a, b) => b.wins - a.wins);

  const top3Arr = users.slice(0, 3);

  return (
    <Container>
      <span style={{ marginBottom: "0.5rem" }}>Most Wins</span>
      <Wrapper>
        {top3Arr?.map((user, i) => (
          <User key={i}>
            {i + 1}.{" "}
            {user?.email === currentUser?.email ? <b>You</b> : user?.email} (
            {user?.wins})
          </User>
        ))}
      </Wrapper>
    </Container>
  );
};

export default MostWins;
