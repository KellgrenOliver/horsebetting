import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useAuthContext } from "../contexts/AuthContext";
import {
  doc,
  updateDoc,
  collection,
  query,
  where,
  onSnapshot,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { useFirestoreQueryData } from "@react-query-firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMedal } from "@fortawesome/free-solid-svg-icons";
import Confetti from "react-confetti";

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
    width: "50px",
    height: "50px",
    padding: "3rem",
    border: "5px solid",
    borderRadius: "5px",
    margin: "2rem 2rem 0 2rem",
    cursor: "pointer",
    "&.Active": {
      borderColor: `${
        user?.[0]?.theme1 ? user[0].theme1 : "rgb(247, 141, 167)"
      }`,
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
  width: "150px",
  height: "150px",
  "@media screen and (min-width: 1024px)": {
    width: "75px",
    height: "75px",
  },
});
const Button = styled.button(({ user }) => {
  return {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: `linear-gradient(to right, ${
      user?.[0]?.theme1 ? user[0].theme1 : "rgb(247, 141, 167)"
    }, ${user?.[0]?.theme2 ? user[0].theme2 : "rgb(153, 0, 239)"})`,
    width: "150px",
    height: "50px",
    borderRadius: "5px",
    color: "white",
    textAlign: "center",
    border: "none",
    cursor: "pointer",
    margin: "auto",
  };
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
  height: "35px",
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
  backgroundColor: "#212121",
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
});

const Game = () => {
  const [winner, setWinner] = useState();
  const [guessedWinner, setGuessedWinner] = useState();
  const [renderGame, setRenderGame] = useState(true);
  const [activeId, setActiveId] = useState();
  const [horses, setHorses] = useState();
  const [user, setUser] = useState();
  const [guessedValue, setGuessedValue] = useState(0);
  const { currentUser } = useAuthContext();

  const userRef = query(
    collection(db, "users"),
    where("uid", "==", currentUser && currentUser.uid)
  );

  let { data: userData } = useFirestoreQueryData(["users"], userRef);

  useEffect(() => {
    const unSubscribe = onSnapshot(userRef, (snapshot) => {
      userData = [];
      snapshot.docs.forEach((doc) => {
        userData.push({ ...doc.data(), id: doc.id });
      });
      setUser(userData);
    });
    return () => {
      unSubscribe();
    };
  }, []);

  const horsesRef = query(collection(db, "horses"));

  let { data: horsesData } = useFirestoreQueryData(["horses"], horsesRef);

  useEffect(() => {
    const unSubscribe = onSnapshot(horsesRef, (snapshot) => {
      horsesData = [];
      snapshot.docs.forEach((doc) => {
        horsesData.push({ ...doc.data(), id: doc.id });
      });
      setHorses(horsesData);
    });
    return () => {
      unSubscribe();
    };
  }, []);

  const startRace = async () => {
    console.log("körs detta");
    const winner = horses[Math.floor(Math.random() * horses.length)];
    setWinner(winner);
    setRenderGame(false);
    if (!user) return null;

    const userData = {
      uid: currentUser.uid,
      wins:
        winner && winner.title.length > 0 && guessedWinner === winner?.title
          ? user && user[0].wins + 1
          : user && user[0].wins,

      loses:
        winner && winner.title.length > 0 && guessedWinner !== winner?.title
          ? user && user[0].loses + 1
          : user && user[0].loses,
      coins:
        winner && winner.title.length > 0 && guessedWinner === winner?.title
          ? user && user[0].coins + parseInt(guessedValue)
          : user && user[0].coins - guessedValue,
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

  return (
    <>
      {renderGame && (
        <>
          {horses && (
            <>
              <CompetitorContainer>
                {horses &&
                  horses.map((horse) => {
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
                        <H3>{horse.title}</H3>
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
                    max={user[0].coins}
                    value={guessedValue || ""}
                    onChange={(e) => setGuessedValue(e.target.value)}
                    required={true}
                  />
                  <Button user={user} type="submit">
                    START RACE
                  </Button>
                </SubmitForm>
              )}
            </>
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
          {winner && (
            <Button user={user} onClick={playAgain}>
              PLAY AGAIN
            </Button>
          )}
        </>
      )}
    </>
  );
};

export default Game;
