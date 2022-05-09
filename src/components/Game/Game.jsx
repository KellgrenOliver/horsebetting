import React, { useState } from "react";
import styled from "@emotion/styled";
import { useAuthContext } from "../../contexts/AuthContext";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMedal } from "@fortawesome/free-solid-svg-icons";
import Confetti from "react-confetti";
import toast, { Toaster } from "react-hot-toast";
import Button from "../Buttons/Button";
import { useHorseContext } from "../../contexts/HorseContext";

const CompetitorContainer = styled.div({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexWrap: "wrap",
  flexDirection: "row",
  width: "100%",
});
const CompetitorWrapper = styled.div({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
});
const Competitor = styled.div(({ image, user }) => {
  return {
    backgroundImage: `url(${image})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    fontSize: "1.5rem",
    width: "30px",
    height: "30px",
    padding: "2rem",
    border: "5px solid",
    borderRadius: "5px",
    margin: "1rem 1rem 0.5rem 1rem",
    cursor: "pointer",
    "&.Active": {
      borderColor: `${
        user?.primaryColor ? user?.primaryColor : "rgb(247, 141, 167)"
      }`,
      boxShadow: "rgba(255, 255, 255, 0.65) 0px 0px 5px",
    },
    "@media screen and (min-width: 600px)": {
      padding: "3rem",
      width: "50px",
      height: "50px",
      margin: "2rem 2rem 0.5rem 2rem",
    },
  };
});
const Winner = styled(Competitor)({
  width: "150px",
  height: "150px",
  "@media screen and (min-width: 1024px)": {
    width: "75px",
    height: "75px",
  },
});
const WinnerTitle = styled.h1({
  fontWeight: 200,
  fontSize: "2rem",
  marginTop: "0.5rem",
  "@media screen and (min-width: 600px)": {
    fontSize: "2.5rem",
  },
});
const H3 = styled.h3({
  fontWeight: 200,
  fontSize: "1.5rem",
  "@media screen and (min-width: 600px)": {
    fontSize: "2rem",
  },
});
const SubmitForm = styled.form({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
});
const StyledInput = styled.input({
  backgroundColor: "#dedede",
  width: "150px",
  height: "30px",
  marginTop: "0.2rem",
  marginBottom: "1rem",
  borderRadius: "5px",
  border: "none",
  textAlign: "center",
  "&:focus": {
    outline: "none",
  },
});
const WinnerContainer = styled.div({
  backgroundColor: "#303030",
  paddingBottom: "1.5rem",
  paddingTop: "1rem",
  width: "80vw",
  borderRadius: "5px",
  "@media screen and (min-width: 600px)": {
    width: "60vw",
  },
  "@media screen and (min-width: 1024px)": {
    width: "40vw",
  },
});
const Icon = styled(FontAwesomeIcon)({
  fontSize: "2rem",
  color: "white",
  "@media screen and (min-width: 600px)": {
    fontSize: "2rem",
  },
});
const StyledConfetti = styled(Confetti)({
  position: "absolute",
  width: "100vw",
  height: "100vh",
  "@media screen and (min-width: 600px)": {
    marginLeft: "25vw",
    width: "75vw",
  },
  "@media screen and (min-width: 1024px)": {
    marginLeft: "20vw",
    width: "80vw",
    "@media screen and (min-width: 1224px)": {
      marginLeft: "15vw",
      width: "85vw",
    },
  },
});

const Game = () => {
  const [winner, setWinner] = useState();
  const [guessedWinner, setGuessedWinner] = useState();
  const [renderGame, setRenderGame] = useState(true);
  const [activeId, setActiveId] = useState();
  const { horses } = useHorseContext();
  const [guessedValue, setGuessedValue] = useState(0);
  const { user } = useAuthContext();

  const startRace = async (e) => {
    e.preventDefault();
    const winner = horses[Math.floor(Math.random() * horses.length)];
    setWinner(winner);
    setRenderGame(false);
    if (!user) return null;

    const userData = {
      uid: user?.uid,
      wins:
        winner && winner.title.length > 0 && guessedWinner === winner?.title
          ? user && user.wins + 1
          : user && user.wins,

      losses:
        winner && winner.title.length > 0 && guessedWinner !== winner?.title
          ? user && user.losses + 1
          : user && user.losses,
      coins:
        winner && winner.title.length > 0 && guessedWinner === winner?.title
          ? user && user.coins + parseInt(guessedValue) * horses.length
          : user && user.coins - guessedValue,
    };
    updateDoc(doc(db, "users", `${userData.uid}`), userData);

    const horseRef = doc(db, "horses", `${winner.id}`);

    const horseData = (await getDoc(horseRef)).data();

    updateDoc(horseRef, {
      wins: horseData.wins + 1,
    });
  };

  const playAgain = () => {
    setRenderGame(true);
    setActiveId("");
    setGuessedValue();
  };

  const notify = () => toast.error("You must have coins to be able to play");

  return (
    <>
      {renderGame && (
        <>
          <CompetitorContainer>
            {horses?.map((horse) => {
              return (
                <CompetitorWrapper key={horse.id}>
                  <Competitor
                    user={user}
                    image={horse.image}
                    onClick={() => {
                      setActiveId(horse.id);
                      setGuessedWinner(horse.title);
                    }}
                    className={activeId === horse.id && "Active"}
                  />
                  <H3 style={{ marginTop: "auto" }}>{horse.title}</H3>
                </CompetitorWrapper>
              );
            })}
          </CompetitorContainer>

          {activeId && (
            <SubmitForm onSubmit={startRace}>
              <label>Enter coins</label>
              <StyledInput
                type="number"
                min={1}
                max={user?.coins}
                value={guessedValue || ""}
                onChange={(e) => setGuessedValue(e.target.value)}
                required
              />
              <Button
                title={"START RACE"}
                type="submit"
                onClick={() => {
                  if (user?.coins === 0) {
                    notify();
                  }
                }}
              />
              <Toaster position="top-right" />
            </SubmitForm>
          )}
        </>
      )}
      {!renderGame && (
        <>
          <WinnerContainer>
            <CompetitorContainer>
              <Winner image={winner.image} />
            </CompetitorContainer>
            <WinnerTitle>{winner && winner.title}</WinnerTitle>
            <Icon icon={faMedal} />
          </WinnerContainer>
          {winner && (
            <>
              {guessedWinner === winner.title && <StyledConfetti />}
              <H3>
                {guessedWinner === winner.title
                  ? "Congratz, you won!"
                  : "Nice try, you lost!"}
              </H3>
            </>
          )}
          {winner && <Button title={"PLAY AGAIN"} onClick={playAgain} />}
        </>
      )}
    </>
  );
};

export default Game;