import React, { useState } from "react";
import styled from "@emotion/styled";
import { useShopContext } from "../contexts/ShopContext";

const Container = styled.div({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "70vw",
  gap: "2rem",
  flexWrap: "wrap",
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

const InputWrapper = styled.div({
  display: "flex",
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

const ShopOptions = () => {
  const { shopOptions } = useShopContext();

  shopOptions?.sort((a, b) => a.coins - b.coins);

  const [stepOne, setStepOne] = useState(true);
  const [stepTwo, setStepTwo] = useState(false);
  const [stepThree, setStepThree] = useState(false);
  const [chosenOption, setChosenOption] = useState();

  return (
    <>
      {stepOne && (
        <>
          <h1>1. Select sum</h1>
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
          <h1>2. Payment</h1>
          <InputWrapper>
            <Label>Förnamn</Label>
            <Input type="text" placeholder="Förnamn" />
            <Label>Efternamn</Label>
            <Input type="text" placeholder="Efternamn" />
            <Label>Stad</Label>
            <Input type="text" placeholder="Stad" />
            <Label>Adress</Label>
            <Input type="text" placeholder="Adress" />
            <Label>Kortnummer</Label>
            <Input type="text" placeholder="Kortnummer" />
            <Label>MM/YY</Label>
            <Input type="text" placeholder="MM/YY" />
            <Label>PNC</Label>
            <Input type="text" placeholder="PNC" />
          </InputWrapper>
          <button
            onClick={() => {
              setStepTwo(false);
              setStepThree(true);
            }}
          >
            PAY
          </button>
        </>
      )}
      {stepThree && (
        <>
          <h1>Thank you for your purchase!</h1>
          <span>{`Du har köpt ${(chosenOption?.coins / 1000).toFixed(
            1
          )}K!`}</span>
        </>
      )}
    </>
  );
};

export default ShopOptions;
