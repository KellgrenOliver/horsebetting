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
const LogInLink = styled(Link)({
  cursor: "pointer",
  textDecoration: "none",
  color: "white",
  fontSize: "0.8rem",
  "@media screen and (min-width: 1024px)": {
    fontSize: "0.9rem",
  },
});

const FadedSignUp = animated.div;

const SignUpComp = () => {
  // Creates reference to email
  const emailRef = useRef();
  // Creates reference to password
  const passwordRef = useRef();
  // Creates reference to confirmed password
  const passwordConfirmRef = useRef();
  // Gets signup function from auth context
  const { signup } = useAuthContext();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // If the password and the confirmed passworded dont match it will return error
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return toast.error("The passwords does not match");
    }

    try {
      // Gives the signup function email and passowrd
      await signup(emailRef.current.value, passwordRef.current.value);
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
    <FadedSignUp style={fade}>
      <Container>
        <Header title={"CREATE ACCOUNT"} />
        <form onSubmit={handleSubmit}>
          <Wrapper>
            <label type="email">Email</label>
            <Input type="email" ref={emailRef} required />
            <label>Password</label>
            <Input type="password" ref={passwordRef} required />
            <label>Confirm password</label>
            <Input type="password" ref={passwordConfirmRef} required />
            <Button title={"CREATE"} type="submit" />
          </Wrapper>
        </form>
        <LogInLink to="/login">Already have an account? Log in here</LogInLink>
      </Container>
      {/* Renders toast in the top right corner */}
      <Toaster position="top-right" />
    </FadedSignUp>
  );
};

export default SignUpComp;
