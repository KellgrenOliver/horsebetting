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
import { useHorseContext } from "../../contexts/HorseContext";

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
const HorseGraph = () => {
  // Getting horses from horse context
  const { horses } = useHorseContext();

  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);
  ChartJS.defaults.color = "white";
  ChartJS.defaults.scale.grid.color = "gray";

  // Getting all horse names
  const horseNames = horses && horses.map((horse) => horse.title);
  // Getting all horse wins
  const horseWins = horses && horses.map((horse) => horse.wins);

  // Sets labels to the horse names
  const labels = horseNames;
  const data = {
    labels: labels,
    datasets: [
      {
        color: "white",
        // Sets data to the horse wins
        data: horseWins,
        backgroundColor: [
          "rgb(123, 220, 181",
          "rgb(6, 147, 227)",
          "rgb(252, 185, 0)",
          "rgb(247, 141, 167)",
        ],
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

export default HorseGraph;
