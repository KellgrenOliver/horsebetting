import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import { RotateLoader } from "react-spinners";
import styled from "@emotion/styled";

const LoadingWrapper = styled.div({
  width: "100vw",
  marginTop: "5rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const LogOutPage = () => {
  const history = useHistory();
  // Gets signout function from auth context
  const { signout } = useAuthContext();

  // SignOut function will run directly when you enter this page using this useEffect
  useEffect(() => {
    signout();
    history.push("/");
  });

  return (
    <LoadingWrapper>
      <RotateLoader color={"#888"} size={50} />
    </LoadingWrapper>
  );
};

export default LogOutPage;
