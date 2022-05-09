import React from "react";
import styled from "@emotion/styled";
import { useAuthContext } from "../../contexts/AuthContext";

const StyledButton = styled.button(({ user }) => {
  return {
    // Changes the color of the button depending on the users color settings
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

// Reuseable button component
const Button = ({ title, onClick }) => {
  // Gets the logged in user from auth context
  const { user } = useAuthContext();

  return (
    // Sends user as a prop to the styled component
    <StyledButton user={user} onClick={onClick}>
      {title}
    </StyledButton>
  );
};

export default Button;
