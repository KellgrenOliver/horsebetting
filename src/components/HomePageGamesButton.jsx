import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { useSpring, animated, config } from "react-spring";
import { useAuthContext } from "../contexts/AuthContext";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useFirestoreQueryData } from "@react-query-firebase/firestore";
import { db } from "../firebase";

const Wrapper = styled(Link)({
  textDecoration: "none",
});
const Box = styled.div(({ user }) => {
  return {
    display: "flex",
    justifyontent: "center",
    alignItems: "center",
    width: "60vw",
    height: "35px",
    cursor: "pointer",
    margin: "3rem",
    backgroundColor: "#212121",
    padding: "1rem",
    borderRadius: "5px",
    border: "1px solid white",
    color: `${user?.[0]?.theme1 ? user[0].theme1 : "rgb(247, 141, 167)"}`,
    "@media screen and (min-width: 600px)": {
      width: "40vw",
      padding: "2rem",
      height: "40px",
    },
    "@media screen and (min-width: 1024px)": {
      width: "30vw",
      height: "50px",
    },
  };
});
const Text = styled.div({
  fontWeight: 300,
  margin: "auto",
  fontSize: "1.5rem",
  "@media screen and (min-width: 600px)": {
    fontSize: "2rem",
  },
  "@media screen and (min-width: 1024px)": {
    fontSize: "3rem",
  },
});

const FadeWrapper = styled.div({});

const FadeButton = animated(FadeWrapper);

const HomePageGamesButton = () => {
  const { currentUser } = useAuthContext();
  const [user, setUser] = useState();

  const userRef = query(
    collection(db, "users"),
    where("uid", "==", currentUser && currentUser.uid)
  );

  let { data: userData } = useFirestoreQueryData(["users"], userRef);

  useEffect(() => {
    onSnapshot(userRef, (snapshot) => {
      userData = [];
      snapshot.docs.forEach((doc) => {
        userData.push({ ...doc.data(), id: doc.id });
      });
      setUser(userData);
    });
  }, []);

  const fade = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: 1000,
    config: config.molasses,
  });
  return (
    <FadeButton style={fade}>
      <Wrapper to="/game">
        <Box user={user}>
          <Text>GO TO THE GAME</Text>
        </Box>
      </Wrapper>
    </FadeButton>
  );
};

export default HomePageGamesButton;
