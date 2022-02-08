import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import LogInPage from "./LogInPage";
import Header from "../components/Header";
import InfoText from "../components/HomePageText";
import HomePageGamesButton from "../components/HomePageGamesButton";

const HomePage = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <>
      {currentUser ? (
        <>
          <Header title={"HORSE BETTING"} />
          <InfoText />
          <HomePageGamesButton />
        </>
      ) : (
        <LogInPage />
      )}
    </>
  );
};

export default HomePage;
