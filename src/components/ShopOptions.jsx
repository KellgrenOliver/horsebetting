import React, { useState } from "react";
import styled from "@emotion/styled";
import { useShopContext } from "../contexts/ShopContext";
import { useAuthContext } from "../contexts/AuthContext";
import { doc, updateDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import Button from "../components/Button";
import toast, { Toaster } from "react-hot-toast";

const Container = styled.div({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "70vw",
  gap: "2rem",
  flexWrap: "wrap",
});

const StepHeader = styled.div({
  fontWeight: 200,
  fontSize: "1.5rem",
  paddingLeft: "1rem",
  paddingRight: "1rem",
  marginBottom: "0.5rem",
  "@media screen and (min-width: 600px)": {
    fontSize: "2rem",
  },
});

const OptionWrapper = styled.div({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  gap: "0.5rem",
});

const Option = styled.div({
  width: "250px",
  height: "100px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#303030",
  borderRadius: "5px",
  fontSize: "1.3rem",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#4d4d4d",
  },
});

const InputContainer = styled.div({
  display: "flex",
  flexDirection: "column",
});

const InputWrapper = styled.div({
  display: "flex",
  flexDirection: "column",
});

const SectionWrapper = styled.div({
  "@media screen and (min-width: 1024px)": {
    gap: "1rem",
    display: "flex",
  },
});

const MobileWrapper = styled.div({
  display: "flex",
  gap: "1rem",
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

const SmallInput = styled(Input)({
  width: "calc(42vw - 0.5rem) !important",
  "@media screen and (min-width: 600px)": {
    width: "calc(20vw - 0.5rem) !important",
  },
  "@media screen and (min-width: 1024px)": {
    width: "calc(12.5vw - 0.5rem) !important",
  },
});

const Label = styled.label({
  fontSize: "0.8rem",
});

const WarningText = styled.div({
  fontWeight: 200,
  fontSize: "0.7rem",
  marginBottom: "1rem",
});

const ShopOptions = () => {
  const { shopOptions } = useShopContext();

  shopOptions?.sort((a, b) => a.coins - b.coins);

  const [stepOne, setStepOne] = useState(true);
  const [stepTwo, setStepTwo] = useState(false);
  const [stepThree, setStepThree] = useState(false);
  const [chosenOption, setChosenOption] = useState();
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const { user } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStepTwo(false);
    setStepThree(true);
    toast.success("Your purchase went through");

    const orderNumber = Math.random().toString(36).slice(2);

    const timestamp = Date.now();
    const formatedTime = new Intl.DateTimeFormat("eu", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(timestamp);

    const userData = {
      coins: user?.coins + chosenOption?.coins,
    };
    updateDoc(doc(db, "users", `${user?.uid}`), userData);

    const docData = {
      userId: user?.uid,
      coins: chosenOption?.coins,
      money: chosenOption?.money,
      orderNumber,
      time: formatedTime,
      first_name,
      last_name,
      email: user?.email,
      city,
      address,
    };
    setDoc(doc(db, "orders", `${orderNumber}`), docData);
  };

  return (
    <>
      {stepOne && (
        <>
          <StepHeader>1. Select sum</StepHeader>
          <Container>
            {shopOptions?.map((option, i) => (
              <OptionWrapper key={i}>
                <Option
                  onClick={() => {
                    setChosenOption(option);
                    setStepOne(false);
                    setStepTwo(true);
                  }}
                >{`${(option?.coins / 1000).toFixed(1)}K`}</Option>
                <span>{option?.money}$</span>
              </OptionWrapper>
            ))}
          </Container>
        </>
      )}
      {stepTwo && (
        <>
          <StepHeader>2. Payment</StepHeader>
          <form onSubmit={handleSubmit}>
            <InputContainer>
              <SectionWrapper>
                <InputWrapper>
                  <Label>FIRST NAME</Label>
                  <Input
                    type="text"
                    required
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </InputWrapper>
                <InputWrapper>
                  <Label>LAST NAME</Label>
                  <Input
                    type="text"
                    required
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </InputWrapper>
              </SectionWrapper>
              <SectionWrapper>
                <InputWrapper>
                  <Label>CITY</Label>
                  <Input
                    type="text"
                    required
                    onChange={(e) => setCity(e.target.value)}
                  />
                </InputWrapper>
                <InputWrapper>
                  <Label>ADDRESS</Label>
                  <Input
                    type="text"
                    required
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </InputWrapper>
              </SectionWrapper>
              <SectionWrapper>
                <InputWrapper>
                  <Label>CARD NUMBER</Label>
                  <Input type="number" required />
                </InputWrapper>
                <MobileWrapper>
                  <InputWrapper>
                    <Label>MM/YY</Label>
                    <SmallInput type="text" required />
                  </InputWrapper>
                  <InputWrapper>
                    <Label>PNC</Label>
                    <SmallInput type="number" required />
                  </InputWrapper>
                </MobileWrapper>
              </SectionWrapper>
            </InputContainer>
            <WarningText>No money will be deducted from your card</WarningText>
            <Button title={"PAY"} type="submit" />
          </form>
        </>
      )}
      {stepThree && (
        <>
          <StepHeader style={{ marginBottom: "1rem" }}>
            Thank you for your purchase!
          </StepHeader>
          <Button
            title={"BACK TO SHOP"}
            type="button"
            onClick={() => {
              setStepThree(false);
              setStepOne(true);
            }}
          />
        </>
      )}
      <Toaster position="top-right" />
    </>
  );
};

export default ShopOptions;
