import React from "react";
import Graph from "../components/Graph";
import Header from "../components/Header";
import { useSpring, animated, config } from "react-spring";

const FadeWrapper = animated.div;

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
      <FadeWrapper style={fade}>
        <Graph />
      </FadeWrapper>
    </div>
  );
};

export default StatisticPage;
