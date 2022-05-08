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
  const { users } = useAuthContext();

  if (!users) return null;

  users.sort((a, b) => b.wins - a.wins);

  const top3Arr = users.slice(0, 3);

  const userNames = top3Arr.map((user) => user?.email);
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
