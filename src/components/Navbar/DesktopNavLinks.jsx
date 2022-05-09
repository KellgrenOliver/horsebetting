import React from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGamepad,
  faHorse,
  faChartArea,
  faUserAlt,
  faSignOutAlt,
  faCartPlus,
} from "@fortawesome/free-solid-svg-icons";
import { useAuthContext } from "../../contexts/AuthContext";

const LinkWrapper = styled(Link)({
  margin: 0,
  padding: "1rem 0 1rem 0 ",
  width: "100%",
  cursor: "pointer",
  textDecoration: "none",
  color: "white",
  fontSize: "1.2rem",
  borderBottom: "3px solid white",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  "&:nth-of-type(1)": {
    borderTop: "3px solid white",
  },
  "@media screen and (min-width: 600px)": {
    "&:nth-of-type(2)": {
      borderTop: "3px solid white",
    },
  },
});
const NavLink = styled.span({
  margin: 0,
  width: "100%",
  cursor: "pointer",
  textDecoration: "none",
  color: "white",
  fontSize: "1.2rem",
  fontWeight: 200,
  paddingRight: "1rem",
  "@media screen and (min-width: 600px)": {
    fontSize: "1rem",
  },
  "@media screen and (min-width: 1024px)": {
    fontSize: "1.3rem",
  },
});
const Icon = styled(FontAwesomeIcon)({
  fontSize: "2rem",
  margin: "0 1rem 0 1rem ",
  "@media screen and (min-width: 600px)": {
    fontSize: "1.5rem",
  },
});

const DesktopNavLinks = () => {
  // Gets user from auth context
  const { user } = useAuthContext();

  return (
    <>
      {/* If there is an user logged in these links will be rendered */}
      {user ? (
        <>
          {/* The wrapper is the link because then the whole element will be clickable */}
          <LinkWrapper to="/game">
            <Icon icon={faGamepad} />
            <NavLink>GAME</NavLink>
          </LinkWrapper>
          <LinkWrapper to="/horses">
            <Icon icon={faHorse} />
            <NavLink>HORSES</NavLink>
          </LinkWrapper>
          <LinkWrapper to="/statistics">
            <Icon icon={faChartArea} />
            <NavLink>STATISTICS</NavLink>
          </LinkWrapper>
          <LinkWrapper to="/myprofile">
            <Icon icon={faUserAlt} />
            <NavLink>MY PROFILE</NavLink>
          </LinkWrapper>
          <LinkWrapper to="/shop">
            <Icon icon={faCartPlus} />
            <NavLink>SHOP</NavLink>
          </LinkWrapper>
          <LinkWrapper to="/logout">
            <Icon icon={faSignOutAlt} />
            <NavLink>LOG OUT</NavLink>
          </LinkWrapper>
        </>
      ) : (
        // If there isnt an user logged in this links will be rendered
        <>
          <LinkWrapper to="/horses">
            <Icon icon={faHorse} />
            <NavLink>HORSES</NavLink>
          </LinkWrapper>
          <LinkWrapper to="/statistics">
            <Icon icon={faChartArea} />
            <NavLink>STATISTICS</NavLink>
          </LinkWrapper>
        </>
      )}
    </>
  );
};

export default DesktopNavLinks;
