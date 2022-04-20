import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import LogInPage from "./LogInPage";
import Header from "../components/Header";
import InfoText from "../components/HomePageText";
import HomePageGamesButton from "../components/HomePageGamesButton";
import Typewriter from "typewriter-effect";

const HomePage = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <>
      {currentUser ? (
        <>
          <Header title={"HORSE BETTING"} />
          <Typewriter
            options={{
              autoStart: true,
              loop: true,
            }}
            onInit={(typewriter) => {
              typewriter
                .pauseFor(500)
                .typeString("Underrubrik 1")
                .pauseFor(2000)
                .deleteAll()
                .typeString("Underrubrik 2")
                .pauseFor(2000)
                .start();
            }}
          />
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
