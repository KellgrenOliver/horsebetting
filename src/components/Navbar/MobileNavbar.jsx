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

// Gets user as a prop
const HamburgerContent = styled.div(({ user }) => {
  return {
    top: "0",
    position: "fixed",
    height: "100vh",
    width: "100vw",
    // Changes background color depending on the users color settings
    background: `linear-gradient(to right, ${
      user?.primaryColor ? user.primaryColor : "rgb(247, 141, 167)"
    }, ${user?.secondaryColor ? user?.secondaryColor : "rgb(153, 0, 239)"})`,
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    textAlign: "left",
    flexDirection: "column",
    zIndex: 150,
  };
});
const ImgWrapper = styled(Link)({
  cursor: "pointer",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  marginTop: "4rem",
  marginBottom: "1rem",
});
const TopWrapper = styled.div({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  zIndex: 999,
});
const Icon = styled(FontAwesomeIcon)({
  fontSize: "2rem",
  top: 15,
  left: 20,
  position: "fixed",
  color: "white",
});
const HomeIcon = styled(FontAwesomeIcon)({
  fontSize: "5rem",
  color: "white",
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
  // Gets currentUser and user from auth context
  const { currentUser, user } = useAuthContext();
  // State that handles if content should be showing or hiding
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      {/* Open menu icon */}
      <TopWrapper>
        {/* If you click on the icon the content will be showing */}
        <Icon icon={faBars} onClick={() => setShowMenu(!showMenu)} />
      </TopWrapper>
      {showMenu && (
        // Sends user as a prop to the styled component
        <HamburgerContent user={user}>
          {/* Close menu icon, if you click on the icon the content will be hiding */}
          <Icon icon={faTimes} onClick={() => setShowMenu(!showMenu)} />
          {/* HomePage link */}
          <ImgWrapper to="/" onClick={() => setShowMenu(!showMenu)}>
            <HomeIcon icon={faHome} />
          </ImgWrapper>
          {/* Renders all links */}
          <NavLinkWrapper>
            {/* Sends showMenu state to the links */}
            <MobileNavLinks showMenu={showMenu} setShowMenu={setShowMenu} />
          </NavLinkWrapper>
          {/* If there is an user logged in it will render a profile
       box with first character in name and the coin value */}
          {currentUser && (
            <ProfileWrapper>
              <ProfileBox to="/myprofile">
                {/* If the user has a display name it will be rendered 
            otherwise it will render email */}
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
                  // Rounds of coin value
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
