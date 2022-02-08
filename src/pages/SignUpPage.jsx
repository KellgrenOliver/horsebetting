import React from "react";
import SignUpComp from "../components/SignUpComp";
import styled from "@emotion/styled";

const Container = styled.div({
  backgroundImage:
    "url(https://images.hdqwalls.com/wallpapers/dark-horse-8b.jpg)",
  width: "100vw",
  height: "100vh",
  backgroundPosition: "center",
  backgroundSize: "cover",
});

const SignUp = () => {
  return (
    <Container>
      <SignUpComp />
    </Container>
  );
};

export default SignUp;
