import React from "react";
import Header from "../components/Header";
import Results from "../components/Results";
import { useSpring, animated, config } from "react-spring";
import styled from "@emotion/styled";

const FadeWrapper = styled.div({});

const FadedResults = animated(FadeWrapper);

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
      <FadedResults style={fade}>
        <Results />
      </FadedResults>
    </div>
  );
};

export default ResultsPage;
