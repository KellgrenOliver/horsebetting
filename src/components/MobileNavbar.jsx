import React, { useState } from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import NavLinks from "./NavLinks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faTimes,
  faHome,
  faCoins,
} from "@fortawesome/free-solid-svg-icons";
import { useAuthContext } from "../contexts/AuthContext";
import { useSpring, animated } from "react-spring";

const HamburgerContent = styled.div({
  top: "0",
  position: "fixed",
  //   width: "70vw",
  height: "100vh",
  background: "linear-gradient(to right, #00b4db, #0083b0)",
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  textAlign: "left",
  flexDirection: "column",
});
const ImgWrapper = styled(Link)({
  cursor: "pointer",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
});
const TopWrapper = styled.div({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});
const CloseIconWrapper = styled.div({
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  width: "100%",
});
const OpenIcon = styled(FontAwesomeIcon)({
  fontSize: "2rem",
  margin: "1.5rem 1rem 0 1rem ",
  position: "fixed",
});
const CloseIcon = styled(FontAwesomeIcon)({
  fontSize: "2rem",
  margin: "0.5rem 1rem 1rem 1rem ",
  color: "white",
});
const HomeIcon = styled(CloseIcon)({
  fontSize: "5rem",
});
const NavLinkWrapper = styled.div({
  width: "100%",
});
const CoinsIcon = styled(FontAwesomeIcon)({
  fontSize: "1.5rem",
  marginRight: "0.5rem",
  color: "#cfc327",
});
const ProfileWrapper = styled.div({
  width: "100%",
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  marginTop: "auto",
  marginBottom: "0.5rem",
});
const ProfileBox = styled(Link)({
  width: "50px",
  height: "50px",
  borderRadius: "50%",
  backgroundColor: "#3b3b3b",
  color: "white",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginRight: "1rem",
  cursor: "pointer",
  textDecoration: "none",
});
const ProfileName = styled.h3({
  fontSize: "1.5rem",
});
const CoinsWrapper = styled.div({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const AnimatedMenu = animated(HamburgerContent);

const DesktopNavbar = () => {
  const { currentUser } = useAuthContext();
  const [isOpenMenu, isSetOpenMenu] = useState(false);

  const expand = useSpring({
    config: { friction: 20, clamp: !isSetOpenMenu },
    width: isSetOpenMenu ? `70%` : "0%",
  });

  return (
    <>
      <TopWrapper>
        <OpenIcon icon={faBars} onClick={() => isSetOpenMenu(true)} />
      </TopWrapper>
      {isOpenMenu && (
        <AnimatedMenu style={expand}>
          {/* <HamburgerContent> */}
          <CloseIconWrapper>
            <CloseIcon icon={faTimes} onClick={() => isSetOpenMenu(false)} />
          </CloseIconWrapper>
          <ImgWrapper to="/" onClick={() => isSetOpenMenu(false)}>
            <HomeIcon icon={faHome} />
          </ImgWrapper>
          <NavLinkWrapper onClick={() => isSetOpenMenu(false)}>
            <NavLinks />
          </NavLinkWrapper>
          {currentUser && (
            <ProfileWrapper>
              <ProfileBox to="/myprofile">
                <ProfileName>
                  {currentUser.displayName
                    ? currentUser.displayName.toUpperCase().charAt(0)
                    : currentUser.email.toUpperCase().charAt(0)}
                </ProfileName>
              </ProfileBox>
              <CoinsWrapper>
                <CoinsIcon icon={faCoins} />
                <h3>100</h3>
              </CoinsWrapper>
            </ProfileWrapper>
          )}
          {/* </HamburgerContent> */}
        </AnimatedMenu>
      )}
    </>
  );
};

export default DesktopNavbar;
