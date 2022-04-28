import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { useFirestoreQueryData } from "@react-query-firebase/firestore";

const Container = styled.div({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
});

const Wrapper = styled.div({
  backgroundColor: "#212121",
  padding: "2rem",
});

const MostWins = () => {
  const [users, setUsers] = useState();

  const userRef = query(collection(db, "users"));

  let { data: usersData } = useFirestoreQueryData(["users"], userRef);

  useEffect(() => {
    const unSubscribe = onSnapshot(userRef, (snapshot) => {
      usersData = [];
      snapshot.docs.forEach((doc) => {
        usersData.push({ ...doc.data(), id: doc.id });
      });
      setUsers(usersData);
    });
    return () => {
      unSubscribe();
    };
  }, []);

  console.log(users);

  if (!users) return null;

  users.sort((a, b) => b.wins - a.wins);

  return (
    <Container>
      <span>Most Wins</span>
      <Wrapper>
        {users?.map((user, i) => (
          <div key={i}>
            {i + 1}. {user?.email} {user?.wins}
          </div>
        ))}
      </Wrapper>
    </Container>
  );
};

export default MostWins;
