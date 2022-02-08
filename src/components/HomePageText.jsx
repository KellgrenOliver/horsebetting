import React from "react";
import styled from "@emotion/styled";

const TextWrapper = styled.div({
  width: "70%",
  textAlign: "justify",
});

const Paragraph = styled.h2({
  fontWeight: 200,
  margin: "0.5rem",
});

const HomePageText = () => {
  return (
    <TextWrapper>
      <Paragraph>
        Betting on horse racing or horse betting commonly occurs at many horse
        races. It started in the UK in the early 1600s during the reign of King
        James I. Gamblers can stake money on the final placement of the horses
        taking part in a race. Gambling on horses is, however, prohibited at
        some racetracks. For example, because of a law passed in 1951, betting
        is illegal in Springdale Race Course, home of the nationally renowned
        Toronto-Dominion Bank (TD Bank) Carolina Cup and Colonial Cup
        Steeplechase in Camden, South Carolina.
      </Paragraph>
      <br />
      <Paragraph>
        Where gambling is allowed, most tracks offer parimutuel betting where
        gamblers' money is pooled and shared proportionally among the winners
        once a deduction has been made from the pool. Parimutuel betting also
        provides purse money to participants and a considerable amount of tax
        revenue, with over $100 billion being wagered annually in 53 countries.
      </Paragraph>
      <br />
      <Paragraph>
        In some countries – notably the UK, Ireland, and Australia – an
        alternative and more popular facility is provided by bookmakers who
        effectively make a market in odds. This allows the gambler to 'lock in'
        odds on a horse at a particular time (known as 'taking the price' in the
        UK).
      </Paragraph>
    </TextWrapper>
  );
};

export default HomePageText;
