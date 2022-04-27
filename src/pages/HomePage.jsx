import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import LogInPage from "./LogInPage";
import Header from "../components/Header";
import TypeWriter from "../components/HomePageTypeWriter";
import InfoText from "../components/HomePageText";

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
        <LogInPage />
      )}
    </>
  );
};

export default HomePage;
