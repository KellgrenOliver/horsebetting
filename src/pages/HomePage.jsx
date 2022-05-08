import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import LogInComp from "../components/LogIn_SignUp/LogInComp";
import Header from "../components/Headers/Header";
import TypeWriter from "../components/Home/HomePageTypeWriter";
import InfoText from "../components/Home/HomePageText";

const HomePage = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <>
      {currentUser ? (
        <>
          <Header title={"HORSE BETTING"} />
          <TypeWriter />
          <InfoText />
        </>
      ) : (
        <LogInComp />
      )}
    </>
  );
};

export default HomePage;
