import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { useAuthContext } from "../contexts/AuthContext";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { useFirestoreQueryData } from "@react-query-firebase/firestore";

const StyledButton = styled.button(({ user }) => {
  return {
    background: `linear-gradient(to right, ${
      user?.[0]?.primaryColor ? user[0].primaryColor : "rgb(247, 141, 167)"
    }, ${
      user?.[0]?.secondaryColor ? user[0].secondaryColor : "rgb(153, 0, 239)"
    })`,
    width: "150px",
    height: "40px",
    borderRadius: "5px",
    color: "white",
    textAlign: "center",
    border: "none",
    marginBottom: "1rem",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#187580",
    },
  };
});

const Button = ({ title, onClick }) => {
  const [user, setUser] = useState();
  const { currentUser } = useAuthContext();

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

  return (
    <StyledButton user={user} onClick={onClick}>
      {title}
    </StyledButton>
  );
};

export default Button;
