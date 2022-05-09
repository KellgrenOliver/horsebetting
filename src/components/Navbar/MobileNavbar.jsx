import React, { useState } from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import MobileNavLinks from "./MobileNavLinks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faTimes,
  faHome,
  faCoins,
} from "@fortawesome/free-solid-svg-icons";
import { useAuthContext } from "../../contexts/AuthContext";

const HamburgerContent = styled.div(({ user }) => {
  return {
    top: "0",
    position: "fixed",
    height: "100vh",
    width: "100vw",
    background: `linear-gradient(to right, ${
      user?.primaryColor ? user.primaryColor : "rgb(247, 141, 167)"
    }, ${user?.secondaryColor ? user?.secondaryColor : "rgb(153, 0, 239)"})`,
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    textAlign: "left",
    flexDirection: "column",
    zIndex: 999,
  };
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
  zIndex: 999,
});
const CloseIconWrapper = styled.div({
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  width: "100%",
});
const OpenIcon = styled(FontAwesomeIcon)({
  fontSize: "2rem",
  //   margin: "2.5rem 1rem 0 1rem ",
  top: 15,
  left: 20,
  position: "fixed",
});
const CloseIcon = styled(FontAwesomeIcon)({
  fontSize: "2rem",
  margin: "1rem 0rem 1rem 1.2rem ",
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
  marginBottom: "auto",
  marginTop: "0.5rem",
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
  justifyContent: "space-between",
  alignItems: "center",
});

const DesktopNavbar = () => {
  const { currentUser, user } = useAuthContext();
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      <TopWrapper>
        <OpenIcon icon={faBars} onClick={() => setShowMenu(!showMenu)} />
      </TopWrapper>
      {showMenu && (
        <HamburgerContent user={user}>
          <CloseIconWrapper>
            <CloseIcon icon={faTimes} onClick={() => setShowMenu(!showMenu)} />
          </CloseIconWrapper>
          <ImgWrapper to="/" onClick={() => setShowMenu(!showMenu)}>
            <HomeIcon icon={faHome} />
          </ImgWrapper>
          <NavLinkWrapper>
            <MobileNavLinks showMenu={showMenu} setShowMenu={setShowMenu} />
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
                {user?.coins < 1000 ? (
                  <h3>{user?.coins}</h3>
                ) : (
                  <h3>{`${(user?.coins / 1000).toFixed(0)}K`}</h3>
                )}
              </CoinsWrapper>
            </ProfileWrapper>
          )}
        </HamburgerContent>
      )}
    </>
  );
};

export default DesktopNavbar;
