import React from "react";
import HorseGraph from "../components/Graphs/HorseGraph";
import MyResultsGraph from "../components/Graphs/MyResultsGraph";
import MostWinsGraph from "../components/Graphs/MostWinsGraph";
import MostCoinsGraph from "../components/Graphs/MostCoinsGraph";
import Header from "../components/Headers/Header";
import SmallHeader from "../components/Headers/SmallHeader";
import { useSpring, animated, config } from "react-spring";
import styled from "@emotion/styled";

const FadeWrapper = animated.div;

const Container = styled.div({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  flexWrap: "wrap",
});

const Wrapper = styled.div({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
});

const StatisticsPage = () => {
  const fade = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: 400,
    config: config.molasses,
  });
  return (
    <>
      <Header title={"STATISTIC"} />
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
          <Wrapper>
            <SmallHeader title={"My results"} />
            <MyResultsGraph />
          </Wrapper>
        </Container>
      </FadeWrapper>
    </>
  );
};

export default StatisticsPage;
