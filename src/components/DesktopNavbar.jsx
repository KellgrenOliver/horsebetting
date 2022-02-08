import React from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import NavLinks from "./NavLinks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faCoins } from "@fortawesome/free-solid-svg-icons";
import { useAuthContext } from "../contexts/AuthContext";
import { collection, query, where } from "firebase/firestore";
import { useFirestoreQueryData } from "@react-query-firebase/firestore";
import { db } from "../firebase";

const Container = styled.div({
  top: "0",
  position: "fixed",
  width: "15vw",
  height: "100vh",
  background: "linear-gradient(to right, #00b4db, #0083b0)",
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  textAlign: "left",
  flexDirection: "column",
  "@media screen and (min-width: 600px)": {
    width: "20vw",
  },
  "@media screen and (min-width: 1024px)": {
    width: "15vw",
  },
});

const ImgWrapper = styled(Link)({
  width: "100%",
  cursor: "pointer",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  "&:hover": {
    backgroundImage: "linear-gradient(to right, #029ebf, #016d91)",
  },
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
});
const ProfileBox = styled(Link)({
  width: "70px",
  height: "70px",
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

const DesktopNavbar = () => {
  const { currentUser } = useAuthContext();

  const queryRef = query(
    collection(db, "users"),
    where("user", "==", currentUser && currentUser.uid)
  );

  const { data } = useFirestoreQueryData(["users"], queryRef);

  return (
    <Container>
      <ImgWrapper to="/">
        <Icon icon={faHome} />
      </ImgWrapper>
      <NavLinks />
      <ProfileWrapper>
        <ProfileBox to="/myprofile">
          <ProfileName>
            {currentUser?.displayName
              ? currentUser?.displayName.toUpperCase().charAt(0)
              : currentUser?.email.toUpperCase().charAt(0)}
          </ProfileName>
        </ProfileBox>
        <CoinsWrapper>
          <CoinsIcon icon={faCoins} />
          <h3>{data && data[0]?.coins}</h3>
        </CoinsWrapper>
      </ProfileWrapper>
    </Container>
  );
};

export default DesktopNavbar;
