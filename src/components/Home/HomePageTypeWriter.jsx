import React from "react";
import { useSpring, animated, config } from "react-spring";
import Typewriter from "typewriter-effect";

const FadedTypeWriter = animated.div;

const HomePageTypeWriter = () => {
  // Fades in after 400 milliseconds
  const fade = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: 400,
    config: config.molasses,
  });
  return (
    <FadedTypeWriter style={fade}>
      {/* Using typewriter-effect to create a cool header loop */}
      <Typewriter
        options={{
          autoStart: true,
          loop: true,
        }}
        onInit={(typewriter) => {
          typewriter
            // Starts the loop
            .pauseFor(500)
            // First text
            .typeString("Do not forget to have fun while playing!")
            .pauseFor(2000)
            .deleteAll()
            // First second
            .typeString("Do not forget to play responsibly!")
            .pauseFor(2000)
            .deleteAll()
            // Third second
            .typeString("Do not forget that your coins are not real money!")
            .pauseFor(2000)
            // Restarts the loop
            .start();
        }}
      />
    </FadedTypeWriter>
  );
};

export default HomePageTypeWriter;
