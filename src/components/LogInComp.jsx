import React, { useState, useRef } from "react";
import styled from "@emotion/styled";
import { Link, useHistory } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";

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
  height: "35px",
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
const Button = styled.button({
  background: "linear-gradient(to right, #00b4db, #0083b0)",
  width: "100px",
  height: "35px",
  borderRadius: "5px",
  color: "white",
  textAlign: "center",
  border: "none",
  marginBottom: "1rem",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#187580",
  },
});
const H1 = styled.h1({
  fontSize: "2rem",
  fontWeight: 200,
  "@media screen and (min-width: 600px)": {
    fontSize: "4rem",
  },
  "@media screen and (min-width: 1024px)": {
    fontSize: "5rem",
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

const LogInComp = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState(null);
  const { login } = useAuthContext();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <Container>
      <H1>LOG IN</H1>
      {error && <h2>{error}</h2>}
      <form onSubmit={handleSubmit}>
        <Wrapper>
          <label>Email</label>
          <Input type="email" ref={emailRef} required={true} />
          <label>Password</label>
          <div>
            <Input type="password" ref={passwordRef} required={true} />
          </div>
          <Button type="submit">LOG IN</Button>
        </Wrapper>
      </form>
      <SignUpLink to="/signup">
        Don't have an account? Create your account here
      </SignUpLink>
    </Container>
  );
};

export default LogInComp;
