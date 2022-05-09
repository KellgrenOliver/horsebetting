import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/index";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateEmail,
  updatePassword,
  updateProfile,
} from "firebase/auth";
import { RotateLoader } from "react-spinners";
import styled from "@emotion/styled";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { collection, query } from "firebase/firestore";
import { useFirestoreQueryData } from "@react-query-firebase/firestore";

const LoadingWrapper = styled.div({
  width: "100vw",
  marginTop: "5rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const AuthContext = createContext();

const useAuthContext = () => {
  return useContext(AuthContext);
};

const AuthContextProverder = (props) => {
  // States
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // SignUp function
  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password).then(
      (user) => {
        // Sets user data
        const docData = {
          email: user.user.email,
          uid: user.user.uid,
          coins: 5000,
          wins: 0,
          losses: 0,
          primaryColor: "",
          secondaryColor: "",
        };
        // Adding user to database
        setDoc(doc(db, "users", `${docData.uid}`), docData);
      }
    );
  };

  // LogiN function
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // SignOut function
  const signout = () => {
    return signOut(auth);
  };

  // Email function
  const setEmail = (newEmail) => {
    return updateEmail(currentUser, newEmail);
  };

  // Password function
  const setPassword = (newPassword) => {
    return updatePassword(currentUser, newPassword);
  };

  // Display name function
  const setDisplayName = (name) => {
    return updateProfile(currentUser, {
      displayName: name,
    });
  };

  // UseEffect that sets the current user to the logged in user
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
  }, []);

  const userRef = query(collection(db, "users"));

  // Gets all users from database
  let { data: users } = useFirestoreQueryData(["users"], userRef, {
    subscribe: true,
  });

  // Matches currentUser with the correct user from the database
  const user = users?.find((user) => user?.uid === currentUser?.uid);

  const values = {
    currentUser,
    user,
    users,
    signup,
    login,
    signout,
    setEmail,
    setPassword,
    setDisplayName,
  };

  return (
    <AuthContext.Provider value={values}>
      {loading && (
        <LoadingWrapper>
          <RotateLoader color={"#888"} size={50} />
        </LoadingWrapper>
      )}
      {!loading && props.children}
    </AuthContext.Provider>
  );
};

export { useAuthContext, AuthContextProverder as default };
