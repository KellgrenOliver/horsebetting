import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import Header from "../components/Header";
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
const SubmitForm = styled.form({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
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
    onSnapshot(userRef, (snapshot) => {
      userData = [];
      snapshot.docs.forEach((doc) => {
        userData.push({ ...doc.data(), id: doc.id });
      });
      setUser(userData);
    });
  }, []);

  const horsesRef = query(collection(db, "horses"));

  let { data: horsesData } = useFirestoreQueryData(["horses"], horsesRef);

  useEffect(() => {
    onSnapshot(horsesRef, (snapshot) => {
      horsesData = [];
      snapshot.docs.forEach((doc) => {
        horsesData.push({ ...doc.data(), id: doc.id });
      });
      setHorses(horsesData);
    });
  }, []);

  const startRace = async () => {
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
                  <SubmitForm onSubmit={startRace}>
                    <label>Enter coins</label>
                    <input
                      type="number"
                      min="1"
                      max={user[0].coins}
                      value={guessedValue}
                      onChange={(e) => setGuessedValue(e.target.value)}
                      required={true}
                    />
                    <Button type="submit">START RACE</Button>
                  </SubmitForm>
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
