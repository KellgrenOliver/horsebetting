import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import styled from "@emotion/styled";
import { useAuthContext } from "../../contexts/AuthContext";

const Container = styled.div({
  width: "90vw",
  margin: "0rem 1rem 1rem 1rem",
  "@media screen and (min-width: 600px)": {
    width: "30vw",
  },
  "@media screen and (min-width: 1024px)": {
    width: "35vw",
  },
});
const MostWinsGraph = () => {
  // Getting all users from auth context
  const { users } = useAuthContext();

  if (!users) return null;

  // Sorting the array from highest to lowest wins
  users.sort((a, b) => b.wins - a.wins);

  // Gets the three first in array
  const top3Arr = users.slice(0, 3);

  // Maps out user names
  const userNames = top3Arr.map((user) => user?.email);
  // Maps out wins from users
  const userWins = top3Arr.map((user) => user?.wins);

  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);
  ChartJS.defaults.color = "white";
  ChartJS.defaults.scale.grid.color = "gray";

  const labels = userNames;
  const data = {
    labels: labels,
    datasets: [
      {
        color: "white",
        data: userWins,
        backgroundColor: ["#d6b618", "#d6d6d6", "#d69949"],
      },
    ],
  };
  const options = {
    animation: true,
    scaleFontColor: "#FFFFFF",
    responsive: true,
    plugins: {
      font: {
        color: "white",
      },
      legend: {
        display: false,
      },
    },
  };
  return (
    <Container>
      <Bar height={80} options={options} data={data} />
    </Container>
  );
};

export default MostWinsGraph;
