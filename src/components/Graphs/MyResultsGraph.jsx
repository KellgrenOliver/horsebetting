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
  // Getting the logged in user from auth context
  const { user } = useAuthContext();

  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);
  ChartJS.defaults.color = "white";
  ChartJS.defaults.scale.grid.color = "gray";

  const data = {
    labels: ["Wins", "Losses"],
    datasets: [
      {
        data: {
          // The logged in users wins
          Wins: user?.wins,
          // The logged in users losses
          Losses: user?.losses,
        },
        color: "white",
        backgroundColor: ["#67b57c", "#b8404a"],
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
