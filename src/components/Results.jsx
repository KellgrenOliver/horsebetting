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
});
const WinsLoses = styled.span({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  margin: "5rem",
  flexDirection: "column",
});
const Span = styled.span({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  margin: "2rem",
});
const Wins = styled(Span)({
  color: "#67b57c",
});
const Loses = styled(Span)({
  color: "#b8404a",
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
              <Wins>VINSTER</Wins>
              <Span>{user[0].wins}</Span>
            </WinsLoses>
            <WinsLoses>
              <Loses>FÖRLUSTER</Loses>
              <Span>{user[0].loses}</Span>
            </WinsLoses>
          </>
        )}
      </ResultWrapper>
    </>
  );
};

export default Result;
