import React from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGamepad,
  faHorse,
  faChartArea,
  faUserAlt,
  faTrophy,
} from "@fortawesome/free-solid-svg-icons";
import { useAuthContext } from "../contexts/AuthContext";
import LogOutModal from "./LogOutModal";

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
  "&:hover": {
    backgroundImage: "linear-gradient(to right, #029ebf, #016d91)",
  },
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

const NavLinks = () => {
  const { currentUser } = useAuthContext();

  return (
    <>
      {currentUser ? (
        <>
          <LinkWrapper to="/game">
            <Icon icon={faGamepad} />
            <NavLink>GAME</NavLink>
          </LinkWrapper>
          <LinkWrapper to="/horses">
            <Icon icon={faHorse} />
            <NavLink>HORSES</NavLink>
          </LinkWrapper>
          <LinkWrapper to="/statistic">
            <Icon icon={faChartArea} />
            <NavLink>STATISTIC</NavLink>
          </LinkWrapper>
          <LinkWrapper to="/result">
            <Icon icon={faTrophy} />
            <NavLink>RESULT</NavLink>
          </LinkWrapper>
          <LinkWrapper to="/myprofile">
            <Icon icon={faUserAlt} />
            <NavLink>MY PROFILE</NavLink>
          </LinkWrapper>
          <LogOutModal />
        </>
      ) : (
        <>
          <LinkWrapper to="/horses">
            <Icon icon={faHorse} />
            <NavLink>HORSES</NavLink>
          </LinkWrapper>
          <LinkWrapper to="/statistic">
            <Icon icon={faChartArea} />
            <NavLink>STATISTIC</NavLink>
          </LinkWrapper>
        </>
      )}
    </>
  );
};

export default NavLinks;
