import React from "react";
import Graph from "../components/Graph";
import Header from "../components/Header";
import { useSpring, animated, config } from "react-spring";
import styled from "@emotion/styled";

const FadeWrapper = styled.div({});

const FadedStatistic = animated(FadeWrapper);

const StatisticPage = () => {
  const fade = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: 400,
    config: config.molasses,
  });
  return (
    <div>
      <Header title={"STATISTIC"} />
      <FadedStatistic style={fade}>
        <Graph />
      </FadedStatistic>
    </div>
  );
};

export default StatisticPage;
