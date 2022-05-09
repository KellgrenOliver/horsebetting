import React from "react";
import HorseGraph from "../components/Graphs/HorseGraph";
import MyResultsGraph from "../components/Graphs/MyResultsGraph";
import MostWinsGraph from "../components/Graphs/MostWinsGraph";
import MostCoinsGraph from "../components/Graphs/MostCoinsGraph";
import Header from "../components/Headers/Header";
import SmallHeader from "../components/Headers/SmallHeader";
import { useSpring, animated, config } from "react-spring";
import styled from "@emotion/styled";
import { useAuthContext } from "../contexts/AuthContext";

const FadeWrapper = animated.div;

const Container = styled.div({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  flexWrap: "wrap",
  marginBottom: "3rem",
  "@media screen and (min-width: 1024px)": {
    marginBottom: "1rem",
  },
});

const Wrapper = styled.div({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
});

const StatisticsPage = () => {
  // Animations from react-spring
  const fade = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: 400,
    config: config.molasses,
  });

  // Gets user from auth context
  const { user } = useAuthContext();

  return (
    <>
      <Header title={"STATISTICS"} />
      <FadeWrapper style={fade}>
        <Container>
          <Wrapper>
            <SmallHeader title={"Top 3 most wins"} />
            <MostWinsGraph />
          </Wrapper>
          <Wrapper>
            <SmallHeader title={"Top 3 most coins"} />
            <MostCoinsGraph />
          </Wrapper>
          <Wrapper>
            <SmallHeader title={"Horse wins"} />
            <HorseGraph />
          </Wrapper>
          {/* This graph will only be rendered when a user is logged in */}
          {user && (
            <Wrapper>
              <SmallHeader title={"My results"} />
              <MyResultsGraph />
            </Wrapper>
          )}
        </Container>
      </FadeWrapper>
    </>
  );
};

export default StatisticsPage;
