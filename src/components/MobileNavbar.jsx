import React, { useState, useEffect } from "react";
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
import { useAuthContext } from "../contexts/AuthContext";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useFirestoreQueryData } from "@react-query-firebase/firestore";
import { db } from "../firebase";

const HamburgerContent = styled.div(({ user }) => {
  return {
    top: "0",
    position: "fixed",
    height: "100vh",
    width: "100vw",
    background: `linear-gradient(to right, ${
      user?.[0]?.primaryColor ? user[0].primaryColor : "rgb(247, 141, 167)"
    }, ${
      user?.[0]?.secondaryColor ? user[0].secondaryColor : "rgb(153, 0, 239)"
    })`,
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
  justifyContent: "space-between",
  alignItems: "center",
});

const DesktopNavbar = () => {
  const { currentUser } = useAuthContext();
  const [showMenu, setShowMenu] = useState(false);

  const [user, setUser] = useState();

  const userRef = query(
    collection(db, "users"),
    where("uid", "==", currentUser && currentUser.uid)
  );

  let { data: userData } = useFirestoreQueryData(["users"], userRef);

  useEffect(() => {
    const unSubscribe = onSnapshot(userRef, (snapshot) => {
      userData = [];
      snapshot.docs.forEach((doc) => {
        userData.push({ ...doc.data(), id: doc.id });
      });
      setUser(userData);
    });
    return () => {
      unSubscribe();
    };
  }, []);

  if (!user) return null;

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
                {user && user?.[0].coins < 1000 ? (
                  <h3>{user && user?.[0]?.coins}</h3>
                ) : (
                  <h3>{`${(user && user?.[0]?.coins / 1000).toFixed(1)}K`}</h3>
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
