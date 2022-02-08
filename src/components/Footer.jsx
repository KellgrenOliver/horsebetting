import React from "react";
import styled from "@emotion/styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faMapMarkerAlt,
  faGlobeAmericas,
} from "@fortawesome/free-solid-svg-icons";

const Container = styled.div({
  width: "100%",
  backgroundColor: "#212121",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  height: "250px",
});
const InfoWrapper = styled.div({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});
const Icon = styled(FontAwesomeIcon)({
  fontSize: "2rem",
  margin: "0 1rem 0 1rem ",
  "@media screen and (min-width: 600px)": {
    fontSize: "1.5rem",
  },
});

const Footer = () => {
  return (
    <Container>
      <InfoWrapper>
        <Icon icon={faPhone} />
        <h4>202-555-0195</h4>
      </InfoWrapper>
      <InfoWrapper>
        <Icon icon={faGlobeAmericas} />
        <h4>United States, New York City </h4>
      </InfoWrapper>
      <InfoWrapper>
        <Icon icon={faMapMarkerAlt} />
        <h4>7168 Spring Drive, NY 10009 </h4>
      </InfoWrapper>
    </Container>
  );
};

export default Footer;
