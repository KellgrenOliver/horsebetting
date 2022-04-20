import React, { useRef, useState, useEffect } from "react";
import styled from "@emotion/styled";
import { useAuthContext } from "../contexts/AuthContext";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPlus } from "@fortawesome/free-solid-svg-icons";
import ColorPicker from "./ColorPicker";
import {
  doc,
  updateDoc,
  collection,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase";
import { useFirestoreQueryData } from "@react-query-firebase/firestore";

const InputWrapper = styled.div({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
});
const Input = styled.input({
  backgroundColor: "#dedede",
  width: "85vw",
  height: "35px",
  marginTop: "0.2rem",
  marginBottom: "1rem",
  borderRadius: "5px",
  paddingLeft: "5px",
  border: "none",
  textAlign: "center",
  "&:focus": {
    outline: "none",
  },
  "@media screen and (min-width: 600px)": {
    width: "40vw",
  },
  "@media screen and (min-width: 1024px)": {
    width: "25vw",
  },
});
const Button = styled.button(({ user }) => {
  return {
    background: `linear-gradient(to right, ${
      user?.[0]?.theme1 ? user[0].theme1 : "#00b4db"
    }, ${user?.[0]?.theme2 ? user[0].theme2 : "#0083b0"})`,
    width: "100px",
    height: "35px",
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

const UpdateProfileForm = () => {
  const displayNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const [color1, setColor1] = useState("");
  const [color2, setColor2] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [user, setUser] = useState();
  const { currentUser, setDisplayName, setEmail, setPassword } =
    useAuthContext();

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("The passwords does not match");
    }

    try {
      setLoading(true);

      const userData = {
        theme1: color1,
        theme2: color2,
      };
      await updateDoc(doc(db, "users", `${currentUser.uid}`), userData);

      if (displayNameRef.current.value !== currentUser.displayName) {
        await setDisplayName(displayNameRef.current.value);
      }

      if (emailRef.current.value !== currentUser.email) {
        await setEmail(emailRef.current.value);
      }

      if (passwordRef.current.value) {
        await setPassword(passwordRef.current.value);
      }

      console.log("color1", color1);
      console.log("color2", color2);

      setMessage("Profile successfully updated");
      setLoading(false);
    } catch (e) {
      setError("Error updating profile. Please try logging out and in again.");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <h1>{error}</h1>}
      {message && <h1 variant="success">{message}</h1>}
      <InputWrapper>
        <label>DISPLAYNAME</label>
        <Input
          type="text"
          ref={displayNameRef}
          defaultValue={currentUser && currentUser.displayName}
        />
        <label>EMAIL</label>
        <Input
          type="email"
          ref={emailRef}
          defaultValue={currentUser && currentUser.email}
          required={true}
        />
        <label>THEME COLOR 1</label>
        <ColorPicker
          getValue={(value) => setColor1(value)}
          savedColor={
            user?.[0]?.theme1.length > 0
              ? user?.[0]?.theme1
              : "rgb(0, 180, 219)"
          }
        />
        <label>THEME COLOR 2</label>
        <ColorPicker
          getValue={(value) => setColor2(value)}
          savedColor={
            user?.[0]?.theme2.length > 0
              ? user?.[0]?.theme2
              : "rgb(0, 131, 176)"
          }
        />
        <label>NEW PASSWORD</label>
        <Input type="password" ref={passwordRef} autoComplete="new-password" />
        <label>CONFIRM NEW PASSWORD</label>
        <Input
          type="password"
          ref={passwordConfirmRef}
          autoComplete="new-password"
        />
      </InputWrapper>
      <Button user={user} disabled={loading} type="submit">
        CONFIRM
      </Button>
    </form>
  );
};

export default UpdateProfileForm;
