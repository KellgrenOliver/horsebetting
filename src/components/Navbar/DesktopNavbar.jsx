import React from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import DesktopNavLinks from "./DesktopNavLinks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faCoins } from "@fortawesome/free-solid-svg-icons";
import { useAuthContext } from "../../contexts/AuthContext";

// Gets user as a prop
const Container = styled.div(({ user }) => {
  return {
    top: "0",
    position: "fixed",
    width: "15vw",
    height: "100vh",
    // Changes background color depending on the users color settings
    background: `linear-gradient(to right, ${
      user?.primaryColor ? user?.primaryColor : "rgb(247, 141, 167)"
    }, ${user?.secondaryColor ? user?.secondaryColor : "rgb(153, 0, 239)"})`,
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    textAlign: "left",
    flexDirection: "column",
    "@media screen and (min-width: 600px)": {
      width: "25vw",
    },
    "@media screen and (min-width: 1024px)": {
      width: "20vw",
    },
    "@media screen and (min-width: 1224px)": {
      width: "15vw",
    },
  };
});

const ImgWrapper = styled(Link)({
  width: "100%",
  cursor: "pointer",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const Icon = styled(FontAwesomeIcon)({
  "@media screen and (min-width: 600px)": {
    fontSize: "3rem",
    margin: "2rem 0 2rem 0",
    color: "white",
  },
  "@media screen and (min-width: 1024px)": {
    fontSize: "4rem",
  },
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
  marginBottom: "1rem",
  flexDirection: "column",
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

const DesktopNavbar = () => {
  // Gets currentUser and user from auth context
  const { currentUser, user } = useAuthContext();

  return (
    // Sends user as a prop to the styled component
    <Container user={user}>
      {/* HomePage link */}
      <ImgWrapper to="/" user={user}>
        <Icon icon={faHome} />
      </ImgWrapper>
      {/* Renders all links */}
      <DesktopNavLinks />
      {/* If there is an user logged in it will render a profile
       box with first character in name and the coin value */}
      {currentUser && (
        <ProfileWrapper>
          <ProfileBox to="/myprofile">
            {/* If the user has a display name it will be rendered 
            otherwise it will render email */}
            <ProfileName>
              {currentUser?.displayName
                ? currentUser?.displayName.toUpperCase().charAt(0)
                : currentUser?.email.toUpperCase().charAt(0)}
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
    </Container>
  );
};

export default DesktopNavbar;
