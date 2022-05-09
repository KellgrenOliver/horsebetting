import React from "react";
import styled from "@emotion/styled";
import { useHorseContext } from "../../contexts/HorseContext";

const HorseWrapper = styled.div({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexWrap: "wrap",
  flexDirection: "row",
  width: "100%",
  marginBottom: "4rem",
  "@media screen and (min-width: 600px)": {
    marginBottom: "2rem",
  },
  "@media screen and (min-width: 1024px)": {
    marginBottom: "1rem",
  },
});
// Gets the image as a prop
const Horse = styled.div(({ image }) => {
  return {
    fontSize: "4rem",
    color: "white",
    width: "250px",
    height: "250px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "2rem",
    borderRadius: "5px",
    backgroundImage: `url(${image})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    "@media screen and (min-width: 600px)": {
      width: "200px",
      height: "200px",
    },
    "@media screen and (min-width: 1024px)": {
      width: "250px",
      height: "250px",
    },
  };
});
const CompetitorWrapper = styled.div({
  margin: "0.5rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  borderRadius: "5px",
  width: "80vw",
  backgroundColor: "#303030",
  "@media screen and (min-width: 600px)": {
    width: "50vw",
  },
  "@media screen and (min-width: 768px)": {
    width: "25vw",
  },
  "@media screen and (min-width: 1024px)": {
    flexDirection: "row",
    width: "30vw",
  },
});
const InfoWrapper = styled.div({
  marginBottom: "2rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  "@media screen and (min-width: 1024px)": {
    marginRight: "2rem",
  },
});
const H3 = styled.h3({
  fontWeight: 200,
  margin: "0.5rem",
});

const Horses = () => {
  // Gets all horses from horse context
  const { horses } = useHorseContext();

  return (
    <>
      <HorseWrapper>
        {/* Maps out all horses */}
        {horses &&
          horses.map((horse, i) => {
            return (
              // Info about the horse
              <CompetitorWrapper key={i}>
                {/* Sends image as a prop to the styled component */}
                <Horse image={horse.image || ""} />
                <InfoWrapper>
                  <H3>Name: {horse.title}</H3>
                  <H3>Age: {horse.age}</H3>
                  <H3>Color: {horse.color}</H3>
                </InfoWrapper>
              </CompetitorWrapper>
            );
          })}
      </HorseWrapper>
    </>
  );
};

export default Horses;
