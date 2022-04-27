import React, { useRef, useState, useEffect } from "react";
import styled from "@emotion/styled";
import { useAuthContext } from "../contexts/AuthContext";
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
import Button from "./Button";
import toast, { Toaster } from "react-hot-toast";

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

const Label = styled.label({
  fontSize: "0.8rem",
});

const UpdateProfileForm = () => {
  const displayNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const [primaryColor, setPrimaryColor] = useState("");
  const [secondaryColor, setSecondaryColor] = useState("");
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
        primaryColor,
        secondaryColor,
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

      setMessage("Profile successfully updated");
      setLoading(false);
    } catch (e) {
      setError("Error updating profile. Please try logging out and in again.");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (message) {
      setError("");
    }
    if (error) {
      setMessage("");
    }
  }, [message, error]);

  const successNotify = () => toast.success(message);
  const errorNotify = () => toast.error(error);

  return (
    <form onSubmit={handleSubmit}>
      <InputWrapper>
        <Label>DISPLAYNAME</Label>
        <Input
          type="text"
          ref={displayNameRef}
          defaultValue={currentUser && currentUser.displayName}
        />
        <Label>EMAIL</Label>
        <Input
          type="email"
          ref={emailRef}
          defaultValue={currentUser && currentUser.email}
          required={true}
        />
        <Label>PRIMARY COLOR</Label>
        <ColorPicker
          getValue={(value) => setPrimaryColor(value)}
          savedColor={
            user?.[0]?.primaryColor?.length > 0
              ? user?.[0]?.primaryColor
              : "rgb(247, 141, 167)"
          }
        />
        <Label>SECONDARY COLOR</Label>
        <ColorPicker
          getValue={(value) => setSecondaryColor(value)}
          savedColor={
            user?.[0]?.secondaryColor?.length > 0
              ? user?.[0]?.secondaryColor
              : "rgb(153, 0, 239)"
          }
        />
        <Label>NEW PASSWORD</Label>
        <Input type="password" ref={passwordRef} autoComplete="new-password" />
        <Label>CONFIRM NEW PASSWORD</Label>
        <Input
          type="password"
          ref={passwordConfirmRef}
          autoComplete="new-password"
        />
      </InputWrapper>
      <Button
        title={"CONFIRM"}
        disabled={loading}
        type="submit"
        onClick={() => {
          message && successNotify();
          error && errorNotify();
        }}
      />
      <Toaster position="top-right" />
    </form>
  );
};

export default UpdateProfileForm;
