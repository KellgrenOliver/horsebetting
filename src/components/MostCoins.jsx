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

const MostCoins = () => {
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

  users.sort((a, b) => b.coins - a.coins);

  return (
    <Container>
      <span>Most Coins</span>
      <Wrapper>
        {users?.map((user, i) => (
          <div key={i}>
            {i + 1}. {user?.email} {user?.coins}
          </div>
        ))}
      </Wrapper>
    </Container>
  );
};

export default MostCoins;
