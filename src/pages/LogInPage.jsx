import React from "react";
import LogInComp from "../components/LogInComp";
import styled from "@emotion/styled";

const Container = styled.div({
  backgroundImage:
    "url(https://images.hdqwalls.com/wallpapers/dark-horse-8b.jpg)",
  width: "100vw",
  height: "100vh",
  backgroundPosition: "center",
  backgroundSize: "cover",
});

const LogIn = () => {
  return (
    <Container>
      <LogInComp />
    </Container>
  );
};

export default LogIn;
