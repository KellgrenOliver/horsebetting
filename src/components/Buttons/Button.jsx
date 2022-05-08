import React from "react";
import styled from "@emotion/styled";
import { useAuthContext } from "../../contexts/AuthContext";

const StyledButton = styled.button(({ user }) => {
  return {
    background: `linear-gradient(to right, ${
      user?.primaryColor ? user?.primaryColor : "rgb(247, 141, 167)"
    }, ${user?.secondaryColor ? user?.secondaryColor : "rgb(153, 0, 239)"})`,
    width: "150px",
    height: "40px",
    borderRadius: "5px",
    color: "white",
    textAlign: "center",
    border: "none",
    marginBottom: "1rem",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#187580",
    },
  };
});

const Button = ({ title, onClick }) => {
  const { user } = useAuthContext();

  return (
    <StyledButton user={user} onClick={onClick}>
      {title}
    </StyledButton>
  );
};

export default Button;
