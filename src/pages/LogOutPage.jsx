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
  const { signout } = useAuthContext();

  useEffect(() => {
    signout();
    history.push("/");
  });

  return (
    <div>
      <LoadingWrapper>
        <RotateLoader color={"#888"} size={50} />
      </LoadingWrapper>
    </div>
  );
};

export default LogOutPage;
