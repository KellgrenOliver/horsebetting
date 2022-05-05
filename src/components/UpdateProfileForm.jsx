import React, { useRef, useState } from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import ColorPicker from "./ColorPicker";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import Button from "./Button";
import toast, { Toaster } from "react-hot-toast";

const OrderText = styled.div({
  fontWeight: 300,
  fontSize: "1rem",
  marginBottom: "1rem",
  cursor: "pointer",
  color: "white",
});
const InputWrapper = styled.div({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
});
const Input = styled.input({
  backgroundColor: "#dedede",
  width: "85vw",
  height: "30px",
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
  const [loading, setLoading] = useState(false);
  const { currentUser, setDisplayName, setEmail, setPassword, user } =
    useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return toast.error("The passwords does not match");
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

      toast.success("Profile successfully updated");
      setLoading(false);
    } catch (e) {
      toast.error(
        "Error updating profile. Please try logging out and in again."
      );
      setLoading(false);
    }
  };

  return (
    <>
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
            required
          />
          <Label>PRIMARY COLOR</Label>
          <ColorPicker
            getValue={(value) => setPrimaryColor(value)}
            savedColor={
              user?.primaryColor?.length > 0
                ? user?.primaryColor
                : "rgb(247, 141, 167)"
            }
          />
          <Label>SECONDARY COLOR</Label>
          <ColorPicker
            getValue={(value) => setSecondaryColor(value)}
            savedColor={
              user?.secondaryColor?.length > 0
                ? user?.secondaryColor
                : "rgb(153, 0, 239)"
            }
          />
          <Label>NEW PASSWORD</Label>
          <Input
            type="password"
            ref={passwordRef}
            autoComplete="new-password"
          />
          <Label>CONFIRM NEW PASSWORD</Label>
          <Input
            type="password"
            ref={passwordConfirmRef}
            autoComplete="new-password"
          />
        </InputWrapper>
        <Button title={"CONFIRM"} disabled={loading} type="submit" />
        <Toaster position="top-right" />
      </form>
      <Link style={{ textDecoration: "none" }} to="/myprofile/orderhistory">
        <OrderText>VIEW ORDER HISTORY</OrderText>
      </Link>
    </>
  );
};

export default UpdateProfileForm;
