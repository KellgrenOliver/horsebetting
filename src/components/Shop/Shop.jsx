import React, { useState } from "react";
import styled from "@emotion/styled";
import { useShopContext } from "../../contexts/ShopContext";
import { useAuthContext } from "../../contexts/AuthContext";
import { doc, updateDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import Button from "../Buttons/Button";
import toast, { Toaster } from "react-hot-toast";
import { usePaymentInputs } from "react-payment-inputs";
import SmallHeader from "../Headers/SmallHeader";

const Container = styled.div({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "95vw",
  gap: "1rem",
  flexWrap: "wrap",
  padding: "1rem",
  "@media screen and (min-width: 600px)": {
    width: "80vw",
  },
  "@media screen and (min-width: 768px)": {
    width: "70vw",
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
  width: "150px",
  height: "75px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  backgroundColor: "#303030",
  borderRadius: "5px",
  fontSize: "1.3rem",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#4d4d4d",
  },
  "@media screen and (min-width: 600px)": {
    width: "200px",
    height: "100px",
  },
  "@media screen and (min-width: 1024px)": {
    width: "250px",
    height: "125px",
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

const SmallText = styled.div({
  fontWeight: 200,
  fontSize: "0.7rem",
  "@media screen and (min-width: 600px)": {
    fontSize: "0.8rem",
  },
});

const Shop = () => {
  // Get props from react-payment-inputs
  const { getCardNumberProps, getExpiryDateProps, getCVCProps } =
    usePaymentInputs();

  // Gets shopOptions from shop context
  const { shopOptions } = useShopContext();

  // Sorting the array from lowest to highest coin value
  shopOptions?.sort((a, b) => a.coins - b.coins);

  const [stepOne, setStepOne] = useState(true);
  const [stepTwo, setStepTwo] = useState(false);
  const [stepThree, setStepThree] = useState(false);
  const [chosenOption, setChosenOption] = useState();
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");

  // Gets logged in user from auth context
  const { user } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStepTwo(false);
    setStepThree(true);
    toast.success("Your purchase went through");

    // Creates a random orderNumber to the order
    const orderNumber = Math.random().toString(36).slice(2);

    // Timestamp
    const timestamp = Date.now();
    const formatedTime = new Intl.DateTimeFormat("eu", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(timestamp);

    const userData = {
      // Adding coins to user
      coins: user?.coins + chosenOption?.coins,
    };
    // Updates database
    updateDoc(doc(db, "users", `${user?.uid}`), userData);

    const docData = {
      // Sets order data
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
    // Adding order to database
    setDoc(doc(db, "orders", `${orderNumber}`), docData);
  };

  return (
    <>
      {/* You choose value on step 1 */}
      {stepOne && (
        <>
          <SmallHeader title={"1. Select sum"} />
          <Container>
            {/* Maps out shopOptions */}
            {shopOptions?.map((option, i) => (
              <OptionWrapper key={i}>
                {/* When clicking on a option the option will be selected */}
                <Option
                  onClick={() => {
                    setChosenOption(option);
                    setStepOne(false);
                    setStepTwo(true);
                  }}
                >
                  {`${(option?.coins / 1000).toFixed(0)}K`}
                  <SmallText>Cost: ${option?.money}</SmallText>
                </Option>
              </OptionWrapper>
            ))}
          </Container>
        </>
      )}
      {/* You pay in step 2 */}
      {stepTwo && (
        <>
          <SmallHeader title={"2. Payment"} />
          <form onSubmit={handleSubmit}>
            <InputContainer>
              <SectionWrapper>
                <InputWrapper>
                  <Label>FIRST NAME</Label>
                  <Input
                    type="text"
                    placeholder="First name"
                    required
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </InputWrapper>
                <InputWrapper>
                  <Label>LAST NAME</Label>
                  <Input
                    type="text"
                    placeholder="Last name"
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
                    placeholder="City"
                    required
                    onChange={(e) => setCity(e.target.value)}
                  />
                </InputWrapper>
                <InputWrapper>
                  <Label>ADDRESS</Label>
                  <Input
                    type="text"
                    placeholder="Address"
                    required
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </InputWrapper>
              </SectionWrapper>
              <SectionWrapper>
                <InputWrapper>
                  <Label>CARD NUMBER</Label>
                  <Input {...getCardNumberProps()} required />
                </InputWrapper>
                <MobileWrapper>
                  <InputWrapper>
                    <Label>MM/YY</Label>
                    <SmallInput {...getExpiryDateProps()} required />
                  </InputWrapper>
                  <InputWrapper>
                    <Label>PNC</Label>
                    <SmallInput {...getCVCProps()} required />
                  </InputWrapper>
                </MobileWrapper>
              </SectionWrapper>
            </InputContainer>
            <SmallText style={{ marginBottom: "1rem" }}>
              No money will be deducted from your card
            </SmallText>
            <Button title={"PAY"} type="submit" />
          </form>
        </>
      )}
      {/* You get your confirmation in step 3 */}
      {stepThree && (
        <>
          <div style={{ marginBottom: "1rem" }}>
            <SmallHeader title={" Thank you for your purchase!"} />
          </div>
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

export default Shop;
