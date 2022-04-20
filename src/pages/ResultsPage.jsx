import React from "react";
import Header from "../components/Header";
import Results from "../components/Results";
import { useSpring, animated, config } from "react-spring";

const FadeWrapper = animated.div;

const ResultsPage = () => {
  const fade = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: 400,
    config: config.molasses,
  });
  return (
    <div>
      <Header title={"RESULTS"} />
      <FadeWrapper style={fade}>
        <Results />
      </FadeWrapper>
    </div>
  );
};

export default ResultsPage;
