import React, { useEffect, useState } from "react";
import useGetHorses from "../hooks/useGetHorses";
import styled from "@emotion/styled";
import Header from "../components/Header";

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
const Competitor = styled.div(({ image }) => {
  return {
    backgroundImage: `url(${image})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    fontSize: "1.5rem",
    width: "50px",
    height: "50px",
    padding: "3rem",
    border: "5px solid",
    borderRadius: "5px",
    margin: "2rem 2rem 0 2rem",
    cursor: "pointer",
    "&.Active": {
      borderColor: "#399dcc",
      boxShadow: "rgba(255, 255, 255, 0.65) 0px 0px 5px",
    },
    "@media screen and (max-width: 600px)": {
      width: "30px",
      height: "30px",
      margin: "1rem 1rem 0 1rem",
    },
  };
});
const Winner = styled(Competitor)({
  width: "300px",
  height: "300px",
});
const Button = styled.button({
  backgroundImage: "linear-gradient(to right, #00b4db, #0083b0)",
  width: "150px",
  height: "50px",
  borderRadius: "5px",
  color: "white",
  textAlign: "center",
  border: "none",
  margin: "1rem 0rem 3rem 0",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#187580",
  },
});
const H3 = styled.h3({
  fontWeight: 200,
  fontSize: "1.5rem",
  "@media screen and (min-width: 600px)": {
    fontSize: "2rem",
  },
});

const Game = () => {
  const { horses } = useGetHorses();
  const [winner, setWinner] = useState();
  const [coins, setCoins] = useState(500);
  const [guessedWinner, setGuessedWinner] = useState();
  const [renderGame, setRenderGame] = useState(true);
  const [activeId, setActiveId] = useState();
  const [guessedValue, setGuessedValue] = useState("");

  useEffect(() => {
    console.log(coins);
    console.log("Gissat antal:", guessedValue);
    console.log("Gissat på:", guessedWinner);
    console.log("Vinnare:", winner && winner.title);
    if (winner && guessedWinner === winner.title) {
      setCoins(coins + guessedValue);
      console.log("Du vann");
    } else {
      setCoins(coins - guessedValue);
      console.log("Du förlorade");
    }
  }, [guessedValue, guessedWinner, winner]);

  const startRace = () => {
    const data = horses[Math.floor(Math.random() * horses.length)];
    setWinner(data);
    setRenderGame(false);
  };

  const playAgain = () => {
    setRenderGame(true);
    setWinner("");
    setGuessedValue("");
    setActiveId("");
  };

  return (
    <>
      {renderGame && (
        <>
          {horses && (
            <>
              <Header title={"CHOOSE A HORSE"} />
              <CompetitorContainer>
                {horses &&
                  horses.map((horse) => {
                    return (
                      <CompetitorWrapper key={horse.id}>
                        <Competitor
                          image={horse.image}
                          onClick={() => {
                            setActiveId(horse.id);
                            setGuessedWinner(horse.title);
                          }}
                          className={activeId === horse.id && "Active"}
                        />
                        <H3>{horse.title}</H3>
                      </CompetitorWrapper>
                    );
                  })}
              </CompetitorContainer>
              {activeId && (
                <>
                  <label>Enter coins</label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={guessedValue}
                    onChange={(e) => setGuessedValue(e.target.value)}
                  />
                  <Button onSubmit={startRace}>START RACE</Button>
                </>
              )}
            </>
          )}
        </>
      )}
      {!renderGame && (
        <>
          <CompetitorContainer>
            <Winner image={winner.image} />
          </CompetitorContainer>
          <Header title={winner && `${winner.title} WON`.toLocaleUpperCase()} />
          {winner && (
            <H3>
              {guessedWinner === winner.title
                ? "Congratz, you won!"
                : "Nice try, you lost!"}
            </H3>
          )}
          {winner && <Button onClick={playAgain}>PLAY AGAIN</Button>}
        </>
      )}
    </>
  );
};

export default Game;
