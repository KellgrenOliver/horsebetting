import React from "react";
import { useSpring, animated, config } from "react-spring";
import Typewriter from "typewriter-effect";

const FadedTypeWriter = animated.div;

const HomePageTypeWriter = () => {
  const fade = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: 400,
    config: config.molasses,
  });
  return (
    <FadedTypeWriter style={fade}>
      <Typewriter
        options={{
          autoStart: true,
          loop: true,
        }}
        onInit={(typewriter) => {
          typewriter
            .pauseFor(500)
            .typeString("Do not forget to have fun while playing!")
            .pauseFor(2000)
            .deleteAll()
            .typeString("Do not forget to play responsibly!")
            .pauseFor(2000)
            .deleteAll()
            .typeString("Do not forget that your coins are not real money!")
            .pauseFor(2000)
            .start();
        }}
      />
    </FadedTypeWriter>
  );
};

export default HomePageTypeWriter;
