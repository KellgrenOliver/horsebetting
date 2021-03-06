import React, { useRef } from "react";
import styled from "@emotion/styled";
import { Link, useHistory } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import { useSpring, animated, config } from "react-spring";
import toast, { Toaster } from "react-hot-toast";
import Header from "../Headers/Header";
import Button from "../Buttons/Button";

const Container = styled.div({
  marginTop: "10vh",
  "@media screen and (min-width: 600px)": {
    marginTop: "25vh",
  },
});
const Wrapper = styled.div({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
});
const Input = styled.input({
  backgroundColor: "#dedede",
  width: "85vw",
  height: "30px",
  marginTop: "0.2rem",
  marginBottom: "1rem",
  borderRadius: "5px",
  paddingLeft: "5px",
  border: "none",
  textAlign: "center",
  "&:focus": {
    outline: "none",
  },
  "@media screen and (min-width: 600px)": {
    width: "40vw",
  },
  "@media screen and (min-width: 1024px)": {
    width: "25vw",
  },
});
const SignUpLink = styled(Link)({
  cursor: "pointer",
  textDecoration: "none",
  color: "white",
  fontSize: "0.8rem",
  "@media screen and (min-width: 1024px)": {
    fontSize: "0.9rem",
  },
});

const FadedLogIn = animated.div;

const LogInComp = () => {
  // Creates reference to email
  const emailRef = useRef();
  // Creates reference to password
  const passwordRef = useRef();
  // Gets login function from auth context
  const { login } = useAuthContext();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Gives the login function email and passowrd
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch (e) {
      // If there is an error it will be rendered with react toast
      toast.error(e.message);
    }
  };

  // Animations from react-spring
  const fade = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: 200,
    config: config.molasses,
  });

  return (
    <FadedLogIn style={fade}>
      <Container>
        <Header title={"LOG IN"} />
        <form onSubmit={handleSubmit}>
          <Wrapper>
            <label>Email</label>
            <Input type="email" ref={emailRef} required />
            <label>Password</label>
            <Input type="password" ref={passwordRef} required />
            <Button title={"LOG IN"} type="submit" />
          </Wrapper>
        </form>
        <SignUpLink to="/signup">
          Don't have an account? Create your account here
        </SignUpLink>
      </Container>
      {/* Renders toast in the top right corner */}
      <Toaster position="top-right" />
    </FadedLogIn>
  );
};

export default LogInComp;
