import React from "react";
import styled from "@emotion/styled";
import { useSpring, animated, config } from "react-spring";

const Paragraph = styled.h2({
  fontWeight: 200,
  textAlign: "left",
  margin: "0.5rem auto",
  width: "90%",
  "@media screen and (min-width: 600px)": {
    width: "70%",
  },
  "@media screen and (min-width: 1024px)": {
    width: "60%",
  },
});

const Text = animated.div;

const HomePageText = () => {
  const fade1 = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: 600,
    config: config.molasses,
  });
  const fade2 = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: 800,
    config: config.molasses,
  });
  const fade3 = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: 1000,
    config: config.molasses,
  });
  return (
    <>
      <Text style={fade1}>
        <Paragraph>
          Betting on horse racing or horse betting commonly occurs at many horse
          races. It started in the UK in the early 1600s during the reign of
          King James I. Gamblers can stake money on the final placement of the
          horses taking part in a race. Gambling on horses is, however,
          prohibited at some racetracks. For example, because of a law passed in
          1951, betting is illegal in Springdale Race Course, home of the
          nationally renowned Toronto-Dominion Bank (TD Bank) Carolina Cup and
          Colonial Cup Steeplechase in Camden, South Carolina.
        </Paragraph>
      </Text>
      <br />
      <Text style={fade2}>
        <Paragraph>
          Where gambling is allowed, most tracks offer parimutuel betting where
          gamblers' money is pooled and shared proportionally among the winners
          once a deduction has been made from the pool. Parimutuel betting also
          provides purse money to participants and a considerable amount of tax
          revenue, with over $100 billion being wagered annually in 53
          countries.
        </Paragraph>
      </Text>
      <br />
      <Text style={fade3}>
        <Paragraph>
          In some countries notably the UK, Ireland, and Australia an
          alternative and more popular facility is provided by bookmakers who
          effectively make a market in odds. This allows the gambler to 'lock
          in' odds on a horse at a particular time (known as 'taking the price'
          in the UK).
        </Paragraph>
      </Text>
    </>
  );
};

export default HomePageText;
