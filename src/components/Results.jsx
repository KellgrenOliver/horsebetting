import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { useAuthContext } from "../contexts/AuthContext";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useFirestoreQueryData } from "@react-query-firebase/firestore";
import { db } from "../firebase";

const ResultWrapper = styled.div({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  width: "80vw",
  "@media screen and (min-width: 600px)": {
    width: "50vw",
  },
});
const WinsLoses = styled.span({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  margin: "2rem",
  width: "100%",
  height: "15vh",
  fontSize: "2rem",
  borderRadius: "5px",
  backgroundColor: "#212121",
});
const Span = styled.span({
  margin: "1rem",
});

const Result = () => {
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

  return (
    <>
      <ResultWrapper>
        {user && (
          <>
            <WinsLoses>
              <Span>{user[0].wins}</Span>
              <Span style={{ color: "#67b57c" }}>WINS</Span>
            </WinsLoses>
            <WinsLoses>
              <Span>{user[0].losses}</Span>
              <Span style={{ color: "#b8404a" }}>LOSSES</Span>
            </WinsLoses>
          </>
        )}
      </ResultWrapper>
    </>
  );
};

export default Result;
