import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import LogInComp from "../components/LogIn_SignUp/LogInComp";
import Header from "../components/Headers/Header";
import TypeWriter from "../components/Home/HomePageTypeWriter";
import InfoText from "../components/Home/HomePageText";

const HomePage = () => {
  // Gets user from auth context
  const { user } = useContext(AuthContext);

  return (
    <>
      {user ? (
        <>
          {/* If there is an logged in user this will be rendered */}
          <Header title={"HORSE BETTING"} />
          <TypeWriter />
          <InfoText />
        </>
      ) : (
        // If there isnt any logged in user a login form will be rendered
        <LogInComp />
      )}
    </>
  );
};

export default HomePage;
