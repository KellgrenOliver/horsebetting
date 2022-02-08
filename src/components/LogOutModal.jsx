import React from "react";
import Modal from "react-modal";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

const customStyles = {
  content: {
    backgroundColor: "#262626",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    height: "150px",
    width: "300px",
    margin: "auto",
    borderRadius: "10px",
    border: "none",
  },
};
const LinkWrapper = styled.div({
  padding: "1rem 0 1rem 0 ",
  width: "70vw",
  cursor: "pointer",
  textDecoration: "none",
  color: "white",
  fontSize: "1.2rem",
  fontWeight: 200,
  borderBottom: "3px solid white",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  "&:hover": {
    backgroundImage: "linear-gradient(to right, #029ebf, #016d91)",
  },
  "@media screen and (min-width: 600px)": {
    width: "20vw",
  },
  "@media screen and (min-width: 1024px)": {
    width: "15vw",
  },
});
const NavLink = styled.span({
  margin: 0,
  width: "100%",
  cursor: "pointer",
  textDecoration: "none",
  color: "white",
  fontSize: "1.2rem",
  paddingRight: "1rem",
  "@media screen and (min-width: 600px)": {
    fontSize: "1rem",
  },
  "@media screen and (min-width: 1024px)": {
    fontSize: "1.3rem",
  },
});
const Icon = styled(FontAwesomeIcon)({
  fontSize: "2rem",
  margin: "0 1rem 0 1rem ",
  "@media screen and (min-width: 600px)": {
    fontSize: "1.5rem",
  },
});
const Header = styled.div({
  color: "white",
  fontSize: "1.2rem",
  width: "100%",
  marginBottom: "1rem",
});
const YesLink = styled(Link)({
  color: "white",
  backgroundImage: "linear-gradient(to right, #00b4db, #0083b0)",
  width: "50px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "30px",
  borderRadius: "5px",
  textDecoration: "none",
  margin: "0.2rem",
  fontSize: "1rem",
});
const Button = styled.button({
  color: "white",
  backgroundImage: "linear-gradient(to right, #00b4db, #0083b0)",
  width: "50px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "30px",
  borderRadius: "5px",
  margin: "0.2rem",
  border: "none",
  cursor: "pointer",
  fontSize: "1rem",
});
const YesOrNoWrapper = styled.div({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
});

Modal.setAppElement("#root");

const LogOutModal = () => {
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {}

  function closeModal() {
    setIsOpen(false);
  }
  return (
    <>
      <LinkWrapper onClick={openModal}>
        <Icon icon={faSignOutAlt} />
        <NavLink>LOG OUT</NavLink>
      </LinkWrapper>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <Header>Are you sure you want to log out?</Header>
        <YesOrNoWrapper>
          <YesLink to="/logout">Yes</YesLink>
          <Button onClick={closeModal}>No</Button>
        </YesOrNoWrapper>
      </Modal>
    </>
  );
};

export default LogOutModal;
